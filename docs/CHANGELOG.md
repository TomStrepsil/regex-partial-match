# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.1] - 2026-08-02

### Fixed

- Patterns with backreferences now return the leftmost match, rather than preferring a later complete match over an earlier viable partial
- Patterns with backreferences no longer read or write `lastIndex` when the pattern is neither `global` nor `sticky`, matching native `RegExp.prototype.exec` and the behaviour of patterns without backreferences
- Updated outliers to British English across docs, tests, and internal identifiers

### Added

- Benchmark scenario for the leftmost bound check

### Changed

- Simplified `PartialMatchRegExp` internals: compiled state held as a single discriminated union, and the dynamic `exec()` pipeline extracted to its own method
- Renamed `MAYBE_HAS_BACKREFERENCE` to `MAYBE_HAS_BACKREFERENCE_REGEX`

## [1.1.0] - 2026-07-28

### Added

- Benchmark for construction cost
- `features: ReadonlySet<RegexFeature>` field of the created `PartialMatchRegExp`, indicating the discovered features found during walk of the regex

### Fixed

- Moved documentation of caveat regarding prefix-ambiguous top-level alternation to its proper location alongside backreferences, since it only applies when they exist

### Removed

- Removed confusing "multi-engine consistency" comparison that differentiates the testing style of RE2 reference implementation from the parity documentation

## [1.0.0] - 2026-07-22

### Fixed

