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

The pattern is walked once, into parts that every rendering below is built from, so they all agree on what is a backreference. A `\N` is a backreference only when 1 ≤ `N` ≤ the pattern's final group count. Otherwise it's an Annex B escape, split into one atom per character it stands for (`\128` is `\x0a` then `8`). The group count, and whether any group is named, come from the engine. That lookup runs only when the source may hold a `\N` or `\k<` and the pattern isn't in `u` or `v` mode.

A pattern with no backreference left compiles to the static transform. Otherwise each backward backreference becomes a choice of three, in this order. Written with an atomic group and a possessive quantifier, which JavaScript doesn't have, it reads:

```text
\N  →  (?:
         \N                                            the whole capture
       | (?!\N)(?![\s\S]{L+1})                         it doesn't fit, and at most L characters are left
         (?<rest>[\s\S]++)                             take the rest of the input
         (?<=(?=\k<rest>)(?>(?=\N)[\s\S]*?)\k<rest>)   the nearest occurrence of the capture before it
                                                       starts with the rest
       | (?![\s\S])(?!\N)                              nothing is left, and \N didn't already match empty
       )
```

1. **`\N`** — the whole capture, as native.
2. **Run out part way** — the rest of the input is shorter than the capture and a prefix of it. `(?!\N)` rules out the capture fitting in full, and `(?![\s\S]{L+1})` limits the rest to `L` characters. The lookbehind reads right to left: it steps back over the rest, finds the nearest point where the capture starts and commits to it, then checks the rest starts there too. Every occurrence holds the same text, so the nearest one decides, and committing to it keeps the check from reading further back. Only a group a lookahead captured further on has no occurrence before this point, and its capture can't start with the rest.
3. **`(?![\s\S])(?!\N)`** — the input ends before the backreference starts. `(?!\N)` keeps this branch from matching where `\N` already matched the same empty string, as it does when the group captured nothing. Without it, a backreference repeated at the end of the input would give the engine two ways to match each repetition, and a failing assertion after them would make it try every combination, doubling the time with each repetition, as `/(a?)\1{22}(?<=b)/` on `"c"` did.

The module writes this in native syntax, with two hidden groups, `\H` and `\G`:

```text
\N  →  (?:\N|(?!\N)(?![\s\S]{L+1})(?=([\s\S]+))(?<=(?=\N)([\s\S]*?))(?<=(?=\H)\G)\H|$(?![\s\S])(?!\N))
```

`(?=([\s\S]+))…\H` is the possessive `[\s\S]++`: a lookahead captures the rest, which can't be backtracked into, and `\H` replays it, as `regex` compiles one. The checks sit between the capture and the replay. The atomic group inside the lookbehind becomes two lookbehinds: the first captures the text from the nearest occurrence to here as `\G`, and the second steps back over `\G` and checks the rest there. `regex`'s own emulation reads forward from where a lookbehind starts but replays backward, so inside one it fails: it compiles `(?<=(?>a|ab))c` to a pattern that finds nothing in `"abc"`.

`L` is the smaller of `longestPartial` (64 by default) and the longest text the group can capture, less one. A group that captures one character at most, as `(\w)` does, needs no second branch, so its backreference stays `(?:\N|$(?![\s\S])(?!\N))`. The longest capture is read from the walk: a quantifier without a maximum, or a group holding a forward reference, makes it unbounded, and so do a group inside a lookbehind or negative lookahead and, under `v`, a class or property escape that can match a string (`[\q{abc}]`, `\p{RGI_Emoji}`).

The regex is built once, at construction. Its hidden groups are numbered among the pattern's own, so the backreferences after one, including those inside a lookbehind or negative lookahead, are renumbered past it, and `exec()` removes them from each match, and from its `d` indices, before returning it. On an engine that can't parse a lookbehind, every backreference stays `(?:\N|$(?![\s\S])(?!\N))`, so it matches only in full or at the end of the input.

Two kinds of backreference stay native:

