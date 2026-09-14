import type PartialMatchRegExp from "../partialMatchRegExp.ts";
import {
  compiledPartial,
  truncationProbeCache
} from "../partialMatchInternals.ts";
import matchHitEnd from "./matchHitEnd.ts";

/**
 * Whether the engine reached the end of the input while producing `match` —
 * a match `partial` produced — so that more input could change it.
 *
 * The contract is that of the JDK's `Matcher.hitEnd()`: when this returns
 * `false`, no continuation of the input changes the match's index or text,
 * and its captures are the ones the original pattern produces. `true` means
 * the match read the end of the input — an atom ran out of input and took a
 * `|$(?![\s\S])` truncation branch, a greedy quantifier stopped there with
 * nothing left to read, or `$`, `\b` or `\B` held there — so more input could
 * extend it, change which alternative wins, or invalidate it, and its
 * captures are the closest to what a full match would report rather than
 * final.
 *
 * `false` is not "is a match": `/hello \w+/` matches `"hello world"` in full
 * and still reports `true`, since `\w+` read the end looking for more. An
 * exact-length match that consumed the last character without reading past
 * it reports `false`.
 *
 * @param partial - The `PartialMatchRegExp` instance that produced `match`
 * @param match - A match returned by `partial.exec()`
 * @returns `true` when the match read the end of the input, `false` when it
 * settled short of it
 *
 * @remarks
 * Requires ES2018+ regardless of the pattern — the probe this builds uses
 * named capturing groups internally, unlike `exec()` and `test()`.
 *
 * Conservative where the JDK is exact in one place: a bounded greedy
 * quantifier (`?`, `{n,m}`) on a group fully taken at the end of the input
 * reports `true`. Cannot see a read of the end inside a raw lookaround, or
 * inside a lookahead in an earlier iteration of a quantified group.
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
  return matchHitEnd(
    partial[compiledPartial],
    match,
    partial.flags,
    partial[truncationProbeCache]
  );
}
