# Partial matching with backreferences

## 🧩 The problem

The `|$(?![\s\S])` transform that powers `compilePartial` (see [How It Works](../README.md#how-it-works)) cannot be applied to backreferences (`\1`, `\k<name>`) because a backreference is inherently **atomic**: it must match the entire captured string or fail entirely. The length of `\1` is only known at runtime, after group 1 has matched, so there is no source-level position at which to insert the alternation.

`PartialMatchRegExp` closes this gap by resolving captures at match time and expanding each backreference into per-atom partial form:

```js
import PartialMatchRegExp from "regex-partial-match";

const re = new PartialMatchRegExp(/^(abc)+\1/);

re.exec("abc"); // partial — m[0]="abc",     m[1]="abc"
re.exec("abcab"); // partial — m[0]="abcab",   m[1]="abc"
re.exec("abcabc"); // full match — m[0]="abcabc", m[1]="abc"
```

## 🔀 Two exec paths

Patterns are classified once, at construction, by `compilePartial(regex): CompiledPartial`:

- **No genuine backreferences (`kind: "static"`)** — the pattern delegates to the static partial transform unchanged, wrapped once into a plain `RegExp` (kept as `#static` on the instance).
- **Genuine backreferences present (`kind: "dynamic"`)** — a `DynamicPath` (below) is built from the pattern and kept as `#dynamic`; `exec` runs a small pipeline per call instead of using a precomputed static regex at all.

Both paths share the same contract as the rest of the library:

- An input is accepted if it is a viable prefix of a full match under ECMAScript semantics.
- Unanchored patterns always match an empty string at true end of input; anchor with `^` to reject non-prefixes (see [Caveats](../README.md#caveats)).
- Alternation is ordered (first-match), group numbering and `undefined`-vs-`""` distinctions match the original `RegExp`, and backreferences to non-participating groups match the empty string per [ECMA-262 Backreference Matcher](https://tc39.es/ecma262/#sec-backreference-matcher) ("the backreference always succeeds" when the referenced group is `undefined`).
- Both paths return the _leftmost_ candidate — complete or partial, whichever starts first — never a later complete match in preference to an earlier viable partial.

## 🏗️ Architecture: one walk, many renderings

`walk(...)`, which `compilePartial.ts` calls, walks a pattern's source once (with a single exception noted below) building a `Part[]`:

```ts
type Part = string | Backreference;
type Backreference = NumericBackreference | NamedBackreference; // each carrying `start`/`end` (the token's span in the original source), `forward`, and either a numeric or a named `ref`
```

This same `parts` array, and the `groupCount`, `namedGroupOpenings` and `rawLookarounds` recorded alongside it, back every derived regex the library needs for that pattern: the plain partial transform, and, for backreference patterns, the capture scans and the per-exec expansion.

Keeping every rendering derived from one walk means they all agree about what counts as a backreference versus a literal character, an annex-B octal escape, or text inside a character class; a single shared source of truth rather than several independent parsers that have to agree by convention.

`compilePartial(regex): CompiledPartial` is the single entry point for every pattern, not just ones with backreferences. It walks the source once (twice only for the Annex B `\k<name>` shape described below), and reuses `parts`/`groupCount` whichever way it branches. (Backreference patterns derive three more regexes from that same walk — `originalCaptureScan`, `preScan`, `expand` — defined in the table below; the classification steps here name them as they go.)

**The one pattern shape walked twice.** The walk takes `declaresNamedGroup` because a closed `\k<name>` is a named backreference only when the pattern declares a named group, and is the Annex B literal `k<name>` otherwise. The walk cannot know which at the point it meets the reference, since the declaration may come later in the source. So `compilePartial()` walks optimistically with `true`, and walks a second time with `false` in the one case where the first pass proves itself wrong: it recorded a named reference but no named group. [^1]

[^1]: That is the only pattern shape walked twice — roughly two walk passes, ~1.7µs of extra construction, once per instance — and `benchmarking/src/construction-cost.bench.ts` measures it as its own group.

Within a single pass:

- The walk records a `Backreference` exactly where it would have emitted a backreference atom: in the main flow and inside positive-lookahead bodies. `start`/`end` are the token's span in the original source, and `forward` says whether the reference precedes its own group's opening — free to record, since the walk is already counting groups (and already collecting `namedGroupOpenings`) as it goes.
- It keeps lookbehind bodies (`(?<=`, `(?<!`) and negative lookaheads (`(?!`) as raw slices — these are verbatim contexts, so backreferences there remain atomic (see [caveat](../README.md#backreferences)).
- A cheap textual pre-filter (`MAYBE_HAS_BACKREFERENCE_REGEX = /\\[0-9]|\\k</`) against the raw source decides whether it's even worth reclassifying: if the source can't possibly contain a backreference token, `compilePartial` renders the static regex straight from `parts` and returns `{ kind: "static" }` without going any further. This never skips the walk itself (`parts`/`groupCount` are needed for the static rendering regardless) — it only skips the reclassify-and-splice work below. It's purely a performance guard, never a correctness gate: a false positive (e.g. `\1` inside a character class) just falls through to the accurate classification that follows; false negatives aren't possible, since every real backreference token starts with exactly the text this pre-filter matches.
- Otherwise, it classifies each `\N` as a genuine backreference only when `N` ≥ 1 and `N` ≤ the pattern's *final* capture-group count (counted during the same walk, incremented at every capturing-group open — plain `(` and named `(?<name>`). That separates a backreference from an octal escape, but says nothing about which side of its own group the reference sits on — a forward and a backward reference both pass it, which is why the walk records `forward` separately. A leading-zero run (`\0`, `\012`, …) is never a genuine backreference (there is no group `0`) so the walk always tags it `ref: 0`, forcing it through the same path regardless of `groupCount`. Otherwise it's an annex-B octal/literal escape, reclassified back into one optional-atom string part _per literal atom it denotes_ (`reclassifyLegacyEscapes`) — `\128` is the single character `\x0a` followed by a literal `8`, so it yields two parts, not one. Wrapping the whole run as a single atom would both lose the prefix position between them and re-bind a following quantifier to the pair (`\128*` quantifies the `8` alone). The reclassified list (`sanitisedParts`) is used to decide whether any genuine backreferences remain, and, if so, which spans `originalCaptureScan` should splice out.
- Falls back to the same static rendering — now from `sanitisedParts` — whenever, after reclassification, zero genuine backreferences remain (a pattern whose only `\N` tokens turned out to be octal escapes).
- Otherwise, returns `{ kind: "dynamic", dynamic }`, a `DynamicPath` built from the pattern (below).

All three of `originalCaptureScan`, `preScan`, and `expand` are built from the reclassified `sanitisedParts`, not the walk's original `parts`: `preScan` and `expand` render it directly, and `originalCaptureScan` splices `regex.source` at the spans of the `backreferences` list `sanitisedParts` was filtered down to. An out-of-range `\N` is therefore already plain text by the time any of the three sees it; none of them ever renders it as a backreference stand-in.

Every derived source is a rendering of `sanitisedParts`, except the very first static return above, from the pre-filter finding no possible backreference token at all, which renders straight from `parts` (identical to `sanitisedParts` there, since nothing needed reclassifying):

| Rendering                                      | `string` part                            | `Backreference` part                                                                                                                                                                    |
| ---------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| static partial transform (`kind: "static"`)    | as-is                                    | `(?:\N\|$(?![\s\S]))`                                                                                                                                                                   |
| partial pre-scan (`preScan`)                   | as-is                                    | `(?:[\s\S]*?)`                                                                                                                                                                          |
| original capture scan (`originalCaptureScan`)  | n/a — splice spans out of `regex.source` | `(?:[\s\S]*?)`                                                                                                                                                                          |
| expanded partial (`expand(capture)`, per exec) | as-is                                    | per-atom expansion of the captured value; `(?:)` when that value is `""`, so a following quantifier still has an atom to bind to; `(?:\N\|$(?![\s\S]))` when the capture is `undefined` |

A `Backreference` whose `forward` flag is set is the exception to the last three rows: it is left as the native reference everywhere, never as a stand-in and never as a captured value — `(?:\N|$(?![\s\S]))` in the two renderings that wrap atoms, and, in `originalCaptureScan`, the untouched `\N` of a span that simply isn't spliced. The reasoning is in steps 3 and 4 below.

## ⚙️ exec() pipeline (dynamic path)

A pattern with genuine backreferences never builds or uses the static `#static` regex at all — the `DynamicPath`'s three derived sources (`originalCaptureScan`, `preScan`, `expand`) fully subsume it. (The static path's own native backreference resolution already reproduces `super.exec` exactly for every input where a native match exists at any position, full or otherwise — the wrapping's `|$(?![\s\S])` branches are strictly additive, always lower-priority than the literal branch in each atom, so nothing is lost by skipping straight past it. The gap only appears where native has nothing to find, which is exactly the static path's own blind spot too: an input ending _inside_ a backreference's required text, which is atomic and can't partially consume by construction.)

1. **Full-match attempt** — `super.exec` first, from `start` (`this.lastIndex` when the pattern is `global`/`sticky` — the only flags native `exec` honours it for — otherwise `0`, since native `exec` ignores `lastIndex` entirely for a plain pattern). `start` is read _before_ this call and every later step runs from that saved value, since `super.exec` may already have reset `this.lastIndex` on failure for `g`/`y` patterns. A match at or before `start` can't be beaten by anything earlier, so it's returned immediately.
2. **Leftmost bound check** — a native match _after_ `start` doesn't win outright: `preScan` (below), run once from `start`, gives a cheap, sound lower bound on where any partial could begin, because its `(?:[\s\S]*?)` backreference stand-in is a strict superset of whatever the real per-atom expansion could match at the same spot (and a forward reference, which gets no stand-in, renders identically in both, so the bound holds there too). If that bound isn't earlier than the native match, the native match still wins — skipping the capture scan and the per-call `new RegExp` in step 3 entirely.
3. **Capture scan** — original capture scan first (group bodies intact, so a repeated group reports its last _complete_ iteration); the bound check's own `preScan` result as fallback (reused, not re-run) when the input is too short to complete even one group body.

The backreference stand-in is `(?:[\s\S]*?)` rather than nothing because removing the token would shift everything after it to an earlier position (`^(a|b)\1c` minus `\1` fails on the valid `"bbc"`); it is lazy rather than greedy so it cannot swallow characters that belong to later capturing groups (`^(a)\1(b)\2` with a greedy wildcard leaves group 2 capturing `""`). Group values are unaffected by the stand-in **only where the reference points backwards** — there the group's capture is decided before the wildcard runs. ECMAScript also permits a _forward_ reference, `\N` written before group `N` opens, and there the premise fails: the wildcard runs while the group is still unresolved, so it can consume the very text that group was about to capture. `/^\1?(a|b)\1/` on `"ab"` is the concrete failure — the stand-in for the leading `\1?` eats `"a"`, the scan reports group 1 as `"b"`, and the trailing `\1` then expands to a literal `"b"` the original never asked for. So a forward reference is left as the native `\N` in both scans, spliced out of neither.

4. **Expansion** — render the expanded partial from the scan's captures and execute it (also from `start`). Expansion is **per code point** under `u`/`v` (splitting a surrogate pair creates lone-surrogate atoms that can never match); each unit is escaped via `escapeAtom` and wrapped as `(?:atom|$(?![\s\S]))`.

**A captured value of `undefined` renders as `(?:\N|$(?![\s\S]))` — the ordinary sentinel-wrapped _native_ backreference — never as an empty string.** These are not equivalent, and the difference is a soundness bug, not a style choice: rendering as empty means the backref site imposes no constraint at all, so anything the _rest_ of that alternation branch requires collapses to sitting directly adjacent to the group. `/^(ab)\1|^(abc)\2q/` on `"abcq"` is the concrete failure — the scan settles on branch 1 (leaving group 2 undefined), and an empty rendering of `\2` lets branch 2 match `"abcq"` outright even though `"abcq"` is not a prefix of any real full match (the only one is `"abcabcq"`). Rendering as the native `\N` instead defers entirely to the _expanded regex's own_ resolution of that group: if it participates there (however that's reached — same branch, different quantifier iteration, whatever), `\N` correctly requires its actual value (atomically, no mid-backref partial matching for that specific occurrence — a completeness cost, not a soundness one); if it genuinely doesn't participate, `\N` matches empty per ECMA-262, correctly. Sound-but-sometimes-incomplete beats unsound.

**A forward reference is rendered the same way, and never from the scan, whatever the scan found.** `\N` written before group `N` opens has not participated at that point in the original, so the same ECMA-262 clause makes it match the empty string — but the scan resolves it along a path where the stand-in has already run, and reports a value the reference could never have had. Substituting it demands text the original never required: `new PartialMatchRegExp(/^\1a(b)/)` accepted `"bab"`, which `/^\1a(b)/` rejects outright, since every match of it begins with `"a"`. Deferring to the native `\N` gets both cases right — empty where the group genuinely cannot have participated, and the group's real value where an enclosing quantifier's earlier iteration gave it one, as in `/^(?:\1(a))+$/` on `"aaa"`. The cost is the same one: that site is atomic, no mid-value partial matching.

A native match still wins here if the expanded regex fails outright, or if it succeeds no earlier than the native match's own index — the pipeline only ever displaces `originalMatch` by actually starting earlier, never merely by existing.

5. **Prefer-longer reconciliation** — for each group (numbered, named, and `d`-flag indices) that is **defined in both** the scan and the expanded match, keep the longer of the two. This corrects the quantifier artifact where the expanded run reports the last _partial_ iteration (`/(abc)+\1/` on `"abcab"` → `"abc"`, not `"ab"`) while preserving backtracking to a longer alternative (`/(a|ab)\1/` on `"abab"` → `"ab"`). Requiring _both_ to be defined (not just preferring scanned-over-`undefined`) matters for the same reason as point 4: when the scan and the expanded regex resolve _different_ top-level alternatives, each leaves a different group legitimately `undefined`, and injecting a value from the other run's branch would corrupt the result (`/^(ab)\1|^(abc)\2/` on `"abca"` — scan resolves branch 1, expanded resolves branch 2 — group 1 must stay `undefined`, not get backfilled with the scan's `"ab"`). It's a targeted correction for the quantifier artifact, not a general longest-match preference.

6. **lastIndex** — on total failure (`g`/`y`), reset to `0`. On success, `this.lastIndex = expanded.lastIndex` for `global`/`sticky` patterns only (the expanded regex is freshly constructed per `exec` call with the same flags as `this`, so its own post-match `lastIndex` is already correct). Writing it unconditionally would clobber a caller-set `lastIndex` on a plain pattern down to `start` — native `exec` and the static path both leave it untouched there, so the dynamic path must too. A pipeline failure at any step above returns `originalMatch`, not `null` — once a native match is no longer returned unconditionally at step 1, a `null` here would silently discard a real complete match instead of falling back to it.

Only `exec` is overridden. `test` reaches it via `RegExpExec`; `[Symbol.match]` calls `exec` in a loop for global patterns, so overriding it would break `g`-flag iteration. `Symbol.species` keeps its default so `[Symbol.matchAll]` clones preserve partial-match behaviour.

See [README — Caveats](../README.md#caveats) for the documented limitations of this design (common-prefix top-level alternation, lookbehind/negative-lookaround atomicity, `\k<name>` with no named groups, and the scan-couldn't-determine fallback).

## 👨‍🍳 Recipes

Practical patterns for the "matched delimiter" family of problems, where a backreference ties a closing token to something captured earlier. Each of these has been verified against the current implementation.

### Matched tags (HTML/XML/ESI-style)

```js
const pattern = /^<([a-zA-Z][\w:-]*)>[^<]*?<\/\1>/;
const partial = new PartialMatchRegExp(pattern);

partial.test("<esi:include"); // true — still typing the opening tag
partial.test("<esi:include>body"); // true — still accumulating content
partial.test("<esi:include>body</esi:include"); // true — closing tag in progress
pattern.exec("<esi:include>body</esi:include>tail");
// ["<esi:include>body</esi:include>", "esi:include", ...] — stops exactly at the close
```

Pair this with the [Stream Processing](../README.md#stream-processing) recipe: run `pattern.exec` (the plain, unwrapped regex) in a loop to peel off complete matches from the buffer, and use `partial.test` only on whatever's left over to decide keep-buffering vs. discard.

The content class matters more than it looks. `.+?` (matches anything, including `<`) makes "could still be a prefix" almost always `true` — any string that opens correctly is technically a prefix of some longer string that eventually closes, since more content could always be appended later. `[^<]*?` makes the first `<` after the opening tag unambiguous: it must be the start of the closing tag, so a diverged closing attempt (`</wrong>` instead of `</esi:include>`) becomes provably unrecoverable and `partial.test` correctly returns `false` — letting a stream parser discard the buffer instead of accumulating it forever. The trade-off: no nested tags of any kind are allowed in content under this grammar.

### Tags that tolerate nested (other-named) tags

If nested tags need to be allowed, but only the _outermost_ tag's own close should end the match:

```js
const pattern =
  /^<([a-zA-Z][\w:-]*)>(?:[^<]|<(?!\/?\1\b)\/?[a-zA-Z][\w:-]*(?:\s[^<>]*)?>)*?<\/\1>/;
const partial = new PartialMatchRegExp(pattern);

pattern.exec("<div><b>bold</b> text</div>tail");
// ["<div><b>bold</b> text</div>", "div", ...] — stops at the first </div>, regardless of nesting
```

The content loop accepts either an ordinary character or a _complete_ tag token whose name is checked — via a backreference inside a negative lookahead — to not be `\1`. That lookahead is what lets differently-named tags nest freely while still forcing the match to stop at the first tag that actually matches the backreference.

Compared to the plain `[^<]*?` version, this trades away some rejection power in exchange for nesting support: once `<` is legal as ordinary content, a diverging close attempt (`</wro`) can always be reinterpreted as "the start of some other tag" rather than a hard failure, so `partial.test` only rejects inputs that can't possibly form _any_ valid tag token (`<3`, `<-bad`), not inputs that merely diverge from the specific tag being closed. Re-opening or re-closing the _same_ tag name inside the content is still rejected outright — the lookahead blocks re-entry in both directions — which is a clean `false`/no-match rather than a silent match at the wrong nesting depth.

### Quote-agnostic string literals

A lexer that accepts `'...'`, `"..."`, or `` `...` `` without knowing in advance which quote character opens a given token:

```js
const pattern = /^(['"`])(?:\\.|(?!\1)[^\\])*?\1/;
const partial = new PartialMatchRegExp(pattern);

partial.test('"he said \\"hi'); // true — an escaped quote doesn't close the string
partial.test("\"a'b"); // true — the *other* quote characters are just content
pattern.exec('"a\'b" tail'); // ["\"a'b\"", "\"", ...]
```

The backreference is what lets one pattern serve all three quote styles: the closing delimiter is whatever character opened the literal, not a fixed character baked into the source.

### Fenced code blocks with variable-length delimiters

Markdown-style fences, where the closing fence must repeat the exact backtick run length used to open (and must not itself be a prefix of a longer run):

`````js
const pattern = /^(`{3,})\n[\s\S]*?\n\1(?!`)/;
const partial = new PartialMatchRegExp(pattern);

partial.test("````\ncode\n```"); // true — only 3 backticks so far, needs a 4th to close a 4-backtick fence
pattern.exec("````\ncode\n````\nmore");
// ["````\ncode\n````", "````", ...] — closes only once the run length matches exactly
`````

Useful for incrementally validating streamed markdown (or any block format with a caller-chosen, variable-length delimiter) without re-scanning from the start on every chunk.
