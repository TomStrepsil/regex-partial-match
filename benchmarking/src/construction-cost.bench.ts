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
 * Three patterns span the complexity range the walker branches on:
 *   - simple:  no groups, no character classes, no backreferences
 *   - phone:   several character classes and optional groups, no backreferences
 *   - HTML tag: capturing group + backreference, exercises the dynamic path
 */

import { bench, group } from "mitata";
import { compilePartial } from "../../src/compilePartial.ts";
import PartialMatchRegExp from "../../src/partialMatchRegExp.ts";

const simplePattern = /^hello+$/;
const phonePattern = /^\+?1?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
const htmlTagPattern = /^<([a-zA-Z][\w-]*)(?:\s[^<>]*)?>[^<]+<\/\1>$/;

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
