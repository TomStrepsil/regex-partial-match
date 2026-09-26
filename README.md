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

### Telling a settled match from one still reading

`test()` and `exec()` answer "could this match?", which is `true` for a prefix and for a complete match alike. [`hitEnd()`](#hitendpartial-partialmatchregexp-match-regexpexecarray-boolean) reports whether the engine reached the end of the input while producing the match, so more input could still change it [^1]. Testing the original pattern instead doesn't answer that [^2]. Together they give progressive validation its three states:

```javascript
import PartialMatchRegExp, { hitEnd } from "regex-partial-match";

const partial = new PartialMatchRegExp(/^\d{4}-\d{2}-\d{2}/);

function state(input) {
  const match = partial.exec(input);

  if (match === null) return "invalid";
  return hitEnd(partial, match) ? "incomplete" : "complete";
}

state("20xx"); // 'invalid'    - reject
state("2024"); // 'incomplete' - no error, keep typing
state("2024-06"); // 'incomplete' - no error, keep typing
state("2024-06-15"); // 'complete'   - accept, enable submit
```

> [!NOTE]
> `hitEnd()` answers "could more input change this match?", not "is this text a match?". `/hello \w+/` matches `"hello world"` in full, and `hitEnd()` is still `true`: `\w+` read the end of the input looking for more. For an exact-length pattern like the date above the two questions coincide, which is what makes the three states work; a validator for an open-ended pattern that wants "valid so far" should test the original pattern as well.

[^1]: 
    Mimicking JDK's [`Matcher.hitEnd()`](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#hitEnd--)

[^2]:
    Testing the original, untransformed pattern looks like it should answer this — "did the input fully satisfy the original pattern?" — but it asks a different question: whether the original matches *at all* here, not whether *this* match reached the end of the input on its way. The two agree almost always, but a read of the end inside a zero-width assertion can make both return an identical result by different paths. See [Why the question can't be answered from the outside](https://github.com/TomStrepsil/regex-partial-match/blob/main/docs/how-it-works.md#why-the-question-cant-be-answered-from-the-outside) for the case where they diverge.

### A note on Tree-Shaking

If your environment doesn't tree-shake (e.g. Deno, or unbundled Node) and you have no use for `hitEnd`, import `PartialMatchRegExp` from its own subpath instead of the default entry, to avoid pulling in `hitEnd`'s code:

```javascript
import PartialMatchRegExp from "regex-partial-match/partialMatchRegExp";
```

### Extending RegExp.prototype

```javascript
import "regex-partial-match/extend";

const partial = /^hello world/.toPartialMatchRegex();

partial.test("hel"); // true
```

## ⚙️ How It Works

The library wraps each [atomic element](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions#atoms) in a non-capturing group with a disjunction to the true end of the input, so the pattern matches any prefix of what the original would match:

```javascript
/abc/ → /(?:a|$(?![\s\S]))(?:b|$(?![\s\S]))(?:c|$(?![\s\S]))/
```

See [How It Works](./docs/how-it-works.md) for the full transform, where it over-accepts, how `^` is handled in groups and under the `m` flag, and how backreferences are matched.

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
- 🔙 [Backreferences](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Backreference) (`\1`, `\k<name>`) (See [caveats](./docs/caveats.md#backreferences) for known limitations)
- 👉 [Lookahead assertions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookahead_assertion) (`(?=...)`, `(?!...)`)
- 👈 [Lookbehind assertions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookbehind_assertion) (`(?<=...)`, `(?<!...)`)
- ⚓ [Input Boundaries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Input_boundary_assertion) (`^`, `$`)
- 🆒 [Word Boundaries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Word_boundary_assertion) (`\b`, `\B`)
- 🏴 [Flags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags): `g`, `i`, `m`, `s`, `u`, `d`, `y` (See [caveats](./docs/caveats.md#sticky-flag-y) for `y`)
- 🎚️ [Modifiers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Modifier) (`(?ims:...)`, `(?-ims:...)`, `(?im-s:...)`)

## 🚫 Unsupported Features

The following regex features are **not currently supported**:

- ⚠️ [Character class substrings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class#matching_strings) (`\q{abc}`) - When used independently, rather than to modify, can be included, but can't partially match. See [caveats](./docs/caveats.md#string-properties).

## 🌐 Browser Compatibility

The library is compiled to **ES2015** (ECMAScript 6). Certain regular expression features naturally require newer environments:

- [**Unicode property escapes**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape) (`\p{...}`, `\P{...}`) - ES2018+
- [**Lookbehind assertions**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookbehind_assertion) (`(?<=...)`, `(?<!...)`) - ES2018+
- [**Named capturing groups**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Named_capturing_group) (`(?<name>...)`) - ES2018+
- [**`s` (dotAll) flag**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/dotAll) - ES2018+
- [**`d` (hasIndices) flag**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/hasIndices) - ES2022+
- [**`v` (unicodeSets) flag**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets) - ES2024+
- [**Modifiers**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Modifier) (`(?ims:...)`, `(?-ims:...)`, `(?i-ms:...)`) - ES2025+

Each of these applies only when the *original* pattern uses the feature — everything else, including construction, `exec()` and `test()`, holds to the ES2015 floor. [`hitEnd()`](#hitendpartial-partialmatchregexp-match-regexpexecarray-boolean) is the one exception: it always requires **ES2018+**, regardless of the pattern, since its internal probe uses named capturing groups.

## ⚠️ Caveats

See [Caveats](./docs/caveats.md) for details, examples and workarounds.

- [**`.test()` and empty matches at the end of the input**](./docs/caveats.md#test-behaviour-and-non-matching-results-from-exec-and-match): an unanchored pattern always matches `""` at the end of the input; anchor with `^`, or ask [`hitEnd()`](#hitendpartial-partialmatchregexp-match-regexpexecarray-boolean)
- [**Backreferences**](./docs/caveats.md#backreferences): some backreferences stay atomic
  - [Captures on a partial match](./docs/caveats.md#captures-on-a-partial-match)
  - [Prefix-ambiguous top-level alternation](./docs/caveats.md#prefix-ambiguous-top-level-alternation)
- [**Positive lookbehinds**](./docs/caveats.md#positive-lookbehinds): must match in their entirety
- [**Surrogate pair matching**](./docs/caveats.md#surrogate-pair-matching): only whole astral characters match
- [**Sticky flag (`y`)**](./docs/caveats.md#sticky-flag-y): not suited to progressive input validation
- [**"String properties"**](./docs/caveats.md#string-properties): match atomically

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

Extends `RegExp`. An instance behaves like a normal `RegExp`; `instanceof RegExp` is `true`, and `.test()`, `.exec()`, `.match()`, `.matchAll()`, `.replace()` etc. all work as expected, but also matches any input string that is a valid prefix of the original pattern, in addition to full matches.

Available via the default entry point of the package, or via `regex-partial-match/partialMatchRegExp`; see [A note on Tree-Shaking](#a-note-on-tree-shaking).

**Parameters:**

- `pattern` - A `RegExp` instance, or a pattern source string (as accepted by the `RegExp` constructor)
- `flags` - A flags string, used only when `pattern` is a string (as accepted by the `RegExp` constructor)

**Returns:**

- A `PartialMatchRegExp` instance that matches partial strings of the original pattern

### `RegExp.prototype.toPartialMatchRegex(): PartialMatchRegExp`

When using `import 'regex-partial-match/extend'`, this method is added to `RegExp.prototype`.

**Returns:**

- A new `PartialMatchRegExp` that matches partial strings, created from the `RegExp` instance the method was called on.

### `hitEnd(partial: PartialMatchRegExp, match: RegExpExecArray): boolean`

Reports whether the engine **reached the end of the input** while producing `match`, so that more input could change it — the contract of the JDK's [`Matcher.hitEnd()`](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#hitEnd--): when it returns `false`, no continuation of the input changes the match's index or text. `exec()` alone cannot say: it returns the same shape of array for `"h"`, `"hello"` and `"hello world"` against `/hello world/`.

Available as a named export of the default entry point: `import { hitEnd } from 'regex-partial-match'`. Its probe requires ES2018+, so in an environment that doesn't tree-shake and has no use for it, import `PartialMatchRegExp` from `regex-partial-match/partialMatchRegExp` instead of the default entry to avoid bundling `hitEnd`'s code; see [A note on Tree-Shaking](#a-note-on-tree-shaking).

**Parameters:**

- `partial` - The `PartialMatchRegExp` instance that produced `match`
- `match` - A match returned by `partial.exec()`

**Returns:**

- `true` when the match read the end of the input: an atom ran out of input and took one of the `|$(?![\s\S])` branches described in [How It Works](#how-it-works); a greedy quantifier stopped at the end because there was nothing left to read; or `$`, `\b` or `\B` held there. More input could extend the match, change which alternative wins, or invalidate it, and its captures are the closest available rather than final — see [Captures on a partial match](./docs/caveats.md#captures-on-a-partial-match).
- `false` when every atom matched literally and nothing read past the last character consumed. No continuation of the input changes the match's index or text, and the captures are the ones the original pattern produces — except the two cases in [What it cannot see](#what-it-cannot-see) below, where a read of the end leaves no marker and `false` is reported despite it.

```javascript
import PartialMatchRegExp, { hitEnd } from "regex-partial-match";

const partial = new PartialMatchRegExp(/hello world/);

hitEnd(partial, partial.exec("hello")); // true  — ran out of input inside "world"
hitEnd(partial, partial.exec("hello world!")); // false — settled short of the end
hitEnd(partial, partial.exec("hello world")); // false — consumed the last character without reading past it

const greedy = new PartialMatchRegExp(/hello \w+/);

hitEnd(greedy, greedy.exec("hello world")); // true  — \w+ read the end looking for more
```

> [!NOTE]
> Where the JDK is exact, `hitEnd()` is conservative in one place: a bounded greedy quantifier (`?`, `{n,m}`) fully taken at the end of the input reports `true`, although the engine attempted no further read there — on a *group* (`/(ab)?/` on `"ab"` is `true` here and `false` in Java), and the same way for an unequal-bound `{n,m}` directly on a single atom once it's saturated at its maximum (`/a{1,2}/` on `"aa"` is `true`, though no continuation can add a third `a`). Outside the two limits in [What it cannot see](#what-it-cannot-see), it is never wrong in the other direction.

See [How It Works](./docs/how-it-works.md#why-the-question-cant-be-answered-from-the-outside) for why this can't be worked out from the match alone, and how `hitEnd()` records a read of the end.

> [!NOTE]
> `hitEnd()` itself always requires ES2018+, regardless of the pattern: its truncation probe is built from named capturing groups internally, even for a pattern as plain as `/^abc/`. See [Browser Compatibility](#browser-compatibility) — every other method holds to the ES2015 floor stated there.

#### What it cannot see

- **A read of the end inside a lookahead in an earlier iteration of a quantified group.** The probe's [markers](./docs/how-it-works.md#recording-a-read-of-the-end) are capturing groups, and [`RepeatMatcher`](https://tc39.es/ecma262/#sec-runtime-semantics-repeatmatcher-abstract-operation) resets a quantified group's captures at the start of every iteration. `/(?:a(?=bcd)|b)+/` on `"abc"` reads the end inside `(?=bcd)` in its first iteration, matches `b` in its second, and reports `false` — although `"abcx"` changes the match to `"b"` at index 1. Nothing placed inside the repeated atom survives the reset, so this is a limit of the marker approach rather than an oversight, and it is pinned by a test.
- **A read of the end inside a raw lookaround.** Negative lookaheads and both lookbehinds are kept verbatim (see [Caveats](./docs/caveats.md)), so a read of the end inside them leaves no marker: `/^a(?!b)/` on `"a"` reports `false`, although `"ab"` invalidates the match. A scanner whose output must not depend on where its input was chunked should refuse or buffer patterns that use them, as [`replace-content-transformer`](https://github.com/TomStrepsil/replace-content-transformer) does.
### `PartialMatchRegExp.prototype.features: ReadonlySet<RegexFeature>`

Building the partial-match regex requires walking the entire source pattern once. As a side effect of that same walk, each instance records which syntactic constructs its pattern actually uses, exposed as a `features` set — no separate scan of the source is performed to produce it.

This is useful for consumers building on top of `PartialMatchRegExp` who need to reason about which constructs a *specific* pattern uses, without writing their own regex parser to find out. Two concrete cases:

- **Flagging patterns likely to hit one of the [caveats](./docs/caveats.md).** For example, a pattern combining `backreference` with `lookbehind`, `negativeLookahead`, or `negativeLookbehind` is a candidate for the [atomic-backreference caveat](./docs/caveats.md#backreferences); one combining `backreference` with `disjunction` is a candidate for the [prefix-ambiguous top-level alternation caveat](./docs/caveats.md#prefix-ambiguous-top-level-alternation). A consumer accepting user-supplied patterns can surface a warning instead of letting the edge case surprise someone later.
- **Restricting which constructs a product surface allows.** e.g. a system that only wants to accept "simple" patterns (no lookaround, no backreferences) from untrusted input can check `features` against an allow-list and reject the rest, without needing to hand-roll that check against the raw pattern source.
- **Deciding at construction time whether a pattern needs a careful path.** A capture nested inside a lookaround is decided by the assertion rather than by the consumed text, so its value can vary with how far the input has been seen. `features.has("lookaroundCapture")` isolates exactly those patterns, where `features.has("lookahead") && features.has("capturingGroup")` would also catch the ordinary `/(\w+)(?= END)/`.

```javascript
import PartialMatchRegExp from "regex-partial-match";

const partial = new PartialMatchRegExp(/^[a-z]+(?<domain>\.[a-z]+)\1/);

partial.features; // Set { "startAnchor", "backreference", "namedGroup", "capturingGroup", "characterClass", "quantifier", "otherEscape" }
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
| `lookaroundCapture`          | A capturing group inside any lookaround                | Nesting, not a construct — always accompanied by `capturingGroup`             |
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
| `otherEscape`                 | Any other `\X`, e.g. `\.`                               | `\0` alone is tagged `otherEscape` only under `u`/`v`; otherwise `backreference`, [like any other digit escape](docs/backreferences.md) |

Three things worth knowing about how these tags line up with the grammar:

- **One ECMA-262 production can map to several tags.** `Assertion` alone covers `^`, `$`, `\b`, `\B`, and all four lookarounds — `features` splits it by whichever discriminant is easiest to read off during the walk (`^` vs `$`, `=` vs `!` after `(?<`, etc.), since that information is free at the point each construct is recognised.
- **A named capturing group always carries both `namedGroup` and `capturingGroup`.** The grammar treats a capturing group with a name and one without as the same production (`( GroupSpecifier? Disjunction )`), not two, so both tags are added together.
- **`lookaroundCapture` records nesting, not a construct.** Every other tag names something the source contains; this one names where something sits — a capturing group appearing lexically inside `(?=...)`, `(?!...)`, `(?<=...)` or `(?<!...)`, at any depth of nested groups. It is the one relationship between constructs the flattened set cannot otherwise express: `/(\w+)(?= END)/` and `/a(?=(?:b(?:x|(c))d|b))/` both report `lookahead` and `capturingGroup`, but only the second has a capture whose value the assertion decides.

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
