export default function needsCaretRules(source: string) {
  for (
    let k = source.indexOf("^", 1);
    k !== -1;
    k = source.indexOf("^", k + 1)
  ) {
    const before = source[k - 1];
    if (before === "[") continue;
    if (before === "|" && source.lastIndexOf("(", k) === -1) continue;
    return true;
  }
  return false;
}
