/**
 * Machine calibration — not a subject under test.
 *
 * GitHub's hosted runners are a heterogeneous fleet: the same commit measures
 * roughly 2x apart depending on which machine the job lands on. Comparing raw
 * nanoseconds against a stored baseline therefore alerts on runner assignment
 * rather than on code. These two benches measure the machine itself, using only
 * native RegExp, so `mitata-to-action-format.ts` can divide every other result
 * by them and report a machine-independent index.
 *
 * Every published number is a ratio to these two. Change either workload, or
 * the membership of this group, and every result afterwards sits on a different
 * scale from every result before it — a step on all 102 charts that looks like
 * a real change and is not. So:
 *
 *   - Both workloads are frozen. To measure something new, add a bench to one
 *     of the scenario files, not to this group.
 *   - The construction argument is a RegExp, not its source string.
 *     `new RegExp(regexp)` and `new RegExp(string)` are different constructor
 *     paths and differ by about 1.2x, so "simplifying" it rebases everything.
 *   - The converter refuses to run unless this group yields exactly two
 *     results, so neither losing one nor adding a third can pass unnoticed.
 *
 * They duplicate the native baselines in dispatch-overhead.bench.ts and
 * construction-cost.bench.ts on purpose. Those two are scenario benches and
 * stay free to change; these have to hold still.
 */

import { bench, group } from "mitata";

const FROZEN_EXEC_PATTERN = /^[a-z]+(?:\s\w+){1,3}/;
const FROZEN_EXEC_INPUT = "hello world foo";
const FROZEN_CONSTRUCTION_PATTERN = /^hello+$/;

group("calibration", () => {
  bench("native RegExp.exec", () => FROZEN_EXEC_PATTERN.exec(FROZEN_EXEC_INPUT));
  bench("native new RegExp()", () => new RegExp(FROZEN_CONSTRUCTION_PATTERN));
});
