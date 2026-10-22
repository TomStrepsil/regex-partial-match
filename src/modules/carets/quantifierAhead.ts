const QUANTIFIER_AHEAD = /[*+?]|\{\d+(?:,\d*)?\}/y;

export function quantifierAhead(source: string, index: number) {
  QUANTIFIER_AHEAD.lastIndex = index;
  return QUANTIFIER_AHEAD.exec(source)?.[0];
}

export const isQuantifierAhead = (source: string, index: number) =>
  quantifierAhead(source, index) !== undefined;
