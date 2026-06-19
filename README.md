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

- [**Unicode escapes**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape) (`\u{...}`)
- [**Unicode property escapes**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape) (`\p{...}`, `\P{...}`) - ES2018+
- [**Lookbehind assertions**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookbehind_assertion) (`(?<=...)`, `(?<!...)`) - ES2018+
- [**Named capturing groups**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Named_capturing_group) (`(?<name>...)`) - ES2018+
- [**`s` (dotAll) flag**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/dotAll) - ES2018+
- [**`d` (hasIndices) flag**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/hasIndices) - ES2022+
- [**`v` (unicodeSets) flag**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets) - ES2024+
- [**Modifiers**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Modifier) (`(?ims:...)`, `(?-ims:...)`, `(?i-ms:...)`) - ES2025+

## Caveats

### [`.test()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) and empty-input behaviour

The partial transform produces a pattern that can match an empty string at the end of input (via the `|$` sentinel). `PartialMatchRegExp` suppresses these sentinel matches — but only when the original pattern would not itself match at that position. This means:

- inputs that the pattern genuinely matches (including patterns that match at end-of-input like `/$/`) return `true`
- inputs where the sentinel fired only because the pattern ran off the end return `false`

```js
const re = new PartialMatchRegExp(/^foo/);
re.test("bar"); // false — cannot match
re.test("fo");  // true  — valid prefix
re.test("foo"); // true  — full match
re.test("");    // false — pattern does not accept empty string

new PartialMatchRegExp(/$/).test("abc"); // true — $ genuinely matches end-of-input
```

`test("")` reflects whether the original pattern matches the empty string. Patterns like `/^a*/` or `/^$/` do accept `""`, so `test("")` returns `true` for those. Patterns that require at least one character return `false`.

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

The **sticky flag may not behave as expected** in partial matching scenarios. The sticky flag requires matches to start at `lastIndex`, but a partial match failure resets `lastIndex` to 0. This means subsequent attempts cannot "continue" from where the previous match failed, making progressive character-by-character validation problematic.

**Example:**

```javascript
import PartialMatchRegExp from "regex-partial-match";

const partial = new PartialMatchRegExp(/hello/y);

partial.lastIndex = 0;
partial.test("h"); // succeeds, lastIndex advances
partial.test("he"); // succeeds, but lastIndex was reset by previous test
// Cannot reliably continue partial matching with sticky flag
```

**Recommendation:** Avoid using the `y` flag with partial matching unless you fully understand the implications.

### Global Flag (`g`)

The **global flag is preserved** but may not be necessary for partial matching use cases. The `g` flag affects behaviour when using `.exec()` repeatedly to find all matches, but partial matching typically validates a single prefix at a time.

The global flag does not cause issues like the sticky flag, as partial patterns naturally match from the beginning of the input. However, if you're using `lastIndex` to track position, be aware that failed matches will reset it to 0.

### "String properties"

As with surrogate pair matching, grapheme clusters / string properties can only match atomically.

Hence, `[\p{RGI_Emoji_Flag_Sequence}]` will match `🇺🇳` as a whole, but not as the individual code points of which it's comprised.

In [`v` mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets) expressions, where `[\q{abc}]` syntax is used in isolation (rather than its canonical use-case as a subtraction/intersection of another character class), this will also only match entirely or not at all. i.e. `abc` can match, but not partially.

## Examples

### Form Validation

