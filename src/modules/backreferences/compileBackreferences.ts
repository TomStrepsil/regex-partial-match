import longestCaptureOf from "./longestCaptures.ts";
import { isRawLookaround } from "../../partialMatchRegExp/atomSyntax.ts";
import { isBackreference, type Part } from "../../partialMatchRegExp/part.ts";
import { Feature } from "../../partialMatchRegExp/regexFeatures.ts";
import type { Hooks } from "../../partialMatchRegExp/walk.ts";
import type { RawLookarounds } from "../../partialMatchRegExp/rawLookaroundInfo.ts";
import renumberRawBackreferences, {
  renumberedToken
} from "../../partialMatchRegExp/renumberRawBackreferences.ts";
import renderBackreference, {
  RUN_OUT_BRANCH_GROUPS
} from "./renderBackreference.ts";
import { CompiledBackreferences } from "./compiledBackreferences.ts";
import { Compiled } from "../../partialMatchRegExp/compilePartial/compiled.ts";

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
  return function compileBackreferences(
    parts: readonly Part[],
    flags: string,
    featureMask: number,
    hooks: Hooks,
    rawLookarounds: RawLookarounds,
    groupCount: number
  ) {
    const longestCapture = longestCaptureOf(flags.indexOf("v") !== -1);
    const canRunOut = (lookbehindSupported ??= lookbehindParses());
    const groupsBeforeRunningOut: number[] = [];
    const partialLengths = parts.map((part) => {
      if (!isBackreference(part) || part.capture === undefined || !canRunOut)
        return 0;
      const longest = Math.min(longestPartial, longestCapture(part) - 1);
      if (longest > 0) groupsBeforeRunningOut.push(part.capture.groupsBefore);
      return longest;
    });
    const shiftForGroup = [0];
    let runningOutBefore = 0;
    for (let group = 1; group <= groupCount; group++) {
      while (groupsBeforeRunningOut[runningOutBefore] < group) runningOutBefore++;
      shiftForGroup.push(runningOutBefore * RUN_OUT_BRANCH_GROUPS);
    }

    const hiddenGroups: number[] = [];
    let source = "";
    let rawLookaroundCount = 0;
    parts.forEach((part, index) => {
      if (isBackreference(part)) {
        source += renderBackreference(
          renumberedToken(part, shiftForGroup),
          partialLengths[index],
          () => {
            const hiddenGroup =
              groupsBeforeRunningOut[hiddenGroups.length] +
              hiddenGroups.length * RUN_OUT_BRANCH_GROUPS +
              1;
            hiddenGroups.push(hiddenGroup);
            return hiddenGroup;
          },
          () => ""
        );
      } else if (isRawLookaround(part)) {
        const info = rawLookarounds[rawLookaroundCount++];
        source += info
          ? renumberRawBackreferences(part, info, shiftForGroup)
          : part;
      } else {
        source += part;
      }
    });

    const regex = new RegExp(source, flags);
    const nativeMayStartEarlier =
      (featureMask & Feature.lookaroundCapture) !== 0;
    const nativeWinsAtSameStart = parts.some(
      (part) =>
        isBackreference(part) && part.capture?.readsLookaheadCapture === true
    );
    return hiddenGroups.length === 0 && !nativeMayStartEarlier
      ? new Compiled(regex, parts, featureMask, hooks)
      : new CompiledBackreferences(
          regex,
          hiddenGroups,
          partialLengths,
          nativeMayStartEarlier,
          nativeWinsAtSameStart,
          parts,
          featureMask,
          hooks
        );
  };
}
