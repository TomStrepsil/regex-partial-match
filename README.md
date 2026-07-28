# regex-partial-match

A zero-dependency regular expression transform for partial matching, enabling validation of incomplete input strings against regex patterns.

## 🧩 Problem statement

Unlike C/C++ (via [PCRE/PCRE2](https://www.pcre.org/original/doc/html/pcrepartial.html), [RE2](https://github.com/google/re2?tab=readme-ov-file#matching-interface), [Boost.Regex](https://www.boost.org/doc/libs/1_34_1/libs/regex/doc/partial_matches.html)), Python ([via third party regex module](https://pypi.org/project/regex/#:~:text=Added%20partial%20matches)) or Java (via [`hitEnd`](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#hitEnd--)), Javascript has no canonical / innate partial-matching for regular expressions.

## 📖 Overview

This library transforms regular expressions to best-effort support **partial matching**, allowing you to test if an incomplete string could potentially match the full pattern. This is particularly useful for real-time input validation, autocomplete systems, progressive form validation, stream chunk matching, etc.

As a side effect of the parse this requires, each `PartialMatchRegExp` also exposes a [`features`](#partialmatchregexpprototypefeatures-readonlysetregexfeature) set naming the syntactic constructs its pattern uses — useful for consumers that need to reason about a pattern without writing their own regex parser.  For many features, a simple search in the [source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/source) would be insufficient.

**Based on an algorithm created by [Lucas Trzesniewski](https://github.com/ltrzesniewski)**, re-created for NPM via ISC license, with permission.

## 📦 Installation

```bash
npm install regex-partial-match
```

## 🚀 Usage

### Basic Usage

```javascript
import PartialMatchRegExp from "regex-partial-match";

const pattern = /^hello world/;
const partial = new PartialMatchRegExp(pattern);

partial.test("h"); // true - could match
partial.test("hello"); // true - could match
partial.test("hello world"); // true - full match
partial.test("goodbye"); // false - cannot match
```

### Extending RegExp.prototype

```javascript
import "regex-partial-match/extend";

const partial = /^hello world/.toPartialMatchRegex();

partial.test("hel"); // true
```

## ⚙️ How It Works

The library transforms a regular expression by wrapping each [atomic element](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions#atoms) in a [non-capturing group](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Non-capturing_group) with a [disjunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Disjunction) to a true-end-of-input sentinel (`$(?![\s\S])`[^1]):

```javascript
/abc/ → /(?:a|$(?![\s\S]))(?:b|$(?![\s\S]))(?:c|$(?![\s\S]))/
```

This allows the pattern to match prefixes of the original pattern, enabling validation of incomplete input.

Since the library accepts only valid regular expressions [^2], this enables the algorithm to make lots of unguarded assumptions about the source of the expression.

The library has been stress-tested with various regular expression features in isolation, and some in likely combination, but obviously it's an unbounded test space, and syntactically valid regular expressions nevertheless support contradictory patterns e.g.

- `/\b\B/` - impossible to match both a word boundary and a non-word boundary
- `/$^/` - end cannot come before start
- `x{2}?` - lazy quantifiers are mutually exclusive to fixed-length assertions

Such combinations have not been tested.

> [!NOTE]
> See [Partial Match Parity](/docs/partial-match-parity.md) for full details on how the library compares to reference implementations

### Patterns with backreferences

Backreferences cannot be handled by the `|$(?![\s\S])` transform alone because they are atomic — `\1` must match the entire captured string or fail, and its length is only known at runtime. `PartialMatchRegExp` first tries a full match natively, as a short-circuit — if the input already satisfies the whole pattern, there's nothing further to do. Otherwise it runs a "capture scan": a variant of the pattern with each backreference swapped for a lazy `(?:[\s\S]*?)` wildcard, so the group it depends on can still capture against a partial input — matching anything, or nothing at all, without needing to already know the backreference's value. 

Whatever that scan captures (or leaves `undefined`, if the group hasn't been reached yet) is then used to build a fresh partial-matching regex for this specific input, expanding the backreference character-by-character from the captured value with the same per-atom transform as the rest of the pattern. See [docs/backreferences.md](./docs/backreferences.md) for the full algorithm, including the prefer-longer post-processing that preserves correct captures for groups inside quantifiers.


## ✅ Supported Features

- 🔤 [Literal characters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Literal_character)
- 🔣 [Character escapes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_escape) (`\n`, `\t`, `\x61`, `\u0061`, `\u{1F600}`)
- 🧩 [Character class escapes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class_escape): `/\w+/`, `/\d{3}/`
- 🌐 [Unicode character class escape](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape) (`\p{Letter}`, `\P{Letter}`)
- 📋 [Character classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class) (`[abc]`, `[^abc]`, `[a-z]`)
- 🧮 [Unicode sets (`v` flag)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets) (`/[\p{Lowercase}&&\p{Script=Greek}]/v`)
- 🔢 [Quantifiers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Quantifier) (`*`, `+`, `?`, `{n}`, `{n,}`, `{n,m}`)
- 🔀 [Disjunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Disjunction) (`a|b`)
- 👥 [Groups](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Capturing_group) (capturing and non-capturing) (`(?:abc)`, `(abc)`, `(?<named>abc)`)
- 🔙 [Backreferences](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Backreference) (`\1`, `\k<name>`) (See [caveats](#backreferences) for known limitations)
- 👉 [Lookahead assertions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookahead_assertion) (`(?=...)`, `(?!...)`)
- 👈 [Lookbehind assertions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookbehind_assertion) (`(?<=...)`, `(?<!...)`)
- ⚓ [Input Boundaries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Input_boundary_assertion) (`^`, `$`)
- 🆒 [Word Boundaries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Word_boundary_assertion) (`\b`, `\B`)
- 🏴 [Flags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags): `g`, `i`, `m`, `s`, `u`, `d`, `y` (See [caveats](#sticky-flag-y) for `y`)
- 🎚️ [Modifiers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Modifier) (`(?ims:...)`, `(?-ims:...)`, `(?im-s:...)`)

## 🚫 Unsupported Features

The following regex features are **not currently supported**:

- ⚠️ [Character class substrings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class#matching_strings) (`\q{abc}`) - When used independently, rather than to modify, can be included, but can't partially match. See [caveats](#caveats).

## 🌐 Browser Compatibility

The library is compiled to **ES2015** (ECMAScript 6). Certain regular expression features naturally require newer environments:

- [**Unicode property escapes**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape) (`\p{...}`, `\P{...}`) - ES2018+
- [**Lookbehind assertions**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookbehind_assertion) (`(?<=...)`, `(?<!...)`) - ES2018+
- [**Named capturing groups**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Named_capturing_group) (`(?<name>...)`) - ES2018+
- [**`s` (dotAll) flag**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/dotAll) - ES2018+
- [**`d` (hasIndices) flag**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/hasIndices) - ES2022+
- [**`v` (unicodeSets) flag**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets) - ES2024+
- [**Modifiers**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Modifier) (`(?ims:...)`, `(?-ims:...)`, `(?i-ms:...)`) - ES2025+

## ⚠️ Caveats

### [`.test()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) behaviour and non-matching results from [`.exec()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) and [`.match()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)

For unanchored patterns (no `^` and not using the `y` flag), the library produces an expression that always matches an empty string at the true end of the input — see [How It Works](#how-it-works). Feasibly, this is the start of a new partial match.

Hence:

```js
/x/.test("a") === false; /* untransformed regex */
/(?:x|$(?![\s\S]))/.test("a") === true; /* new PartialMatchRegExp(/x/), internally */
```

To mitigate, a start anchor (`^`) can prevent the engine from scanning forward to match the empty-string fallback at the end of the input:

```js
/* new PartialMatchRegExp(/^x/) matches as if it were /^(?:x|$(?![\s\S]))/ */
/^(?:x|$(?![\s\S]))/.test("") === true;
/^(?:x|$(?![\s\S]))/.test("x") === true;
/^(?:x|$(?![\s\S]))/.test("a") === false;
```

> [!CAUTION]
> In [multiline mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/multiline), `^` still matches at the start of the string and immediately after each `\n`, so the transformed regex can attempt the empty-string fallback at the start of any line — but, since the fallback requires strict end-of-input, it only succeeds if that line start is *also* genuinely where the input ends:
>
> ```js
> /^(?:x|$(?![\s\S]))/m.test("x") === true;
> /^(?:x|$(?![\s\S]))/m.test("a\n") === true;  /* '^' matches after '\n', and input truly ends there */
> /^(?:x|$(?![\s\S]))/m.test("a\nb") === false; /* '^' matches after '\n', but "b" remains — not genuine end-of-input */
> ```

The [`y` flag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky) prevents matching ahead from the [`lastIndex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex) (defaulting to `0` for a new `RegExp`):

```js
/(?:x|$(?![\s\S]))/y.test("x") === true;
/(?:x|$(?![\s\S]))/y.test("a") === false;
```

> [!CAUTION]
> See [caveats](#sticky-flag-y) re: resetting `lastIndex` when incrementally matching

On this basis, `.test()` should be used with caution, and a match of an empty string at the true end of the input should instead be considered "no match", if validating that which came before.

e.g.

```js
/(?:x|$(?![\s\S]))/.exec("a"); // ['', index: 1, input: "a", groups: undefined];
"a".match(/(?:x|$(?![\s\S]))/); // ['', index: 1, input: "a", groups: undefined];
```

> [!NOTE]
> A more ergonomic `test()` / `exec()` output [was explored](https://github.com/TomStrepsil/regex-partial-match/pull/51), but proved a complex problem space.

### Backreferences

`PartialMatchRegExp` supports partial matching of backreferences (`\1`, `\k<name>`) — see [Patterns with backreferences](#patterns-with-backreferences) above and [docs/backreferences.md](./docs/backreferences.md) for the algorithm. A backreference is inherently atomic — `\1` must match the complete captured text or fail — but the library resolves what each group captured from a partial input and expands the backreference into per-character partial form so matching can still proceed character-by-character in the common case.

The following cases remain atomic (full native value or exactly at true end of input, no mid-value partial matching):

- **Backreferences inside lookbehinds and negative lookarounds.** These are verbatim contexts — the value a lookbehind or negative lookahead requires must be fully present or fully absent, so there's no partial-prefix position to expand into.
- **`\k<name>` with no named capturing groups in the pattern.** [Annex B](https://tc39.es/ecma262/#sec-regular-expressions-patterns) tolerates this as the literal characters `k<a>`, but it's still treated as if it were a named backreference and matched atomically — `"k"` and `"k<"` will not partially match. A `\k` not immediately followed by a well-formed `<name>` reference is treated as the literal `k` and partially matches as usual.
- **A backreference whose captured value can't be determined from a partial input.** This only affects the backreference site itself; it's strictly better than rejecting the input outright, and never accepts anything unsound.

#### Prefix-ambiguous top-level alternation

When a pattern uses top-level alternation where one branch is a strict prefix of another (e.g. `^(ab)\1|^(abc)\2`), the internal capture scan may select the shorter branch — because it uses `(?:[\s\S]*?)` which accepts zero characters — causing the final partial regex to fail for inputs that are valid prefixes of the longer branch. In such cases `exec` returns `null` even though the input is a valid partial match:

```javascript
const partial = new PartialMatchRegExp(/^(ab)\1|^(abc)\2/);

partial.test("abca"); // false — but "abca" is a valid prefix of "abcabc" via the second branch
```

> [!TIP]
> If alternate branches share a prefix, list the longer one first. The capture scan tries branches in order and stops at the first that accepts the partial input, so putting the longer branch first ensures it's the one selected:
>
> ```javascript
> const partial = new PartialMatchRegExp(/^(abc)\2|^(ab)\1/);
>
> partial.test("abca"); // true
> ```

See [docs/backreferences.md](./docs/backreferences.md) for why this happens (the internal capture scan resolving the wrong alternative first).

[^1]: 
  A bare `$` alone isn't sufficient here: under the `m` (multiline) flag — including one turned on locally via a `(?m:...)` [modifier](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Modifier) — `$` also matches immediately before *any* line terminator, not just the true end of input. That would let a `"\n"` the source pattern never allowed for be silently accepted as if the input had simply run out, e.g. `new PartialMatchRegExp(/^foobar/m)` would wrongly accept `"foo\nbaz"`. Appending `(?![\s\S])` narrows the disjunction down to strict end-of-input, regardless of multiline state.

  See [chromium issue 536420076](https://issues.chromium.org/u/2/issues/536420076) for the underlying V8 bug that requires `$` to precede `(?![\s\S])` rather than using the lookahead alone.

  A shorter option, `(?-m:$)` — disabling multiline locally so `$` means strict end-of-input on its own — also sidesteps the bug and saves a few bytes per atom. However, modifier groups are new enough that support isn't universal, and feature-detecting them would add a fallback branch the test suite can't exercise honestly, since every engine that can realistically be tested against already supports them.

[^2]: 
  To remain lightweight, no runtime type validation is applied, so non-TypeScript consumers will be reliant on underlying errors thrown if used incorrectly.

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
partial.test("xyhel"); // true  — partial prefix "hel" at position 2
```

**Limitation — progressive input validation:** Because a successful match advances `lastIndex`, testing a sequence of growing strings against the same instance does not work as expected:

```javascript
const partial = new PartialMatchRegExp(/hello/y);

partial.test("h");   // true,  lastIndex → 1
partial.test("he");  // false — sticky requires a match at position 1 of "he",
                     //         but "e" is not a valid start of the pattern
partial.test("hel"); // true (lastIndex was reset to 0 by the previous failure)
```

There is no way to distinguish "scanning forward in the same string" from "testing a new, longer string", so this cannot be fixed in code. For progressive input validation, use a regex **without** the `y` flag and always test against the full input so far.

The `gy` flag combination is also fully supported: `exec()`/`test()` behave as sticky, while `match()`, `matchAll()`, `replace()`, and `replaceAll()` iterate via `exec()` as global — matching [the language specification](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky).

### "String properties"

As with surrogate pair matching, grapheme clusters / string properties can only match atomically.

Hence, `[\p{RGI_Emoji_Flag_Sequence}]` will match `🇺🇳` as a whole, but not as the individual code points of which it's comprised.

In [`v` mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets) expressions, where `[\q{abc}]` syntax is used in isolation (rather than its canonical use-case as a subtraction/intersection of another character class), this will also only match entirely or not at all. i.e. `abc` can match, but not partially.

## 💡 Examples

### Form Validation

```javascript
import PartialMatchRegExp from "regex-partial-match";

const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
const partial = new PartialMatchRegExp(emailPattern);

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

const commandPattern = /^(help|quit|save|load)/;
const partial = new PartialMatchRegExp(commandPattern);

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
import PartialMatchRegExp from "regex-partial-match";

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

## 🔌 API

### `new PartialMatchRegExp(pattern: RegExp | string, flags?: string)`

Extends `RegExp`. An instance behaves like a normal `RegExp` — `instanceof RegExp` is `true`, and `.test()`, `.exec()`, `.match()`, `.matchAll()`, `.replace()`, etc. all work as expected — but also matches any input string that is a valid prefix of the original pattern, in addition to full matches.

Available via the default entry point of the package.

**Parameters:**

- `pattern` - A `RegExp` instance, or a pattern source string (as accepted by the `RegExp` constructor)
- `flags` - A flags string, used only when `pattern` is a string (as accepted by the `RegExp` constructor)

**Returns:**

- A `PartialMatchRegExp` instance that matches partial strings of the original pattern

### `RegExp.prototype.toPartialMatchRegex(): PartialMatchRegExp`

When using `import 'regex-partial-match/extend'`, this method is added to `RegExp.prototype`.

**Returns:**

- A new `PartialMatchRegExp` that matches partial strings, created from the `RegExp` instance the method was called on.

### `PartialMatchRegExp.prototype.features: ReadonlySet<RegexFeature>`

Building the partial-match regex requires walking the entire source pattern once. As a side effect of that same walk, each instance records which syntactic constructs its pattern actually uses, exposed as a `features` set — no separate scan of the source is performed to produce it.

This is useful for consumers building on top of `PartialMatchRegExp` who need to reason about which constructs a *specific* pattern uses, without writing their own regex parser to find out. Two concrete cases:

- **Flagging patterns likely to hit one of the [caveats](#caveats) documented above.** For example, a pattern combining `backreference` with `lookbehind`, `negativeLookahead`, or `negativeLookbehind` is a candidate for the [atomic-backreference caveat](#backreferences); one combining `backreference` with `disjunction` is a candidate for the [prefix-ambiguous top-level alternation caveat](#prefix-ambiguous-top-level-alternation). A consumer accepting user-supplied patterns can surface a warning instead of letting the edge case surprise someone later.
- **Restricting which constructs a product surface allows.** e.g. a system that only wants to accept "simple" patterns (no lookaround, no backreferences) from untrusted input can check `features` against an allow-list and reject the rest, without needing to hand-roll that check against the raw pattern source.

```javascript
import PartialMatchRegExp from "regex-partial-match";

const partial = new PartialMatchRegExp(/^[a-z]+(?<domain>\.[a-z]+)\1/);

partial.features; // Set { "startAnchor", "characterClass", "quantifier", "namedGroup", "capturingGroup", "backreference" }
partial.features.has("backreference"); // true
```

`RegexFeature` is a string union, exported alongside `PartialMatchRegExp`:

| Feature                    | Matches                                                | Notes                                                                          |
| --------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `patternCharacter`          | An ordinary literal character                          |                                                                                 |
| `startAnchor`                | Top-level `^`                                           |                                                                                 |
| `endAnchor`                  | Top-level `$`                                           |                                                                                 |
| `wordBoundary`               | Top-level `\b`                                          |                                                                                 |
| `nonWordBoundary`            | Top-level `\B`                                          |                                                                                 |
| `lookahead`                  | `(?=...)`                                               |                                                                                 |
| `negativeLookahead`          | `(?!...)`                                               |                                                                                 |
| `lookbehind`                 | `(?<=...)`                                              |                                                                                 |
| `negativeLookbehind`         | `(?<!...)`                                              |                                                                                 |
| `backreference`              | `\1`                                                     |                                                                                 |
| `namedBackreference`         | `\k<name>`                                              |                                                                                 |
| `namedGroup`                 | `(?<name>...)`                                          | Always accompanied by `capturingGroup` — see below                            |
| `capturingGroup`             | `(...)`, including named groups                        |                                                                                 |
| `nonCapturingGroup`          | `(?:...)`                                               |                                                                                 |
| `modifierGroup`              | `(?ims:...)`                                            |                                                                                 |
| `modifierGroupWithRemoval`   | `(?ims-ims:...)`                                        | Mutually exclusive with `modifierGroup`                                       |
| `characterClass`             | `[...]`                                                 |                                                                                 |
| `nestedCharacterClass`       | `[...[...]...]`                                         | `v` flag only                                                                  |
| `classIntersection`          | `&&` inside a character class                          | `v` flag only                                                                  |
| `classSubtraction`           | `--` inside a character class                          | `v` flag only                                                                  |
| `disjunction`                | `\|`                                                    |                                                                                 |
| `quantifier`                 | `*`, `+`, `?`, `{n}`, `{n,}`, `{n,m}`                    |                                                                                 |
| `unicodePropertyEscape`      | `\p{...}`, `\P{...}`                                    | `u`/`v` flag only — otherwise tagged `otherEscape`                            |
| `characterClassEscape`       | `\d`, `\D`, `\w`, `\W`, `\s`, `\S`                       |                                                                                 |
| `controlEscape`               | `\f`, `\n`, `\r`, `\t`, `\v`                             |                                                                                 |
| `controlLetterEscape`        | `\cX`                                                   |                                                                                 |
| `hexEscapeSequence`          | `\xXX`                                                  |                                                                                 |
| `unicodeEscapeSequence`      | `\uXXXX`, `\u{...}`                                     |                                                                                 |
| `otherEscape`                 | Any other `\X`, e.g. `\.`, `\0`                         |                                                                                 |

Two things worth knowing about how these tags line up with the grammar:

- **One ECMA-262 production can map to several tags.** `Assertion` alone covers `^`, `$`, `\b`, `\B`, and all four lookarounds — `features` splits it by whichever discriminant is easiest to read off during the walk (`^` vs `$`, `=` vs `!` after `(?<`, etc.), since that information is free at the point each construct is recognized.
- **A named capturing group always carries both `namedGroup` and `capturingGroup`.** The grammar treats a capturing group with a name and one without as the same production (`( GroupSpecifier? Disjunction )`), not two, so both tags are added together.

## 📜 License

ISC License - see [LICENSE](./LICENSE) file for details.

## 🙌 Credits

Algorithm created by [Lucas Trzesniewski](https://github.com/ltrzesniewski).

## 🤝 Contributing

Contributions are welcome! Please open an issue or pull request on [GitHub](https://github.com/TomStrepsil/regex-partial-match).

## 🔗 Related projects

| Project                                                                                     | Description                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`incr-regex-package`](https://www.npmjs.com/package/incr-regex-package)                    | Incremental regex matcher                                                                                                                                                            |
| [`dfa`](https://github.com/foliojs/dfa)                                                     | Compiles a regular expression like syntax to fast deterministic finite automata, which could be used to partial match?                                                               |
| [`refa`](https://github.com/RunDevelopment/refa)                                            | Can [convert regular expressions to an Abstract Syntax Tree](https://rundevelopment.github.io/refa/docs/latest/classes/JS.Parser.html), which might afford partial-match capability? |
| [`@eslint-community/regexpp`](https://github.com/eslint-community/regexpp)                  | A regular expression parser for ECMAScript with AST generation and visitor implementation                                                                                            |
| [`Regex+`](https://www.npmjs.com/package/regex)                                             | template literal, transforming native regular expressions                                                                                                                            |
| [`Awesome Regex`](https://github.com/slevithan/awesome-regex)                               | Curated list of tools, tutorials, libraries, and other resources, covering all major regex flavours                                                                                  |
| [`replace-content-transformer`](https://github.com/TomStrepsil/replace-content-transformer) | A toolkit for stream content replacement, underpinned by `regex-partial-match`                                                                                                       |
