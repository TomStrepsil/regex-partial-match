import {
  DISJUNCTION_TO_END_OF_INPUT,
  OPTIONAL_ATOM_OPENING,
  NAMED_GROUP_OPENING
} from "./constants.ts";

export function isRawLookaround(part: string): boolean {
  return (
    part.startsWith("(?!") ||
    (part.startsWith(NAMED_GROUP_OPENING) &&
      "=!".includes(part[NAMED_GROUP_OPENING.length]))
  );
}

export function endsAtTruncationBranch(part: string): boolean {
  return (
    part === DISJUNCTION_TO_END_OF_INPUT ||
    (part.startsWith(OPTIONAL_ATOM_OPENING) &&
      part.endsWith(DISJUNCTION_TO_END_OF_INPUT))
  );
}
