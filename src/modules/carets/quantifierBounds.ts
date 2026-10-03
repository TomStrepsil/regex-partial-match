const QUANTIFIER_AHEAD = /[*+?]|\{\d+(?:,\d*)?\}/y;

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
