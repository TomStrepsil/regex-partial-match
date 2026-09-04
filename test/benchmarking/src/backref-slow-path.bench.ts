/**
 * Scenario 4: backreference slow path — new RegExp construction per exec call
 *
 * When exec() is called on a partial input that contains backreferences, the
 * slow path builds a per-input RegExp on every call (capture scan → pattern
 * substitution → new RegExp()). This is the most expensive code path and the
 * most important to quantify.
 *
 * Single-call groups show the raw cost per exec invocation:
 *   - full match:      native fast path kicks in (super.exec succeeds early)
 *   - partial/pre-ref: slow path, backref atom not yet reached
 *   - partial/mid-ref: slow path, input ends inside the backreference
 *
 * The keystroke simulation group accumulates all prefix costs, modelling the
 * total work done while a user types a complete value.
 *
 * The leftmost bound check group covers a fourth case: a native complete
 * match at a *non-zero* index, where exec() must confirm no earlier partial
 * exists before trusting it (see docs/backreferences.md — "Leftmost bound
 * check"). preScan gives a cheap, sound lower bound: usually it rejects
 * outright and the native match wins for a small fixed cost, but it can also
 * be a loose bound, forcing the full slow-path pipeline to run anyway even
 * though the native match still wins in the end.
 */

import { bench, group } from "mitata";
import PartialMatchRegExp from "../../../src/partialMatchRegExp/index.ts";

// "foo foo" — simple repeated-word pattern
const repeatedWord = /^(\w+) \1$/;
const repeatedWordFull = "foo foo";
const repeatedWordPreRef = "foo"; // before the space + backref
const repeatedWordMidRef = "foo fo"; // inside the backreference

// "<custom-widget-container ...>hello world</custom-widget-container>" — a long custom-element tag name with attributes on the opening tag (a longer captured name than a bare "div" so the per-character cost of expand()'s backreference expansion actually shows up in the numbers)
const htmlTag = /^<([a-zA-Z][\w-]*)(?:\s[^<>]*)?>[^<]+<\/\1>$/;
const htmlFull =
  '<custom-widget-container data-id="42" class="active">hello world</custom-widget-container>';
const htmlMidRef = htmlFull.slice(0, -6); // inside the closing-tag backreference

const repeatedWordPartial = new PartialMatchRegExp(repeatedWord);
const htmlTagPartial = new PartialMatchRegExp(htmlTag);

group("backref — single exec, repeated-word pattern", () => {
  bench("native exec (full match only)", () => repeatedWord.exec(repeatedWordFull));
  bench("PartialMatchRegExp — full match (native fast path)", () =>
    repeatedWordPartial.exec(repeatedWordFull)
  );
  bench("PartialMatchRegExp — partial pre-backref (slow path)", () =>
    repeatedWordPartial.exec(repeatedWordPreRef)
  );
  bench("PartialMatchRegExp — partial mid-backref (slow path)", () =>
    repeatedWordPartial.exec(repeatedWordMidRef)
  );
});

group("backref — single exec, HTML tag pattern", () => {
  bench("native exec (full match only)", () => htmlTag.exec(htmlFull));
  bench("PartialMatchRegExp — full match (native fast path)", () =>
    htmlTagPartial.exec(htmlFull)
  );
  bench("PartialMatchRegExp — partial mid-backref (slow path)", () =>
    htmlTagPartial.exec(htmlMidRef)
  );
});

// Native match at index 3; preScan's bound is also index 3 (not earlier), so the native match wins without building the expanded regex.
const laterMatchCheapReject = /(abc)x\1/;
const laterMatchCheapRejectInput = "zzzabcxabc";
const laterMatchCheapRejectPartial = new PartialMatchRegExp(laterMatchCheapReject);

// Native match at index 3, but preScan's bound is a loose lower bound of index 0 — the full pipeline runs (capture scan, expand, new RegExp, exec) even though its result loses to the native match anyway.
const laterMatchFallsThrough = /(ab|a)\1x/;
const laterMatchFallsThroughInput = "abXaax";
const laterMatchFallsThroughPartial = new PartialMatchRegExp(laterMatchFallsThrough);

group("backref — leftmost bound check (native match at a later index)", () => {
  bench("bound rejects quickly — native wins, no pipeline", () =>
    laterMatchCheapRejectPartial.exec(laterMatchCheapRejectInput)
  );
  bench("bound doesn't reject — full pipeline still runs", () =>
    laterMatchFallsThroughPartial.exec(laterMatchFallsThroughInput)
  );
});

// Keystroke simulation: total cost across all prefixes
const repeatedWordPrefixes = Array.from(
  { length: repeatedWordFull.length },
  (_, i) => repeatedWordFull.slice(0, i + 1)
);
const htmlPrefixes = Array.from(
  { length: htmlFull.length },
  (_, i) => htmlFull.slice(0, i + 1)
);

group("backref — keystroke simulation (accumulated exec cost)", () => {
  bench(`repeated word: ${repeatedWordPrefixes.length.toString()} keystrokes`, () => {
    for (const s of repeatedWordPrefixes) repeatedWordPartial.exec(s);
  });
  bench(`HTML tag: ${htmlPrefixes.length.toString()} keystrokes`, () => {
    for (const s of htmlPrefixes) htmlTagPartial.exec(s);
  });
});