```javascript
import PartialMatchRegExp from "regex-partial-match";

const partial = new PartialMatchRegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i);

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

## Compatibility with other partial-match implementations

Several widely-used regex libraries offer native partial-match support. This section maps their concepts and test cases to this library's behaviour.

> **Provenance note:** The parity tests added in `src/createPartialMatchRegex.test.ts` ("parity with reference implementations") vary in how directly they reflect each source:
> - **JDK** — test cases are explicit: the `hitEndTest`, `caretAtEndTest`, and `wordSearchTest` methods in `RegExTest.java` name specific patterns and inputs (e.g. `/^squidattack/` on `"squid"` / `"squack"`, `/^x?/m` on `"\r"`, `/\b/` on `"word1 word2 word3"`), which are reproduced directly.
> - **Lucene** — test cases are derived: `TestRegExp.java` describes what each test method exercises (patterns like `[^y]*{1,2}`, `"(a)|".repeat(50000)`, and character sets σ/Σ/ῼ/ﬗ), but the specific assertions in the test suite here are our own translations of those properties.
> - **RE2** — test cases are conceptual only: `tester.cc` and `exhaustive_tester.cc` implement a parametric consistency framework (NFA/DFA/backtracking agreement), not a fixed set of `(pattern, input, expected)` tuples. The RE2 rows below document semantic alignment rather than quoting specific test cases.

### Apache Lucene (`TestRegExp.java`)

Lucene implements partial matching via a deterministic finite automaton (DFA). Parity tests are **derived** from the described behaviour of each test method — not direct quotations of Lucene assertions.

Lucene's automaton-based regex dialect **cannot express backreferences** (finite automata cannot represent them). `TestRegExp.java` contains no backreference tests.

| Lucene test method | Property tested | This library |
|---|---|---|
| `testSmoke` | Basic grouping — `a(b+|c+)d` matches `abbbbbd`, `acd`; rejects `ad` | ✅ Covered — quantifiers, groups, disjunctions |
| `testUnicodeAsciiInsensitiveFlags` | Unicode case folding — `σ`/`Σ`, `ῼ`, `ﬗ` | ✅ Covered — `i` + `u` flags delegate to JS Unicode case folding |
| `testRepeatWithEmptyString` | Quantifiers over empty-matching sub-expressions — `[^y]*{1,2}` | ✅ Covered — `a*suffix`, `a?suffix`, `^[^y]*suffix` |
| `testRegExpNoStackOverflow` | Deep nesting / stack safety — `(a)|` × 50 000 | ✅ Covered — wide alternation (× 1 000) and deeply nested groups (depth 100) |
| `testCoreJavaParity` | 2 000 random expressions validated against `java.util.regex.Pattern` | ✅ Covered structurally — every prefix of every pattern is tested |
| Backreferences | Not in scope — unsupported by the automaton dialect | See `PartialMatchRegExp` below |

### Google RE2 (`tester.cc`, `exhaustive_tester.cc`)

RE2 exposes partial matching via `UNANCHORED` mode (match anywhere in the string) versus `ANCHOR_BOTH` (full-string match). `tester.cc` and `exhaustive_tester.cc` implement a parametric testing framework that validates NFA, DFA, and backtracking engines against each other across exhaustively-generated patterns — there are **no fixed `(pattern, input, expected)` test cases to quote**. Parity is therefore assessed **conceptually** against RE2's semantics.

RE2 **explicitly excludes backreferences by design**. From `re2.h`: *"backreferences and generalized assertions are not available"*. This is a deliberate trade-off to guarantee linear-time matching; there are therefore no backreference tests anywhere in RE2's test suite.

| RE2 concept | This library |
|---|---|
| `UNANCHORED` — match substring anywhere | ✅ Use the pattern without `^`/`$` anchors |
| `ANCHOR_START` — match from beginning | ✅ Use `^` anchor |
| `ANCHOR_BOTH` — full-string match | ✅ Use `^…$` anchors |
| First-match (NFA) vs longest-match (POSIX) semantics | ✅ ECMAScript / NFA first-match — `(a\|aa)\1` on `"aaaa"` yields `m[1]="a"`, not `"aa"` |
| Capturing groups across anchoring modes | ✅ Covered — see groups tests |
| Backreferences | Not in scope — excluded by design | See `PartialMatchRegExp` below |
| Multi-engine consistency | N/A — JS has a single engine per runtime |

### OpenJDK (`java.util.regex` — `RegExTest.java`)

Java expresses partial matching through `Matcher.hitEnd()`, `Matcher.lookingAt()`, and `Matcher.find()`. Parity tests are **explicit**: the specific patterns and strings below are taken directly from named test methods in `RegExTest.java`.

The JDK **does** support backreferences, and `RegExTest.java` includes `backRefTest()` (~line 2520) and `ciBackRefTest()` (~line 2568) for numeric backreferences with `find()`. However, **neither method combines backreferences with `hitEnd()` or any other partial-match concept** — they test full-match correctness only. There are no JDK tests for the behaviour of `hitEnd()` on patterns containing backreferences.

| JDK test method / concept | Specific case | This library equivalent |
|---|---|---|
| `hitEndTest` (lines 545–588) | `/^squidattack/` on `"squid"` → `hitEnd=true` | `exec("squid")[0] === "squid"` (non-empty = prefix found) |
| `hitEndTest` | `/^squidattack/` on `"squack"` → `hitEnd=false` | `exec("squack") === null` (anchored, diverges early) |
| `hitEndTest` | `/^abc/` on `"ab"` → `hitEnd=true` | `exec("ab")[0] === "ab"` |
| `hitEndTest` | `/^abc/` on `"ad"` → `hitEnd=false` | `exec("ad") === null` |
| `hitEndTest` | `/catattack/` on `"attackattackattackcatatta"` → `hitEnd=true` | `exec(...)[0] !== ""` |
| `caretAtEndTest` (lines 506–513) | `/^x?/m` on `"\r"` — successive `find()` calls | First match at index 0; second (after manual `lastIndex++`) at index 1 |
| `wordSearchTest` (lines 483–503) | `/\b/` on `"word1 word2 word3"` with progressive `find(pos)` | `\bwor` with `g` flag and progressive `lastIndex` — finds matches at 0, 6, 12 |
| `backRefTest` (~line 2520) | `(a*)bc\1`, `(abc)(def)\1` — full match via `find()` | Full match only; no partial-match equivalent in the JDK test |
| `ciBackRefTest` (~line 2568) | Same patterns with `(?i)` case-insensitive flag | Full match only; no partial-match equivalent in the JDK test |
| `Matcher.hitEnd()` | Semantic: did the engine exhaust input? | `exec(input)[0] !== ""` — non-empty result means valid prefix |
| `Matcher.lookingAt()` | Prefix match from start | `exec` with `^` anchor |
| `Matcher.matches()` | Full-string match | `exec` with `^…$` anchors |
| `Matcher.find()` | Next substring match | `exec` on a `g`-flagged regex, advancing `lastIndex` |
| `Matcher.find(pos)` | Match from a given position | Set `lastIndex` before calling `exec` |
| `Matcher.requireEnd()` | More input could invalidate a current match | No direct equivalent; patterns ending with `$` or `\b` exhibit this — not explicitly exposed |

### Summary

| Feature | Lucene | RE2 | JDK | This library |
|---|:---:|:---:|:---:|:---:|
| Literal prefix matching | ✅ | ✅ | ✅ | ✅ |
| Character classes | ✅ | ✅ | ✅ | ✅ |
| Quantifiers (including zero-match) | ✅ | ✅ | ✅ | ✅ |
| Disjunctions | ✅ | ✅ | ✅ | ✅ |
| Groups (capturing, non-capturing, named) | ✅ | ✅ | ✅ | ✅ |
| Lookahead / lookbehind | — | ✅ | ✅ | ✅ |
| Unicode case folding | ✅ | ✅ | ✅ | ✅ (`i`+`u` flags) |
| Deep nesting / stack safety | ✅ | ✅ | ✅ | ✅ |
| Anchored full match | ✅ | ✅ | ✅ (`matches()`) | ✅ (`^…$`) |
| Unanchored substring match | ✅ | ✅ | ✅ (`find()`) | ✅ (no anchor) |
| hitEnd() / prefix-only match | — | — | ✅ | ✅ (non-empty exec result) |
| requireEnd() | — | — | ✅ | ⚠️ Not exposed |
| Backreference partial matching | ❌ unsupported dialect | ❌ excluded by design | ⚠️ full match only (`backRefTest`) | ✅ (`PartialMatchRegExp` class) |
| Multi-engine consistency | — | ✅ | — | N/A |

## Related projects

| Project                                                                                     | Description                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`incr-regex-package`](https://www.npmjs.com/package/incr-regex-package)                    | Incremental regex matcher                                                                                                                                                            |
| [`dfa`](https://github.com/foliojs/dfa)                                                     | Compiles a regular expression like syntax to fast deterministic finite automata, which could be used to partial match?                                                               |
| [`refa`](https://github.com/RunDevelopment/refa)                                            | Can [convert regular expressions to an Abstract Syntax Tree](https://rundevelopment.github.io/refa/docs/latest/classes/JS.Parser.html), which might afford partial-match capability? |
| [`@eslint-community/regexpp`](https://github.com/eslint-community/regexpp)                  | A regular expression parser for ECMAScript with AST generation and visitor implementation                                                                                            |
| [`Regex+`](https://www.npmjs.com/package/regex)                                             | template literal, transforming native regular expressions                                                                                                                            |
| [`Awesome Regex`](https://github.com/slevithan/awesome-regex)                               | Curated list of tools, tutorials, libraries, and other resources, covering all major regex flavours                                                                                  |
| [`replace-content-transformer`](https://github.com/TomStrepsil/replace-content-transformer) | A toolkit for stream content replacement, underpinned by `regex-partial-match`                                                                                                                                                                                 |