- **Inside a lookbehind or negative lookahead.** These bodies are kept as written, so the reference there is atomic.
- **Forward references:** written before their group closes, as in `/^\1?(a|b)\1/` or the self-reference `/^(\1a)$/`. Outside a lookbehind, ECMAScript always resolves them to empty, so leaving them to the engine costs nothing.

## ⚙️ `exec()` on the dynamic path

`exec()` runs the compiled regex from `start`, so the engine tries alternatives in the pattern's own priority order, as it does for every other atom: `/(a)\1b|a/` on `"aa"` returns `"aa"`, as `/aab|a/` does. Where a lookaround holds a capturing group and the regex finds nothing at `start`, the native pattern is run too, and returned if it starts earlier: a lookahead keeps the first capture it makes, so a partial capture inside one can hide a start the native pattern finds, as in `/(?=(a|-b){1,2})\1/` on `"a-"`. Without such a group, nothing can hide a start, so the native pattern isn't run. `lastIndex` is written only for `g` and `y`, as native does.

Only `exec` is overridden. `test`, `match` and `matchAll` reach it through the standard protocol.

## 🎛️ `longestPartial`

`backreferencesWith({ longestPartial })`, from `regex-partial-match/modules` or `regex-partial-match/modules/backreferences`, returns the module with another limit, to bind with `withModules`:

```js
import { withModules } from "regex-partial-match/core";
import { carets, backreferencesWith } from "regex-partial-match/modules";

const LongTails = withModules(carets, backreferencesWith({ longestPartial: 256 }));
```

A backreference that runs out of input more than `longestPartial` characters into its capture isn't matched part way: `/(\w+)-\1/` on `"abcd-abc"` matches at 0 with the default, but at 5 with `longestPartial: 2`. `0` makes every backreference match only in full or at the end of the input. It must be a whole number up to `Number.MAX_SAFE_INTEGER`. The same options return the same module, so `withModules` returns the same class for them, and a class can bind only one backreferences module.

A backreference that fails to match reads up to `longestPartial` characters ahead before it gives up, and one that runs out part way checks its capture against what's left, so the cost grows with the limit on long input where backreferences often fail, or where the engine backtracks through many places they run out. Over an unbounded group, a pattern that backtracks heavily near the end of the input costs a multiple of the native pattern, about ten times with the default in the third column, and more where the group's capture is far back, since each check reads back to it: `/(a+b)[^]*\1(?<=#)/` on 3,200 characters is about sixty times native. Input that matches early, a stream of short inputs and construction (about 1.8 µs for `/(\w+)-\1/`) don't change. Node 24.20, one `exec()`, median of five:

| `longestPartial` | `/(\w+)-\1/` on 32,000 characters of `"foo-bar "` | `/(a\|bb+)\1-/` on 24,000 characters of `"abb"` | `/(\w+)\1(?<=x)/` on 800 `a`s (7.6 ms native) | `/^(.+)\n\1/` on a 2,000-character line and its first half | `/^<([a-zA-Z][\w:-]*)>[^<]*?<\/\1>/` per keystroke of a 259-character element |
| --: | --: | --: | --: | --: | --: |
| 0 | 0.16 ms | 0.08 ms | 7.91 ms | < 0.01 ms | 0.26 µs |
| 8 | 0.37 ms | 0.41 ms | 23.96 ms | < 0.01 ms | 0.32 µs |
| 16 | 0.36 ms | 0.48 ms | 30.99 ms | < 0.01 ms | 0.43 µs |
| 32 | 0.69 ms | 0.72 ms | 43.01 ms | < 0.01 ms | 0.33 µs |
| **64** | **1.06 ms** | **1.48 ms** | **65.56 ms** | **< 0.01 ms** | **0.36 µs** |
| 128 | 2.00 ms | 2.73 ms | 109.14 ms | < 0.01 ms | 0.36 µs |
| 256 | 3.87 ms | 3.79 ms | 159.74 ms | < 0.01 ms | 0.24 µs |
| 512 | 5.82 ms | 9.35 ms | 181.94 ms | < 0.01 ms | 0.33 µs |
| 1024 | 17.60 ms | 24.59 ms | 176.96 ms | 0.44 ms | 0.23 µs |

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
