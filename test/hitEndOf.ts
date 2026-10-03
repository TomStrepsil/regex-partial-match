import type PartialMatchRegExp from "../src/index.ts";
import hitEnd from "../src/hitEnd/index.ts";

export function hitEndOf(
  regex: PartialMatchRegExp,
  input: string
) {
  const match = regex.exec(input);
  return match === null ? null : hitEnd(regex, match);
}
