# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- explicitly use PAT token for git push

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

- Updated [`README.md`](../README.md) to remove errant statement about runtime support of features

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
