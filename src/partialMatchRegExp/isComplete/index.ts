import type PartialMatchRegExp from "../partialMatchRegExp.ts";
import {
  compiledPartial,
  truncationProbeCache
} from "../partialMatchInternals.ts";
import isMatchComplete from "./isMatchComplete.ts";

/**
 * Whether `match` — a match `partial` produced — is a match of the original
 * pattern, or merely a prefix of it.
 *
 * `true` means every atom matched literally, so the path the match took is
 * one the original pattern could have taken itself. `false` means the match
 * depended on the input running out: it took a `|$(?![\s\S])` truncation
 * branch, so more input is needed and its captures are provisional.
 *
 * Complete is not the same as final: `/hello \w+/` matches `"hello world"`
 * completely, and would match more of `"hello worldly"`.
 *
 * The implication runs one way only. The original pattern may also match at
 * this index by some *other* path — yielding the same text, and even the
 * same captures — so re-testing the original answers "does anything match
 * here?", not "did this result depend on truncation?", and cannot recover
 * this answer.
 *
 * @param partial - The `PartialMatchRegExp` instance that produced `match`
 * @param match - A match returned by `partial.exec()`
 * @returns `true` when the match is complete, `false` when it is a prefix
 *
 * @remarks
 * Requires ES2018+ regardless of the pattern — the probe this builds uses
 * named capturing groups internally, unlike `exec()` and `test()`.
 *
 * @example
 * ```typescript
 * import PartialMatchRegExp, { isComplete } from "regex-partial-match";
 *
 * const partial = new PartialMatchRegExp(/^\d{4}-\d{2}-\d{2}/);
 * const match = partial.exec('2024-06');
 *
 * match !== null && isComplete(partial, match); // false - keep typing
 * ```
 */
export default function isComplete(
  partial: PartialMatchRegExp,
  match: RegExpExecArray
): boolean {
  return isMatchComplete(
    partial[compiledPartial],
    match,
    partial.flags,
    partial[truncationProbeCache]
  );
}
