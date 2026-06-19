/**
 * Scenario 2: hot loop — global exec over a large string
 *
 * V8's string method fast path checks whether exec() is overridden on every
 * iteration of a global match loop. This scenario quantifies that cost at
 * realistic scale (~700 words, ~4 KB).
 *
 * Two loop styles are measured:
 *   - manual exec loop (exec/lastIndex cycle) — directly exercises the override check
 *   - String.prototype.matchAll              — exercises species + iterator overhead
 *
 * Note: matchAll internally copies the regex. After TC39 species removal,
 * that copy is a plain RegExp regardless of the input type, so the exec
 * override may NOT fire in the matchAll path. Benchmarking both reveals this.
 */

import { bench, group } from "mitata";
import PartialMatchRegExp from "../../src/partialMatchRegExp.ts";

const text = (
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod " +
  "tempor incididunt ut labore et dolore magna aliqua ut enim ad minim "
).repeat(50).trim(); // ~7 KB, ~700 words

const nativeGlobal = /\b\w+\b/g;
const partialGlobal = new PartialMatchRegExp(/\b\w+\b/, "g");

group("hot loop — manual global exec (~700 matches)", () => {
  bench("native RegExp (global exec loop)", () => {
    nativeGlobal.lastIndex = 0;
    while (nativeGlobal.exec(text) !== null) {}
  });
  bench("PartialMatchRegExp (global exec loop)", () => {
    partialGlobal.lastIndex = 0;
    while (partialGlobal.exec(text) !== null) {}
  });
});

group("hot loop — String.prototype.matchAll (~700 matches)", () => {
  bench("native matchAll", () => {
    for (const m of text.matchAll(/\b\w+\b/g)) void m;
  });
  bench("PartialMatchRegExp matchAll", () => {
    for (const m of text.matchAll(new PartialMatchRegExp(/\b\w+\b/, "g"))) void m;
  });
});
