import type { Part } from "./part.ts";

export const OCCURRENCES_REGEX = /\{\d+(?:,\d*)?\}/y;
export const QUANTIFIER_PART = /^(?:[*+?]|\{\d+(?:,\d*)?\})$/;
const LAZY_MARK = "?";

export const isQuantifier = (part: Part | undefined) =>
  typeof part === "string" && QUANTIFIER_PART.test(part);

export function isQuantifierAhead(source: string, index: number) {
  const character = source[index];
  if ("*+?".includes(character)) {
    return true;
  }
  if (character !== "{") return false;
  OCCURRENCES_REGEX.lastIndex = index;
  return OCCURRENCES_REGEX.test(source);
}

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
