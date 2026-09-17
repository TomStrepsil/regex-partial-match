/**
 * Converts mitata v1.x JSON output to the github-action-benchmark
 * customSmallerIsBetter format. Called by the benchmark workflow:
 *
 *   npm run bench --workspace=test/benchmarking --silent -- --json \
 *     | npx tsx .github/scripts/mitata-to-action-format.ts > test/benchmarking/results.json
 *
 * Input (stdin): mitata run() result — { benchmarks: [...], layout: [...] }
 * Output (stdout): JSON array of:
 *   { name: string, value: number, unit: "× calibration", range: string, extra: string }
 *
 * Values are reported as a ratio to the calibration group rather than in
 * nanoseconds. GitHub's runner fleet is heterogeneous enough that the same
 * commit measures ~2x apart between machines, which swamps any real code
 * change; dividing by two native-RegExp workloads measured in the same run
 * cancels that out. Raw nanoseconds are preserved in `extra`.
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

const CALIBRATION_GROUP = "calibration";

process.stdin.setEncoding("utf8");

let input = "";
for await (const chunk of process.stdin) {
  input += String(chunk);
}
const { benchmarks, layout } = JSON.parse(input) as MitataOutput;

const fmt = (v: number) => v.toFixed(2);

const labelled = benchmarks
  .filter((b) => b.runs.length > 0)
  .map((b) => {
    const groupName = b.group !== undefined ? layout[b.group].name : null;
    return { groupName, stats: b.runs[0].stats, label: groupName !== null ? `${groupName} — ${b.alias}` : b.alias };
  });

const calibrationStats = labelled.filter((b) => b.groupName === CALIBRATION_GROUP).map((b) => b.stats.avg);

if (calibrationStats.length === 0) {
  throw new Error(`no "${CALIBRATION_GROUP}" group in the mitata output — is calibration.bench.ts imported by run.ts?`);
}

const calibration = Math.exp(
  calibrationStats.reduce((total, v) => total + Math.log(v), 0) / calibrationStats.length,
);

const output: ActionEntry[] = labelled
  .filter((b) => b.groupName !== CALIBRATION_GROUP)
  .map(({ label, stats }) => ({
    name: label,
    value: +(stats.avg / calibration).toFixed(4),
    unit: "× calibration",
    range: `± ${((stats.p75 - stats.p25) / 2 / calibration).toFixed(4)}`,
    extra: `${fmt(stats.avg)}ns  (min: ${fmt(stats.min)}ns  p75: ${fmt(stats.p75)}ns  p99: ${fmt(stats.p99)}ns)  calibration: ${fmt(calibration)}ns`,
  }));

process.stdout.write(JSON.stringify(output, null, 2) + "\n");
