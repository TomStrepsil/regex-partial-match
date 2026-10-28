import type PartialMatchRegExp from "../partialMatchRegExp/index.ts";
import { compiledOf } from "../partialMatchRegExp/partialMatchInternals.ts";
import { buildTruncationProbe, tookTruncationBranch } from "./truncationProbe.ts";

/**
 * Whether the engine read the end of the input while producing `match`, so
 * that more input could change it, as the JDK's `Matcher.hitEnd()` reports.
 *
 * `false` is not "is a match": `/hello \w+/` matches `"hello world"` in full
 * and reports `true`, since `\w+` read the end looking for more.
 *
 * @param partial - The `PartialMatchRegExp` instance that produced `match`
 * @param match - A match returned by `partial.exec()`
 * @returns `true` when the match read the end of the input, and its captures
 * are the closest available rather than final; `false` when it settled short
 * of the end, and no continuation changes its index or text
 *
 * @remarks
 * Some bounded or repeated quantifiers that end at the end of the input
 * report `true` without reading it. A read of the end inside a raw
 * lookaround, or inside a lookahead in an earlier iteration of a quantified
 * group, reports `false`, as does a lone high surrogate ending the input
 * under `u` or `v`.
 *
 * @see {@link https://github.com/TomStrepsil/regex-partial-match/blob/main/docs/api.md#hitend | Documentation}
 *
 * @example
 * ```typescript
 * import PartialMatchRegExp, { hitEnd } from "regex-partial-match";
 *
 * const partial = new PartialMatchRegExp(/^\d{4}-\d{2}-\d{2}/);
 * const match = partial.exec('2024-06');
 *
 * match !== null && hitEnd(partial, match); // true - keep typing
 * ```
 */
export default function hitEnd(
  partial: PartialMatchRegExp,
  match: RegExpExecArray
): boolean {
  const compiled = compiledOf(partial);
  return tookTruncationBranch(
    (compiled.probe ??= buildTruncationProbe(compiled, partial.flags)),
    match.input,
    match.index
  );
}
