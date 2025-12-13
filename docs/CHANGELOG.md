# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

## [0.1.7] - 2025-12-08

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
