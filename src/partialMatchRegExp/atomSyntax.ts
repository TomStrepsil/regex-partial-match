import type { Part } from "./part.ts";

export const START_ANCHOR = "^";
export const END_ANCHOR = "$";
export const GROUP_CLOSING = ")";
export const LOOKAHEAD_OPENING = "(?=";
export const DISJUNCTION_TO_END_OF_INPUT = "|$(?![\\s\\S]))";
export const OPTIONAL_ATOM_OPENING = "(?:";
export const NAMED_GROUP_OPENING = "(?<";

export function asOptionalAtom(text: string) {
  return OPTIONAL_ATOM_OPENING + text + DISJUNCTION_TO_END_OF_INPUT;
}

export const MULTILINE_CARET = "(?m:^)";
export const UNSATISFIABLE = "[]";
export const ONLY_AT_END_OF_INPUT = asOptionalAtom(UNSATISFIABLE);
export const WORD_BOUNDARY_ATOMS = [
  asOptionalAtom("\\b"),
  asOptionalAtom("\\B")
] as const;

export const isWordBoundaryAtom = (part: Part) =>
  part === WORD_BOUNDARY_ATOMS[0] || part === WORD_BOUNDARY_ATOMS[1];

export const isOptionalAtom = (part: Part | undefined): part is string =>
  typeof part === "string" &&
  part.startsWith(OPTIONAL_ATOM_OPENING) &&
  part.endsWith(DISJUNCTION_TO_END_OF_INPUT);

export function isRawLookaround(part: string): boolean {
  return (
    part.startsWith("(?!") ||
    (part.startsWith(NAMED_GROUP_OPENING) &&
      "=!".includes(part[NAMED_GROUP_OPENING.length]))
  );
}

export const endsAtTruncationBranch = (part: string) =>
  part === DISJUNCTION_TO_END_OF_INPUT || isOptionalAtom(part);
