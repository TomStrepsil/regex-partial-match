/**
 * Scenario 5: construction cost
 *
 * The other scenarios measure exec()/test() on regexes built once outside the
 * timed loop, so they never see the cost of compilePartial()'s walk()/render()
 * pass. That pass runs once per `new PartialMatchRegExp()` (or per direct
 * `compilePartial()` call) and is where per-atom bookkeeping added for new
 * features (e.g. the feature-flag scan) actually lands. This scenario isolates
 * that one-time cost so it can be tracked independently of the exec-time
 * scenarios above.
 *
 * Baselines:
 *   - native `new RegExp()`   — no parsing beyond V8's own compile
 *   - `compilePartial()`      — walk() + render(), no class wrapper
 *   - `new PartialMatchRegExp()` — compilePartial() plus class construction
 *
 * Patterns span the complexity range the walker branches on:
 *   - simple:  no groups, no character classes, no backreferences
 *   - phone:   several character classes and optional groups, no backreferences
 *   - HTML tag: capturing group + backreference, exercises the dynamic path
 *   - legacy numeric escape: an out-of-range \N, classified from a native group pre-count
 *   - legacy named escape: a \k<name> naming no group, classified from the same pre-count
 */

import { bench, group } from "mitata";
import compilePartial from "../../../lib/partialMatchRegExp/compilePartial/index.js";
import PartialMatchRegExp from "../../../lib/partialMatchRegExp/index.js";

const simplePattern = /^hello+$/;
const phonePattern = /^\+?1?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
const htmlTagPattern = /^<([a-zA-Z][\w-]*)(?:\s[^<>]*)?>[^<]+<\/\1>$/;
// \7 is past the group count, so it's an Annex B legacy escape rather than a reference; the walk classifies it on the spot from a native pre-count of the pattern's groups.
const legacyNumericEscapePattern = new RegExp("^(abc)\\7d$");
// \k<none> names a group the pattern never declares; the same pre-count tells the walk no named group exists, so it's walked as the Annex B literal `k<none>`.
const legacyNamedEscapePattern = new RegExp("^(abc)d\\k<none>e$");

group("construction — simple pattern (no groups, no backreferences)", () => {
  bench("native new RegExp()", () => new RegExp(simplePattern));
  bench("compilePartial()", () => compilePartial(simplePattern));
  bench("new PartialMatchRegExp()", () => new PartialMatchRegExp(simplePattern));
});

group("construction — phone pattern (character classes, optional groups)", () => {
  bench("native new RegExp()", () => new RegExp(phonePattern));
  bench("compilePartial()", () => compilePartial(phonePattern));
  bench("new PartialMatchRegExp()", () => new PartialMatchRegExp(phonePattern));
});

group("construction — HTML tag pattern (capturing group + backreference)", () => {
  bench("native new RegExp()", () => new RegExp(htmlTagPattern));
  bench("compilePartial()", () => compilePartial(htmlTagPattern));
  bench("new PartialMatchRegExp()", () => new PartialMatchRegExp(htmlTagPattern));
});

group("construction — legacy numeric escape (\\N past the group count)", () => {
  bench("native new RegExp()", () => new RegExp(legacyNumericEscapePattern));
  bench("compilePartial()", () => compilePartial(legacyNumericEscapePattern));
  bench("new PartialMatchRegExp()", () =>
    new PartialMatchRegExp(legacyNumericEscapePattern)
  );
});

group("construction — legacy named escape (\\k<name> naming no group)", () => {
  bench("native new RegExp()", () => new RegExp(legacyNamedEscapePattern));
  bench("compilePartial()", () => compilePartial(legacyNamedEscapePattern));
  bench("new PartialMatchRegExp()", () =>
    new PartialMatchRegExp(legacyNamedEscapePattern)
  );
});
