# Caveats

- [**`.test()` and empty matches at the end of the input**](#test-behaviour-and-non-matching-results-from-exec-and-match): an unanchored pattern always matches `""` at the end of the input; anchor with `^`, or ask [`hitEnd()`](./api.md#hitend)
- [**Assertions at the end of the input**](./how-it-works.md#%EF%B8%8F-assertions-at-the-end-of-the-input): a path that contradicts itself can still be accepted there
- [**Backreferences**](#backreferences): some backreferences stay atomic
  - [Captures on a partial match](#captures-on-a-partial-match)
- [**Positive lookbehinds**](#positive-lookbehinds): must match in their entirety
- [**Backtracking**](#backtracking): costs about what the original pattern costs, except for backreferences retried many times, and a caret that can't hold after repeated alternatives
- [**Surrogate pair matching**](#surrogate-pair-matching): only whole astral characters match
- [**Sticky flag (`y`)**](#sticky-flag-y): not suited to progressive input validation
- [**"String properties"**](#string-properties): match atomically
- [**Very long repetitions**](#very-long-repetitions): a multi-character group repeated over a few MiB can overflow V8's stack

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

The anchor may lead a group body, as in `/(^x)/` or `/(^x|^y)+/`, provided it leads every alternative — see [Carets](./modules/carets.md#-a-start-anchor-leading-a-group).

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
> [`hitEnd()`](./api.md#hitend) answers this without a length check, and covers more than one: it reports `true` for the empty end-of-input match, since it exists only because the input ran out, and equally for a non-empty prefix like `"hello"` against `/hello world/`, which a length check would wave through.
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

`PartialMatchRegExp` supports partial matching of backreferences (`\1`, `\k<name>`) — see [How It Works](./how-it-works.md) and [docs/modules/backreferences.md](./modules/backreferences.md) for the algorithm. A backreference is inherently atomic — `\1` must match the complete captured text or fail — but the library lets it match a prefix of its group's capture that runs to the end of the input, checked by the engine itself, in its own priority order.

The following cases remain atomic (full native value or exactly at true end of input, no mid-value partial matching):

- **Backreferences inside lookbehinds and negative lookarounds.** These are verbatim contexts — the value a lookbehind or negative lookahead requires must be fully present or fully absent, so there's no partial-prefix position to expand into.
- **A forward reference** — `\1` written before group 1 opens, or referencing it while it's still open (a self-reference inside the group's own body, e.g. `\1` in `/^(\1a)$/`). Per ECMAScript the engine always resolves it to empty there (it can't have participated yet, even on a later iteration of an enclosing quantifier), so there's no real value being withheld.
- **A prefix longer than [`longestPartial`](./modules/backreferences.md#%EF%B8%8F-longestpartial)** (64 characters in the `backreferences` module, or another limit set with `backreferencesWith()`). `/(\w+)-\1/` matches `"abcd-abc"` from index 0, but with `longestPartial` set to 2 only from index 5, where `"abc"` is a prefix of a full match on its own.
- **Every backreference, on an engine without lookbehind.** The check of a prefix needs one, so such an engine gets atomic backreferences throughout.
- **A `\k<name>` written before a later declaration of its duplicated name.** ECMAScript permits a duplicated name only across disjoint alternatives. This one is stricter than the rest — see [docs/modules/backreferences.md](./modules/backreferences.md#duplicate-named-groups) for why, and for the workaround.

### Captures on a partial match

Captures on a partial match are the closest they can be to what a full match would or may report. Each group holds what a completion along the path the match took captures, cut off at the end of the input: `""` for a group the match entered that has consumed nothing yet, the prefix it holds for a group cut off part way, and `undefined` only where that completion leaves the group unmatched.

More input can still replace that path with another one entirely: a group can grow, shrink, become `undefined` because a different alternative wins, or a different group can appear where it was `undefined`.

```javascript
const partial = new PartialMatchRegExp(/(ab)x|(abc)y/);

partial.exec("ab");   // ["ab",   "ab",      undefined] — branch 1, truncated
partial.exec("abcy"); // ["abcy", undefined, "abc"    ] — branch 2, complete
```

A repeated group whose last iteration was cut short reports that partial iteration — `/(abc)+\1/` on `"abcab"` gives `m[1] === "ab"` — and `"abcabc"` then gives `"abc"`.

When [`hitEnd()`](./api.md#hitend) reports `false` for a match, its captures are final; when it reports `true`, they are the closest available. One known shape still reports `undefined` where `""` is closer: a quantified group not yet iterated at the end of the input (`/(?=(a))(a|b)*/` on `""` gives `m[2] === undefined`).

## Positive Lookbehinds

Whilst forming a match, a positive lookbehind must match in entirety, for the pattern to match. This is inherent in the concept of non-matching groups, since they are not match-worthy themselves, but just qualify matching atoms.

e.g.

```js
/(?<=foo)bar/;
```

"f" through "foo" match only the empty string at the end of the input, but "foob" matches "b".

## Duplicate Group Names V8 Accepts

ECMAScript lets a group name be declared more than once only in alternatives that can't both take part. Node.js 24 (V8 13.6), and likely earlier V8 versions that support duplicate names, also accept some patterns the specification rejects, where both groups can take part, such as `/(?<n>a)(?=x|(?<n>y))/`. This is a V8 defect, [fixed](https://chromium.googlesource.com/v8/v8/+/0be3260ffee08dc6e7278a1e8549d007036b4093) in V8 13.9 (Chrome 139, Node.js 25). `PartialMatchRegExp` constructs these patterns but doesn't support them:

- `exec()` can accept input no completion would match, when the pattern has a `\k<name>` to the duplicated name. `/(?<n>a)(?:x|(?<n>y))\k<n>/` never matches through `y` natively, yet `exec("ay")` returns `["ay", "a", "y"]`.
- [`hitEnd()`](./api.md#hitend) throws a `SyntaxError`, because its probe adds capturing groups, which V8 then rejects.

Node.js 25 and later and JavaScriptCore (Safari, Bun) follow the specification and reject these patterns at construction. Renaming one of the groups avoids the problem.

## Backtracking

The transform keeps the original pattern's backtracking: a pattern that backtracks catastrophically on some input, such as `/^(a+)+$/` on `"aaaa…!"`, does so after the transform too, at the same rate, so a ReDoS checker such as [recheck](https://makenowjust-labs.github.io/recheck/) can be run on the original pattern. Some attack strings stop working: where the original fails only because the input ran out, the transform matches straight away.

Two shapes cost more:

- **A caret that can't hold after a group of alternatives repeated a fixed minimum number of times**, where the input ends inside the repetition, as in `/(?:a|b){24}^/` or `/(?:\d|[a-f]){24}(?=^)/` on `"a"`. Every alternative can match the end of the input, so the engine tries every way to fill the repetitions the input can't before the caret fails, and the time doubles with each one. Outside multiline scope, which `(?-m:^)` restores under the `m` flag, such a pattern matches only where the repetitions match nothing. A caret under `m` costs nothing extra. Merging single-character alternatives into one class avoids it: `/[ab]{24}^/`.
- **A backreference retried many times**, as in `/(\w+)\1(?<=x)/` on a run of `a` followed by `!`. Each failing attempt reads up to [`longestPartial`](./modules/backreferences.md#%EF%B8%8F-longestpartial) characters ahead, so the cost is a multiple of the original's that grows with it. It stays polynomial. A lower `longestPartial` reduces it, and `0` removes it.

A stream that re-runs a growing input repeats the cost on every call. Capping how much input it holds for one candidate match bounds it.

## Surrogate Pair Matching

In [unicode-aware mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode) (`u` flag), **only whole astral characters are supported**. Partial matching of individual surrogate pairs is not supported. For example, `/😀/u` will match the complete emoji character, but not the first surrogate pair in isolation. Hence, if partially matching a byte stream, be sure to pipe via a [`TextDecoder`](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder) first.

## [Sticky](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky) Flag (`y`)

The sticky flag is fully supported for its intended use case: **scanning within a single fixed string**. Partial matches are found only at `lastIndex`; the engine does not scan forward, and `lastIndex` advances on success or resets to `0` on failure; exactly as native sticky regexes behave.

```javascript
import PartialMatchRegExp from "regex-partial-match";

const partial = new PartialMatchRegExp(/hello/y);

partial.lastIndex = 2;
partial.test("xyhello"); // true  — partial match at position 2
partial.lastIndex = 2;
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

## Very long repetitions

An atom repeated by `*`, `+` or `{n,}` (`\S+`, `[^{}]*`, `\w{2,}`) matches runs of any length — see [Quantified atoms](./how-it-works.md#quantified-atoms). Other repetitions keep a truncation branch inside every repetition, and V8 can throw `RangeError: Maximum call stack size exceeded` once a single run reaches a few MiB:

- a quantified group spanning more than one character, as in `/(?:ab)+/` or `/(\w\s)*/`
- a quantified backreference, or a repetition with a bounded count or minimum in the millions (such as `/\w{1,5000000}/`)

Split such input into smaller chunks, or quantify atoms without huge bounds where the pattern allows it.

## "String properties"

As with surrogate pair matching, grapheme clusters / string properties can only match atomically.

Hence, `[\p{RGI_Emoji_Flag_Sequence}]` will match `🇺🇳` as a whole, but not as the individual code points of which it's comprised.

In [`v` mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets) expressions, where `[\q{abc}]` syntax is used in isolation (rather than its canonical use-case as a subtraction/intersection of another character class), this will also only match entirely or not at all. i.e. `abc` can match, but not partially.
