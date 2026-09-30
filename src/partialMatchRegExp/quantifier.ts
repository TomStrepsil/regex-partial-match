import type { Part } from "./part.ts";

export const OCCURRENCES_REGEX = /\{\d+(?:,\d*)?\}/y;
export const QUANTIFIER_PART = /^(?:[*+?]|\{\d+(?:,\d*)?\})$/;
export const LAZY_MARK = "?";

export const isQuantifier = (part: Part | undefined): part is string =>
  typeof part === "string" && QUANTIFIER_PART.test(part);

export function quantifierEndingAt(parts: readonly Part[], index: number) {
  return parts[index] === LAZY_MARK && isQuantifier(parts[index - 1])
    ? index - 1
    : index;
}
