import longestCaptureOf from "./longestCaptures.ts";
import {
  GROUP_CLOSING,
  OPTIONAL_ATOM_OPENING,
  isRawLookaround
} from "../../partialMatchRegExp/atomSyntax.ts";
import {
  groupsOpenedBefore,
  shiftForGroupOf
} from "../../partialMatchRegExp/groupNumbering.ts";
import { isBackreference, type Part } from "../../partialMatchRegExp/part.ts";
import { Feature } from "../../partialMatchRegExp/regexFeatures.ts";
import type { Hooks } from "../../partialMatchRegExp/walk.ts";
import type { RawLookarounds } from "../../partialMatchRegExp/rawLookaroundInfo.ts";
import renumberRawBackreferences, {
  renumberedToken
} from "../../partialMatchRegExp/renumberRawBackreferences.ts";
import runOutBranch, {
  RUN_OUT_BRANCH_GROUPS,
  endOfInputUnmatchedBy
} from "../../partialMatchRegExp/runOutBranch.ts";
import { CompiledBackreferences } from "./compiledBackreferences.ts";

let lookbehindSupported: boolean | undefined;

function lookbehindParses() {
  try {
    new RegExp("(?<=a)");
    return true;
  } catch {
    return false;
  }
}

export default function compilerWith(longestPartial: number) {
  return function compileDynamic(
    parts: readonly Part[],
    flags: string,
    featureMask: number,
    hooks: Hooks,
    rawLookarounds: RawLookarounds
  ) {
    const groupsBefore = groupsOpenedBefore(parts, rawLookarounds);
    const longestCapture = longestCaptureOf(
      parts,
      groupsBefore,
      flags.indexOf("v") !== -1
    );
    const canRunOut = (lookbehindSupported ??= lookbehindParses());
    const partialLengths = parts.map((part) =>
      isBackreference(part) && !part.forward && canRunOut
        ? Math.min(longestPartial, longestCapture(part) - 1)
        : 0
    );
    const shiftForGroup = shiftForGroupOf(groupsBefore, (index) =>
      partialLengths[index] > 0 ? RUN_OUT_BRANCH_GROUPS : 0
    );

    const hiddenGroups: number[] = [];
    let source = "";
    let rawLookaroundCount = 0;
    parts.forEach((part, index) => {
      if (isBackreference(part)) {
        const token = renumberedToken(part, shiftForGroup);
        const longest = partialLengths[index];
        let runningOut = "";
        if (longest > 0) {
          const hiddenGroup =
            groupsBefore[index] + hiddenGroups.length * RUN_OUT_BRANCH_GROUPS + 1;
          hiddenGroups.push(hiddenGroup);
          runningOut = "|" + runOutBranch(token, hiddenGroup, longest);
        }
        source +=
          OPTIONAL_ATOM_OPENING +
          token +
          runningOut +
          "|" +
          endOfInputUnmatchedBy(token) +
          GROUP_CLOSING;
      } else if (isRawLookaround(part)) {
        const info = rawLookarounds[rawLookaroundCount++];
        source += info
          ? renumberRawBackreferences(part, info, shiftForGroup)
          : part;
      } else {
        source += part;
      }
    });

    return new CompiledBackreferences(
      {
        regex: new RegExp(source, flags),
        hiddenGroups,
        partialLengths,
        nativeMayStartEarlier: (featureMask & Feature.lookaroundCapture) !== 0
      },
      parts,
      featureMask,
      hooks
    );
  };
}
