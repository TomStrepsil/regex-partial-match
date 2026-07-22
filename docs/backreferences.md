# Partial matching with backreferences

## 🧩 The problem

The `|$(?![\s\S])` transform that powers `compilePartial` (see [How It Works](../README.md#how-it-works)) cannot be applied to backreferences (`\1`, `\k<name>`) because a backreference is inherently **atomic**: it must match the entire captured string or fail entirely. The length of `\1` is only known at runtime, after group 1 has matched, so there is no source-level position at which to insert the alternation.

`PartialMatchRegExp` closes this gap by resolving captures at match time and expanding each backreference into per-atom partial form:

```js
import PartialMatchRegExp from "regex-partial-match";

const re = new PartialMatchRegExp(/^(abc)+\1/);

re.exec("abc");     // partial — m[0]="abc",     m[1]="abc"
re.exec("abcab");   // partial — m[0]="abcab",   m[1]="abc"
re.exec("abcabc");  // full match — m[0]="abcabc", m[1]="abc"
```

## 🔀 Two exec paths

Patterns are classified once, at construction, by `compilePartial(regex): CompiledPartial`:

- **No genuine backreferences (`kind: "static"`)** — the pattern delegates to the static partial transform unchanged, wrapped once into a plain `RegExp` (kept as `#static` on the instance).
- **Genuine backreferences present (`kind: "dynamic"`)** — a `DynamicPath` (below) is built from the pattern and kept as `#dynamic`; `exec` runs a small pipeline per call instead of using a precomputed static regex at all.

Both paths share the same contract as the rest of the library:

- An input is accepted if it is a viable prefix of a full match under ECMAScript semantics.
- Unanchored patterns always match an empty string at true end of input; anchor with `^` to reject non-prefixes (see [Caveats](../README.md#caveats)).
- Alternation is ordered (first-match), group numbering and `undefined`-vs-`""` distinctions match the original `RegExp`, and backreferences to non-participating groups match the empty string per [ECMA-262 Backreference Matcher](https://tc39.es/ecma262/#sec-backreference-matcher) ("the backreference always succeeds" when the referenced group is `undefined`).

## 🏗️ Architecture: one walk, many renderings

`compilePartial.ts`'s internal `walk(regex)` walks a pattern's source exactly once, building a `Part[]` (`type Part = string | Backreference`; `type Backreference = NumericBackreference | NamedBackreference`, each carrying `start`/`end` — the token's span in the original source — plus either a numeric or a named `ref`). This same `parts` array, and the `groupCount` counted alongside it, back every derived regex the library needs for that pattern — the plain partial transform, and, for backreference patterns, the capture scans and the per-exec expansion. Keeping every rendering derived from one walk means they all agree about what counts as a backreference versus a literal character, an annex-B octal escape, or text inside a character class — a single shared source of truth rather than several independent parsers that have to agree by convention.

`compilePartial(regex): CompiledPartial` is the single entry point for every pattern, not just ones with backreferences — it always walks the source once, and reuses `parts`/`groupCount` whichever way it branches:

- The walk records a `Backreference` exactly where it would have emitted a backreference atom: in the main flow and inside positive-lookahead bodies. `start`/`end` are the token's span in the original source.
- It keeps lookbehind bodies (`(?<=`, `(?<!`) and negative lookaheads (`(?!`) as raw slices — these are verbatim contexts, so backreferences there remain atomic (see [caveat](../README.md#backreferences)).
- A cheap textual pre-filter (`MAYBE_HAS_BACKREFERENCE = /\\[1-9]|\\k</`) against the raw source decides whether it's even worth reclassifying: if the source can't possibly contain a backreference token, `compilePartial` renders the static regex straight from `parts` and returns `{ kind: "static" }` without going any further. This never skips the walk itself (`parts`/`groupCount` are needed for the static rendering regardless) — it only skips the reclassify-and-splice work below. It's purely a performance guard, never a correctness gate: a false positive (e.g. `\1` inside a character class) just falls through to the accurate classification that follows; false negatives aren't possible, since every real backreference token starts with exactly the text this pre-filter matches.
- Otherwise, it classifies each `\N` as a genuine backreference only when `N` ≤ the pattern's capture-group count (counted during the same walk, incremented at every capturing-group open — plain `(` and named `(?<name>`). Otherwise it's an annex-B octal/literal escape, reclassified back into a plain optional-atom string part (`reclassifyOctalEscapes`); the reclassified list (`sanitizedParts`) is used to decide whether any genuine backreferences remain, and, if so, which spans `originalCaptureScan` should splice out.
- Falls back to the same static rendering — now from `sanitizedParts` — whenever, after reclassification, zero genuine backreferences remain (a pattern whose only `\N` tokens turned out to be octal escapes).
- Otherwise, returns `{ kind: "dynamic", dynamic }`, a `DynamicPath` built from the pattern (below).

Only `originalCaptureScan` is built from the reclassified `sanitizedParts`. `preScan` and `expand` both render from the original, unreclassified `parts`, so a `\N` that turned out to be an out-of-range octal escape still gets treated there as a wildcard backreference. That's harmless, not a divergent code path: `capture[N]` for such a ref is always `undefined` (the capture array only has entries for real groups), so `expand`'s `captured === undefined` branch renders it right back into the same literal-with-alternation form `reclassifyOctalEscapes` would have produced directly.

Every derived source is a rendering of `parts` (or, for the static fallback after reclassification and for `originalCaptureScan`, `sanitizedParts`):

| Rendering | `string` part | `Backreference` part |
|---|---|---|
| static partial transform (`kind: "static"`) | as-is | `(?:\N\|$(?![\s\S]))` |
| partial pre-scan (`preScan`) | as-is | `(?:[\s\S]*?)` |
| original capture scan (`originalCaptureScan`) | n/a — splice spans out of `regex.source` | `(?:[\s\S]*?)` |
| expanded partial (`expand(capture)`, per exec) | as-is | per-atom expansion of the captured value, or `(?:\N\|$(?![\s\S]))` when the capture is `undefined` |

## ⚙️ exec() pipeline (dynamic path)

A pattern with genuine backreferences never builds or uses the static `#static` regex at all — the `DynamicPath`'s three derived sources (`originalCaptureScan`, `preScan`, `expand`) fully subsume it. (The static path's own native backreference resolution already reproduces `super.exec` exactly for every input where a native match exists at any position, full or otherwise — the wrapping's `|$(?![\s\S])` branches are strictly additive, always lower-priority than the literal branch in each atom, so nothing is lost by skipping straight past it. The gap only appears where native has nothing to find, which is exactly the static path's own blind spot too: an input ending *inside* a backreference's required text, which is atomic and can't partially consume by construction.)

1. **Full-match attempt** — `super.exec` first. Complete inputs get native performance and exact semantics, and `this.lastIndex` bookkeeping for this branch is entirely native (no copying needed, since `super.exec` reads/writes it directly on `this`).
2. **Capture scan** — original capture scan first (group bodies intact, so a repeated group reports its last *complete* iteration); partial pre-scan as fallback when the input is too short to complete even one group body. Both scans run from `start = this.lastIndex` (captured *before* `super.exec`, since that call may already have reset it on failure for `g`/`y` patterns).

   The backreference stand-in is `(?:[\s\S]*?)` rather than nothing because removing the token would shift everything after it to an earlier position (`^(a|b)\1c` minus `\1` fails on the valid `"bbc"`); it is lazy rather than greedy so it cannot swallow characters that belong to later capturing groups (`^(a)\1(b)\2` with a greedy wildcard leaves group 2 capturing `""`). Group values are unaffected by the stand-in because ECMAScript backreferences always point backwards — the group's capture is decided before the wildcard runs.
3. **Expansion** — render the expanded partial from the scan's captures and execute it (also from `start`). Expansion is **per code point** under `u`/`v` (splitting a surrogate pair creates lone-surrogate atoms that can never match); each unit is escaped via `escapeAtom` and wrapped as `(?:atom|$(?![\s\S]))`.

   **A captured value of `undefined` renders as `(?:\N|$(?![\s\S]))` — the ordinary sentinel-wrapped *native* backreference — never as an empty string.** These are not equivalent, and the difference is a soundness bug, not a style choice: rendering as empty means the backref site imposes no constraint at all, so anything the *rest* of that alternation branch requires collapses to sitting directly adjacent to the group. `/^(ab)\1|^(abc)\2q/` on `"abcq"` is the concrete failure — the scan settles on branch 1 (leaving group 2 undefined), and an empty rendering of `\2` lets branch 2 match `"abcq"` outright even though `"abcq"` is not a prefix of any real full match (the only one is `"abcabcq"`). Rendering as the native `\N` instead defers entirely to the *expanded regex's own* resolution of that group: if it participates there (however that's reached — same branch, different quantifier iteration, whatever), `\N` correctly requires its actual value (atomically, no mid-backref partial matching for that specific occurrence — a completeness cost, not a soundness one); if it genuinely doesn't participate, `\N` matches empty per ECMA-262, correctly. Sound-but-sometimes-incomplete beats unsound.
4. **Prefer-longer reconciliation** — for each group (numbered, named, and `d`-flag indices) that is **defined in both** the scan and the expanded match, keep the longer of the two. This corrects the quantifier artifact where the expanded run reports the last *partial* iteration (`/(abc)+\1/` on `"abcab"` → `"abc"`, not `"ab"`) while preserving backtracking to a longer alternative (`/(a|ab)\1/` on `"abab"` → `"ab"`). Requiring *both* to be defined (not just preferring scanned-over-`undefined`) matters for the same reason as point 3: when the scan and the expanded regex resolve *different* top-level alternatives, each leaves a different group legitimately `undefined`, and injecting a value from the other run's branch would corrupt the result (`/^(ab)\1|^(abc)\2/` on `"abca"` — scan resolves branch 1, expanded resolves branch 2 — group 1 must stay `undefined`, not get backfilled with the scan's `"ab"`). It's a targeted correction for the quantifier artifact, not a general longest-match preference.
5. **lastIndex** — on total failure (`g`/`y`), reset to `0`. On success, `this.lastIndex = expanded.lastIndex` (the expanded regex is freshly constructed per `exec` call with the same flags as `this`, so its own post-match `lastIndex` is already correct).

Only `exec` is overridden. `test` reaches it via `RegExpExec`; `[Symbol.match]` calls `exec` in a loop for global patterns, so overriding it would break `g`-flag iteration. `Symbol.species` keeps its default so `[Symbol.matchAll]` clones preserve partial-match behaviour.

See [README — Caveats](../README.md#caveats) for the documented limitations of this design (common-prefix top-level alternation, lookbehind/negative-lookaround atomicity, `\k<name>` with no named groups, and the scan-couldn't-determine fallback).

## 👨‍🍳 Recipes

Practical patterns for the "matched delimiter" family of problems, where a backreference ties a closing token to something captured earlier. Each of these has been verified against the current implementation.

### Matched tags (HTML/XML/ESI-style)

```js
const pattern = /^<([a-zA-Z][\w:-]*)>[^<]*?<\/\1>/;
const partial = new PartialMatchRegExp(pattern);

partial.test("<esi:include");                    // true — still typing the opening tag
partial.test("<esi:include>body");               // true — still accumulating content
partial.test("<esi:include>body</esi:include");  // true — closing tag in progress
pattern.exec("<esi:include>body</esi:include>tail");
// ["<esi:include>body</esi:include>", "esi:include", ...] — stops exactly at the close
```

Pair this with the [Stream Processing](../README.md#stream-processing) recipe: run `pattern.exec` (the plain, unwrapped regex) in a loop to peel off complete matches from the buffer, and use `partial.test` only on whatever's left over to decide keep-buffering vs. discard.

The content class matters more than it looks. `.+?` (matches anything, including `<`) makes "could still be a prefix" almost always `true` — any string that opens correctly is technically a prefix of some longer string that eventually closes, since more content could always be appended later. `[^<]*?` makes the first `<` after the opening tag unambiguous: it must be the start of the closing tag, so a diverged closing attempt (`</wrong>` instead of `</esi:include>`) becomes provably unrecoverable and `partial.test` correctly returns `false` — letting a stream parser discard the buffer instead of accumulating it forever. The trade-off: no nested tags of any kind are allowed in content under this grammar.

### Tags that tolerate nested (other-named) tags

If nested tags need to be allowed, but only the *outermost* tag's own close should end the match:

```js
const pattern = /^<([a-zA-Z][\w:-]*)>(?:[^<]|<(?!\/?\1\b)\/?[a-zA-Z][\w:-]*(?:\s[^<>]*)?>)*?<\/\1>/;
const partial = new PartialMatchRegExp(pattern);

pattern.exec("<div><b>bold</b> text</div>tail");
// ["<div><b>bold</b> text</div>", "div", ...] — stops at the first </div>, regardless of nesting
```

The content loop accepts either an ordinary character or a *complete* tag token whose name is checked — via a backreference inside a negative lookahead — to not be `\1`. That lookahead is what lets differently-named tags nest freely while still forcing the match to stop at the first tag that actually matches the backreference.

Compared to the plain `[^<]*?` version, this trades away some rejection power in exchange for nesting support: once `<` is legal as ordinary content, a diverging close attempt (`</wro`) can always be reinterpreted as "the start of some other tag" rather than a hard failure, so `partial.test` only rejects inputs that can't possibly form *any* valid tag token (`<3`, `<-bad`), not inputs that merely diverge from the specific tag being closed. Re-opening or re-closing the *same* tag name inside the content is still rejected outright — the lookahead blocks re-entry in both directions — which is a clean `false`/no-match rather than a silent match at the wrong nesting depth.

### Quote-agnostic string literals

A lexer that accepts `'...'`, `"..."`, or `` `...` `` without knowing in advance which quote character opens a given token:

```js
const pattern = /^(['"`])(?:\\.|(?!\1)[^\\])*?\1/;
const partial = new PartialMatchRegExp(pattern);

partial.test('"he said \\"hi');   // true — an escaped quote doesn't close the string
partial.test("\"a'b");            // true — the *other* quote characters are just content
pattern.exec("\"a'b\" tail");     // ["\"a'b\"", "\"", ...]
```

The backreference is what lets one pattern serve all three quote styles: the closing delimiter is whatever character opened the literal, not a fixed character baked into the source.

### Fenced code blocks with variable-length delimiters

Markdown-style fences, where the closing fence must repeat the exact backtick run length used to open (and must not itself be a prefix of a longer run):

```js
const pattern = /^(`{3,})\n[\s\S]*?\n\1(?!`)/;
const partial = new PartialMatchRegExp(pattern);

partial.test("````\ncode\n```");   // true — only 3 backticks so far, needs a 4th to close a 4-backtick fence
pattern.exec("````\ncode\n````\nmore");
// ["````\ncode\n````", "````", ...] — closes only once the run length matches exactly
```

Useful for incrementally validating streamed markdown (or any block format with a caller-chosen, variable-length delimiter) without re-scanning from the start on every chunk.
