import createPartialMatchRegex from "./index.ts";

declare global {
  interface RegExp {
    /**
     * Transforms this regular expression to support partial matching.
     * 
     * This method wraps each atomic element of the regex pattern in a non-capturing group
     * with an alternation to end-of-input (`$`), allowing the pattern to match prefixes
     * of the original pattern. This enables validation of incomplete input strings.
     * 
     * @returns A new RegExp that matches partial strings of the original pattern
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
     * - The transformed regex will always match an empty string at the end of input
     * - Backreferences cannot be partially matched as they are atomic
     * - Use with a start anchor (`^`) to prevent false positives from empty string matches
     * - The `y` (sticky) flag may not behave as expected in partial matching scenarios
     * 
     * @see {@link https://github.com/TomStrepsil/regex-partial-match#readme | Documentation}
     */
    toPartialMatchRegex(): RegExp;
  }
}

RegExp.prototype.toPartialMatchRegex = function () {
  return createPartialMatchRegex(this);
};
