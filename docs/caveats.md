# Caveats

## [`.test()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) behaviour and non-matching results from [`.exec()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) and [`.match()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)

For unanchored patterns (no `^` and not using the `y` flag), the library produces an expression that always matches an empty string at the true end of the input — see [How It Works](./how-it-works.md). Feasibly, this is the start of a new partial match.

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

The anchor may lead a group body, as in `/(^x)/` or `/(^x|^y)+/`, provided it leads every alternative — see [How It Works](./how-it-works.md#-a-start-anchor-leading-a-group).

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

> [!TIP]
> [`hitEnd()`](../README.md#hitendpartial-partialmatchregexp-match-regexpexecarray-boolean) answers this without a length check, and covers more than one: it reports `true` for the empty end-of-input match, since it exists only because the input ran out, and equally for a non-empty prefix like `"hello"` against `/hello world/`, which a length check would wave through.
>
> It describes a match, so ask it from `exec()` rather than `test()`:
>
> ```js
> import PartialMatchRegExp, { hitEnd } from "regex-partial-match";
>
> const partial = new PartialMatchRegExp(/x/);
> const match = partial.exec("a"); // ['', index: 1, input: "a", groups: undefined]
>
> hitEnd(partial, match); // true - the match depended on the input running out
> ```
>
> `true` is "not yet", not "never": for an unanchored `/x/`, `"a"` really is a viable prefix of `"ax"`. It is only when validating that which came before that it should be read as "no match".

> [!NOTE]
> A more ergonomic `test()` / `exec()` output [was explored](https://github.com/TomStrepsil/regex-partial-match/pull/51), but proved a complex problem space.

## Backreferences

`PartialMatchRegExp` supports partial matching of backreferences (`\1`, `\k<name>`) — see [How It Works](./how-it-works.md) and [docs/backreferences.md](./backreferences.md) for the algorithm. A backreference is inherently atomic — `\1` must match the complete captured text or fail — but the library resolves what each group captured from a partial input and expands the backreference into per-character partial form so matching can still proceed character-by-character in the common case.

The following cases remain atomic (full native value or exactly at true end of input, no mid-value partial matching):

- **Backreferences inside lookbehinds and negative lookarounds.** These are verbatim contexts — the value a lookbehind or negative lookahead requires must be fully present or fully absent, so there's no partial-prefix position to expand into.
- **A backreference whose captured value can't be determined from a partial input.** This only affects the backreference site itself; it's strictly better than rejecting the input outright, and never accepts anything unsound.
- **A forward reference, outside a lookbehind** — `\1` written before group 1 opens, or referencing it while it's still open (a self-reference inside the group's own body, e.g. `\1` in `/^(\1a)$/`). Its value can't come from the capture scan, which resolves it on a path it could never have taken, so it's left to the engine — which, per ECMAScript, always resolves it to empty there (it can't have participated yet, even on a later iteration of an enclosing quantifier). This costs nothing in practice: there's no real value being withheld. (Inside a lookbehind — already covered above — matching runs right-to-left, so a reference written first can still follow its own group's capture; that's exactly why the whole body stays atomic regardless of `forward`.)
- **A `\k<name>` referencing a name declared more than once**, which ECMAScript permits only across disjoint alternatives. This one is stricter than the rest — see [docs/backreferences.md](./backreferences.md#duplicate-named-groups) for why, and for the workaround.

 The case-folding a backreference's expansion agrees against tracks a locally-scoped `(?i:...)`/`(?-i:...)` [modifier](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Modifier) around that specific backreference, rather than only the pattern's own flags. This holds for a backreference the local scope makes *more* case-insensitive than the pattern is, or *less*. V8 versions before [the fix](https://issues.chromium.org/issues/447583670) released in Node.js 24.12 can still mishandle the locally-disabled case when the surrounding pattern has `i`; Chromium/Electron support depends on their bundled V8 version.

A backreference pattern has one further limit, which costs completeness rather than soundness:

- **A backreference whose viable index is not the scan's leftmost.** The capture scan resolves groups at *its* leftmost match, and a stand-in that accepts anything can put that earlier than any viable index. The expansion is then baked from the wrong text, and the match is found late or not at all: `/(?<g>[^]{2})\1/` on `"abbb"` matches at index 2 where `"bbb"` at index 1 is a prefix of `"bbbb"`. Sound, never accepting an invalid prefix, but incomplete; exact resolution would need a sticky scan at every candidate index.

### Captures on a partial match

Captures on a partial match are the closest they can be to what a full match would or may report. Each group holds what a completion along the path the match took captures, cut off at the end of the input: `""` for a group the match entered that has consumed nothing yet, the prefix it holds for a group cut off part way, and `undefined` only where that completion leaves the group unmatched.

More input can still replace that path with another one entirely: a group can grow, shrink, become `undefined` because a different alternative wins, or a different group can appear where it was `undefined`.

```javascript
const partial = new PartialMatchRegExp(/(ab)x|(abc)y/);

partial.exec("ab");   // ["ab",   "ab",      undefined] — branch 1, truncated
partial.exec("abcy"); // ["abcy", undefined, "abc"    ] — branch 2, complete
```

A repeated group whose last iteration was cut short reports that partial iteration — `/(abc)+\1/` on `"abcab"` gives `m[1] === "ab"` — and `"abcabc"` then gives `"abc"`.

When [`hitEnd()`](../README.md#hitendpartial-partialmatchregexp-match-regexpexecarray-boolean) reports `false` for a match, its captures are final; when it reports `true`, they are the closest available. Two known shapes still report `undefined` where `""` is closer: a group nested inside a group a multiline caret follows (`/((\n))^/m` on `"a"` gives `m[2] === undefined`), and a quantified group not yet iterated at the end of the input (`/(?=(a))(a|b)*/` on `""` gives `m[2] === undefined`).

### Prefix-ambiguous top-level alternation

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

See [docs/backreferences.md](./backreferences.md) for why this happens (the internal capture scan resolving the wrong alternative first).


## Positive Lookbehinds

Whilst forming a match, a positive lookbehind must match in entirety, for the pattern to match. This is inherent in the concept of non-matching groups, since they are not match-worthy themselves, but just qualify matching atoms.

e.g.

```js
/(?<=foo)bar/;
```

"f" through "foo" is not a match, but "foob" is.

## Surrogate Pair Matching

In [unicode-aware mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode) (`u` flag), **only whole astral characters are supported**. Partial matching of individual surrogate pairs is not supported. For example, `/😀/u` will match the complete emoji character, but not the first surrogate pair in isolation. Hence, if partially matching a byte stream, be sure to pipe via a [`TextDecoder`](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder) first.

## [Sticky](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky) Flag (`y`)

The sticky flag is fully supported for its intended use case: **scanning within a single fixed string**. Partial matches are found only at `lastIndex`; the engine does not scan forward, and `lastIndex` advances on success or resets to `0` on failure; exactly as native sticky regexes behave.

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

The `gy` flag combination is also fully supported: `exec()`/`test()` behave as sticky, while `match()`, `matchAll()`, `replace()`, and `replaceAll()` iterate via `exec()` as global, matching [the language specification](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky).

## "String properties"

As with surrogate pair matching, grapheme clusters / string properties can only match atomically.

Hence, `[\p{RGI_Emoji_Flag_Sequence}]` will match `🇺🇳` as a whole, but not as the individual code points of which it's comprised.

In [`v` mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets) expressions, where `[\q{abc}]` syntax is used in isolation (rather than its canonical use-case as a subtraction/intersection of another character class), this will also only match entirely or not at all. i.e. `abc` can match, but not partially.
