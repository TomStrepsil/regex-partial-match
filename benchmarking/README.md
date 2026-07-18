# Benchmarks

Performance benchmarks for `regex-partial-match`, built with [mitata](https://github.com/nicolo-ribaudo/mitata).

## Running locally

```sh
# Pretty-print results to terminal
npm run bench --workspace=benchmarking
```

## Scenarios

### 1. Keystroke simulation (`keystroke.bench.ts`)

Models a user typing character-by-character into a validated input field. Each prefix of the full input is tested once — this is the primary real-world use case for partial matching.

Two patterns are exercised:

| Pattern | Example input | Length |
|---|---|---|
| E.164-style phone number | `+1 (555) 123-4567` | 18 chars |
| ISO 8601 date | `2024-12-31` | 10 chars |

Each group compares native `test` (always returns `false` for incomplete input) against a `createPartialMatchRegex()` result, to quantify the cost of the partial-match transform itself.

## CI integration

The workflow at [`.github/workflows/benchmark.yml`](../.github/workflows/benchmark.yml) runs on every push to `main` and on pull requests targeting `main`.

Results are stored and compared by [`benchmark-action/github-action-benchmark`](https://github.com/benchmark-action/github-action-benchmark) using the `customSmallerIsBetter` tool. A regression alert comment is posted on the PR if any benchmark regresses beyond 150% of the stored baseline (a loose threshold to account for CI runner noise).

The baseline is only updated on merges to `main` — PR runs read but do not write the baseline.

## Output format

`../.github/scripts/mitata-to-action-format.ts` converts mitata's JSON output to the `github-action-benchmark` schema:

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

Mitata v1's JSON stats are already in nanoseconds per iteration; the converter passes them through as `ns/iter`.
