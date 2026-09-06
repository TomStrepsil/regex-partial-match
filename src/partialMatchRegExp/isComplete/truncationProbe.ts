import { legacyEscapeAsLiteral } from "../legacyEscape.ts";
import { DISJUNCTION_TO_END_OF_INPUT, OPTIONAL_ATOM_OPENING } from "../atomSyntax.ts";
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
const FLAGS_INCOMPATIBLE_WITH_PROBING = /[dgy]/g;

function groupShiftTable(
  rawLookarounds: readonly RawLookaroundInfo[],
  roles: readonly PartRole[]
) {
  const shiftForGroup: number[] = [0];
  let markerCount = 0;
  let rawLookaroundIndex = 0;

  for (const role of roles) {
    switch (role) {
      case "backreference":
      case "truncationEnd":
        markerCount++;
        break;
      case "groupOpen":
        shiftForGroup.push(markerCount);
        break;
      case "rawLookaround": {
        const { capturingGroupsOpened } = rawLookarounds[rawLookaroundIndex++];
        for (let i = 0; i < capturingGroupsOpened; i++) {
          shiftForGroup.push(markerCount);
        }
        break;
      }
      case "plain":
        break;
    }
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
  const shiftForGroup = groupShiftTable(rawLookarounds, roles);

  let markerCount = 0;
  let rawLookaroundIndex = 0;
  const probed = parts.map((part, index) => {
    if (isBackreference(part)) {
      const marker = "|(?<" + markerName + String(markerCount++) + ">)";
      return (
        OPTIONAL_ATOM_OPENING +
        renumberedToken(part, shiftForGroup) +
        marker +
        DISJUNCTION_TO_END_OF_INPUT.slice(1)
      );
    }
    if (roles[index] === "rawLookaround") {
      return renumberRawBackreferences(
        part,
        rawLookarounds[rawLookaroundIndex++],
        shiftForGroup,
        declaresNamedGroup
      );
    }
    if (roles[index] !== "truncationEnd") return part;

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
