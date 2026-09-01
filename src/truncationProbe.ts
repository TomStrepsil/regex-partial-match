import {
  DISJUNCTION_TO_END_OF_INPUT,
  OPTIONAL_ATOM_OPENING,
  type RawLookaroundInfo
} from "./walk.ts";

const TRUNCATION_MARKER_NAME = "truncation";
const FLAGS_INCOMPATIBLE_WITH_PROBING = /[dgy]/g;
const NAMED_GROUP_REGEX = /\(\?<(?![=!])([^>]*)>/g;
const UNICODE_ESCAPE_IN_NAME_REGEX = /\\u\{([0-9a-fA-F]+)\}|\\u([0-9a-fA-F]{4})/g;
const MAX_CODE_POINT = 0x10ffff;

function decodeGroupName(rawName: string): string {
  return rawName.replace(
    UNICODE_ESCAPE_IN_NAME_REGEX,
    (whole, braced?: string, plain?: string) => {
      const codePoint = parseInt(braced ?? plain ?? "", 16);
      return codePoint <= MAX_CODE_POINT ? String.fromCodePoint(codePoint) : whole;
    }
  );
}

function namedGroupNames(source: string): string[] {
  const names: string[] = [];
  NAMED_GROUP_REGEX.lastIndex = 0;

  let opener: RegExpExecArray | null;
  while ((opener = NAMED_GROUP_REGEX.exec(source))) {
    names.push(decodeGroupName(opener[1]));
  }

  return names;
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
    (part.startsWith("(?<") && part[3] !== "=" && part[3] !== "!")
  );
}

function isRawLookaround(part: string): boolean {
  return (
    part.startsWith("(?!") || part.startsWith("(?<=") || part.startsWith("(?<!")
  );
}

function groupShiftTable(
  parts: readonly string[],
  rawLookarounds: readonly RawLookaroundInfo[]
): number[] {
  const shiftForGroup: number[] = [0];
  let markerCount = 0;
  let rawLookaroundIndex = 0;

  for (const part of parts) {
    if (isSimpleGroupOpen(part)) {
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

function renumberRawBackreferences(
  part: string,
  info: RawLookaroundInfo,
  shiftForGroup: readonly number[]
): string {
  let renumbered = "";
  let cursor = 0;
  for (const backreference of info.backreferences) {
    const isRealBackreference = backreference.ref < shiftForGroup.length;
    if (!isRealBackreference) continue;

    const relativeStart = backreference.start - info.sourceStart;
    const relativeEnd = backreference.end - info.sourceStart;
    const shifted = backreference.ref + shiftForGroup[backreference.ref];
    renumbered += part.slice(cursor, relativeStart) + "\\" + String(shifted);
    cursor = relativeEnd;
  }
  return renumbered + part.slice(cursor);
}

export interface TruncationProbe {
  regex: RegExp;
  markerName: string;
  markerCount: number;
}

export const buildTruncationProbe = (
  parts: readonly string[],
  rawLookarounds: readonly RawLookaroundInfo[],
  source: string,
  flags: string
): TruncationProbe => {
  const existingNames = namedGroupNames(source);
  let markerName = TRUNCATION_MARKER_NAME;
  while (existingNames.some((name) => name.startsWith(markerName))) {
    markerName += "_";
  }

  const shiftForGroup = groupShiftTable(parts, rawLookarounds);

  let markerCount = 0;
  let rawLookaroundIndex = 0;
  const probed = parts.map((part) => {
    if (isRawLookaround(part)) {
      return renumberRawBackreferences(
        part,
        rawLookarounds[rawLookaroundIndex++],
        shiftForGroup
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
