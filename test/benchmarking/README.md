# Benchmarks

Performance benchmarks for `regex-partial-match`, built with [mitata](https://github.com/nicolo-ribaudo/mitata).

## 🏃 Running locally

```sh
# Pretty-print results to terminal
npm run bench --workspace=test/benchmarking
```

## 🎯 Scenarios

### 1. Dispatch overhead (`dispatch-overhead.bench.ts`)

Isolates the cost of `PartialMatchRegExp`'s `exec()` override. All three candidates run the same underlying partial pattern against the same input — the only variable is whether a JavaScript wrapper sits in the call chain:

| Candidate                 | Notes                                                          |
| ------------------------- | -------------------------------------------------------------- |
| Native `RegExp.exec`      | Baseline — no partial transform, no override                   |
| `compilePartial()` result | Partial source baked into a plain `RegExp` — no class overhead |
| `PartialMatchRegExp.exec` | Partial source via the class override                          |

Two input cases are measured: a full match, and a partial input that returns `null` on the native regex.

### 2. Hot loop (`hot-loop.bench.ts`)

V8's string-method fast path checks whether `exec()` is overridden on every iteration of a global match loop. This scenario quantifies that cost at realistic scale (~7 KB / ~700 words).

Two loop styles are compared against their native equivalents:

- **Manual `exec` loop** (`exec` / `lastIndex` cycle) — directly exercises the override check each iteration.
- **`String.prototype.matchAll`** — after TC39 species removal, `matchAll` copies the regex internally, which may suppress the override check entirely. Benchmarking both reveals whether the overhead actually materialises.

### 3. Keystroke simulation (`keystroke.bench.ts`)

Models a user typing character-by-character into a validated input field. Each prefix of the full input is tested once — this is the primary real-world use case for partial matching.

Two patterns are exercised:

| Pattern                  | Example input       | Length   |
| ------------------------ | ------------------- | -------- |
| E.164-style phone number | `+1 (555) 123-4567` | 18 chars |
| ISO 8601 date            | `2024-12-31`        | 10 chars |

Each group compares native `test` (always returns `false` for incomplete input), a plain partial `RegExp`, and `PartialMatchRegExp` on the fast path.

### 4. Backreference path (`backref-slow-path.bench.ts`)

When `exec()` is called on a partial input that contains backreferences, the path constructs a per-input `RegExp` on every call (capture scan → pattern substitution → `new RegExp()`). This is the most expensive code path.

Two patterns are used to cover different positions within a backreference:

| Pattern                                           | Example              |
| ------------------------------------------------- | -------------------- |
| Repeated word (`/^(\w+) \1$/`)                    | `"foo foo"`          |
| HTML open/close tag (`/^<([a-z]+)>[^<]+<\/\1>$/`) | `"<div>hello</div>"` |

Each pattern is measured at three stages — full match (native fast path), partial input before the backreference atom is reached, and partial input mid-backreference — plus an accumulated keystroke simulation that sums the cost over all prefixes.

A fourth group covers a native complete match at a *non-zero* index, where `exec()` must confirm no earlier partial exists before trusting it (see [docs/backreferences.md](../../docs/backreferences.md) — "Leftmost bound check"): once when the cheap `preScan` bound rejects outright (native wins, pipeline skipped), and once when the bound is loose enough that the full slow-path pipeline still has to run even though the native match wins in the end.

### 5. Construction cost (`construction-cost.bench.ts`)

Scenarios 1-4 build every candidate once outside the timed loop, so they never see the cost of `compilePartial()`'s walk()/render() pass — the one-time parsing work done per `new PartialMatchRegExp()`. This scenario isolates that cost so walk additions can be tracked independently of the exec-time scenarios above.

| Candidate                  | Notes                                         |
| -------------------------- | --------------------------------------------- |
| Native `new RegExp()`      | Baseline — no parsing beyond V8's own compile |
| `compilePartial()`         | Walk + render, no class overhead              |
| `new PartialMatchRegExp()` | `compilePartial()` plus class construction    |

Three patterns span the complexity range the walker branches on:

| Pattern               | Notes                                                            |
| --------------------- | ---------------------------------------------------------------- |
| Simple (`/^hello+$/`) | No groups, no character classes, no backreferences               |
| Phone number          | Several character classes and optional groups, no backreferences |
| HTML tag              | Capturing group + backreference — exercises the dynamic path     |
| Legacy escape         | `\7` and `\k<none>` — exercises the reclassification pass        |

### 6. `isComplete()` (`is-complete.bench.ts`)

`isComplete()` re-runs a twin of the compiled pattern to recover whether a match took a truncation branch. The twin is built lazily, so the cost splits in two and both halves are tracked: the one-off probe build, and the steady-state cost of one anchored `exec` per call thereafter. In each group the probe build is the delta between the first two benches, which differ only by the `isComplete()` call.

The two paths cache the probe at different granularities, which is why they are measured separately:

| Path           | Probe cached on | Consequence                                                   |
| -------------- | --------------- | ------------------------------------------------------------- |
| Static         | The instance    | Every later call on that instance is steady state             |
| Backreference  | The expansion   | Cached per *match* — a fresh match builds a fresh probe       |

The last two benches in the backreference group are that difference, and are the ones to watch: asking about the same match repeatedly is cheap, while asking once per match is roughly an order of magnitude more expensive. A third group covers a raw lookaround, the one case where probe construction does more than splice a marker into each truncation branch — the backreferences inside it have to be renumbered past every marker added before them.

### 7. Feature cost (`feature-cost.bench.ts`)

Scenario 5 tracks whole realistic patterns end to end; this one isolates *which construct* the walker is paying for, one bench per feature, so a change to a single `switch` case shows up against its neighbours instead of being averaged into a realistic pattern.

Every pattern in the first group is the same shape — an anchor, the construct under test, a literal tail — and the tail is padded with plain literal characters until every pattern compiles to the same emitted part count. Construction cost tracks that part count as closely as it tracks source length, so leaving it uncontrolled would rank patterns by how few parts their construct collapses into rather than by what the construct costs: a character class or property escape would read as cheaper than a plain literal purely because it leaves fewer parts behind. Equalising part count removes that confound, though not every variable — source length past the padding, and flags like `u`/`v`, still differ between benches. It does reclassify raw lookaheads and lookbehinds as the most expensive constructs in the group rather than the mid-pack result their part count alone suggests: like a positive lookahead, the walker recurses into the body to find its extent and count the capturing groups inside it, but then discards that recursive work and copies the same span again as a single source slice, rather than reusing it the way a lookahead does.

Two further groups cover the constructs that decide which compiled path a pattern lands on. A backreference forces the dynamic path; a legacy escape (`\7` past the group count, or `\k<name>` in a pattern declaring no named group) is an Annex B literal and must not. That distinction costs something at construction — more for `\k<name>`, which pays for the second walk — but is worth better than an order of magnitude at `exec()`, since the dynamic path rebuilds a `RegExp` per call. So it is measured at both.

## 🤖 CI integration

The workflow at [`.github/workflows/benchmark.yml`](../../.github/workflows/benchmark.yml) runs on every push to `main` and on pull requests targeting `main`.

Results are stored and compared by [`benchmark-action/github-action-benchmark`](https://github.com/benchmark-action/github-action-benchmark) using the `customSmallerIsBetter` tool. A regression alert comment is posted on the PR if any benchmark regresses beyond 150% of the stored baseline (a loose threshold to account for CI runner noise).

The baseline is only updated on merges to `main` — PR runs read but do not write the baseline.

## 📊 Output format

`../../.github/scripts/mitata-to-action-format.ts` converts mitata's JSON output to the `github-action-benchmark` schema:

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
