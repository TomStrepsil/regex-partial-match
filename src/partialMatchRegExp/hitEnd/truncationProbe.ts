import { legacyEscapeAsLiteral } from "../legacyEscape.ts";
import {
  DISJUNCTION_TO_END_OF_INPUT,
  FLAGS_IRRELEVANT_TO_REBUILD,
  OPTIONAL_ATOM_OPENING,
  QUANTIFIER_PART
} from "../constants.ts";
import { groupNameOf, decodeGroupName } from "../groupName.ts";
import {
  isBackreference,
  isNumericBackreference,
  type Backreference,
  type Part,
  type RawLookaroundInfo
} from "../part.ts";
import { roleOf, type PartRole } from "./partRole.ts";

export interface TruncationProbe {
  regex: RegExp;
  markerName: string;
  markerCount: number;
}

const TRUNCATION_MARKER_NAME = "truncation";
const END_OF_INPUT = DISJUNCTION_TO_END_OF_INPUT.slice(1, -1);
const END_ANCHOR = "$";
const OPTIONAL_QUANTIFIER = "?";
const EXACT_QUANTIFIER = /^\{\d+\}$/;
const WORD_BOUNDARY_ATOMS = [
  OPTIONAL_ATOM_OPENING + "\\b" + DISJUNCTION_TO_END_OF_INPUT,
  OPTIONAL_ATOM_OPENING + "\\B" + DISJUNCTION_TO_END_OF_INPUT
];

const isQuantifier = (part: Part | undefined) =>
  typeof part === "string" && QUANTIFIER_PART.test(part);

/**
 * A greedy quantifier that stops at the end of input has tried, and failed, to
 * read one more iteration there; an exact `{n}` never tries, and a lazy one
 * stops as soon as what follows allows.
 */
function isGreedyReadAtEnd(parts: readonly Part[], index: number) {
  const part = parts[index];
  return (
    isQuantifier(part) &&
    !EXACT_QUANTIFIER.test(part as string) &&
    parts[index + 1] !== OPTIONAL_QUANTIFIER &&
    !(part === OPTIONAL_QUANTIFIER && isQuantifier(parts[index - 1]))
  );
}

function isWordBoundaryAtom(part: Part) {
  return part === WORD_BOUNDARY_ATOMS[0] || part === WORD_BOUNDARY_ATOMS[1];
}

function markersAdded(parts: readonly Part[], index: number, role: PartRole) {
  const part = parts[index];
  switch (role) {
    case "backreference":
      return 1;
    case "rawLookaround":
    case "groupOpen":
      return 0;
    case "truncationEnd":
      return isWordBoundaryAtom(part) ? 2 : 1;
    case "plain":
      return part === END_ANCHOR || isGreedyReadAtEnd(parts, index) ? 1 : 0;
  }
}

function groupShiftTable(
  parts: readonly Part[],
  rawLookarounds: readonly RawLookaroundInfo[],
  roles: readonly PartRole[]
) {
  const shiftForGroup: number[] = [0];
  let markerCount = 0;
  let rawLookaroundIndex = 0;

  for (let index = 0; index < parts.length; index++) {
    const role = roles[index];
    if (role === "groupOpen") {
      shiftForGroup.push(markerCount);
    } else if (role === "rawLookaround") {
      const { capturingGroupsOpened } = rawLookarounds[rawLookaroundIndex++];
      for (let opened = 0; opened < capturingGroupsOpened; opened++) {
        shiftForGroup.push(markerCount);
      }
    }
    markerCount += markersAdded(parts, index, role);
  }

  return shiftForGroup;
}

function renumberedToken(
  backreference: Backreference,
  shiftForGroup: readonly number[]
) {
  return isNumericBackreference(backreference)
    ? "\\" + String(backreference.ref + shiftForGroup[backreference.ref])
    : "\\k<" + backreference.ref + ">";
}

