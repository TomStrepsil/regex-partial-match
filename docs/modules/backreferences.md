# 🔙 Backreferences

_The backreferences module, `regex-partial-match/modules/backreferences`. To bind it, and to see what `core` refuses without it, see [the lean entry](../../README.md#the-lean-entry-regex-partial-matchcore)._

## 🧩 The problem

A backreference (`\1`, `\k<name>`) is atomic: it matches its group's whole capture or nothing, and how long that capture is, is only known at match time. So the `|$(?![\s\S])` transform (see [How It Works](../how-it-works.md)) has nowhere to go inside it. This module resolves the captures for each input, then expands each backreference into one partial atom per character:

```js
import PartialMatchRegExp from "regex-partial-match";

const re = new PartialMatchRegExp(/^(abc)+\1/);

re.exec("abc");    // partial: m[0] = "abc",    m[1] = "abc"
re.exec("abcab");  // partial: m[0] = "abcab",  m[1] = "ab"
re.exec("abcabc"); // full:    m[0] = "abcabc", m[1] = "abc"
```

## 🏗️ At construction

The pattern is walked once, into parts that every rendering below is built from, so they all agree on what is a backreference. A `\N` is a backreference only when 1 ≤ `N` ≤ the pattern's final group count. Otherwise it's an Annex B escape, split into one atom per character it stands for (`\128` is `\x0a` then `8`). The group count, and whether any group is named, come from the engine. That lookup runs only when the source may hold a `\N` or `\k<` and the pattern isn't in `u` or `v` mode.

A pattern with no backreference left compiles to the static transform. Otherwise the module builds a dynamic path:

| Rendering | A backreference becomes |
|---|---|
| static transform | `(?:\N\|$(?![\s\S]))` |
| capture scan (`preScan`) | `(?:[\s\S]*?)` |
| expansion (per `exec`) | `(?:\N\|⟨one atom per captured character⟩$(?![\s\S]))`, or `(?:\N\|$(?![\s\S]))` when the capture is `""` or `undefined` |

The scan's stand-in is lazy, so it can't swallow text a later group captures, and it can't be dropped, since everything after it would then shift.

Two kinds of backreference stay native in every rendering:

- **Inside a lookbehind or negative lookahead.** These bodies are kept as written, so the reference there is atomic.
- **Forward references:** written before their group closes, as in `/^\1?(a|b)\1/` or the self-reference `/^(\1a)$/`. Outside a lookbehind, ECMAScript always resolves them to empty, so leaving them to the engine costs nothing. A stand-in, or a scanned value, would demand text the original never required.

## ⚙️ `exec()` on the dynamic path

1. **Native first.** Run the original pattern from `start`. A match at or before `start` is returned.
2. **Bound.** Run the capture scan from `start`. If it can't begin earlier than the native match, the native match wins.
3. **Expand.** Render the expansion from the scan's captures and run it from `start`. Under `u`/`v` it splits by code point.

   Each expanded backreference leads with the native `\N`, so the engine resolves the capture whenever the input holds it in full. The per-character atoms only cover input that runs out part way through the reference. An `undefined` capture renders as plain `\N`, which is sound, though atomic for that occurrence.
4. **Agree.** The atoms a backreference truncated against must be a prefix of the capture the match itself resolved. If they aren't, the match was built from text that capture never held. In that case, expand once more from the match's own captures, starting at the first match's index. If they disagree a second time, fall back to the native match. That is sound, though it may miss a valid partial. A second re-derivation recovered nothing in testing that the first didn't.
5. **`lastIndex`.** It is written only for `g` and `y`, as native does. If any step fails, the result is the native match, never `null`.

Only `exec` is overridden. `test`, `match` and `matchAll` reach it through the standard protocol.

## Limits

These are sound but incomplete: an input is never wrongly accepted, but some valid prefixes are rejected or found late. Each one is described in [Caveats](../caveats.md#backreferences).

- references inside lookbehinds and negative lookaheads;
- captures the scan can't determine;
- top-level alternatives that share a prefix;
- a viable index that isn't the scan's leftmost;
- duplicate named groups.[^118]

### Duplicate named groups

Every `\k<name>` to a name declared more than once is treated as a forward reference, so it stays atomic. That holds even where its group has already closed, so `/^(?:(?<x>ab)\k<x>|z(?<x>q))$/` rejects `"aba"`, a prefix of `"abab"`. Renaming the duplicate avoids it.[^118]

[^118]: Tracked in [#118](https://github.com/TomStrepsil/regex-partial-match/issues/118).

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
