# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **Breaking:** `isComplete()` is replaced by `hitEnd()`, following the JDK's [`Matcher.hitEnd()`](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#hitEnd--): `true` when the match read the end of the input, so more input could change it. `isComplete(partial, match)` becomes `!hitEnd(partial, match)`, except that a greedy quantifier, `$`, `\b` or `\B` that read the end now also reports `true`
- Captures of a partial match are the closest they can be to what a full match reports: `/(abc)+\1/` on `"abcab"` gives `m[1] === "ab"`
- Split some explanatory documentation from the main `README.md`
- `exec()` on a pattern with a backreference is about 1.4x faster, restoring the speed lost in [1.3.0](#130---2026-09-06), and about 20x on a 100 kB input
- The published `package.json` no longer carries development-only fields such as `scripts`, `devDependencies` and `devEngines`

### Fixed

- A `^` under the `m` flag no longer rejects input a continuation would complete: `/\W^/m` on `"a"`
- A `^` under the `m` flag no longer accepts input no continuation can complete: `/\n-^/m` on `"\n"`
- A `^` leading a group body no longer accepts input no continuation can complete: `/(^x)/` on `"a"`
- A `^` in a modifier group under the `m` flag no longer rejects input a continuation would complete: `/\W(?i:\S*^)b/m` on `"a"`
- A modifier group whose body holds a lookbehind is no longer refused at the end of the input: `/(?i:a(?<=a))b/` on `"b"`
- A `^` leading a group that must repeat under the `m` flag no longer accepts input no continuation can complete: `/(^a){2}/m` on `"a"`
- An incomplete `\c`, `\x` or `\u` escape no longer swallows the characters after it, which threw on `/\x(a)/` and refused `/\x4g/` on `"x"`
- A group whose body no continuation can complete is no longer skipped at the end of the input: `/a(b^)/` on `"a"`
- A `^` under the `m` flag after a group that ran out part way no longer misses the earlier match: `/([a]\D)^/m` on `"a"` matches at index 0
- A backreference pattern no longer returns `null` where its re-derived captures fit a later index: `/(a?[^])\1/` on `"bab"` matches `"ab"` at index 1
- Updated JSDoc comment on `/extend` to match the class

## [1.3.0] - 2026-09-06

### Added

- `isComplete(partial: PartialMatchRegExp, match: RegExpExecArray): boolean`, reporting whether a match `exec()` returned is a match of the original pattern or merely a prefix of it — the distinction partial matching is named for, which the result previously discarded
  - Answered by re-running the compiled pattern sticky at `match.index` with an empty named group in front of each `|$(?![\s\S])` truncation branch, so any marker returned defined is a branch the match actually took. Supported on both the static and the backreference paths
  - Requires ES2018+ regardless of the pattern, since that probe uses named capturing groups internally
  - A free function — `import { isComplete } from "regex-partial-match"` — rather than a method on `PartialMatchRegExp`: a class method's code ships with every instance whether or not it's called, so putting it there would have put its ES2018+ probe machinery in every consumer's bundle. A named export doesn't fully solve this for a consumer that can't tree-shake (e.g. Deno) and has no use for `isComplete`, so `regex-partial-match/partialMatchRegExp` also exports `PartialMatchRegExp` alone, bypassing the barrel that pulls `isComplete` in

### Changed

- A `\k<name>` in a pattern that declares no named group, and a bare `\k`, are walked as the [Annex B](https://tc39.es/ecma262/#sec-regular-expressions-patterns) literals they are rather than as backreferences, correcting prefix matching, `features` reporting, and `isComplete()` throwing on them. The README's caveat listing that form as atomic has been removed, since it no longer is
- A `\N` past the pattern's own group count is rewritten to a group-count-independent literal as it is reclassified, so the truncation probe's capturing groups cannot change what it means
- The truncation probe takes the pattern's declared group names from the walk that already visited each declaration, rather than re-finding them with a regex over the raw source, which could see `(?<name>` inside a character class, where the walk correctly treats it as class content. Both the sentinel-collision check and whether a named reference inside a raw lookaround is genuine now read that one list, so neither can disagree with the walk. `isComplete()` is 10-14% faster as a result, since the scan ran over the whole source while the list holds only real declarations
- The truncation probe recognises a raw lookaround, a group open and a truncation-ending atom once via a shared `roleOf`, rather than two of its passes independently re-deriving each of them from the rendering syntax. A backreference keeps `part.ts`'s own `isBackreference` at each site, since that is what narrows the type for renumbering; it was never the duplicated half.
  - Probe construction is 7-12% faster on the static and backreference paths, and directionally faster but within measurement noise on the raw-lookaround one. Steady-state `isComplete()` calls are unaffected: the probe built either way is byte-identical
- The expansion behind a backreference match is held on the match under a private symbol rather than in a per-instance `WeakMap`, which was written to on every partial match whether or not `isComplete()` was ever called, restoring that path to within 6% of v[1.2.0](#120---2026-08-31)
- The backreference path builds its per-input regex from an array of atoms rather than a concatenated source string, so the truncation markers can be placed in it
- `compilePartial()` joins its parts directly on the static path rather than routing them through `render()`, and shares that return between both places a pattern turns out to have no backreferences
- Split `walk.ts` into `atomSyntax.ts` (the rendering-syntax constants), `part.ts` (the `Backreference`/`Part`/`RawLookaroundInfo` types and guards), `groupName.ts` (group-name extraction and decoding), and `regexFeatures.ts` (the feature bitmask), leaving `walk.ts` with only the walk itself. `compilePartial.ts`, `truncationProbe.ts`, `isComplete.ts` and `partialMatchRegExp.ts` now import each directly from the file that owns it, rather than through `walk.ts`
- Split `compilePartial.ts` into a `compilePartial/` directory, one file per helper
- Prefer `//` vs `new RegExp`, where possible, in tests
- Added more contradictory patterns to main README, and indicate that these may have shown up in fuzz as partial matches nevertheless
- `toMatchPartially()` now also checks the full string, not just its proper prefixes; the `exec()` assertions this made redundant have been removed

### Fixed

- A backreference no longer matches a *partial* copy of its captured text anywhere but at the end of input, so `new PartialMatchRegExp(/^(a?)\1(b)\2$/).exec("ab")` no longer reports a full match ([#89](https://github.com/TomStrepsil/regex-partial-match/issues/89))
- A backreference that runs the input out no longer truncates against a capture the match itself resolved differently, so `new PartialMatchRegExp(/^([ab])\1([ab])\2$/).exec("aaba")` no longer reports a full match
  - That same agreement check now compares under the pattern's own case-folding, so `new PartialMatchRegExp(/^([ab])\1([ab])\2$/i).exec("aabA")` no longer reports a full match
  - The check now also tracks case-folding *per backreference*, honouring a locally-scoped `(?i:...)`/`(?-i:...)` [modifier](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Modifier) rather than only the pattern's own flags. See [Backreferences](./caveats.md#backreferences) in the Caveats for a caveat on unpatched V8 ([nodejs/node#60030](https://github.com/nodejs/node/issues/60030))
  - `longestBakedPrefixEndingInput()` now finds the longest agreeing prefix in linear time via a Knuth–Morris–Pratt failure function, rather than a quadratic alternation that could exhaust memory on a large case-insensitive capture, and indexes by code point under `u`/`v` so an astral case-fold pair's surrogate halves aren't compared directly
- A `\1`/`\k<name>` that can't yet have participated — written before its own group, or referencing it while still open, e.g. `\1` in `/^(\1a)$/` (outside a lookbehind, which runs right-to-left and was already atomic regardless) — is now left for the engine to resolve rather than taken from the capture scan, which could hand it a value from a path it never took
- A legacy escape denoting more than one atom is now reclassified into one optional atom *per atom*, rather than one covering the whole run. `\128` is the character `\x0a` followed by a literal `8`; wrapping both together lost the prefix position between them and re-bound any following quantifier to the pair, so `/^\128*x/` — which means `\x0a` then `8*` then `x` — rejected `"\n88x"` and `"\nx"` outright, both of which the original pattern matches in full. The same applies to `\8` and `\9`, which are identity escapes rather than octal
- A backreference whose captured value is the empty string now expands to an atom of its own rather than to nothing, so a quantifier following it still has one to bind to. `new PartialMatchRegExp(/^\1*(a)/).exec("")` threw `SyntaxError: Nothing to repeat` from the per-input regex it builds
- A `\0`-led legacy octal escape (`\0`, `\012`, …) is now walked the same way as `\1`-`\9`, reclassifying a multi-digit run atom-by-atom instead of leaking its trailing digits past the walk as literal characters, which shifted prefix positions and quantifier binding. Since there's no group `0`, the walk always tags it `ref: 0` so it's never read as a genuine backreference
  - The truncation probe's raw-lookaround renumbering had the same gap, treating such a run inside `(?!…)`/`(?<=…)`/`(?<!…)` as a real backreference whenever any group preceded it — visible only through `isComplete()`, since `exec()`/`test()` never rebuild that text
- A quantifier following a backreference now applies to the whole expansion of its captured text, not just its last character: `\1*` after capturing `"ab"` grouped its per-character atoms as `(?:a|…)(?:b|…)*`, so the `*` bound only to `b` and rejected valid prefixes like `"ababa"`
- `feature-cost.bench.ts`'s "hex and unicode escapes" bench actually exercised `\cC`, a control-letter escape, not `\uXXXX`; split it into its own `\cC` bench so removing the mislabelled one didn't drop coverage
- `feature-cost.bench.ts`'s first bench group tracked emitted part count more than construct cost, reading a character class as cheaper than a plain literal and raw negative lookahead as mid-pack rather than the group's priciest construct. Each pattern's tail is now padded to a common part count, computed and asserted at bench load rather than maintained by hand
- `hot-loop.bench.ts`'s `matchAll` group built both regexes inside the timed closure, conflating construction cost with iteration cost; both are now hoisted to module scope like their manual-exec siblings

## [1.2.0] - 2026-08-31

### Added

- `lookaroundCapture` `RegexFeature`, reported when a capturing group appears lexically inside any lookaround, distinguishing e.g. `/a(?=(b))/` from `/(a)(?=b)/` — which `features` previously reported identically as `lookahead` plus `capturingGroup`

### Changed

- Made construction 27-34% faster (19% when `features` is also read), `exec()` and `test()` 8-14% faster, and the backreference path 7% faster
  - `features` is accumulated during the walk as a 32-bit mask and materialised into a `Set` on first read, rather than being built with a `Set.add` per token
  - Compiled state moved from a `#`-private field to a module-private symbol, avoiding the `WeakMap` helpers emitted for `#` fields at the `ES2015` target while preventing collisions with subclass properties
  - Compiled parts are concatenated in a single pass, rather than being mapped into an intermediate array and joined
- `features` iterates in `RegexFeature` declaration order, rather than the order the constructs first appear in the pattern, a consequence of recording them as a bit mask

## [1.1.2] - 2026-08-02

### Fixed

- Fixed the published v[1.1.1](#111---2026-08-02) package failing to load under both `import` and `require` with `SyntaxError: 'super' keyword unexpected here`, caused by the `ES2015` build target moving the `#`-private `#execDynamic()`, and its `super.exec()` call, outside the class body

## [1.1.1] - 2026-08-02

### Fixed

- Patterns with backreferences now return the leftmost match, rather than preferring a later complete match over an earlier viable partial
- Patterns with backreferences no longer read or write `lastIndex` when the pattern is neither `global` nor `sticky`, matching native `RegExp.prototype.exec` and the behaviour of patterns without backreferences
- Updated outliers to British English across docs, tests, and internal identifiers

### Changed

- Simplified `PartialMatchRegExp` internals: compiled state held as a single discriminated union, and the dynamic `exec()` pipeline extracted to its own method
- Renamed `MAYBE_HAS_BACKREFERENCE` to `MAYBE_HAS_BACKREFERENCE_REGEX`

## [1.1.0] - 2026-07-28

### Added

- `features: ReadonlySet<RegexFeature>` field of the created `PartialMatchRegExp`, indicating the discovered features found during walk of the regex

### Fixed

- Moved documentation of caveat regarding prefix-ambiguous top-level alternation to its proper location alongside backreferences, since it only applies when they exist

## [1.0.0] - 2026-07-22

### Fixed

- Fixed documentation for `y` and `g` flags
- Fixed occurrences-quantifier probing so literal braces are not misinterpreted when a later quantifier appears
- Fixed fatal out-of-memory crash when constructing from patterns containing `\k` without a closing `>`, which is a literal `k` per [Annex B](https://tc39.es/ecma262/#sec-regular-expressions-patterns) semantics, and ensured a `\k` not immediately followed by `<` is treated as that literal escape rather than fused with pattern text up to any later `>`
- Fixed character class scanning outside `v` (unicodeSets) mode to treat `[` as a literal character, ending the class at the first unescaped `]` instead of extending past the class boundary
- Fixed literal astral plane characters in unicode-aware patterns (`u`/`v` flags) being split into lone-surrogate atoms that could never match, so `README.md`'s stated behaviour of matching whole astral characters now holds for literals as well as `\u{...}` escapes
- Moved to `|$(?![\s\S]))` from `|$)` as the alternation to end-of-input, to better cater for multiline scenarios, and added a `README.md` footnote explaining why

### Changed

- **Breaking:** Raised minimum JavaScript environment from ES5 to ES2015 (ECMAScript 6) — the minimum version supporting native extension of built-in types such as `RegExp`, which `PartialMatchRegExp` relies on to override `exec()`
- **Breaking:** Removed `createPartialMatchRegex` method as default export
- Moved to [`slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice) from [`substring`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring), marginally more compact and more commonly used
- Updated `README.md` to clarify "How It Works", and consistent spelling of "behaviour" (🇬🇧)

### Added

- **Breaking:** `PartialMatchRegExp` class as default export
- `PartialMatchRegExp` constructor accepts a pattern source string plus an optional flags string, in addition to a `RegExp` instance — matching the native `RegExp` constructor's own overloads
- Support for partial matching of [backreferences](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Backreference) (`\1`, `\k<name>`) — see [docs/backreferences.md](./backreferences.md) for the architecture and the [Backreferences caveat](./caveats.md#backreferences) for known limitations
- Emojis to documentation titles

## [0.4.0] - 2026-06-13

### Fixed

- Support pass-through of multi-digit [numeric back-references](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Backreference)

## [0.3.0] - 2026-02-03

### Added

- Support for [modifiers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Modifier)

## [0.2.1] - 2026-01-24

### Added

- Note to `README.md` that `unicodeSets` / `v` flag requires ES2024+ for browser support
- Documentation of caveats around "string properties" and partial matching

### Fixed

- Add missing "Character Class Escapes" to supported features in `README.md`
- Fixup some test cases for unicode sets
  - character class wrapping escapes, since this differentiates from `u` flag
  - missing tests for unions
  - complement syntax

## [0.2.0] - 2025-12-24

### Added

- Support for [`unicodeSets`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets)
- Missing test for grapheme clusters for unicode regexes
- `toMatchPartially` and `toNotMatchPartially` test helpers

## [0.1.13] - 2025-12-21

### Fixed

- Added `default` to [`package.json#exports`](../package.json) to provide a fallback export condition for bundlers that do not support the `import` condition

## [0.1.12] - 2025-12-20

### Fixed

- Moved `package.json` [engines](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#engines) to [devEngines](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#devengines), since Node 23+ only needed for RegExp features in tests, the library itself is compatible with all versions of Node

## [0.1.11] - 2025-12-19

### Fixed

- Added link from supported features to sticky flag caveat in `README.md`

## [0.1.10] - 2025-12-14

### Changed

- `README.md` changes:
  - split `Anchors` in `Supported Features` into input / word boundaries sections
  - clarified `test()` behaviour, and added link to issue
  - added link for unicode-aware mode
- British spelling for `CODE_OF_CONDUCT.md`, and linted

### Added

- [`JSDoc`](https://jsdoc.app/) comments for public interface

## [0.1.9] - 2025-12-08

### Changed

- Moved related packages to table format

### Fixed

- Typo in `README.md`

### Added

- Missing test for literal `.` in character class expressions
- Some more "related projects" links to the `README.md`

## [0.1.8] - 2025-12-08

### Added

- `README.md` additions:
  - Caveat for non-match output
  - Caveat for positive lookbehinds
  - Link to Regex+ package

### Fixed

- Clarify modal 32 equivalence of control character escapes in test
- Improve lookaround tests
- Typo of "null control characters" to "control character escapes"

### Changed

- Removed import statement for usage examples, for brevity / consistency

## [0.1.7] - 2025-12-08

### Changed

- Simplified documentation on Backreference caveats

## [0.1.6] - 2025-12-08

### Fixed

- Fixed typo in `CONTRIBUTING.md` with old nomenclature for `createPartialMatchRegex`
- Updated import and function call in `src/extend.ts` to use the correct nomenclature for `createPartialMatchRegex`

## [0.1.5] - 2025-12-08

### Fixed

- Fixed typo in main `README.md` describing prototype extension

## [0.1.1] - 2025-12-07

### Fixed

- Updated `README.md` to remove errant statement about runtime support of features

## [0.1.0] - 2025-12-07

### Added

- Initial project setup
- Core partial matching algorithm, supporting up to ES2018 features, with caveats
- Vitest test suite
- ESLint configuration
- Documentation and examples
- Support for literal characters, character classes, escapes, quantifiers
- Support for groups, lookahead/lookbehind assertions, anchors
- Support for Unicode properties and escapes
- RegExp.prototype extension option
