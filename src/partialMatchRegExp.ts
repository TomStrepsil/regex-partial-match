import {
  compilePartial,
  renderParts,
  type CompiledPartial,
  type DynamicPath
} from "./compilePartial.ts";
import {
  isComplete as matchIsComplete,
  backreferenceExpansion,
  type ExpandedMatch,
  type TruncationProbeCache
} from "./isComplete.ts";
import { preferLongerCaptures } from "./preferLongerCaptures.ts";
import type { RegexFeature } from "./walk.ts";

export type { RegexFeature };

const compiledPartial = Symbol("compiledPartial");
const truncationProbeCache = Symbol("truncationProbeCache");

/**
 * A `RegExp` subclass that supports partial (prefix) matching.
 *
 * An instance behaves like a normal `RegExp` but also matches any input string
 * that is a valid prefix of the original pattern — i.e. strings that could still
 * lead to a full match with more input. This enables validation of incomplete
 * input strings.
 *
 * @example
 * ```typescript
 * const pattern = /^hello world/;
 * const partial = new PartialMatchRegExp(pattern);
 *
 * partial.test('h');           // true - could match
 * partial.test('hello');       // true - could match
 * partial.test('hello world'); // true - full match
 * partial.test('goodbye');     // false - cannot match
 * ```
 *
 * @remarks
 * - The transformed pattern always matches an empty string at the end of input;
 *   use a start anchor (`^`) to prevent false positives from empty string matches
 * - The `y` (sticky) flag may not behave as expected in partial matching scenarios
 *
 * @see {@link https://github.com/TomStrepsil/regex-partial-match#readme | Documentation}
 */
class PartialMatchRegExp extends RegExp {
  declare private [compiledPartial]: CompiledPartial;
  declare private [truncationProbeCache]: TruncationProbeCache;

  constructor(pattern: RegExp | string, flags?: string) {
    super(pattern, flags);
    this[compiledPartial] = compilePartial(this);
    this[truncationProbeCache] = { probe: undefined };
  }

  /**
   * The syntactic constructs the original pattern uses, recorded as a side
   * effect of the single walk that builds the partial-match regex.
   *
   * The set is built on first read and cached, so patterns that are only ever
   * matched against never pay for it. It iterates in `RegexFeature` declaration
   * order, not the order the constructs appear in the pattern.
   *
   * @returns The features the original pattern contains
   *
   * @example
   * ```typescript
   * new PartialMatchRegExp(/^[a-z]+/).features.has("startAnchor"); // true
   * ```
   */
  get features(): ReadonlySet<RegexFeature> {
    return this[compiledPartial].features;
  }

  override exec(input: string): RegExpExecArray | null {
    const compiled = this[compiledPartial];
    if (compiled.kind === "dynamic")
      return this._execDynamic(compiled.dynamic, input);

    const { regex } = compiled;
    const match = execFrom(regex, input, this.lastIndex);
    this.lastIndex = regex.lastIndex;
    return match;
  }

  /**
   * Whether `match` — a match this instance produced — is a match of the
   * original pattern, or merely a prefix of it.
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
   * @param match - A match returned by this instance's `exec()`
   * @returns `true` when the match is complete, `false` when it is a prefix
   *
   * @remarks
   * Requires ES2018+ regardless of the pattern — the probe this builds uses
   * named capturing groups internally, unlike `exec()` and `test()`.
   *
   * @example
   * ```typescript
   * const partial = new PartialMatchRegExp(/^\d{4}-\d{2}-\d{2}/);
   * const match = partial.exec('2024-06');
   *
   * match !== null && partial.isComplete(match); // false - keep typing
   * ```
   */
  isComplete(match: RegExpExecArray): boolean {
    return matchIsComplete(
      this[compiledPartial],
      match,
      this.flags,
      this[truncationProbeCache]
    );
  }

  private _execDynamic(
    dynamic: DynamicPath,
    input: string
  ): RegExpExecArray | null {
    const { originalCaptureScan, preScan, expand } = dynamic;

    const honoursLastIndex = this.global || this.sticky;
    const start = honoursLastIndex ? this.lastIndex : 0;

    const originalMatch = super.exec(input);
    if (isAtOrBefore(originalMatch, start)) return originalMatch;

    let preScanMatch: RegExpExecArray | null = null;
    if (originalMatch) {
      preScanMatch = execFrom(preScan, input, start);
      const noEarlierPartialPossible =
        preScanMatch === null || preScanMatch.index >= originalMatch.index;
      if (noEarlierPartialPossible) return originalMatch;
    }

    const capture =
      execFrom(originalCaptureScan, input, start) ??
      preScanMatch ??
      execFrom(preScan, input, start);
    if (capture === null) return originalMatch;

    const expandedParts = expand(capture);
    const expanded = new RegExp(renderParts(expandedParts), this.flags);
    const match = execFrom(expanded, input, start);
    if (match === null || isAtOrBefore(originalMatch, match.index))
      return originalMatch;

    preferLongerCaptures(match, capture);
    if (honoursLastIndex) this.lastIndex = expanded.lastIndex;
    (match as ExpandedMatch)[backreferenceExpansion] = {
      parts: expandedParts,
      probe: undefined
    };
    return match;
  }
}

function execFrom(
  regex: RegExp,
  input: string,
  start: number
) {
  regex.lastIndex = start;
  return regex.exec(input);
}

function isAtOrBefore(match: RegExpExecArray | null, index: number) {
  return match !== null && match.index <= index;
}

export default PartialMatchRegExp;
