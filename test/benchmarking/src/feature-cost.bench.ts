/**
 * Scenario 7: construction cost per regex feature
 *
 * construction-cost.bench.ts tracks whole realistic patterns end to end. This
 * scenario instead isolates *which construct* the walker is paying for, one
 * bench per feature, so a change to a single switch case in walk() — or to how
 * a construct is reclassified afterwards — shows up against its neighbours
 * rather than being averaged into a realistic pattern.
 *
 * Every pattern in the first group starts as the same shape — an anchor, a
 * construct under test, a literal tail — then has its tail padded with plain
 * literal characters until it compiles to the same emittedPartCount as every
 * other pattern in the group. Construction cost tracks the number of parts the
 * walk emits as closely as it tracks source length, so an unpadded group would
 * mostly rank patterns by how few parts their construct collapses into: a
 * character class or property escape would read as cheaper than a plain
 * literal not because the switch case is cheaper, but because it leaves fewer
 * parts behind for the same source length. Equalising part count removes that
 * confound, though not every variable — source length past the padding, and
 * flags like u/v, still differ between benches.
 *
 * Read that way, raw lookaheads and lookbehinds are the most expensive
 * construct in the group, not the mid-pack result their part count alone would
 * suggest: like a positive lookahead, the walker recurses into the body to
 * find its extent and count the capturing groups inside it, but then discards
 * that recursive work and copies the same span again as a single source
 * slice, rather than reusing it the way a lookahead does.
 *
 * The genuinely expensive constructs are in the second group, and each for a
 * structural reason worth keeping visible:
 *
 *   - a backreference forces the dynamic path, which defers most of its work
 *     to exec() but still builds two extra regexes up front
 *   - a \k<name> in a pattern declaring no named group is an Annex B literal,
 *     which the walk cannot know until it has seen the whole source — so
 *     compilePartial() walks a second time, making this the costliest bench
 *     here despite compiling to the static path
 *
 * That group's patterns aren't part-count-equalised, and don't need to be: the
 * gap between them is dominated by which compiled path a pattern lands on and
 * whether compilePartial() walks it twice, not by how many parts the walk
 * emits, so unequal part counts don't confound its conclusion the way they did
 * in the first group.
 *
 * A reclassified octal escape, by contrast, is only modestly above the static
 * baseline beside it: reclassification itself is cheap, and the third group
 * shows why the classification still matters — the same pattern misread as a
 * backreference would rebuild a RegExp on every exec().
 */

import { bench, group } from "mitata";
import { compilePartial } from "../../../src/partialMatchRegExp/compilePartial.ts";
import PartialMatchRegExp from "../../../src/partialMatchRegExp/index.ts";

function emittedPartCount(pattern: RegExp): number {
  const compiled = compilePartial(pattern);
  if (compiled.kind !== "static") {
    throw new Error(
      `${pattern.source} has no part count to equalise — it compiles to the dynamic path`
    );
  }
  return compiled.parts.length;
}

function padded(
  targetPartCount: number,
  [name, pattern]: [string, RegExp]
): [string, RegExp] {
  const shortfall = targetPartCount - emittedPartCount(pattern);
  const paddedPattern = new RegExp(pattern.source + "x".repeat(shortfall), pattern.flags);
  const paddedPartCount = emittedPartCount(paddedPattern);
  if (paddedPartCount !== targetPartCount) {
    throw new Error(
      `${name}: padding to ${String(targetPartCount)} parts landed on ${String(paddedPartCount)} — a literal "x" no longer emits exactly one part`
    );
  }
  return [name, paddedPattern];
}

const rawFeatures: [name: string, pattern: RegExp][] = [
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
  ["control-letter escape", /^\cC_tail/],
  ["hex and unicode escapes", /^\x41B\u0043_tail/],
  ["unicode property escape (u)", /^\p{Letter}+_tail/u],
  ["nested character class (v)", /^[[a-z]--[c]]+_tail/v]
];

const equalisedPartCount = Math.max(
  ...rawFeatures.map(([, pattern]) => emittedPartCount(pattern))
);

const features = rawFeatures.map((feature) => padded(equalisedPartCount, feature));

group("feature cost — construction, one construct per bench", () => {
  for (const [name, pattern] of features) {
    bench(name, () => new PartialMatchRegExp(pattern));
  }
});

// Backreferences and legacy escapes are grouped separately: they are the constructs that decide which compiled path a pattern lands on, so they are worth reading against each other rather than against the walk-only features above. A \k<name> in a pattern that declares no named group is an Annex B literal, not a reference — it compiles static, and the pair below is what keeps that from silently regressing back onto the dynamic path.
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

// Which path a legacy escape lands on is worth far more at exec() than at construction: the backreference path rebuilds a RegExp per call, so a pattern misfiled onto it pays that on every keystroke despite having no backreference to expand. These benches exist to make that regression loud — a literal \k that drifted back onto the dynamic path would show here as a step change, not the few percent it costs to construct.
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
