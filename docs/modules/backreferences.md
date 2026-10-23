# 🔙 Backreferences

_The backreferences module, `regex-partial-match/modules/backreferences`. To bind it, and to see what `core` refuses without it, see [the lean entry](../../README.md#the-lean-entry-regex-partial-matchcore)._

## 🧩 The problem

A backreference (`\1`, `\k<name>`) is atomic: it matches its group's whole capture or nothing, and how long that capture is, is only known at match time. So the `|$(?![\s\S])` transform (see [How It Works](../how-it-works.md)) has nowhere to go inside it. This module lets a backreference match a prefix of its group's capture that runs to the end of the input, checked by the engine itself in one regex built at construction:

```js
import PartialMatchRegExp from "regex-partial-match";

const re = new PartialMatchRegExp(/^(abc)+\1/);

re.exec("abc");    // partial: m[0] = "abc",    m[1] = "abc"
re.exec("abcab");  // partial: m[0] = "abcab",  m[1] = "ab"
re.exec("abcabc"); // full:    m[0] = "abcabc", m[1] = "abc"
```

## 🏗️ At construction

The pattern is walked once, into parts that every rendering below is built from, so they all agree on what is a backreference. A `\N` is a backreference only when 1 ≤ `N` ≤ the pattern's final group count. Otherwise it's an [Annex B](https://tc39.es/ecma262/#sec-regular-expressions-patterns) escape, split into one atom per character it stands for (`\128` is `\x0a` then `8`). The group count, and whether any group is named, come from the engine. That lookup runs only when the source may hold a `\N` or `\k<` and the pattern isn't in `u` or `v` mode.

A pattern with no backreference left compiles to the static transform. Otherwise each backward backreference `\N` becomes a choice of three, tried in this order:

```text
\N  →  (?:\N|(?!\N)(?![\s\S]{L+1})(?=([\s\S]+))(?<=(?=\N)([\s\S]*?))(?<=(?=\H)\G)\H|$(?![\s\S])(?!\N))
```

`\H` and `\G` are two capturing groups the module adds. They're numbered among the pattern's own, so a group after them shifts, and `exec()` removes them from each match (see below). One part per line:

```text
(?:
    \N                      1. the whole capture
  |                         2. run out part way:
    (?!\N)                     the whole capture doesn't fit here
    (?![\s\S]{L+1})            at most L characters are left
    (?=([\s\S]+))              capture the rest of the input as \H, without moving
    (?<=(?=\N)([\s\S]*?))      look back to the nearest place the capture starts,
                               capturing the text from there to here as \G
    (?<=(?=\H)\G)              step back over \G and check the rest follows there
    \H                         consume the rest
  |                         3. nothing is left:
    $(?![\s\S])                the input has ended
    (?!\N)                     and \N didn't already match the empty string
)
```

### How the two lookbehinds read

A lookbehind `(?<=X)` holds where `X` matches text that ends at the current position, and the engine matches `X` from right to left to find it. Inside `X`, a lookahead still reads forwards from wherever the right-to-left match has reached. Once a lookbehind holds, the engine doesn't go back into it to try another way.

- **`(?<=(?=\N)([\s\S]*?))`** — the lazy `[\s\S]*?` takes as few characters as it can, so it grows leftwards one character at a time. After each, `(?=\N)` checks, reading forwards, whether the capture starts there. The first place it does is the nearest occurrence of the capture before the backreference, and `([\s\S]*?)` has captured the text from there to here: that is `\G`. Because the lookbehind doesn't go back into itself, it stops at that nearest occurrence and never reads further back.

- **`(?<=(?=\H)\G)`** — read right to left, `\G` steps back over the same text, landing on that occurrence. Then `(?=\H)` checks, reading forwards from there, that the rest of the input follows. The occurrence holds the whole capture and the rest is shorter, so this holds exactly when the rest is the start of the capture.

Every occurrence of the capture holds the same text, so the nearest one gives the same answer as any other, and finding it first keeps the read short. Only a group a lookahead captured further on has no occurrence before this point. Its capture can't start with the rest, so the first lookbehind rightly fails.

The rest is captured inside a lookahead, `(?=([\s\S]+))`, rather than consumed outright, so the position doesn't move and both lookbehinds look back from where the backreference starts. The engine doesn't go back into a lookahead either, so `\H` is always the whole of the remaining input, never a shorter piece. `\H` then consumes it.

### Walking through the three choices

`/^(abc)-\1/` shows all three. Its group captures at most 3 characters, so `L` is 2, and the second choice's limit is `(?![\s\S]{3})`. In each case below, `(abc)-` has matched `"abc-"`, and `\1` is tried at index 4.

**The whole capture.** Enough input is left, and it holds the capture:

```text
Pattern: /^(abc)-\1/
Input:   "abc-abc"

1. \1 → "abc" at 4  ✓

┌────────────────────────────────────────┐
│ Input: "abc-abc"                       │
│         ^^^ ^^^                        │
│         the capture, then \1           │
└────────────────────────────────────────┘

Result: "abc-abc", m[1] = "abc", as native
```

**Run out part way.** The input ends inside what `\1` would match:

```text
Pattern: /^(abc)-\1/
Input:   "abc-ab"

1. \1                    → only "ab" is left                                 ✗
2. (?!\1)                → the whole capture doesn't fit                     ✓
   (?![\s\S]{3})         → at most 2 characters are left                     ✓
   (?=([\s\S]+))         → \H = "ab"
   (?<=(?=\1)([\s\S]*?)) → grows leftwards from 4 until the capture starts:
                           4 "ab", 3 "-ab", 2 "c-a", 1 "bc-" no; 0 "abc" yes
                           \G = "abc-"
   (?<=(?=\H)\G)         → steps back over "abc-" to 0, where "ab" follows   ✓
   \H                    → consumes "ab"

┌────────────────────────────────────────┐
│ Input: "abc-ab"                        │
│         ^^  ^^                         │
│         the rest starts the capture    │
└────────────────────────────────────────┘

Result: "abc-ab", m[1] = "abc", partial
```

The same steps reject a rest that isn't the start of the capture:

```text
Pattern: /^(abc)-\1/
Input:   "abc-ax"

1. \1                    → "ax" is not "abc"                     ✗
2. (?!\1)                → the whole capture doesn't fit         ✓
   (?![\s\S]{3})         → at most 2 characters are left         ✓
   (?=([\s\S]+))         → \H = "ax"
   (?<=(?=\1)([\s\S]*?)) → the capture starts at 0; \G = "abc-"
   (?<=(?=\H)\G)         → "ab" follows 0, not "ax"              ✗
3. $(?![\s\S])           → input is left                         ✗

Result: null, since no more input can complete "abc-ax"
```

**Nothing left.** The input ends before the backreference starts:

```text
Pattern: /^(abc)-\1/
Input:   "abc-"

1. \1            → nothing is left                   ✗
2. (?=([\s\S]+)) → there is no rest to capture       ✗
3. $(?![\s\S])   → the input has ended               ✓
   (?!\1)        → \1 didn't match the empty string  ✓

Result: "abc-", m[1] = "abc", partial
```

**The limit.** `L` caps how far into its capture a backreference can run out. `/^(abcd)-\1/` captures 4 characters, so `L` is 3 with the `backreferences` module, but 2 with `backreferencesWith({ longestPartial: 2 })`:

```text
Pattern: /^(abcd)-\1/
Input:   "abcd-abc"

backreferences (L = 3)    → 2. (?![\s\S]{4}): "abc" is 3 characters  ✓
longestPartial: 2 (L = 2) → 2. (?![\s\S]{3}): "abc" is 3 characters  ✗

Result: "abcd-abc", partial, with the backreferences module; null with longestPartial: 2
```

**An empty capture.** Where the group captured nothing, `\1` matches the empty string, and so would the third choice. `(?!\N)` leaves the engine one way:

```text
Pattern: /^(a?)-\1/
Input:   "-"

(a?)-          → "-", the group capturing ""
1. \1          → "" at the end                            ✓
3. $(?![\s\S]) → would match "" too; (?!\1) rules it out

Result: "-", m[1] = ""
```

With one backreference, two ways to match give the same result. Repeated, as in `/(a?)\1{22}(?<=b)/` on `"c"`, each repetition would double the paths the engine tries before the lookbehind fails, so `(?!\N)` keeps that to one.

`L` is the smaller of `longestPartial` (64 in the `backreferences` module) and the longest text the group can capture, less one. A group that captures one character at most, as `(\w)` does, needs no second branch, so its backreference stays `(?:\N|$(?![\s\S])(?!\N))`. The longest capture is read from the walk: a quantifier without a maximum, or a group holding a forward reference, makes it unbounded, and so do a group inside a lookbehind or negative lookahead and, under `v`, a class or property escape that can match a string (`[\q{abc}]`, `\p{RGI_Emoji}`).

The regex is built once, at construction. Its hidden groups are numbered among the pattern's own, so the backreferences after one, including those inside a lookbehind or negative lookahead, are renumbered past it, and `exec()` removes them from each match, and from its `d` indices, before returning it. On an engine that can't parse a lookbehind, every backreference stays `(?:\N|$(?![\s\S])(?!\N))`, so it matches only in full or at the end of the input.

Two kinds of backreference stay native:

- **Inside a lookbehind or negative lookahead.** These bodies are kept as written, so the reference there is atomic.
- **Forward references:** written before their group closes, as in `/^\1?(a|b)\1/` or the self-reference `/^(\1a)$/`. Outside a lookbehind, ECMAScript always resolves them to empty, so leaving them to the engine costs nothing.

## ⚙️ `exec()` on the backreference path

`exec()` runs the compiled regex from `start`, so the engine tries alternatives in the pattern's own priority order, as it does for every other atom: `/(a)\1b|a/` on `"aa"` returns `"aa"`, as `/aab|a/` does. Where a lookaround holds a capturing group and the regex finds nothing at `start`, the native pattern is run too, and returned if it starts earlier: a lookahead keeps the first capture it makes, so a partial capture inside one can hide a start the native pattern finds, as in `/(?=(a|-b){1,2})\1/` on `"a-"`. Without such a group, nothing can hide a start, so the native pattern isn't run. `lastIndex` is written only for `g` and `y`, as native does.

Only `exec` is overridden. `test`, `match` and `matchAll` reach it through the standard protocol.

## 🎛️ `longestPartial`

The `backreferences` module, which the default `PartialMatchRegExp` binds, uses a `longestPartial` of 64. `backreferencesWith({ longestPartial })`, from `regex-partial-match/modules` or `regex-partial-match/modules/backreferences`, returns the module with another limit, to bind with `withModules`:

```js
import { withModules } from "regex-partial-match/core";
import { carets, backreferencesWith } from "regex-partial-match/modules";

const LongTails = withModules(carets, backreferencesWith({ longestPartial: 256 }));
```

A backreference that runs out of input more than `longestPartial` characters into its capture isn't matched part way: `/(\w+)-\1/` on `"abcd-abc"` matches at 0 with the `backreferences` module, but at 5 with `longestPartial: 2`. `0` makes every backreference match only in full or at the end of the input. It must be a whole number up to `Number.MAX_SAFE_INTEGER`. The same options return the same module, so `withModules` returns the same class for them, and a class can bind only one backreferences module.

A backreference that fails to match reads up to `longestPartial` characters ahead before it gives up, and one that runs out part way checks its capture against what's left, so the cost grows with the limit on long input where backreferences often fail, or where the engine backtracks through many places they run out. Over an unbounded group, a pattern that backtracks heavily near the end of the input costs a multiple of the native pattern, about nine times at 64 in the third column, and more where the group's capture is far back, since each check reads back to it: `/(a+b)[^]*\1(?<=#)/` on 3,200 characters is about sixty times native. Input that matches early, a stream of short inputs and construction (about 1.9 µs for `/(\w+)-\1/`) don't change. Node 24.20, one `exec()`, median of five:

| `longestPartial` | `/(\w+)-\1/` on 32,000 characters of `"foo-bar "` | `/(a\|bb+)\1-/` on 24,000 characters of `"abb"` | `/(\w+)\1(?<=x)/` on 800 `a`s (7.7 ms native) | `/^(.+)\n\1/` on a 2,000-character line and its first half | `/^<([a-zA-Z][\w:-]*)>[^<]*?<\/\1>/` per keystroke of a 259-character element |
| --: | --: | --: | --: | --: | --: |
| 0 | 0.19 ms | 0.09 ms | 8.94 ms | < 0.01 ms | 0.31 µs |
| 8 | 0.40 ms | 0.39 ms | 25.51 ms | < 0.01 ms | 0.37 µs |
| 16 | 0.47 ms | 0.53 ms | 31.49 ms | < 0.01 ms | 0.33 µs |
| 32 | 0.76 ms | 0.91 ms | 46.07 ms | < 0.01 ms | 0.33 µs |
| **64** | **1.27 ms** | **1.49 ms** | **66.58 ms** | **< 0.01 ms** | **0.28 µs** |
| 128 | 1.68 ms | 2.16 ms | 111.86 ms | < 0.01 ms | 0.29 µs |
| 256 | 3.80 ms | 3.84 ms | 156.12 ms | < 0.01 ms | 0.25 µs |
| 512 | 7.35 ms | 9.63 ms | 174.77 ms | < 0.01 ms | 0.22 µs |
| 1024 | 11.35 ms | 18.47 ms | 177.44 ms | 0.51 ms | 0.26 µs |

The first two never match before the end of the input, so every backreference fails once per start. The third backtracks through every place `\1` runs out near the end of the input, so it grows with the limit until the limit passes the longest capture that can run out there. The fourth runs out 1,000 characters into its capture, so it's matched there only from a limit of 1,000, where checking that the capture starts with what's left costs about the distance back to the capture.

## Limits

These are sound but incomplete: an input is never wrongly accepted, but some valid prefixes are rejected or found late. Each one is described in [Caveats](../caveats.md#backreferences).

- references inside lookbehinds and negative lookaheads;
- a `\k<name>` written before a later declaration of its duplicated name;
- a backreference that runs out of input more than `longestPartial` characters into its capture.

### Duplicate named groups

ECMAScript allows a name to be declared more than once only in alternatives that can't both take part, so a `\k<name>` after every declaration of its name reads whichever group took part, and can run out part way like any other backward reference, within the longest capture any of the declarations can make: `/^(?:(?<x>a+)|(?<x>b+))c\k<x>$/` accepts `"aaca"`.

A `\k<name>` written before a later declaration of its name is treated as a forward reference, so it stays atomic, even where a group of that name has already closed. `/^(?:(?<x>ab)\k<x>|z(?<x>q))$/` rejects `"aba"`, a prefix of `"abab"`. Renaming the duplicate avoids it.

## 👨‍🍳 Recipes

A backreference that ties a closing token to something captured earlier. Run the plain pattern in a loop to take complete matches off a buffer, and the partial one on what's left to decide whether to keep buffering. See [Stream Processing](../../README.md#stream-processing).

### Matched tags

```js
const pattern = /^<([a-zA-Z][\w:-]*)>[^<]*?<\/\1>/;
const partial = new PartialMatchRegExp(pattern);

partial.test("<esi:include");                   // true: opening tag in progress
partial.test("<esi:include>body</esi:include"); // true: closing tag in progress
partial.test("<esi:include>body</wrong>");      // false: can't recover
```

`[^<]*?` makes the first `<` start the closing tag, so a wrong close is rejected outright. `.+?` would leave almost anything a viable prefix.

### Tags that allow other tags inside

```js
const pattern =
  /^<([a-zA-Z][\w:-]*)>(?:[^<]|<(?!\/?\1\b)\/?[a-zA-Z][\w:-]*(?:\s[^<>]*)?>)*?<\/\1>/;

pattern.exec("<div><b>bold</b> text</div>tail")[0]; // "<div><b>bold</b> text</div>"
```

The negative lookahead admits any tag except the one captured, so nesting is allowed and the match stops at the first close of the outer tag. The cost is that a diverging close such as `</wro` can still read as some other tag, so it isn't rejected early.

### Quote-agnostic strings

```js
const pattern = /^(['"`])(?:\\.|(?!\1)[^\\])*?\1/;
const partial = new PartialMatchRegExp(pattern);

partial.test('"he said \\"hi'); // true: an escaped quote doesn't close it
partial.test("\"a'b");          // true: other quotes are content
```

### Fences of variable length

`````js
const pattern = /^(`{3,})\n[\s\S]*?\n\1(?!`)/;
const partial = new PartialMatchRegExp(pattern);

partial.test("````\ncode\n```"); // true: a 4-backtick fence needs a 4th to close
`````
