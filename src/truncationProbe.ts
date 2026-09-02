import { legacyEscapeAsLiteral } from "./legacyEscape.ts";
import {
  DISJUNCTION_TO_END_OF_INPUT,
  OPTIONAL_ATOM_OPENING,
  NAMED_GROUP_OPENING,
  isBackreference,
  isNumericBackreference,
  groupNameOf,
  type Backreference,
  type Part,
  type RawLookaroundInfo
} from "./walk.ts";

const TRUNCATION_MARKER_NAME = "truncation";
const FLAGS_INCOMPATIBLE_WITH_PROBING = /[dgy]/g;
const UNICODE_ESCAPE_IN_NAME_REGEX = /\\u\{([0-9a-fA-F]+)\}|\\u([0-9a-fA-F]{4})/g;

function decodeGroupName(rawName: string): string {
  return rawName.replace(
    UNICODE_ESCAPE_IN_NAME_REGEX,
    (_whole, braced?: string, plain?: string) =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- one of braced or plain is guaranteed to be defined by the regex
      String.fromCodePoint(parseInt((braced ?? plain)!, 16))
  );
}

function endsAtTruncationBranch(part: string): boolean {
  return (
    part === DISJUNCTION_TO_END_OF_INPUT ||
    (part.startsWith(OPTIONAL_ATOM_OPENING) &&
      part.endsWith(DISJUNCTION_TO_END_OF_INPUT))
  );
}

function isSimpleGroupOpen(part: string): boolean {
  return (
    part === "(" ||
    (part.startsWith(NAMED_GROUP_OPENING) &&
      part[NAMED_GROUP_OPENING.length] !== "=" &&
      part[NAMED_GROUP_OPENING.length] !== "!")
  );
}

function isRawLookaround(part: string): boolean {
  return (
    part.startsWith("(?!") ||
    part.startsWith(NAMED_GROUP_OPENING + "=") ||
    part.startsWith(NAMED_GROUP_OPENING + "!")
  );
}

function groupShiftTable(
  parts: readonly Part[],
  rawLookarounds: readonly RawLookaroundInfo[]
): number[] {
  const shiftForGroup: number[] = [0];
  let markerCount = 0;
  let rawLookaroundIndex = 0;

  for (const part of parts) {
    if (isBackreference(part)) {
      markerCount++;
    } else if (isSimpleGroupOpen(part)) {
      shiftForGroup.push(markerCount);
    } else if (isRawLookaround(part)) {
      const { capturingGroupsOpened } = rawLookarounds[rawLookaroundIndex++];
      for (let i = 0; i < capturingGroupsOpened; i++) {
        shiftForGroup.push(markerCount);
      }
    } else if (endsAtTruncationBranch(part)) {
      markerCount++;
    }
  }

  return shiftForGroup;
}

function renumberedToken(
  backreference: Backreference,
  shiftForGroup: readonly number[]
): string {
  return isNumericBackreference(backreference)
    ? "\\" + String(backreference.ref + shiftForGroup[backreference.ref])
    : "\\k<" + backreference.ref + ">";
}

function renumberRawBackreferences(
  part: string,
  info: RawLookaroundInfo,
  shiftForGroup: readonly number[],
  declaresNamedGroup: boolean
): string {
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
): string {
  if (isNumericBackreference(backreference)) {
    return backreference.ref < shiftForGroup.length
      ? "\\" + String(backreference.ref + shiftForGroup[backreference.ref])
      : legacyEscapeAsLiteral(spelling.slice(1));
  }
  return declaresNamedGroup ? spelling : "k" + spelling.slice(2);
}

export interface TruncationProbe {
  regex: RegExp;
  markerName: string;
  markerCount: number;
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

  const shiftForGroup = groupShiftTable(parts, rawLookarounds);

  let markerCount = 0;
  let rawLookaroundIndex = 0;
  const probed = parts.map((part) => {
    if (isBackreference(part)) {
      const marker = "|(?<" + markerName + String(markerCount++) + ">)";
      return (
        OPTIONAL_ATOM_OPENING +
        renumberedToken(part, shiftForGroup) +
        marker +
        DISJUNCTION_TO_END_OF_INPUT.slice(1)
      );
    }
    if (isRawLookaround(part)) {
      return renumberRawBackreferences(
        part,
        rawLookarounds[rawLookaroundIndex++],
        shiftForGroup,
        declaresNamedGroup
      );
    }
    if (!endsAtTruncationBranch(part)) return part;

    const marker = "|(?<" + markerName + String(markerCount++) + ">)";
    return (
      part.slice(0, -DISJUNCTION_TO_END_OF_INPUT.length) +
      marker +
      DISJUNCTION_TO_END_OF_INPUT.slice(1)
    );
  });

  return {
    regex: new RegExp(
      probed.join(""),
      flags.replace(FLAGS_INCOMPATIBLE_WITH_PROBING, "") + "y"
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
