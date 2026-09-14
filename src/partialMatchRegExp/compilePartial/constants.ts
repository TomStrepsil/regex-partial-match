export * from "../constants.ts";

export const ANY_CAPTURED_TEXT = "(?:[\\s\\S]*?)";
export const MAYBE_HAS_BACKREFERENCE_REGEX = /\\[0-9]|\\k</;
export const ALTERNATION = "|";
export const UNCONSTRAINED_GROUP_SHAPE = {
  groupLimit: Infinity,
  declaresNamedGroup: true
};
