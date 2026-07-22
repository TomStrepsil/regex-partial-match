import { compilePartial, type DynamicPath } from "./compilePartial.ts";

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
  #static: RegExp | null;
  #dynamic: DynamicPath | null;

  constructor(pattern: RegExp | string, flags?: string) {
    super(pattern, flags);
    const compiled = compilePartial(this);
    [this.#dynamic, this.#static] = compiled.kind === "dynamic"
      ? [compiled.dynamic, null]
      : [null, compiled.regex];
  }

  override exec(input: string): RegExpExecArray | null {
    if (!this.#dynamic) {
      const partial = this.#static!; // eslint-disable-line @typescript-eslint/no-non-null-assertion -- #static is set whenever #dynamic is null
      partial.lastIndex = this.lastIndex;
      const match = partial.exec(input);
      this.lastIndex = partial.lastIndex;
      return match;
    }

    const start = this.lastIndex;
    const originalMatch = super.exec(input);
    if (originalMatch) return originalMatch;

    const { originalCaptureScan, preScan, expand } = this.#dynamic;

    originalCaptureScan.lastIndex = start;
    let capture = originalCaptureScan.exec(input);
    if (capture === null) {
      preScan.lastIndex = start;
      capture = preScan.exec(input);
    }
    if (capture === null) return null;

    const expanded = new RegExp(expand(capture), this.flags);
    expanded.lastIndex = start;
    const match = expanded.exec(input);
    if (match === null) return null;

    preferLongerCaptures(match, capture);
    this.lastIndex = expanded.lastIndex;
    return match;
  }
}

function pickLonger(
  scanned?: string,
  matched?: string
): string | undefined {
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
