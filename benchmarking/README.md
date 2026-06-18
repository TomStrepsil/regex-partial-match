# Benchmarks

Performance benchmarks for `regex-partial-match`, built with [mitata](https://github.com/nicolo-ribaudo/mitata).

## Running locally

```sh
# Pretty-print results to terminal
npm run bench --workspace=benchmarking

# JSON output (used by CI)
npm run bench:ci --workspace=benchmarking
```

## Scenarios

### 1. Dispatch overhead (`dispatch-overhead.bench.ts`)

Isolates the cost of `PartialMatchRegExp`'s `exec()` override. All three candidates run the same underlying partial pattern against the same input — the only variable is whether a JavaScript wrapper sits in the call chain:

| Candidate | Notes |
|---|---|
| Native `RegExp.exec` | Baseline — no partial transform, no override |
| `createPartialMatchRegex()` result | Partial source baked into a plain `RegExp` — no class overhead |
| `PartialMatchRegExp.exec` | Partial source via the class override |

Two input cases are measured: a full match, and a partial input that returns `null` on the native regex.

### 2. Hot loop (`hot-loop.bench.ts`)

V8's string-method fast path checks whether `exec()` is overridden on every iteration of a global match loop. This scenario quantifies that cost at realistic scale (~7 KB / ~700 words).

Two loop styles are compared against their native equivalents:

- **Manual `exec` loop** (`exec` / `lastIndex` cycle) — directly exercises the override check each iteration.
- **`String.prototype.matchAll`** — after TC39 species removal, `matchAll` copies the regex internally, which may suppress the override check entirely. Benchmarking both reveals whether the overhead actually materialises.

### 3. Keystroke simulation (`keystroke.bench.ts`)

Models a user typing character-by-character into a validated input field. Each prefix of the full input is tested once — this is the primary real-world use case for partial matching.

Two patterns are exercised:

| Pattern | Example input | Length |
|---|---|---|
| E.164-style phone number | `+1 (555) 123-4567` | 18 chars |
| ISO 8601 date | `2024-12-31` | 10 chars |

Each group compares native `test` (always returns `false` for incomplete input), a plain partial `RegExp`, and `PartialMatchRegExp`.

## CI integration

The workflow at [`.github/workflows/benchmark.yml`](../.github/workflows/benchmark.yml) runs on every push to `main` and on pull requests targeting `main`.

Results are stored and compared by [`benchmark-action/github-action-benchmark`](https://github.com/benchmark-action/github-action-benchmark) using the `customSmallerIsBetter` tool. A regression alert comment is posted on the PR if any benchmark regresses beyond 150% of the stored baseline (a loose threshold to account for CI runner noise).

The baseline is only updated on merges to `main` — PR runs read but do not write the baseline.

## Output format

`scripts/to-action-format.ts` converts mitata's JSON output to the `github-action-benchmark` schema:

```json
[
  {
    "name": "<group> — <bench name>",
    "value": 123.45,
    "unit": "ns/iter",
    "range": "± 1.23",
    "extra": "min: 120ns  p75: 125ns  p99: 140ns"
  }
]
```

All timings are normalised to nanoseconds per iteration from mitata's internal second representation.
