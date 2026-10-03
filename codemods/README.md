# Codemods

This directory contains migration codemods for breaking API changes.

## Available Codemods

### v1 -> v2: [migration guide](./transforms/v1-v2/README.md)

`isComplete()` is replaced by `hitEnd()`, and the `features` getter by the `features(partial)` function. They don't depend on each other, so run them in either order:

1. `isComplete-to-hitEnd` (a **codemod**) — rewrites `isComplete(partial, match)` to `!hitEnd(partial, match)`. The rename is mechanical but the answer can change, so read the note in the guide before applying it
2. `features-getter-to-function` (a **report**) — lists every `.features` read to change to `features(x)`, and leaves every file untouched

## Development

```bash
npm test --workspace codemods
```
