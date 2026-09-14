import { legacyEscapeAsLiteral } from "../legacyEscape.ts";
import { FLAGS_IRRELEVANT_TO_REBUILD } from "../constants.ts";
import {
  DISJUNCTION_TO_END_OF_INPUT,
  END_ANCHOR,
  OPTIONAL_ATOM_OPENING,
  isOptionalAtom,
  isWordBoundaryAtom
} from "../atomSyntax.ts";
import { isQuantifier, quantifierEndingAt } from "../quantifier.ts";
import { groupNameOf, decodeGroupName } from "../groupName.ts";
import {
  isBackreference,
  isNumericBackreference,
  type Backreference,
  type Part,
  type RawLookaroundInfo
} from "../part.ts";
import { roleOf } from "./partRole.ts";

export interface TruncationProbe {
  regex: RegExp;
  markerName: string;
  markerCount: number;
}

const TRUNCATION_MARKER_NAME = "truncation";
const END_OF_INPUT = DISJUNCTION_TO_END_OF_INPUT.slice(1, -1);
const OPTIONAL_QUANTIFIER = "?";
const EXACT_QUANTIFIER = /^\{0*([1-9]\d*|0)(?:,0*\1)?\}$/;

const MARKING = {
  none: 0,
  groupOpen: 1,
  rawLookaround: 2,
  truncationBranch: 3,
  wordBoundary: 4,
  endAnchor: 5,
  readAtEnd: 6,
  optionalAtEnd: 7
} as const;

type Marking = (typeof MARKING)[keyof typeof MARKING];

function isGreedyReadAtEnd(parts: readonly Part[], index: number) {
  const part = parts[index];
  return (
    isQuantifier(part) &&
    !EXACT_QUANTIFIER.test(part as string) &&
    parts[index + 1] !== OPTIONAL_QUANTIFIER &&
    quantifierEndingAt(parts, index) === index
  );
}

function markingOf(parts: readonly Part[], index: number): Marking {
  const part = parts[index];
  switch (roleOf(part)) {
    case "backreference":
      return MARKING.truncationBranch;
    case "rawLookaround":
      return MARKING.rawLookaround;
    case "groupOpen":
      return MARKING.groupOpen;
    case "truncationEnd":
      return isWordBoundaryAtom(part)
        ? MARKING.wordBoundary
        : MARKING.truncationBranch;
    case "plain": {
      if (part === END_ANCHOR) return MARKING.endAnchor;
      if (!isGreedyReadAtEnd(parts, index)) return MARKING.none;
      const previous = parts[index - 1];
      return part === OPTIONAL_QUANTIFIER &&
        (isBackreference(previous) || isOptionalAtom(previous))
        ? MARKING.optionalAtEnd
        : MARKING.readAtEnd;
    }
  }
}

const markingsOf = (parts: readonly Part[]) =>
  parts.map((_, index) => markingOf(parts, index));

function markersAddedBy(marking: Marking) {
  switch (marking) {
    case MARKING.none:
    case MARKING.groupOpen:
    case MARKING.rawLookaround:
      return 0;
    case MARKING.wordBoundary:
      return 2;
    default:
      return 1;
  }
}

function groupShiftTable(
  markings: readonly Marking[],
  rawLookarounds: readonly RawLookaroundInfo[]
) {
  const shiftForGroup: number[] = [0];
  let markerCount = 0;
  let rawLookaroundIndex = 0;

  for (const marking of markings) {
    if (marking === MARKING.groupOpen) {
      shiftForGroup.push(markerCount);
    } else if (marking === MARKING.rawLookaround) {
      const { capturingGroupsOpened } = rawLookarounds[rawLookaroundIndex++];
      for (let opened = 0; opened < capturingGroupsOpened; opened++) {
        shiftForGroup.push(markerCount);
      }
    }
    markerCount += markersAddedBy(marking);
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

  const markings = markingsOf(parts);
  const shiftForGroup = groupShiftTable(markings, rawLookarounds);

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
    switch (markings[index]) {
      case MARKING.rawLookaround:
        probed.push(
          renumberRawBackreferences(
            part,
            rawLookarounds[rawLookaroundIndex++],
            shiftForGroup,
            declaresNamedGroup
          )
        );
        break;
      case MARKING.truncationBranch:
        probed.push(
          part.slice(0, -DISJUNCTION_TO_END_OF_INPUT.length) + truncationBranch()
        );
        break;
      case MARKING.wordBoundary:
        probed.push(
          part.slice(0, -DISJUNCTION_TO_END_OF_INPUT.length) +
            readAtEnd() +
            truncationBranch()
        );
        break;
      case MARKING.endAnchor:
        probed.push(END_ANCHOR + "(?:" + marker() + "(?![\\s\\S])|)");
        break;
      case MARKING.readAtEnd:
        probed.push(part + readAtEnd());
        break;
      case MARKING.optionalAtEnd:
        probed[probed.length - 1] =
          OPTIONAL_ATOM_OPENING +
          probed[probed.length - 1] +
          "|" +
          marker() +
          END_OF_INPUT +
          "|)";
        break;
      default:
        probed.push(part);
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
  const probed = regex.exec(input);
  if (probed === null) return true;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- if markerCount > 0, groups will be defined
  const markers = probed.groups!;
  for (let marker = 0; marker < markerCount; marker++) {
    if (markers[markerName + String(marker)] !== undefined) return true;
  }
  return false;
};
