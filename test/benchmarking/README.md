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

A fifth group guards a bound rather than a cost. When a backreference's captured text has to be checked against the input, only the last `capture.length` characters of the input can decide the answer, so the two benches in it differ solely in how much irrelevant text precedes the part that does. They are read together: if that check ever goes back to scanning the whole input, the long one grows away from the short one while everything else here holds still.

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
| Legacy escape         | `\7` and `\k<none>` — exercises the Annex B classification       |

### 6. `hitEnd()` (`hit-end.bench.ts`)

`hitEnd()` re-runs a twin of the compiled pattern to recover whether a match took a truncation branch. The twin is built lazily, so the cost splits in two and both halves are tracked: the one-off probe build, and the steady-state cost of one anchored `exec` per call thereafter. In each group the probe build is the delta between the first two benches, which differ only by the `hitEnd()` call.

The two paths cache the probe at different granularities, which is why they are measured separately:

| Path          | Probe cached on                   | Consequence                                                                                         |
| ------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Static        | The instance                       | Every later call on that instance is steady state                                                    |
| Backreference | The instance, keyed by expansion   | Fresh matches whose captures expand alike share the same probe; a capture that differs rebuilds it   |

The last three benches in the backreference group are that difference, and are the ones to watch: asking about the same match repeatedly is cheap, a fresh match with the same capture is just as cheap since it reuses the cached expansion probe, and only a fresh match with a *different* capture pays to rebuild — roughly an order of magnitude more expensive. A further group covers a raw lookaround, the one case where probe construction does more than splice a marker into each truncation branch — the backreferences inside it have to be renumbered past every marker added before them.

Three more groups cover marking kinds this scenario's predecessor (`isComplete()`) never had a probe for: a word boundary at a truncation point, which splices in two markers instead of one; a greedy open-ended quantifier or a trailing `$` reading the end on its own, with no backreference or exact-count atom behind it; and an optional atom right at the end, spliced in by rewriting the previous probed segment rather than appending a marker. All three are cheap, single-instance, static-path probes, so each is measured the same way as the ISO date group above.

### 7. Feature cost (`feature-cost.bench.ts`)

Scenario 5 tracks whole realistic patterns end to end; this one isolates *which construct* the walker is paying for, one bench per feature, so a change to a single `switch` case shows up against its neighbours instead of being averaged into a realistic pattern.

Every pattern in the first group is the same shape — an anchor, the construct under test, a literal tail — and the tail is padded with plain literal characters until every pattern compiles to the same emitted part count. Construction cost tracks that part count as closely as it tracks source length, so leaving it uncontrolled would rank patterns by how few parts their construct collapses into rather than by what the construct costs: a character class or property escape would read as cheaper than a plain literal purely because it leaves fewer parts behind. Equalising part count removes that confound, though not every variable — source length past the padding, and flags like `u`/`v`, still differ between benches. It does reclassify raw lookaheads and lookbehinds as the most expensive constructs in the group rather than the mid-pack result their part count alone suggests: like a positive lookahead, the walker recurses into the body to find its extent and count the capturing groups inside it, but then discards that recursive work and copies the same span again as a single source slice, rather than reusing it the way a lookahead does.

Two further groups cover the constructs that decide which compiled path a pattern lands on. A backreference forces the dynamic path; a legacy escape (`\7` past the group count, or `\k<name>` in a pattern declaring no named group) is an Annex B literal and must not. That distinction costs something at construction (a native group pre-count taken once per instance, shared by both spellings) but is worth better than an order of magnitude at `exec()`, since the dynamic path rebuilds a `RegExp` per call. So it is measured at both.

### 8. Calibration (`calibration.bench.ts`)

Not a subject under test. Two native-`RegExp` workloads — one `exec`, one `new RegExp()` — measure the machine the job landed on, so the converter can report every other benchmark as a ratio rather than in nanoseconds.

Every published number is a ratio to these two, so changing either workload — or the membership of the group — puts every later result on a different scale from every earlier one, a step on every chart that looks like a real change and is not. Both are therefore frozen: to measure something new, add a bench to one of the scenario files rather than to this group. The construction argument is a `RegExp` and not its source string for the same reason — `new RegExp(regexp)` and `new RegExp(string)` are different constructor paths and differ by about 1.2x, so tidying it away rebases everything. The converter refuses to run unless the group yields exactly two results, so neither losing one nor adding a third can pass unnoticed.

The two duplicate the native baselines in `dispatch-overhead.bench.ts` and `construction-cost.bench.ts` on purpose: those are scenario benches and stay free to change, while these have to hold still.

Two workloads rather than one because the suite spans exec-bound benches and construction-bound benches, and runners do not scale the two identically; blending the two swings less than either alone.

## 🤖 CI integration

The workflow at [`.github/workflows/benchmark.yml`](../../.github/workflows/benchmark.yml) runs on every push to `main` and on pull requests targeting `main`.

Results are stored and compared by [`benchmark-action/github-action-benchmark`](https://github.com/benchmark-action/github-action-benchmark) using the `customSmallerIsBetter` tool. A regression alert comment is posted on the PR if any benchmark regresses beyond 150% of the stored baseline.

Numbers are compared as a ratio to the calibration group, not in nanoseconds, so a regression alert reflects the code rather than which machine the job landed on. No nanosecond figure is lost: every point carries its own, and the calibration it was divided by, in its tooltip. The oldest stored points predate the blended calibration and are bridged from a single native workload, at some cost in noise; those say so in their tooltip.

The baseline is only updated on merges to `main` — PR runs read but do not write the baseline.

## 📊 Output format

`../../.github/scripts/mitata-to-action-format.ts` converts mitata's JSON output to the `github-action-benchmark` schema:

```json
[
  {
    "name": "<group> — <bench name>",
    "value": 1.6459,
    "unit": "× calibration",
    "range": "± 0.0143",
    "extra": "90.43ns  (min: 88.10ns  p75: 91.20ns  p99: 99.40ns)  calibration: 54.94ns"
  }
]
```

Mitata v1's JSON stats are already in nanoseconds per iteration. The converter divides each one by the geometric mean of the calibration group and reports the ratio, keeping the raw nanoseconds and the calibration figure in `extra` so absolute cost and machine speed both stay visible. The calibration benches themselves are not emitted.
