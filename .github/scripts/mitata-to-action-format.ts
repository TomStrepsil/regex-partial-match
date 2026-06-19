/**
 * Converts mitata v1.x JSON output to the github-action-benchmark
 * customSmallerIsBetter format. Called by the benchmark workflow:
 *
 *   npm run bench --workspace=benchmarking --silent -- --json \
 *     | npx tsx .github/scripts/mitata-to-action-format.ts > benchmarking/results.json
 *
 * Input (stdin): mitata run() result — { benchmarks: [...], layout: [...] }
 * Output (stdout): JSON array of:
 *   { name: string, value: number, unit: "ns/iter", range: string, extra: string }
 *
 * v1.x notes:
 *   - Stats are at benchmarks[].runs[0].stats (not top-level on the benchmark)
 *   - Values are already in nanoseconds
 *   - No stddev field; (p75 - p25) / 2 is used as spread
 *   - group is a numeric index into the layout array, not a group name string
 */

interface MitataStats {
  avg: number;
  min: number;
  max: number;
  p25: number;
  p75: number;
  p99: number;
}

interface MitataBenchmark {
  alias: string;
  group?: number;
  runs: Array<{ stats: MitataStats }>;
}

interface MitataOutput {
  benchmarks: MitataBenchmark[];
  layout: Array<{ name: string | null }>;
}

interface ActionEntry {
  name: string;
  value: number;
  unit: string;
  range: string;
  extra: string;
}

process.stdin.setEncoding("utf8");

let input = "";
for await (const chunk of process.stdin) {
  input += String(chunk);
}
const { benchmarks, layout } = JSON.parse(input) as MitataOutput;

const fmt = (v: number) => v.toFixed(2);

const output: ActionEntry[] = benchmarks
  .filter((b) => b.runs.length > 0)
  .map((b) => {
    const stats = b.runs[0].stats;
    const groupName = b.group !== undefined ? layout[b.group].name : null;
    const label = groupName !== null ? `${groupName} — ${b.alias}` : b.alias;
    const spread = (stats.p75 - stats.p25) / 2;
    return {
      name: label,
      value: +fmt(stats.avg),
      unit: "ns/iter",
      range: `± ${fmt(spread)}`,
      extra: `min: ${fmt(stats.min)}ns  p75: ${fmt(stats.p75)}ns  p99: ${fmt(stats.p99)}ns`,
    };
  });

process.stdout.write(JSON.stringify(output, null, 2) + "\n");
