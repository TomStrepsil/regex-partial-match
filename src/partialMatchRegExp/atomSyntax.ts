export const DISJUNCTION_TO_END_OF_INPUT = "|$(?![\\s\\S]))";
export const OPTIONAL_ATOM_OPENING = "(?:";
export const NAMED_GROUP_OPENING = "(?<";
export const ANY_CAPTURED_TEXT = "(?:[\\s\\S]*?)";
export const QUANTIFIER_PART = /^(?:[*+?]|\{\d+,?\d*\})$/;

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
