import {
  compilePartial,
  type CompiledPartial,
  type DynamicPath,
  type RegexFeature
} from "./compilePartial.ts";

export type { RegexFeature };

const compiledPartial = Symbol("compiledPartial");

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

  constructor(pattern: RegExp | string, flags?: string) {
    super(pattern, flags);
    this[compiledPartial] = compilePartial(this);
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

    const expanded = new RegExp(expand(capture), this.flags);
    const match = execFrom(expanded, input, start);
    if (match === null || isAtOrBefore(originalMatch, match.index))
      return originalMatch;

    preferLongerCaptures(match, capture);
    if (honoursLastIndex) this.lastIndex = expanded.lastIndex;
    return match;
  }
}

function execFrom(
  regex: RegExp,
  input: string,
  start: number
): RegExpExecArray | null {
  regex.lastIndex = start;
  return regex.exec(input);
}

function isAtOrBefore(match: RegExpExecArray | null, index: number): boolean {
  return match !== null && match.index <= index;
}

function pickLonger(scanned?: string, matched?: string): string | undefined {
  return scanned !== undefined &&
    matched !== undefined &&
    scanned.length > matched.length
    ? scanned
    : undefined;
}

function preferLongerCaptures(
  match: RegExpExecArray,
  scanned: RegExpExecArray
): void {
  for (let index = 1; index < match.length; index++) {
    const longer = pickLonger(scanned[index], match[index]);
    if (longer === undefined) continue;
    match[index] = longer;
    if (match.indices && scanned.indices?.[index]) {
      match.indices[index] = scanned.indices[index];
    }
  }

  if (match.groups && scanned.groups) {
    for (const name of Object.keys(match.groups)) {
      const longer = pickLonger(scanned.groups[name], match.groups[name]);
      if (longer === undefined) continue;
      match.groups[name] = longer;
      if (match.indices?.groups) {
        match.indices.groups[name] = scanned.indices?.groups?.[name];
      }
    }
  }
}

export default PartialMatchRegExp;
