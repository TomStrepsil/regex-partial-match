import carets from "../modules/carets/index.ts";
import backreferences from "../modules/backreferences/index.ts";
import withModules from "./withModules.ts";
import type { RegexFeature } from "./regexFeatures.ts";

export type { RegexFeature };

declare const partialMatchRegExpBrand: unique symbol;

/**
 * An instance of `PartialMatchRegExp`, from any entry point. Declarations
 * merged into this interface apply to every such instance.
 */
interface PartialMatchRegExp extends RegExp {
  readonly [partialMatchRegExpBrand]: true;
  exec(input: string): RegExpExecArray | null;
}

/**
 * The type of a `PartialMatchRegExp` class, from any entry point or
 * `withModules`.
 */
interface PartialMatchRegExpConstructor {
  new (pattern: RegExp | string, flags?: string): PartialMatchRegExp;
  readonly prototype: PartialMatchRegExp;
  readonly [Symbol.species]: PartialMatchRegExpConstructor;
}

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
const PartialMatchRegExp: PartialMatchRegExpConstructor = withModules(
  carets,
  backreferences
);

export default PartialMatchRegExp;
export type { PartialMatchRegExp, PartialMatchRegExpConstructor };
