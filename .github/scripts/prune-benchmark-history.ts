/**
 * Removes every entry for one commit from the benchmark series that
 * github-action-benchmark stores in `dev/bench/data.js` on `gh-pages`. The
 * action only ever appends, so the benchmark action calls this before a run to
 * make the run replace any earlier point for the same commit. Run with tsx:
 *
 *   npx tsx .github/scripts/prune-benchmark-history.ts --data <path> --commit <sha>
 *
 * Applies to entries["regex-partial-match"]. The file is rewritten only if an
 * entry was removed.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { parseArgs } from "node:util";

const SERIES = "regex-partial-match";
const DATA_PREFIX = "window.BENCHMARK_DATA = ";

interface Entry {
  commit: { id: string };
}

interface BenchmarkData {
  entries: Record<string, Entry[]>;
}

const { values } = parseArgs({
  options: {
    data: { type: "string" },
    commit: { type: "string" },
  },
});

if (values.data === undefined || values.commit === undefined) {
  throw new Error("--data <path to dev/bench/data.js> and --commit <sha> are required");
}

const source = readFileSync(values.data, "utf8");
if (!source.startsWith(DATA_PREFIX)) {
  throw new Error(`${values.data} does not start with "${DATA_PREFIX}"`);
}
const data = JSON.parse(source.slice(DATA_PREFIX.length)) as BenchmarkData;
const series = data.entries[SERIES] ?? [];

const kept = series.filter((entry) => entry.commit.id !== values.commit);

const removed = series.length - kept.length;
if (removed > 0) {
  data.entries[SERIES] = kept;
  writeFileSync(values.data, `${DATA_PREFIX}${JSON.stringify(data, null, 2)}`);
}
