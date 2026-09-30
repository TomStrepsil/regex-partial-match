import withModules from "../partialMatchRegExp/withModules.ts";

/**
 * `PartialMatchRegExp` without the rules that place a `^` in a group or after
 * other parts under the `m` flag, or match a backreference, so that a bundle
 * importing only `regex-partial-match/core` leaves them out.
 *
 * A `^` inside a group or lookaround, or one under `m` with anything before it
 * but `^`, `$`, `\b`, `\B`, a negative lookahead or a lookbehind in its
 * top-level alternative, throws a `TypeError`
 * naming the carets module; a backreference to a group that must be
 * resolved at match time throws one naming the backreferences module. Every
 * other pattern is transformed exactly as the class exported from
 * `regex-partial-match` transforms it.
 *
 * @example
 * ```typescript
 * import PartialMatchRegExp from "regex-partial-match/core";
 *
 * new PartialMatchRegExp(/^hello world/).test("hello"); // true
 * new PartialMatchRegExp(/(a)\1/); // throws TypeError
 * ```
 *
 * @see {@link https://github.com/TomStrepsil/regex-partial-match#readme | Documentation}
 */
const PartialMatchRegExp = withModules();
type PartialMatchRegExp = InstanceType<typeof PartialMatchRegExp>;

export default PartialMatchRegExp;
