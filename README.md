# regex-partial-match

A zero-dependency regular expression transform for partial matching, enabling validation of incomplete input strings against regex patterns.

## Problem statement

Unlike C/C++ (via [PCRE/PCRE2](https://www.pcre.org/original/doc/html/pcrepartial.html), [RE2](https://github.com/google/re2?tab=readme-ov-file#matching-interface), [Boost.Regex](https://www.boost.org/doc/libs/1_34_1/libs/regex/doc/partial_matches.html)), Python ([via third party regex module](https://pypi.org/project/regex/#:~:text=Added%20partial%20matches)) or Java (via [`hitEnd`](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#hitEnd--)), Javascript has no canonical / innate partial-matching for regular expressions.

## Overview

This library transforms regular expressions to best-effort support **partial matching**, allowing you to test if an incomplete string could potentially match the full pattern. This is particularly useful for real-time input validation, autocomplete systems, progressive form validation, stream chunk matching, etc.

**Based on an algorithm created by [Lucas Trzesniewski](https://github.com/ltrzesniewski)**, re-created for NPM via ISC license, with permission.

## Installation

```bash
npm install regex-partial-match
```

## Usage

### Basic Usage

```javascript
import PartialMatchRegExp from "regex-partial-match";

const partial = new PartialMatchRegExp(/hello world/);

partial.test("h"); // true - could match
partial.test("hello"); // true - could match
partial.test("hello world"); // true - full match
partial.test("goodbye"); // false - cannot match
```

### Extending RegExp.prototype

```javascript
import "regex-partial-match/extend";

const partial = /hello world/.toPartialMatchRegex(); // returns a PartialMatchRegExp

partial.test("hel"); // true
```

## How It Works

The library transforms a regular expression by wrapping each [atomic element](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions#atoms) in a [non-capturing group](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Non-capturing_group) with a [disjunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Disjunction) to [end-of-input](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Input_boundary_assertion) (`$`):

```javascript
/abc/ → /(?:a|$)(?:b|$)(?:c|$)/
```

This allows the pattern to match prefixes of the original pattern, enabling validation of incomplete input.

Since the library accepts only valid regular expressions [^1], this enables the algorithm to make lots of unguarded assumptions about the source of the expression.

The library has been stress-tested with various regular expression features in isolation, and some in likely combination, but obviously it's an unbounded test space, and syntactically valid regular expressions nevertheless support contradictory patterns e.g.

- `/\b\B/` - impossible to match both a word boundary and a non-word boundary
- `/$^/` - end cannot come before start
- `x{2}?` - lazy quantifiers are mutually exclusive to fixed-length assertions

Such combinations have not been tested.

> [!NOTE]
> See [Partial Match Parity](/docs/partial-match-parity.md) for full details on how the library compares to reference implementations

## Supported Features

- 🔤 [Literal characters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Literal_character)
- 🔣 [Character escapes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_escape) (`\n`, `\t`, `\x61`, `\u0061`, `\u{1F600}`)
- 🧩 [Character class escapes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class_escape): `/\w+/`, `/\d{3}/`
- 🌐 [Unicode character class escape](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape) (`\p{Letter}`, `\P{Letter}`)
- 📋 [Character classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class) (`[abc]`, `[^abc]`, `[a-z]`)
- 🧮 [Unicode sets (`v` flag)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets) (`/[\p{Lowercase}&&\p{Script=Greek}]/v`)
- 🔢 [Quantifiers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Quantifier) (`*`, `+`, `?`, `{n}`, `{n,}`, `{n,m}`)
- 🔀 [Disjunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Disjunction) (`a|b`)
- 👥 [Groups](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Capturing_group) (capturing and non-capturing) (`(?:abc)`, `(abc)`, `(?<named>abc)`)
- 👉 [Lookahead assertions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookahead_assertion) (`(?=...)`, `(?!...)`)
- 👈 [Lookbehind assertions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookbehind_assertion) (`(?<=...)`, `(?<!...)`)
- ⚓ [Input Boundaries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Input_boundary_assertion) (`^`, `$`)
- 🆒 [Word Boundaries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Word_boundary_assertion) (`\b`, `\B`)
- 🏴 [Flags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags): `g`, `i`, `m`, `s`, `u`, `d`, `y` (See [caveats](#sticky-flag-y) for `y`)
- 🎚️ [Modifiers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Modifier) (`(?ims:...)`, `(?-ims:...)`, `(?im-s:...)`)

## Unsupported Features

The following regex features are **not currently supported**:

- ⚠️ [Backreferences](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Backreference) (`\1`, `\k<name>`) - Can be included, but can't partially match. See [caveats](#caveats).
- ⚠️ [Character class substrings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class#matching_strings) (`\q{abc}`) - When used independently, rather than to modify, can be included, but can't partially match. See [caveats](#caveats).

## Browser Compatibility

The library requires **ES2015** (ECMAScript 6) — the minimum JavaScript version that supports native extension of built-in types such as `RegExp`, which `PartialMatchRegExp` relies on to override `exec()`. Additionally, certain regular expression features require newer environments:

- [**Unicode property escapes**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape) (`\p{...}`, `\P{...}`) - ES2018+
- [**Lookbehind assertions**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookbehind_assertion) (`(?<=...)`, `(?<!...)`) - ES2018+
- [**Named capturing groups**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Named_capturing_group) (`(?<name>...)`) - ES2018+
- [**`s` (dotAll) flag**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/dotAll) - ES2018+
- [**`d` (hasIndices) flag**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/hasIndices) - ES2022+
- [**`v` (unicodeSets) flag**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets) - ES2024+
- [**Modifiers**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Modifier) (`(?ims:...)`, `(?-ims:...)`, `(?i-ms:...)`) - ES2025+

## Caveats

### Backreferences

**Backreferences cannot be partially matched because they are atomic.** A backreference like `\1` must match the complete captured text or fail entirely, and cannot be split into individual characters for partial matching like regular atoms can.

Fixed-length patterns like `/(abc)\1/` could theoretically become `/(?:(a)|$)(?:(b)|$)(?:(c)|$)(?:\1|$)(?:\2|$)(?:\3|$)/` (accepting polluted capture indexes as a side-effect), but this doesn't work for variable-length captures.

[^1]: To remain lightweight, no runtime type validation is applied, so non-typescript consumers will be reliant on underlying errors thrown, if used incorrectly.

### Positive Lookbehinds

Whilst forming a match, a positive lookbehind must match in entirety, for the pattern to match. This is inherent in the concept of non-matching groups, since they are not match-worthy themselves, but just qualify matching atoms.

e.g.

```js
/(?<=foo)bar/;
```

"f" through "foo" is not a match, but "foob" is.

### Surrogate Pair Matching

In [unicode-aware mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode) (`u` flag), **only whole astral characters are supported**. Partial matching of individual surrogate pairs is not supported. For example, `/😀/u` will match the complete emoji character, but not the first surrogate pair in isolation. Hence, if partially matching a byte stream, be sure to pipe via a [`TextDecoder`](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder) first.

### [Sticky](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky) Flag (`y`)

The sticky flag is fully supported for its intended use case: **scanning within a single fixed string**. Partial matches are found only at `lastIndex`; the engine does not scan forward, and `lastIndex` advances on success or resets to `0` on failure — exactly as native sticky regexes behave.

```javascript
import PartialMatchRegExp from "regex-partial-match";

const partial = new PartialMatchRegExp(/hello/y);

partial.lastIndex = 2;
partial.test("xyhello"); // true  — partial match at position 2
partial.test("xyworld"); // false — no match at position 2, no forward scan
partial.lastIndex = 2;
partial.test("xyhel");   // true  — partial prefix "hel" at position 2
```

**Limitation — progressive input validation:** Because a successful match advances `lastIndex`, testing a sequence of growing strings against the same instance does not work as expected:

```javascript
const partial = new PartialMatchRegExp(/hello/y);

partial.test("h");   // true,  lastIndex → 1
partial.test("he");  // false — sticky requires a match at position 1 of "he",
                     //         but "e" is not a valid start of the pattern
partial.test("hel"); // true (lastIndex was reset to 0 by the previous failure)
```

There is no way for the subclass to distinguish "scanning forward in the same string" from "testing a new, longer string", so this cannot be fixed in code. For progressive input validation, use a regex **without** the `y` flag and always test against the full input so far.

The `gy` flag combination is also fully supported: `exec()`/`test()` behave as sticky, while `match()`, `matchAll()`, `replace()`, and `replaceAll()` iterate via `exec()` as global — matching [the language specification](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky).

### "String properties"

As with surrogate pair matching, grapheme clusters / string properties can only match atomically.

Hence, `[\p{RGI_Emoji_Flag_Sequence}]` will match `🇺🇳` as a whole, but not as the individual code points of which it's comprised.

In [`v` mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets) expressions, where `[\q{abc}]` syntax is used in isolation (rather than its canonical use-case as a subtraction/intersection of another character class), this will also only match entirely or not at all. i.e. `abc` can match, but not partially.

## Examples

### Form Validation

```javascript
import PartialMatchRegExp from "regex-partial-match";

const partial = new PartialMatchRegExp(
  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
);

function validateEmail(input) {
  return partial.test(input) ? "valid" : "invalid";
}

validateEmail("user"); // 'valid' - could become valid
validateEmail("user@"); // 'valid' - could become valid
validateEmail("user@example"); // 'valid' - could become valid
validateEmail("user@example.com"); // 'valid' - complete match
validateEmail("@@invalid"); // 'invalid' - cannot match
```

### Autocomplete

```javascript
import PartialMatchRegExp from "regex-partial-match";

const partial = new PartialMatchRegExp(/^(help|quit|save|load)/);

function getSuggestions(input) {
  return partial.test(input) ? "valid prefix" : "no suggestions";
}

getSuggestions("h"); // 'valid prefix'
getSuggestions("hel"); // 'valid prefix'
getSuggestions("help"); // 'valid prefix'
getSuggestions("xyz"); // 'no suggestions'
```

### Stream Processing

```javascript
// Process streaming data with pattern matching at chunk boundaries
const pattern = /\{"[^"]+":"[^"]+"\}/; // Match JSON objects
const partial = new PartialMatchRegExp(pattern);
let buffer = "";

function processChunk(chunk) {
  buffer += chunk;
  const matches = [];

  // Extract complete matches
  let match;
  while ((match = pattern.exec(buffer))) {
    matches.push(match[0]);
    buffer = buffer.slice(match.index + match[0].length);
  }

  // Discard buffer if it cannot possibly complete
  if (buffer && !partial.test(buffer)) {
    buffer = "";
  }

  return matches;
}

processChunk('{"na'); // [] - partial, buffer: '{"na'
processChunk('me":"Jo'); // [] - partial, buffer: '{"name":"Jo'
processChunk('hn"}{"age":'); // ['{"name":"John"}'] - buffer: '{"age":'
processChunk("25}"); // ['{"age":25}'] - buffer: ''
processChunk("invalid{"); // [] - discarded, buffer: ''
```

Useful for parsing log files, network streams, or any chunked data where records may be split across boundaries.

## API

### `PartialMatchRegExp`

A `RegExp` subclass that supports partial matching. The default export of the package.

```js
import PartialMatchRegExp from "regex-partial-match";

const re = new PartialMatchRegExp(/^(ab)+/);
// or
const re = new PartialMatchRegExp("^(ab)+", "i");
```

Accepts the same constructor arguments as `RegExp`. For any string `s` that is a valid prefix of a string that would produce a complete match, `exec(s)` returns a non-null result whose captures are as consistent as possible with what the original `RegExp` would return on the completed input; for non-matching inputs it returns `null`.

### `RegExp.prototype.toPartialMatchRegex(): PartialMatchRegExp`

When using `import 'regex-partial-match/extend'`, this method is added to `RegExp.prototype`.

**Returns:**

- A new `PartialMatchRegExp` created from the `RegExp` instance the method was called on.

## License

ISC License - see [LICENSE](./LICENSE) file for details.

## Credits

Algorithm created by [Lucas Trzesniewski](https://github.com/ltrzesniewski).

## Contributing

Contributions are welcome! Please open an issue or pull request on [GitHub](https://github.com/TomStrepsil/regex-partial-match).

## Related projects

| Project                                                                                     | Description                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`incr-regex-package`](https://www.npmjs.com/package/incr-regex-package)                    | Incremental regex matcher                                                                                                                                                            |
| [`dfa`](https://github.com/foliojs/dfa)                                                     | Compiles a regular expression like syntax to fast deterministic finite automata, which could be used to partial match?                                                               |
| [`refa`](https://github.com/RunDevelopment/refa)                                            | Can [convert regular expressions to an Abstract Syntax Tree](https://rundevelopment.github.io/refa/docs/latest/classes/JS.Parser.html), which might afford partial-match capability? |
| [`@eslint-community/regexpp`](https://github.com/eslint-community/regexpp)                  | A regular expression parser for ECMAScript with AST generation and visitor implementation                                                                                            |
| [`Regex+`](https://www.npmjs.com/package/regex)                                             | template literal, transforming native regular expressions                                                                                                                            |
| [`Awesome Regex`](https://github.com/slevithan/awesome-regex)                               | Curated list of tools, tutorials, libraries, and other resources, covering all major regex flavours                                                                                  |
| [`replace-content-transformer`](https://github.com/TomStrepsil/replace-content-transformer) | A toolkit for stream content replacement, underpinned by `regex-partial-match`                                                                                                       |
