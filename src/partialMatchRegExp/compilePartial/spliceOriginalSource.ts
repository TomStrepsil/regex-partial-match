import { ANY_CAPTURED_TEXT } from "../atomSyntax.ts";
import type { Backreference } from "../part.ts";

export default function spliceOriginalSource(
  source: string,
  backrefs: Backreference[]
) {
  let result = "";
  let cursor = 0;
  for (const { start, end, forward } of backrefs) {
    if (forward) continue;
    result += source.slice(cursor, start) + ANY_CAPTURED_TEXT;
    cursor = end;
  }
  return result + source.slice(cursor);
}
