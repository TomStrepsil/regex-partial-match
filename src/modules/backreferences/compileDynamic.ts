import escapeAtom from "../../partialMatchRegExp/escapeAtom.ts";
import { ALTERNATION } from "../../partialMatchRegExp/compilePartial/constants.ts";
import {
  GROUP_CLOSING,
  ONLY_AT_END_OF_INPUT,
  OPTIONAL_ATOM_OPENING,
  asOptionalAtom
} from "../../partialMatchRegExp/atomSyntax.ts";
import {
  isBackreference,
  type Backreference,
  type Part
} from "../../partialMatchRegExp/part.ts";
import type { Hooks } from "../../partialMatchRegExp/walk.ts";
import { CompiledDynamic, type DynamicPath } from "./compiledDynamic.ts";
import asPreScanPart from "./asPreScanPart.ts";
import resolvedFromScan from "./resolvedFromScan.ts";
import startsWithUnderFlags from "./startsWithUnderFlags.ts";
import longestBakedPrefixEndingInput from "./longestBakedPrefixEndingInput.ts";
import flagsAtBackreference from "./flagsAtBackreference.ts";

export default function compileDynamic(
  parts: readonly Part[],
  backreferences: readonly Backreference[],
  flags: string,
  isUnicode: boolean,
  featureMask: number,
  hooks: Hooks
) {
  const dynamic: DynamicPath = {
    preScan: new RegExp(parts.map(asPreScanPart).join(""), flags),
    expansionFitsCaptures: (expandedFrom, match, input) => {
      for (const backref of backreferences) {
        const baked = resolvedFromScan(backref, expandedFrom);
        if (baked === undefined) continue;
        const resolved = resolvedFromScan(backref, match) ?? "";
        if (resolved === baked) continue;
        const backrefFlags = flagsAtBackreference(backref, flags);
        const consumed = longestBakedPrefixEndingInput(
          baked,
          input,
          backrefFlags
        );
        if (!startsWithUnderFlags(resolved, consumed, backrefFlags))
          return false;
      }
      return true;
    },
    expand: (capture) => {
      const expanded: Part[] = [];
      for (const part of parts) {
        if (!isBackreference(part)) {
          expanded.push(part);
          continue;
        }
        const captured = resolvedFromScan(part, capture);
        if (captured === undefined || captured === "") {
          expanded.push(part);
          continue;
        }
        const atoms = isUnicode ? Array.from(captured) : captured.split("");
        expanded.push(OPTIONAL_ATOM_OPENING, part, ALTERNATION);
        for (const atom of atoms) {
          expanded.push(asOptionalAtom(escapeAtom(atom)));
        }
        expanded.push(ONLY_AT_END_OF_INPUT, GROUP_CLOSING);
      }
      return expanded;
    }
  };
  return new CompiledDynamic(
    dynamic,
    parts,
    featureMask,
    hooks
  );
}
