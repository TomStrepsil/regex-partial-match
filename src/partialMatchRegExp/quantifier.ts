import type { Part } from "./part.ts";

export const OCCURRENCES_REGEX = /\{\d+(?:,\d*)?\}/y;
export const QUANTIFIER_PART = /^(?:[*+?]|\{\d+(?:,\d*)?\})$/;
const QUANTIFIER_AHEAD = /[*+?]|\{\d+(?:,\d*)?\}/y;
export const LAZY_MARK = "?";

export const isQuantifier = (part: Part | undefined) =>
  typeof part === "string" && QUANTIFIER_PART.test(part);

export function quantifierAhead(source: string, index: number) {
  QUANTIFIER_AHEAD.lastIndex = index;
  return QUANTIFIER_AHEAD.exec(source)?.[0];
}

export const isQuantifierAhead = (source: string, index: number) =>
  quantifierAhead(source, index) !== undefined;

export function minimumOf(quantifier: string) {
  switch (quantifier) {
    case "*":
    case "?":
      return 0;
    case "+":
      return 1;
    default:
      return parseInt(quantifier.slice(1), 10);
  }
}

export function quantifierEndingAt(parts: readonly Part[], index: number) {
  return parts[index] === LAZY_MARK && isQuantifier(parts[index - 1])
    ? index - 1
    : index;
}
