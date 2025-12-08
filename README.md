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
import createPartialMatchRegex from "regex-partial-match";

const pattern = /hello world/;
const partial = createPartialMatchRegex(pattern);

partial.test("h"); // true - could match
partial.test("hello"); // true - could match
partial.test("hello world"); // true - full match
partial.test("goodbye"); // false - cannot match
```

### Extending RegExp.prototype

```javascript
import "regex-partial-match/extend";

const partial = /hello world/.toPartialMatchRegex();

partial.test("hel"); // true
```

## How It Works

The library transforms a regular expression by wrapping each atomic element in a non-capturing group with an alternation to end-of-input (`$`):

```javascript
/abc/ → /(?:a|$)(?:b|$)(?:c|$)/
```

This allows the pattern to match prefixes of the original pattern, enabling validation of incomplete input.

Since the library accepts only valid regular expressions [^1], this enables the algorithm to make lots of unguarded assumptions about the source of the expression.

The library has been stress-tested with various regular expression features in isolation, and some in likely combination, but obviously its an unbounded test space, and syntactically valid regular expressions nevertheless support contradictory patterns e.g.

- `/\b\B/` - impossible to match both a word boundary and a non-word boundary
- `/$^/` - end cannot come before start
- `x{2}?` - lazy quantifiers are mutually exclusive to fixed-length assertions

Such combinations have not been tested.

[^1]: To remain lightweight, no runtime type validation is applied, so non-typescript consumers will be reliant on underlying errors thrown, if used incorrectly.

## Supported Features

- 🔤 [Literal characters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Literal_character)
- 📋 [Character classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class) (`[abc]`, `[^abc]`, `[a-z]`)
- 🔣 [Character escapes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_escape) (`\n`, `\t`, `\x61`, `\u0061`, `\u{1F600}`)
- 🌐 [Unicode character class escape](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape) (`\p{Letter}`, `\P{Letter}`)
- 🔢 [Quantifiers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Quantifier) (`*`, `+`, `?`, `{n}`, `{n,}`, `{n,m}`)
- 🔀 [Disjunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Disjunction) (`a|b`)
- 👥 [Groups](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Capturing_group) (capturing and non-capturing) (`(?:abc)`, `(abc)`, `(?<named>abc)`)
- 👀 [Lookahead assertions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookahead_assertion) (`(?=...)`, `(?!...)`)
- 👈 [Lookbehind assertions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookbehind_assertion) (`(?<=...)`, `(?<!...)`)
- ⚓ [Anchors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Input_boundary_assertion) (`^`, `$`)
- 🏴 [Flags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags): `g`, `i`, `m`, `s`, `u`, `d`, `y` (See caveats for `y`)

## Unsupported Features

The following regex features are **not currently supported**:

- ⚠️ [Backreferences](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Backreference) (`\1`, `\k<name>`) - Can be included, but can't partially match. See [caveats](#caveats).
- ❌ [Unicode sets (`v` flag)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets) - ES2024+
- ❌ [Modifiers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Modifier) (`(?ims:...)`, `(?-ims:...)`) - ES2025+

## Browser Compatibility

The library is compiled to **ES5** for broad compatibility with older browsers and JavaScript environments. However, certain regular expression features naturally require ES2015+ support:

- [**Unicode escapes**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape) (`\u{...}`) - ES2015+
- [**Unicode property escapes**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape) (`\p{...}`, `\P{...}`) - ES2018+
- [**Lookbehind assertions**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookbehind_assertion) (`(?<=...)`, `(?<!...)`) - ES2018+
- [**Named capturing groups**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Named_capturing_group) (`(?<name>...)`) - ES2018+
- [**`s` (dotAll) flag**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/dotAll) - ES2018+
- [**`d` (hasIndices) flag**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/hasIndices) - ES2022+

## Caveats

### [`.test()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) behaviour and non-matching results from [`.exec()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) and [`.match()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)

The library produces an expression that always matches an empty string, at the end of the input.

Hence:

```js
/x/.test("a") === false; /* what you'd expect */
/(?:x|$)/.test("a") === true; /* what's produced by the library */
```

To mitigate, an start boundary anchor can prevent anything _but_ the empty string matching:

```js
/^(?:x|$)/.test("") === true;
/^(?:x|$)/.test("a") === false;
/^(?:x|$)/.test("x") === true;
```

On this basis, `.test()` should be used with caution, and a match of an empty string at the end of the input should instead be considered "no match".

