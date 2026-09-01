/**
 * Scenario 7: construction cost per regex feature
 *
 * construction-cost.bench.ts tracks three whole patterns end to end. This
 * scenario instead isolates *which construct* the walker is paying for, one
 * bench per feature, so a change to a single switch case in walk() — or to how
 * a construct is reclassified afterwards — shows up against its neighbours
 * rather than being averaged into a realistic pattern.
 *
 * Every pattern is deliberately the same shape and close to the same length:
 * an anchor, a construct under test, and a literal tail. Differences between
 * benches are therefore the construct, not the amount of source text. The
 * numbers are only meaningful relative to each other and to the literal
 * baseline at the top of the group.
 *
 * Three features cost far more than the rest, and each for a structural
 * reason worth keeping visible:
 *
 *   - a backreference forces the dynamic path, which defers most of its work
 *     to exec() but still builds two extra regexes up front
 *   - a raw lookaround (negative lookahead, either lookbehind) is copied in
 *     verbatim and walked a second time to count the groups inside it
 *   - a legacy escape is reclassified after the walk, against the pattern's
 *     group count and whether it declares any named group
 */

import { bench, group } from "mitata";
import PartialMatchRegExp from "../../src/partialMatchRegExp.ts";

const features: [name: string, pattern: RegExp][] = [
  ["literal characters (baseline)", /^abcdefgh_tail/],
  ["character class", /^[a-gA-G]+_tail/],
  ["quantifier", /^a{2,8}b*c?_tail/],
  ["disjunction", /^(?:abc|def)_tail/],
  ["non-capturing group", /^(?:abcdefgh)_tail/],
  ["capturing group", /^(abcdefgh)_tail/],
  ["named group", /^(?<word>abcd)_tail/],
  ["lookahead", /^(?=abcdefgh)a_tail/],
  ["negative lookahead (raw)", /^(?!abcdefgh)x_tail/],
  ["lookbehind (raw)", /^ab(?<=ab)cdefgh_tail/],
  ["control escapes", /^\n\r\t\f\v_tail/],
  ["hex and unicode escapes", /^\x41B\cC_tail/],
  ["unicode property escape (u)", /^\p{Letter}+_tail/u],
  ["nested character class (v)", /^[[a-z]--[c]]+_tail/v]
];

group("feature cost — construction, one construct per bench", () => {
  for (const [name, pattern] of features) {
    bench(name, () => new PartialMatchRegExp(pattern));
  }
});

// Backreferences and legacy escapes are grouped separately: they are the
// constructs that decide which compiled path a pattern lands on, so they are
// worth reading against each other rather than against the walk-only features
// above. A \k<name> in a pattern that declares no named group is an Annex B
// literal, not a reference — it compiles static, and the pair below is what
// keeps that from silently regressing back onto the dynamic path.
const pathDeciding: [name: string, pattern: RegExp][] = [
  ["capturing group, no reference (static path)", /^(abcd) x_tail/],
  ["numeric backreference (dynamic path)", /^(abcd) \1_tail/],
  ["named backreference (dynamic path)", /^(?<w>abcd) \k<w>_tail/],
  ["reclassified octal escape (static)", new RegExp("^(abcd)\\7_tail")],
  ["reclassified \\k literal (static)", new RegExp("^(abcd)\\k<none>_tail")]
];

group("feature cost — construction, backreferences and legacy escapes", () => {
  for (const [name, pattern] of pathDeciding) {
    bench(name, () => new PartialMatchRegExp(pattern));
  }
});

// Which path a legacy escape lands on is worth far more at exec() than at
// construction: the backreference path rebuilds a RegExp per call, so a
// pattern misfiled onto it pays that on every keystroke despite having no
// backreference to expand. These benches exist to make that regression loud —
// a literal \k that drifted back onto the dynamic path would show here as a
// step change, not the few percent it costs to construct.
const literalK = new PartialMatchRegExp(new RegExp("^\\k<none>tail"));
const genuineBackref = new PartialMatchRegExp(/^(\w+) \1$/);

group("feature cost — exec, legacy escape vs genuine backreference", () => {
  bench("legacy \\k literal — partial input", () => literalK.exec("k<none>ta"));
  bench("legacy \\k literal — full match", () => literalK.exec("k<none>tail"));
  bench("genuine backreference — partial input", () =>
    genuineBackref.exec("foo fo")
  );
  bench("genuine backreference — full match", () =>
    genuineBackref.exec("foo foo")
  );
});
