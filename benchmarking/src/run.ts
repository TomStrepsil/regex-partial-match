/**
 * Benchmark entry point. Imports all scenario files (which register their
 * bench/group calls globally in mitata) then calls run().
 *
 * Usage:
 *   tsx src/run.ts              — pretty-print results to terminal
 *   tsx src/run.ts --json       — output mitata JSON to stdout (no table)
 *
 * The --json output is intended to be piped to ../.github/scripts/mitata-to-action-format.ts
 * for the github-action-benchmark customSmallerIsBetter format.
 *
 * mitata v1.x json format: run() with { format: { json: {...} } } writes the
 * result to stdout via console.log and returns it. The converter handles the
 * { benchmarks: [...] } shape that mitata v1.x produces.
 */

import "./dispatch-overhead.bench.ts";
import "./hot-loop.bench.ts";
import "./keystroke.bench.ts";
import { run } from "mitata";

const isJson = process.argv.includes("--json");

// When --json: mitata's json format writes the result to stdout itself via
// console.log. Do not also call process.stdout.write — that would produce two
// concatenated JSON objects and break the downstream parser.
// samples:false drops raw timing arrays from the output; we only need summary stats.
await run({
  colors: !isJson,
  ...(isJson ? { format: { json: { samples: false } } } : {}),
});