i.e.

```js
/(?:x|$)/.exec("a"); // ['', index: 1, input: "a", groups: undefined];
"a".match(/(?:x|$)/); // ['', index: 1, input: "a", groups: undefined];
```

Since the library produces a native `RegExp` object, no attempt to proxy / translate this output to `null` has been attempted, but a helper could be produced in future, for clarity.

### Backreferences

**Backreferences cannot be partially matched because they are atomic.** A backreference like `\1` must match the complete captured text or fail entirely, and cannot be split into individual characters for partial matching like regular atoms can.

Fixed-length patterns like `/(abc)\1/` could theoretically become `/(?:(a)|$)(?:(b)|$)(?:(c)|$)(?:\1|$)(?:\2|$)(?:\3|$)/` (accepting polluted capture indexes as a side-effect), but this doesn't work for variable-length captures.

### Positive Lookbehinds

Whilst forming a match, a positive lookbehind must match in entirety, for the pattern to match. This is inherent in the concept of non-matching groups, since they are not match-worthy themselves, but just qualify matching atoms.

e.g.

```js
/(?<=foo)bar/;
```

"f" through "foo" is not a match, but "foob" is.

### Surrogate Pair Matching

In unicode-aware mode (`u` flag), **only whole astral characters are supported**. Partial matching of individual surrogate pairs is not supported. For example, `/😀/u` will match the complete emoji character, but not the first surrogate pair in isolation. Hence, if partially matching a byte stream, be sure to pipe via a [`TextDecoder`](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder) first.

### [Sticky](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky) Flag (`y`)

The **sticky flag may not behave as expected** in partial matching scenarios. The sticky flag requires matches to start at `lastIndex`, but a partial match failure resets `lastIndex` to 0. This means subsequent attempts cannot "continue" from where the previous match failed, making progressive character-by-character validation problematic.

**Example:**

```javascript
const pattern = /hello/y;
const partial = createPartialMatchRegex(pattern);

pattern.lastIndex = 0;
partial.test("h"); // succeeds, lastIndex advances
partial.test("he"); // succeeds, but lastIndex was reset by previous test
// Cannot reliably continue partial matching with sticky flag
```

**Recommendation:** Avoid using the `y` flag with partial matching unless you fully understand the implications.

### Global Flag (`g`)

The **global flag is preserved** but may not be necessary for partial matching use cases. The `g` flag affects behavior when using `.exec()` repeatedly to find all matches, but partial matching typically validates a single prefix at a time.

The global flag does not cause issues like the sticky flag, as partial patterns naturally match from the beginning of the input. However, if you're using `lastIndex` to track position, be aware that failed matches will reset it to 0.

## Examples

### Form Validation

```javascript
const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
const partial = createPartialMatchRegex(emailPattern);

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
const commandPattern = /^(help|quit|save|load)/;
const partial = createPartialMatchRegex(commandPattern);

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
const partial = createPartialMatchRegex(pattern);
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

### `createPartialMatchRegex(regex: RegExp): RegExp`

Transforms a regular expression to support partial matching.

Available via the default entry point of the package.

**Parameters:**

- `regex` - The regular expression to transform

**Returns:**

- A new `RegExp` that matches partial strings

### `RegExp.prototype.toPartialMatchRegex(): RegExp`

When using `import 'regex-partial-match/extend'`, this method is added to `RegExp.prototype`.

**Returns:**

- A new `RegExp` that matches partial strings, created from the `RegExp` instance the method was called on.

## License

ISC License - see [LICENSE](./LICENSE) file for details.

## Credits

Algorithm created by [Lucas Trzesniewski](https://github.com/ltrzesniewski).

## Contributing

Contributions are welcome! Please open an issue or pull request on [GitHub](https://github.com/TomStrepsil/regex-partial-match).

## Related packages

- [`incr-regex-package`](https://www.npmjs.com/package/incr-regex-package)
  - Incremental regex matcher
- [`dfa`](https://github.com/foliojs/dfa)
  - Compiles a regular expression like syntax to fast deterministic finite automata, which could be used to partial match?
- [`refa`](https://github.com/RunDevelopment/refa)
  - Can [convert regular expressions to an Abstract Syntax Tree](https://rundevelopment.github.io/refa/docs/latest/classes/JS.Parser.html), which might afford partial-match capability?
- [`Regex+`](https://www.npmjs.com/package/regex)
  - template literal, transforming native regular expressions
