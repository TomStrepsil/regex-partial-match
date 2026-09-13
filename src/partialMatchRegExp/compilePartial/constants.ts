import asOptionalAtom from "../asOptionalAtom.ts";
export * from "../constants.ts";

export const ANY_CAPTURED_TEXT = "(?:[\\s\\S]*?)";
export const MAYBE_HAS_BACKREFERENCE_REGEX = /\\[0-9]|\\k</;
export const NEVER = "(?!)";
export const ALTERNATION = "|";
export const ONLY_AT_END_OF_INPUT = asOptionalAtom(NEVER);
export const UNCONSTRAINED_GROUP_SHAPE = {
  groupLimit: Infinity,
  declaresNamedGroup: true
};
