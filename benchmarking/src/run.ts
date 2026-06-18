/**
 * Benchmark entry point. Imports all scenario files (which register their
 * bench/group calls globally in mitata) then calls run().
 *
 * Usage:
 *   tsx src/run.ts              — pretty-print results to terminal
 *   tsx src/run.ts --json       — output mitata JSON to stdout (no table)
 *
 * The --json output is intended to be piped to scripts/to-action-format.ts
 * for the github-action-benchmark customSmallerIsBetter format.
 *
 * mitata JSON format note: run() returns an object whose shape varies between
 * minor versions. The converter handles the two common shapes:
 *   - array of benchmark results (v0.x)
 *   - { benchmarks: [...] } (v1.x)
 */

import "./dispatch-overhead.bench.ts";
import "./hot-loop.bench.ts";
import "./keystroke.bench.ts";
import { run } from "mitata";

const isJson = process.argv.includes("--json");

const results = await run({
  colors: !isJson,
  // mitata v1.x: suppress table when outputting JSON
  // If your version doesn't support this option, redirect stderr:
  //   tsx src/run.ts --json 2>/dev/null | tsx scripts/to-action-format.ts
  ...(isJson ? { format: "json" } : {}),
});

if (isJson) {
  process.stdout.write(JSON.stringify(results) + "\n");
}
