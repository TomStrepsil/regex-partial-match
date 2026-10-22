/**
 * Scenario 9: backtracking through a repeated backreference
 *
 * A quantifier over a backreference, followed by a lookbehind that fails at
 * the end of the input, once made exec() try exponentially many splits of a
 * run of `a`: the 12-character input cost milliseconds to a quarter of a
 * second per call, doubling with each character. Each pattern below should
 * now cost about what native does, so a regression shows here by orders of
 * magnitude.
 *
 * The runs cover a quantified backreference, a group holding only
 * backreferences, a bounded count over one, and a capture nothing reads, each
 * over a group that captures without limit (`a+`), and once over a group that
 * captures one character, which needs no partial branch.
 */

import { bench, group } from "mitata";
import PartialMatchRegExp from "../../../lib/index.js";

const RUN = "a".repeat(12);

const runs: [string, RegExp][] = [
  ["a quantified backreference", /(a+)\1+(?<=b)/],
  ["a group holding only backreferences", /(a+)(?:\1\1)+(?<=b)/],
  ["a bounded count", /(a+)\1{1,40}(?<=b)/],
  ["a capture nothing reads", /(a+)(\1)+(?<=b)/],
  ["a one-character group", /(a)\1+(?<=b)/]
];

for (const [name, pattern] of runs) {
  const partial = new PartialMatchRegExp(pattern);
  group(`backtracking — ${name}, on a run of a`, () => {
    bench("native exec()", () => pattern.exec(RUN));
    bench("PartialMatchRegExp exec()", () => partial.exec(RUN));
  });
}
