import escapeAtom from "../escapeAtom.ts";
import { walk } from "../walk.ts";
import {
  FLAGS_IRRELEVANT_TO_REBUILD,
  OPTIONAL_ATOM_OPENING
} from "../constants.ts";
import { isBackreference, type Part } from "../part.ts";
import asOptionalAtom from "../asOptionalAtom.ts";
import asPreScanPart from "./asPreScanPart.ts";
import resolvedFromScan from "./resolvedFromScan.ts";
import startsWithUnderFlags from "./startsWithUnderFlags.ts";
import longestBakedPrefixEndingInput from "./longestBakedPrefixEndingInput.ts";
import flagsAtBackreference from "./flagsAtBackreference.ts";
import toStatic from "./toStatic.ts";
import { CompiledDynamic, type CompiledPartial } from "./compiled.ts";

const MAYBE_HAS_BACKREFERENCE_REGEX = /\\[0-9]|\\k</;
const NEVER = "(?!)";
const GROUP_CLOSING = ")";
const ALTERNATION = "|";

const ONLY_AT_END_OF_INPUT = asOptionalAtom(NEVER);
const UNCONSTRAINED_GROUP_SHAPE = {
  groupLimit: Infinity,
  declaresNamedGroup: true
};

function groupShape(regex: RegExp) {
  const emptyMatch = new RegExp(
    "|" + regex.source,
    regex.flags.replace(FLAGS_IRRELEVANT_TO_REBUILD, "")
  ).exec("");
  return {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- match must succeed, since pattern starts with empty alternative
    groupLimit: emptyMatch!.length - 1,
    declaresNamedGroup: emptyMatch?.groups !== undefined
  };
}

export default function compilePartial(regex: RegExp): CompiledPartial {
  const flags = regex.flags;
  const isUnicode = regex.unicode || regex.unicodeSets;
  const maybeHasBackreference = MAYBE_HAS_BACKREFERENCE_REGEX.test(regex.source);
  const { groupLimit, declaresNamedGroup } =
    maybeHasBackreference && !isUnicode
      ? groupShape(regex)
      : UNCONSTRAINED_GROUP_SHAPE;
  const { parts, featureMask, rawLookarounds, namedGroupOpenings } = walk(
    regex,
    declaresNamedGroup,
    groupLimit
  );

  const backreferences = maybeHasBackreference
    ? parts.filter(isBackreference)
    : [];
  if (backreferences.length === 0) {
    return toStatic(
      parts as string[],
      flags,
      rawLookarounds,
      namedGroupOpenings,
      featureMask
    );
  }

  return new CompiledDynamic(
    {
      preScan: new RegExp(parts.map(asPreScanPart).join(""), flags),
      expansionFitsCaptures: (expandedFrom, match, input) => {
        for (const backref of backreferences) {
          const baked = resolvedFromScan(backref, expandedFrom);
          if (baked === undefined) continue;
          const resolved = resolvedFromScan(backref, match) ?? "";
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
    },
    parts,
    rawLookarounds,
    namedGroupOpenings,
    featureMask
  );
}
