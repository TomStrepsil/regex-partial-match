import PartialMatchRegExp from "../partialMatchRegExp/index.ts";

declare global {
  interface RegExp {
    /**
     * Transforms this regular expression to support partial matching.
     *
     * The result matches any prefix of the original pattern, which enables
     * validation of incomplete input strings.
     *
     * @returns A new PartialMatchRegExp that matches partial strings of the original pattern
     *
     * @example
     * ```typescript
     * import 'regex-partial-match/extend';
     *
     * const partial = /hello world/.toPartialMatchRegex();
     *
     * partial.test('h');           // true - could match
     * partial.test('hello');       // true - could match
     * partial.test('hello world'); // true - full match
     * partial.test('goodbye');     // false - cannot match
     * ```
     *
     * @remarks
     * The transformed pattern always matches an empty string at the end of input;
     * use a start anchor (`^`) to prevent false positives from empty string matches.
     * See the documentation for how the `y` (sticky) flag behaves.
     *
     * @see {@link https://github.com/TomStrepsil/regex-partial-match#readme | Documentation}
     */
    toPartialMatchRegex(): PartialMatchRegExp;
  }
}

RegExp.prototype.toPartialMatchRegex = function () {
  return new PartialMatchRegExp(this);
};
