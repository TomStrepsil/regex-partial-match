# API

## `new PartialMatchRegExp()`

```typescript
new PartialMatchRegExp(pattern: RegExp | string, flags?: string)
```

Extends `RegExp`. An instance behaves like a normal `RegExp`; `instanceof RegExp` is `true`, and `.test()`, `.exec()`, `.match()`, `.matchAll()`, `.replace()` etc. all work as expected, but also matches any input string that is a valid prefix of the original pattern, in addition to full matches.

Available via the default entry point of the package, or via `regex-partial-match/partialMatchRegExp`; see [A note on Tree-Shaking](./entry-points.md#a-note-on-tree-shaking).

**Parameters:**

- `pattern` - A `RegExp` instance, or a pattern source string (as accepted by the `RegExp` constructor)
- `flags` - A flags string, used only when `pattern` is a string (as accepted by the `RegExp` constructor)

**Returns:**

- A `PartialMatchRegExp` instance that matches partial strings of the original pattern

## `toPartialMatchRegex()`

```typescript
RegExp.prototype.toPartialMatchRegex(): PartialMatchRegExp
```

When using `import 'regex-partial-match/extend'`, this method is added to `RegExp.prototype`.

```javascript
import "regex-partial-match/extend";

const partial = /^hello world/.toPartialMatchRegex();

partial.test("hel"); // true
```

**Returns:**

- A new `PartialMatchRegExp` that matches partial strings, created from the `RegExp` instance the method was called on.

## `hitEnd()`

```typescript
hitEnd(partial: PartialMatchRegExp, match: RegExpExecArray): boolean
```

Reports whether the engine **reached the end of the input** while producing `match`, so that more input could change it — the contract of the JDK's [`Matcher.hitEnd()`](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#hitEnd--): when it returns `false`, no continuation of the input changes the match's index or text. `exec()` alone cannot say: it returns the same shape of array for `"h"`, `"hello"` and `"hello world"` against `/hello world/`.

Available as a named export of the default entry point, `import { hitEnd } from 'regex-partial-match'`, or as the default export of `regex-partial-match/hitEnd`.

**Parameters:**

- `partial` - The `PartialMatchRegExp` instance that produced `match`
- `match` - A match returned by `partial.exec()`

**Returns:**

- `true` when the match read the end of the input: an atom ran out of input and took one of the `|$(?![\s\S])` branches described in [How It Works](./how-it-works.md); a greedy quantifier stopped at the end because there was nothing left to read; or `$`, `\b` or `\B` held there. More input could extend the match, change which alternative wins, or invalidate it, and its captures are the closest available rather than final — see [Captures on a partial match](./caveats.md#captures-on-a-partial-match).
- `false` when every atom matched literally and nothing read past the last character consumed. No continuation of the input changes the match's index or text, and the captures are the ones the original pattern produces — except the three cases in [What it cannot see](#what-it-cannot-see) below, where a read of the end leaves no marker, or a split surrogate pair can still change the match, and `false` is reported despite it.

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
> Where the JDK is exact, [`hitEnd`](#hitend) is conservative in two places. A bounded greedy quantifier (`?`, `{n,m}`) fully taken at the end of the input reports `true`, although the engine attempted no further read there — on a _group_ (`/(ab)?/` on `"ab"` is `true` here and `false` in Java), and the same way for an unequal-bound `{n,m}` directly on a single atom once it's saturated at its maximum (`/a{1,2}/` on `"aa"` is `true`, though no continuation can add a third `a`). A group with a minimum count of two or more that holds a lookbehind or negative lookahead, or a negative lookahead repeated directly that way (allowed only without `u` or `v`), reports `true` whenever its repetitions end at the end of the input, whichever alternatives they took: `/(?:(?<=b)|a){2}/` on `"aa"` is `true`, though no continuation changes the match. Each repetition clears the captures that record an earlier one running out of input, so a repetition that ran out can't be told from one that ended exactly at the end. A directly repeated negative lookahead usually does read the end there, so `/a(?!b){2}/` on `"a"` is rightly `true`; the `true` is spurious only when its body reads nothing ahead, as in `(?!(?<=b)){2}`. Outside the three limits in [What it cannot see](#what-it-cannot-see), it is never wrong in the other direction.

Testing the original, untransformed pattern looks like it should answer this — "did the input fully satisfy the original pattern?" — but it asks a different question: whether the original matches _at all_ here, not whether _this_ match reached the end of the input on its way. The two agree almost always, but a read of the end inside a zero-width assertion can make both return an identical result by different paths.

See [How It Works](./how-it-works.md#why-the-question-cant-be-answered-from-the-outside) for why this can't be worked out from the match alone, where the two diverge, and how [`hitEnd`](#hitend) records a read of the end.

### What it cannot see

- **A read of the end inside a lookahead in an earlier iteration of a quantified group.** The probe's [markers](./how-it-works.md#recording-a-read-of-the-end) are capturing groups, and [`RepeatMatcher`](https://tc39.es/ecma262/#sec-runtime-semantics-repeatmatcher-abstract-operation) resets a quantified group's captures at the start of every iteration. `/(?:a(?=bcd)|b)+/` on `"abc"` reads the end inside `(?=bcd)` in its first iteration, matches `b` in its second, and reports `false` — although `"abcx"` changes the match to `"b"` at index 1. Nothing placed inside the repeated atom survives the reset, so this is a limit of the marker approach rather than an oversight, and it is pinned by a test.
- **A read of the end inside a raw lookaround.** The bodies of negative lookaheads and both lookbehinds are kept verbatim (see [Caveats](./caveats.md)), so a read of the end inside them leaves no marker: `/^a(?!b)/` on `"a"` reports `false`, although `"ab"` invalidates the match. A scanner whose output must not depend on where its input was chunked should refuse or buffer patterns that use them.
- **A high surrogate ending the input under `u` or `v`.** Only whole astral characters are supported (see [Surrogate Pair Matching](./caveats.md#surrogate-pair-matching)), so a match whose last code unit is a lone high surrogate reports `false`, although a following low surrogate would pair with it and change the match's text: `/./u` on `"\ud83d"` matches `"\ud83d"`, but `"😄"` matches `"😄"`. [^3]

## `features()`

```typescript
features(partial: PartialMatchRegExp): ReadonlySet<RegexFeature>
```

Building the partial-match regex requires walking the entire source pattern, usually once. [^4] As a side effect of the walk that builds the regex, each instance records which syntactic constructs its pattern actually uses, and `features()` names them as a set — no separate scan of the source is performed to produce it. The set is built on the first call for an instance and the same set is returned after that.

Available as a named export of the default entry point, `import { features } from 'regex-partial-match'`, or as the default export of `regex-partial-match/features`. It accepts an instance of any `PartialMatchRegExp` class, including those from [`regex-partial-match/core`](./entry-points.md#the-lean-entry-regex-partial-matchcore).

This is useful for consumers building on top of `PartialMatchRegExp` who need to reason about which constructs a _specific_ pattern uses, without writing their own regex parser to find out. Two concrete cases:

- **Flagging patterns likely to hit one of the [caveats](./caveats.md).** For example, a pattern combining `backreference` with `lookbehind`, `negativeLookahead`, or `negativeLookbehind` is a candidate for the [atomic-backreference caveat](./caveats.md#backreferences). A consumer accepting user-supplied patterns can surface a warning instead of letting the edge case surprise someone later.
- **Restricting which constructs a product surface allows.** e.g. a system that only wants to accept "simple" patterns (no lookaround, no backreferences) from untrusted input can check `features()` against an allow-list and reject the rest, without needing to hand-roll that check against the raw pattern source.
- **Deciding at construction time whether a pattern needs a careful path.** A capture nested inside a lookaround is decided by the assertion rather than by the consumed text, so its value can vary with how far the input has been seen. `features(partial).has("lookaroundCapture")` isolates exactly those patterns, where checking for both `lookahead` and `capturingGroup` would also catch the ordinary `/(\w+)(?= END)/`.

```javascript
import PartialMatchRegExp, { features } from "regex-partial-match";

const partial = new PartialMatchRegExp(/^[a-z]+(?<domain>\.[a-z]+)\1/);

features(partial); // Set { "startAnchor", "backreference", "namedGroup", "capturingGroup", "characterClass", "quantifier", "otherEscape" }
features(partial).has("backreference"); // true
```

`RegexFeature` is a string union, exported from `regex-partial-match` and `regex-partial-match/features`:

| Feature                    | Matches                                 | Notes                                                                                                                                           |
| -------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `patternCharacter`         | An ordinary literal character           |                                                                                                                                                 |
| `startAnchor`              | Top-level `^`                           |                                                                                                                                                 |
| `endAnchor`                | Top-level `$`                           |                                                                                                                                                 |
| `wordBoundary`             | Top-level `\b`                          |                                                                                                                                                 |
| `nonWordBoundary`          | Top-level `\B`                          |                                                                                                                                                 |
| `lookahead`                | `(?=...)`                               |                                                                                                                                                 |
| `negativeLookahead`        | `(?!...)`                               |                                                                                                                                                 |
| `lookbehind`               | `(?<=...)`                              |                                                                                                                                                 |
| `negativeLookbehind`       | `(?<!...)`                              |                                                                                                                                                 |
| `backreference`            | `\1`                                    |                                                                                                                                                 |
| `namedBackreference`       | `\k<name>`                              |                                                                                                                                                 |
| `namedGroup`               | `(?<name>...)`                          | Always accompanied by `capturingGroup` — see below                                                                                              |
| `capturingGroup`           | `(...)`, including named groups         |                                                                                                                                                 |
| `lookaroundCapture`        | A capturing group inside any lookaround | Nesting, not a construct — always accompanied by `capturingGroup`                                                                               |
| `nonCapturingGroup`        | `(?:...)`                               |                                                                                                                                                 |
| `modifierGroup`            | `(?ims:...)`                            |                                                                                                                                                 |
| `modifierGroupWithRemoval` | `(?ims-ims:...)`                        | Mutually exclusive with `modifierGroup`                                                                                                         |
| `characterClass`           | `[...]`                                 |                                                                                                                                                 |
| `nestedCharacterClass`     | `[...[...]...]`                         | `v` flag only                                                                                                                                   |
| `classIntersection`        | `&&` inside a character class           | `v` flag only                                                                                                                                   |
| `classSubtraction`         | `--` inside a character class           | `v` flag only                                                                                                                                   |
| `disjunction`              | `\|`                                    |                                                                                                                                                 |
| `quantifier`               | `*`, `+`, `?`, `{n}`, `{n,}`, `{n,m}`   |                                                                                                                                                 |
| `unicodePropertyEscape`    | `\p{...}`, `\P{...}`                    | `u`/`v` flag only — otherwise tagged `otherEscape`                                                                                              |
| `characterClassEscape`     | `\d`, `\D`, `\w`, `\W`, `\s`, `\S`      |                                                                                                                                                 |
| `controlEscape`            | `\f`, `\n`, `\r`, `\t`, `\v`            |                                                                                                                                                 |
| `controlLetterEscape`      | `\cX`                                   |                                                                                                                                                 |
| `hexEscapeSequence`        | `\xXX`                                  |                                                                                                                                                 |
| `unicodeEscapeSequence`    | `\uXXXX`, `\u{...}`                     |                                                                                                                                                 |
| `otherEscape`              | Any other `\X`, e.g. `\.`               | `\0` alone is tagged `otherEscape` only under `u`/`v`; otherwise `backreference`, [like any other digit escape](./modules/backreferences.md) |

Three things worth knowing about how these tags line up with the grammar:

- **One ECMA-262 production can map to several tags.** `Assertion` alone covers `^`, `$`, `\b`, `\B`, and all four lookarounds — `features` splits it by whichever discriminant is easiest to read off during the walk (`^` vs `$`, `=` vs `!` after `(?<`, etc.), since that information is free at the point each construct is recognised.
- **A named capturing group always carries both `namedGroup` and `capturingGroup`.** The grammar treats a capturing group with a name and one without as the same production (`( GroupSpecifier? Disjunction )`), not two, so both tags are added together.
- **`lookaroundCapture` records nesting, not a construct.** Every other tag names something the source contains; this one names where something sits — a capturing group appearing lexically inside `(?=...)`, `(?!...)`, `(?<=...)` or `(?<!...)`, at any depth of nested groups. It is the one relationship between constructs the flattened set cannot otherwise express: `/(\w+)(?= END)/` and `/a(?=(?:b(?:x|(c))d|b))/` both report `lookahead` and `capturingGroup`, but only the second has a capture whose value the assertion decides.

[^3]: A scanner fed from a source that can split a surrogate pair across chunks, rather than a [`TextDecoder`](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder) in streaming mode (`stream: true`, or `TextDecoderStream`), should defer any match ending on a code unit in `0xD800`–`0xDBFF` at the end of the input.

[^4]: The [carets module](https://github.com/TomStrepsil/regex-partial-match/tree/main/src/modules/carets) guesses from a cheap look at the source whether a pattern needs its rules, and when it guesses wrong the pattern is walked a second time with them.

## `isPartialMatchRegExp()`

```typescript
isPartialMatchRegExp(value: unknown): value is PartialMatchRegExp
```

Returns `true` for an instance of any `PartialMatchRegExp` class, from `regex-partial-match/core`, from `withModules(...)`, or from the default entry point, and `false` for a plain `RegExp` or any other value. It doesn't import a class or module, so it can be used to accept either a `RegExp` or a ready-built instance without pulling the default class into a bundle.

Available as a named export of `regex-partial-match/features`, or of the default entry point, `import { isPartialMatchRegExp } from 'regex-partial-match'`.

> [!CAUTION]
> It recognises only instances built by the same evaluated copy of the library, in the same JavaScript realm. An instance from another copy returns `false`, even if the two are identical: a duplicate install, a bundler that evaluates the library once per compiler (such as separate server and edge builds), or a copy loaded in another realm (an iframe or `vm` context). Serialising an instance (for example with `postMessage` or `structuredClone`) yields a plain `RegExp`, which also returns `false`.
