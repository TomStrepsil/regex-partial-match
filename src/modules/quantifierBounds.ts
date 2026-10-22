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

export function maximumOf(quantifier: string, minimum: number) {
  switch (quantifier) {
    case "*":
    case "+":
      return Infinity;
    case "?":
      return 1;
  }
  const comma = quantifier.indexOf(",");
  if (comma === -1) return minimum;
  return comma === quantifier.length - 2
    ? Infinity
    : parseInt(quantifier.slice(comma + 1), 10);
}
