import { legacyEscapeAsLiteral } from "../partialMatchRegExp/legacyEscape.ts";
import { FLAGS_IRRELEVANT_TO_REBUILD } from "../partialMatchRegExp/constants.ts";
import {
  DISJUNCTION_TO_END_OF_INPUT,
  END_ANCHOR,
  OPTIONAL_ATOM_OPENING,
  isOptionalAtom,
  isWordBoundaryAtom
} from "../partialMatchRegExp/atomSyntax.ts";
import { isQuantifier, quantifierEndingAt } from "../partialMatchRegExp/quantifier.ts";
import {
  isBackreference,
  isNumericBackreference,
  type Backreference,
  type Part
} from "../partialMatchRegExp/part.ts";
import { roleOf } from "./partRole.ts";
import type {
  RawLookaroundInfo,
  RawLookarounds,
  RawReference
} from "../partialMatchRegExp/rawLookaroundInfo.ts";

export interface TruncationProbe {
  regex: RegExp;
  markerGroups: readonly number[];
}

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
    !EXACT_QUANTIFIER.test(part) &&
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
  rawLookarounds: RawLookarounds
) {
  const shiftForGroup = [0];
  let markerCount = 0;
  let rawLookaroundIndex = 0;

  for (const marking of markings) {
    if (marking === MARKING.groupOpen) {
      shiftForGroup.push(markerCount);
    } else if (marking === MARKING.rawLookaround) {
      const capturingGroupsOpened =
        rawLookarounds[rawLookaroundIndex++]?.capturingGroupsOpened ?? 0;
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
  shiftForGroup: readonly number[]
) {
  let renumbered = "";
  let cursor = 0;
  for (const reference of info.references) {
    const relativeStart = reference.start - info.sourceStart;
    const relativeEnd = reference.end - info.sourceStart;
    renumbered +=
      part.slice(cursor, relativeStart) +
      rawReferenceReplacement(
        part.slice(relativeStart, relativeEnd),
        reference,
        shiftForGroup
      );
    cursor = relativeEnd;
  }
  return renumbered + part.slice(cursor);
}

function rawReferenceReplacement(
  spelling: string,
  { ref }: RawReference,
  shiftForGroup: readonly number[]
) {
  return ref >= 1 && ref < shiftForGroup.length
    ? "\\" + String(ref + shiftForGroup[ref])
    : legacyEscapeAsLiteral(spelling.slice(1));
}

export const buildTruncationProbe = (
  parts: readonly Part[],
  rawLookarounds: RawLookarounds,
  flags: string
): TruncationProbe => {
  const markings = markingsOf(parts);
  const shiftForGroup = groupShiftTable(markings, rawLookarounds);

  const markerGroups: number[] = [];
  let groupsOpened = 0;
  let rawLookaroundIndex = 0;
  const marker = () => {
    markerGroups.push(groupsOpened + markerGroups.length + 1);
    return "()";
  };
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
      case MARKING.rawLookaround: {
        const rawLookaround = rawLookarounds[rawLookaroundIndex++];
        groupsOpened += rawLookaround?.capturingGroupsOpened ?? 0;
        probed.push(
          rawLookaround
            ? renumberRawBackreferences(
                part,
                rawLookaround,
                shiftForGroup
              )
            : part
        );
        break;
      }
      case MARKING.groupOpen:
        groupsOpened++;
        probed.push(part);
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
    markerGroups
  };
};

export const tookTruncationBranch = (
  probe: TruncationProbe,
  input: string,
  index: number
) => {
  const { regex, markerGroups } = probe;
  regex.lastIndex = index;
  const probed: readonly (string | undefined)[] | null = regex.exec(input);
  if (probed === null) return true;
  for (const group of markerGroups) {
    if (probed[group] !== undefined) return true;
  }
  return false;
};
