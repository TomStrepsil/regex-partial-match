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
 * Each workload mirrors an existing benchmark exactly, because the stored
 * history was recalculated against those benchmarks and the two have to stay
 * on the same scale:
 *   - the exec workload matches `dispatch overhead — full match input —
 *     native RegExp.exec` (dispatch-overhead.bench.ts)
 *   - the construction workload matches `construction — simple pattern …
 *     native new RegExp()` (construction-cost.bench.ts)
 *
 * The construction argument is a RegExp rather than its source string on
 * purpose: `new RegExp(regexp)` and `new RegExp(string)` are different
 * constructor paths and differ by about 1.2x, which would put every published
 * ratio on a different scale from the recalculated history.
 *
 * Both workloads are frozen. Changing either one, or adding a third bench to
 * this group, rebases every stored number and invalidates the history; add a
 * new bench elsewhere instead.
 */

import { bench, group } from "mitata";

const FROZEN_EXEC_PATTERN = /^[a-z]+(?:\s\w+){1,3}/;
const FROZEN_EXEC_INPUT = "hello world foo";
const FROZEN_CONSTRUCTION_PATTERN = /^hello+$/;

group("calibration", () => {
  bench("native RegExp.exec", () => FROZEN_EXEC_PATTERN.exec(FROZEN_EXEC_INPUT));
  bench("native new RegExp()", () => new RegExp(FROZEN_CONSTRUCTION_PATTERN));
});
