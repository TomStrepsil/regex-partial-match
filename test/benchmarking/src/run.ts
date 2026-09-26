/**
 * Benchmark entry point. Imports all scenario files (which register their
 * bench/group calls globally in mitata) then calls run().
 *
 * Usage (from the repo root; `prebench` builds `lib/`, which the scenarios import):
 *   npm run bench --workspace=test/benchmarking                    — pretty-print results to terminal
 *   npm run bench --workspace=test/benchmarking --silent -- --json — output mitata JSON to stdout (no table)
 *
 * Invoking `tsx src/run.ts` directly skips the build, so it fails on a clean checkout or measures stale output.
 *
 * The --json output is intended to be piped to ../../../.github/scripts/mitata-to-action-format.ts
 * for the github-action-benchmark customSmallerIsBetter format.
 *
 * mitata v1.x json format: run() with { format: { json: {...} } } writes the
 * result to stdout via console.log and returns it. The converter handles the
 * { benchmarks: [...] } shape that mitata v1.x produces.
 */

import "./calibration.bench.ts";
import "./dispatch-overhead.bench.ts";
import "./hot-loop.bench.ts";
import "./keystroke.bench.ts";
import "./backref-slow-path.bench.ts";
import "./construction-cost.bench.ts";
import "./hit-end.bench.ts";
import "./feature-cost.bench.ts";
import { run } from "mitata";

const isJson = process.argv.includes("--json");

// When --json: mitata's json format writes the result to stdout itself via console.log. Do not also call process.stdout.write — that would produce two concatenated JSON objects and break the downstream parser. samples:false drops raw timing arrays from the output; we only need summary stats.
await run({
  colors: !isJson,
  ...(isJson ? { format: { json: { samples: false } } } : {}),
});