function renumberRawBackreferences(
  part: string,
  info: RawLookaroundInfo,
  shiftForGroup: readonly number[],
  declaresNamedGroup: boolean
) {
  let renumbered = "";
  let cursor = 0;
  for (const backreference of info.backreferences) {
    const relativeStart = backreference.start - info.sourceStart;
    const relativeEnd = backreference.end - info.sourceStart;
    renumbered +=
      part.slice(cursor, relativeStart) +
      rawReferenceReplacement(
        part.slice(relativeStart, relativeEnd),
        backreference,
        shiftForGroup,
        declaresNamedGroup
      );
    cursor = relativeEnd;
  }
  return renumbered + part.slice(cursor);
}

function rawReferenceReplacement(
  spelling: string,
  backreference: Backreference,
  shiftForGroup: readonly number[],
  declaresNamedGroup: boolean
) {
  if (isNumericBackreference(backreference)) {
    return backreference.ref >= 1 && backreference.ref < shiftForGroup.length
      ? "\\" + String(backreference.ref + shiftForGroup[backreference.ref])
      : legacyEscapeAsLiteral(spelling.slice(1));
  }
  return declaresNamedGroup ? spelling : "k" + spelling.slice(2);
}

export const buildTruncationProbe = (
  parts: readonly Part[],
  rawLookarounds: readonly RawLookaroundInfo[],
  namedGroupOpenings: readonly string[],
  flags: string
): TruncationProbe => {
  const declaresNamedGroup = namedGroupOpenings.length > 0;
  const declaredNames = namedGroupOpenings.map((opening) =>
    decodeGroupName(groupNameOf(opening))
  );
  let markerName = TRUNCATION_MARKER_NAME;
  while (declaredNames.some((name) => name.startsWith(markerName))) {
    markerName += "_";
  }

  const roles = parts.map(roleOf);
  const shiftForGroup = groupShiftTable(parts, rawLookarounds, roles);

  let markerCount = 0;
  let rawLookaroundIndex = 0;
  const marker = () => "(?<" + markerName + String(markerCount++) + ">)";
  const truncationBranch = () => "|" + marker() + END_OF_INPUT + ")";
  const readAtEnd = () => "(?:" + marker() + END_OF_INPUT + "|)";

  const probed: string[] = [];
  for (let index = 0; index < parts.length; index++) {
    const part = parts[index];
    if (isBackreference(part)) {
      probed.push(
        OPTIONAL_ATOM_OPENING +
          renumberedToken(part, shiftForGroup) +
          truncationBranch()
      );
      continue;
    }
    switch (roles[index]) {
      case "rawLookaround":
        probed.push(
          renumberRawBackreferences(
            part,
            rawLookarounds[rawLookaroundIndex++],
            shiftForGroup,
            declaresNamedGroup
          )
        );
        break;
      case "truncationEnd":
        probed.push(
          part.slice(0, -DISJUNCTION_TO_END_OF_INPUT.length) +
                (isWordBoundaryAtom(part) ? readAtEnd() : "") +
                truncationBranch()
        );
        break;
      case "groupOpen":
        probed.push(part);
        break;
      case "plain":
        if (part === END_ANCHOR) {
          probed.push(END_ANCHOR + "(?:" + marker() + "(?![\\s\\S])|)");
        } else if (!isGreedyReadAtEnd(parts, index)) {
          probed.push(part);
        } else if (
          part === OPTIONAL_QUANTIFIER &&
          (isBackreference(parts[index - 1]) ||
            roles[index - 1] === "truncationEnd") &&
          parts[index - 1] !== DISJUNCTION_TO_END_OF_INPUT
        ) {
          probed[probed.length - 1] =
            OPTIONAL_ATOM_OPENING +
            probed[probed.length - 1] +
            "|" +
            marker() +
            END_OF_INPUT +
            "|)";
        } else {
          probed.push(part + readAtEnd());
        }
        break;
    }
  }

  return {
    regex: new RegExp(
      probed.join(""),
      flags.replace(FLAGS_IRRELEVANT_TO_REBUILD, "") + "y"
    ),
    markerName,
    markerCount
  };
};

export const tookTruncationBranch = (
  probe: TruncationProbe,
  input: string,
  index: number
): boolean => {
  const { regex, markerName, markerCount } = probe;
  regex.lastIndex = index;
  const markers = regex.exec(input)?.groups ?? {};
  for (let marker = 0; marker < markerCount; marker++) {
    if (markers[markerName + String(marker)] !== undefined) return true;
  }
  return false;
};
