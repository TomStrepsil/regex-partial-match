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
 * Both workloads are frozen. Changing either one rebases every stored number
 * and invalidates the history; add a new bench elsewhere instead.
 */

import { bench, group } from "mitata";

const FROZEN_EXEC_PATTERN = /^[a-z]+(?:\s\w+){1,3}/;
const FROZEN_EXEC_INPUT = "hello world foo";
const FROZEN_CONSTRUCTION_SOURCE = "^hello+$";

group("calibration", () => {
  bench("native RegExp.exec", () => FROZEN_EXEC_PATTERN.exec(FROZEN_EXEC_INPUT));
  bench("native new RegExp()", () => new RegExp(FROZEN_CONSTRUCTION_SOURCE));
});
