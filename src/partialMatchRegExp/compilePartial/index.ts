import escapeAtom from "../escapeAtom.ts";
import { walk } from "../walk.ts";
import { OPTIONAL_ATOM_OPENING } from "../atomSyntax.ts";
import { isBackreference, type Part } from "../part.ts";
import { hasFeature } from "../regexFeatures.ts";
import asOptionalAtom from "./asOptionalAtom.ts";
import asPreScanPart from "./asPreScanPart.ts";
import resolvedFromScan from "./resolvedFromScan.ts";
import startsWithUnderFlags from "./startsWithUnderFlags.ts";
import longestBakedPrefixEndingInput from "./longestBakedPrefixEndingInput.ts";
import reclassifyLegacyEscapes from "./reclassifyLegacyEscapes.ts";
import spliceOriginalSource from "./spliceOriginalSource.ts";
import toStatic from "./toStatic.ts";
import { CompiledDynamic, type CompiledPartial } from "./compiled.ts";

const MAYBE_HAS_BACKREFERENCE_REGEX = /\\[0-9]|\\k</;
const NEVER = "(?!)";
const GROUP_CLOSING = ")";
const ALTERNATION = "|";

const ONLY_AT_END_OF_INPUT = asOptionalAtom(NEVER);

export default function compilePartial(regex: RegExp): CompiledPartial {
  const flags = regex.flags;
  let walked = walk(regex, true);
  if (
    hasFeature(walked.featureMask, "namedBackreference") &&
    !hasFeature(walked.featureMask, "namedGroup")
  ) {
    walked = walk(regex, false);
  }
  const { parts, groupCount, featureMask, rawLookarounds, namedGroupOpenings } =
    walked;

  if (!MAYBE_HAS_BACKREFERENCE_REGEX.test(regex.source)) {
    return toStatic(
      parts as string[],
      flags,
      rawLookarounds,
      namedGroupOpenings,
      featureMask
    );
  }

  const isUnicode = regex.unicode || regex.unicodeSets;
  const sanitisedParts = isUnicode
    ? parts
    : reclassifyLegacyEscapes(parts, regex.source, groupCount);
  const backreferences = sanitisedParts.filter(isBackreference);
  if (backreferences.length === 0) {
    return toStatic(
      sanitisedParts as string[],
      flags,
      rawLookarounds,
      namedGroupOpenings,
      featureMask
    );
  }

  return new CompiledDynamic(
    {
      originalCaptureScan: new RegExp(
        spliceOriginalSource(regex.source, backreferences),
        flags
      ),
      preScan: new RegExp(
        sanitisedParts.map(asPreScanPart).join(""),
        flags
      ),
      expansionFitsCaptures: (expandedFrom, match, input) => {
        for (const backref of backreferences) {
          const baked = resolvedFromScan(backref, expandedFrom);
          if (baked === undefined) continue;
          const resolved = resolvedFromScan(backref, match) ?? "";
          const consumed = longestBakedPrefixEndingInput(baked, input, flags);
          if (!startsWithUnderFlags(resolved, consumed, flags)) return false;
        }
        return true;
      },
      expand: (capture) => {
        const expanded: Part[] = [];
        for (const part of sanitisedParts) {
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
    },
    rawLookarounds,
    namedGroupOpenings,
    featureMask
  );
}