- Pinned `package.json->devEngines->packageManager` to exact version, since corepack doesn't support semver ranges, and added a deterministic hash as a security best practice
- Added a `setup-node` action to ensure npm version is honoured in pipeline
- Fixed errant CHANGELOG version for v[0.1.8](#018---2025-12-08)
- Added missing tests for wildcard expressions
- Fixed test with UTF-16 code units to assert they match independently, properly
- Fixed documentation for `y` and `g` flags
- Fixed occurrences-quantifier probing so literal braces are not misinterpreted when a later quantifier appears
- Fixed fatal out-of-memory crash when constructing from patterns containing `\k` without a closing `>`, which is a literal `k` per [Annex B](https://tc39.es/ecma262/#sec-regular-expressions-patterns) semantics, and ensured a `\k` not immediately followed by `<` is treated as that literal escape rather than fused with pattern text up to any later `>`
- Fixed character class scanning outside `v` (unicodeSets) mode to treat `[` as a literal character, ending the class at the first unescaped `]` instead of extending past the class boundary
- Fixed literal astral plane characters in unicode-aware patterns (`u`/`v` flags) being split into lone-surrogate atoms that could never match, so `README.md`'s stated behaviour of matching whole astral characters now holds for literals as well as `\u{...}` escapes
- Moved to `|$(?![\s\S]))` from `|$)` as the alternation to end-of-input, to better cater for multiline scenarios, and added a README footnote explaining why
- Ensured Dependabot can raise PRs without being blocked by CI

### Changed

- **Breaking:** Raised minimum JavaScript environment from ES5 to ES2015 (ECMAScript 6) — the minimum version supporting native extension of built-in types such as `RegExp`, which `PartialMatchRegExp` relies on to override `exec()`
- **Breaking:** Removed `createPartialMatchRegex` method as default export
- Disabled ESLint's `@typescript-eslint/no-non-null-assertion` rule for test files (`**/*.test.ts` and `test/**/*.ts`)
- Moved to [`slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice) from [`substring`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring), marginally more compact and more commonly used
- Updated `README.md` to clarify "How It Works", and consistent spelling of "behaviour" (🇬🇧)
- Upgraded `actions/checkout` to [v7](https://github.com/actions/checkout/tree/v7)
- Upgraded `actions/github-script` to [v9](https://github.com/actions/github-script/tree/v9)
- Updated caveat re: `test()` pointing to the abandoned attempt to mitigate
- `docs/CONTRIBUTING.md` now explicitly permits ["scout rule"](https://biratkirat.medium.com/step-8-the-boy-scout-rule-robert-c-martin-uncle-bob-9ac839778385) cleanups alongside a PR's main concern, provided they're described in the PR summary (matches the pull request template's own Scout rule section), and its style guidance changed from "add comments for complex logic" to "prefer code over comments"

### Added

- Parity tests against reference implementations
  - **Apache Lucene** (`TestRegExp.java`): deep nesting / stack safety, quantifiers over empty-matching sub-expressions, Unicode case folding (σ/Σ, ῼ)
  - **JDK** (`java.util.regex` / `RegExTest.java`): `hitEnd()` semantic equivalence (non-empty exec result = prefix found), CRLF boundary in multiline mode (`caretAtEndTest`), progressive `find(pos)` via `lastIndex` (`wordSearchTest`)
  - **PCRE2** (`testdata/testinput7`, `testinput15`, `testinput17`, `testinput18`): partial-match subject modifiers (`\=ps`/`\=ph`) mapped to prefix behaviour — lookbehind + prefix continuation, CRLF newline semantics, word-boundary-sensitive prefixes
  - **Google RE2** (`tester.cc`, `exhaustive_tester.cc`): no fixed test cases to quote, so parity assessed conceptually — `UNANCHORED`/`ANCHOR_START`/`ANCHOR_BOTH` mapped to anchor usage, first-match (NFA) semantics validated against `(a|aa)\1`
- `docs/partial-match-parity.md` mapping Lucene, RE2, PCRE2 and JDK concepts to this library's API, including a cross-reference parity table
- **Breaking:** `PartialMatchRegExp` class as default export
- `PartialMatchRegExp` constructor accepts a pattern source string plus an optional flags string, in addition to a `RegExp` instance — matching the native `RegExp` constructor's own overloads
- Support for partial matching of [backreferences](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Backreference) (`\1`, `\k<name>`) — see [docs/backreferences.md](./backreferences.md) for the architecture and the [Backreferences caveat](../README.md#backreferences) for known limitations
- "benchmarking" workspace, validating `exec()` overhead, with dispatch-overhead, hot-loop (`matchAll` override-check cost), and backreference slow-path scenarios added alongside the original keystroke simulation
- `types/` folder to fix incorrect types in the standard library 
- Emojis to documentation titles

## [0.4.0] - 2026-06-13

### Fixed

- Corrected test to remove `Extended_Pictographic`, the definition of which varies between runtimes
  - Bun is "correct" / adheres to [Unicode 17](https://www.unicode.org/Public/17.0.0/ucd/emoji/emoji-data.txt), others approximate
- Support pass-through of multi-digit [numeric back-references](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Backreference)
- Added version to `package.json->devEngines->packageManager` to appease Dependabot

## [0.3.0] - 2026-02-03

### Added

- Support for [modifiers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Modifier)

### Fixed

- Moved vitest types to consistent location
- Removed redundant unicodeSets comment from unit test

## [0.2.1] - 2026-01-24

### Added

- Note to `README.md` that `unicodeSets` / `v` flag requires ES2024+ for browser support
- Test to cover [string literals in character classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class#v-mode_character_class:~:text=a%20%22string%20literal%22%20in%20a%20character%20class) when used in `v` flag expressions, as a subtraction with disjunction
- Documentation of caveats around "string properties" and partial matching

### Fixed

- Allow semver selection in ci workflow to support case-insensitive checkboxes, since that's what's valid in GitHub Flavoured Markdown
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

### Fixed

- Ensured newline after updating `CHANGELOG.md` in `release.yml`
- Ensured release pipeline sees squash merges when ascertaining `CHANGELOG.md` updates
- Ensured release pipeline looks for semver checkboxes in PR bodies, not editable squash commit bodies
- Clarified that if inadvertently selecting more than one semver checkbox, the greatest severity takes precedence

## [0.1.13] - 2025-12-21

### Fixed

- Added `default` to [`package.json#exports`](../package.json) to provide a fallback export condition for bundlers that do not support the `import` condition

## [0.1.12] - 2025-12-20

### Changed

- Updated [`actions/setup-node`](https://github.com/actions/setup-node) to version 6

### Fixed

- Moved `package.json` [engines](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#engines) to [devEngines](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#devengines), since Node 23+ only needed for RegExp features in tests, the library itself is compatible with all versions of Node

## [0.1.11] - 2025-12-19

### Fixed

- Added link from supported features to sticky flag caveat in `README.md`
- Ensured latest PR body is fetched, so that checkboxes updated after raising a PR are recognised
- Ensured new Unreleased section entry must be added for each PR, rather than Unreleased just having content

## [0.1.10] - 2025-12-14

### Changed

- Moved to "semver selection" PR template
- Release workflow is now a manual `workflow_dispatch` that creates a _draft release_, tagged appropriately based on prior PRs merged since last release and their semver selection, linked to a GitHub App
- update `pull_request_template.md` to add semver checkboxes
- `README.md` changes:
  - split `Anchors` in `Supported Features` into input / word boundaries sections
  - clarified `test()` behaviour, and added link to issue
  - added link for unicode-aware mode
- British spelling for `CODE_OF_CONDUCT.md`, and linted

### Added

- [`JSDoc`](https://jsdoc.app/) comments for public interface

### Removed

- 'Create Tag' workflow, this is now part of added release workflow

## [0.1.9] - 2025-12-08

### Changed

- Split the "ci" pipeline to separate `pull_request` and `push` (to `main`) events
  - No need to test & lint twice, with new branch protection rules
- Moved related packages to table format

### Fixed

- Typo in `README.md`

### Added

- Missing test for literal `.` in character class expressions
- Some more "related projects" links to the `README.md`
- Added default pull request template
- Added linting for markdown files

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

## [0.1.4] - 2025-12-07

### Fixed

- Move to a fine-grained PAT that should be able to write to the repo for `CHANGELOG.md` updates after release

## [0.1.3] - 2025-12-07

### Fixed

- Use a personal access token to allow `CHANGELOG.md` updates after release, since branch protection overrides not available on GH plan

## [0.1.2] - 2025-12-07

### Fixed

- Ensured tags created on merge to `main` rather than being a manual task of release creation

### Changed

- Moved to annotated git tags

## [0.1.1] - 2025-12-07

### Fixed

- Updated `README.md` to remove errant statement about runtime support of features

## [0.1.0] - 2025-12-07

### Added

- Initial project setup
- Core partial matching algorithm, supporting up to ES2018 features, with caveats
- TypeScript implementation
- Vitest test suite
- ESLint configuration
- Documentation and examples
- GitHub actions pipelines for ci, publish, release
- Support for literal characters, character classes, escapes, quantifiers
- Support for groups, lookahead/lookbehind assertions, anchors
- Support for Unicode properties and escapes
- RegExp.prototype extension option
