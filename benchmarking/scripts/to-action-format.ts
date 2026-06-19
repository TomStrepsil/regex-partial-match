/**
 * Converts mitata JSON output (from `tsx src/run.ts --json`) to the
 * github-action-benchmark customSmallerIsBetter format.
 *
 * Input (stdin): mitata run() result — either an array of benchmarks or
 *   { benchmarks: [...] } depending on mitata version.
 *
 * Output (stdout): JSON array of:
 *   { name: string, value: number, unit: "ns/iter", range: string, extra: string }
 *
 * mitata reports time in seconds internally. This script normalises to ns/iter.
 * If your mitata version reports in nanoseconds (value > 1 for typical bench),
 * set SEC_TO_NS = 1 below.
 *
 * Usage:
 *   tsx src/run.ts --json | tsx scripts/to-action-format.ts > results.json
 */

const SEC_TO_NS = 1e9;

interface MitataStats {
  avg: number;
  min: number;
  max: number;
  p75: number;
  p99: number;
  stddev: number;
}

interface MitataBenchmark {
  name: string;
  group?: string;
  stats?: MitataStats;
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
  input += chunk;
}
const raw: unknown = JSON.parse(input);

const benchmarks: MitataBenchmark[] = Array.isArray(raw)
  ? (raw as MitataBenchmark[])
  : ((raw as { benchmarks?: MitataBenchmark[] }).benchmarks ?? []);

const output: ActionEntry[] = benchmarks
  .filter((b): b is MitataBenchmark & { stats: MitataStats } => b.stats != null)
  .map((b) => {
    const label = b.group ? `${b.group} — ${b.name}` : b.name;
    const toNs = (s: number) => +(s * SEC_TO_NS).toFixed(2);
    const ns = (s: number) => toNs(s).toString();
    return {
      name: label,
      value: toNs(b.stats.avg),
      unit: "ns/iter",
      range: `± ${ns(b.stats.stddev)}`,
      extra: `min: ${ns(b.stats.min)}ns  p75: ${ns(b.stats.p75)}ns  p99: ${ns(b.stats.p99)}ns`,
    };
  });

process.stdout.write(JSON.stringify(output, null, 2) + "\n");
