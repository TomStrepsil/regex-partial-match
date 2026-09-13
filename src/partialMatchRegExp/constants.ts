import asOptionalAtom from "./asOptionalAtom.ts";

export const OCCURRENCES_REGEX = /\{\d+,?\d*\}/y;
export const NOT_NUMBERS_REGEX = /\D/g;
export const FLAGS_IRRELEVANT_TO_REBUILD = /[dgy]/g;
export const LITERAL_K = "k";
export const START_ANCHOR = "^";
export const GROUP_CLOSING = ")";
export const LOOKAHEAD_OPENING = "(?=";
export const DISJUNCTION_TO_END_OF_INPUT = "|$(?![\\s\\S]))";
export const OPTIONAL_ATOM_OPENING = "(?:";
export const NAMED_GROUP_OPENING = "(?<";
export const ANY_CAPTURED_TEXT = "(?:[\\s\\S]*?)";
export const QUANTIFIER_PART = /^(?:[*+?]|\{\d+,?\d*\})$/;
export const MAYBE_HAS_BACKREFERENCE_REGEX = /\\[0-9]|\\k</;
export const NEVER = "(?!)";
export const ALTERNATION = "|";
export const ONLY_AT_END_OF_INPUT = asOptionalAtom(NEVER);
export const UNCONSTRAINED_GROUP_SHAPE = {
  groupLimit: Infinity,
  declaresNamedGroup: true
};