/**
/**
 * Scenario 4: a backreference matched at run time
 *
 * A backreference whose group can capture more than one character is
 * compiled once into a regex that also matches it running out of input part
 * way through its capture (see docs/modules/backreferences.md). The bench
 * names come from an earlier design, which built a regex per call, and are
 * kept so their history stays comparable.
 *
 * Single-call groups show the cost per exec invocation:
 *   - full match
 *   - partial, before the backreference is reached
 *   - partial, with the input ending inside the backreference
 *
 * The keystroke simulation group accumulates all prefix costs, modelling the
 * total work done while a user types a complete value.
 *
 * The later-match group covers a match at a non-zero index, where every
 * earlier start has to fail first.
 *
 * The long-input group guards how a failing backreference's cost grows: each
 * reads ahead at most `longestPartial` characters, so the two benches differ
 * only in how much irrelevant text sits in front of the part that decides the
 * match.
 */

import { bench, group } from "mitata";
import PartialMatchRegExp from "../../../lib/index.js";

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

// A match at index 3, after three starts that fail at once.
const laterMatchCheapReject = /(abc)x\1/;
const laterMatchCheapRejectInput = "zzzabcxabc";
const laterMatchCheapRejectPartial = new PartialMatchRegExp(laterMatchCheapReject);

// A match at index 3, after a start at 0 that gets as far as the backreference.
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

// These two inputs differ only in how much irrelevant text precedes the part that decides the match: a cost that grows with the whole input, rather than with what a backreference can read ahead, shows up as the second growing away from the first.
const agreementCheck = /([ab])\1([ab])\2$/;
const agreementCheckPartial = new PartialMatchRegExp(agreementCheck);
const decidingTail = "aaba";
const shortInput = decidingTail;
const longInput = "z".repeat(10_000) + decidingTail;

group("backref — capture agreement, irrelevant input ahead of the match", () => {
  bench(`${shortInput.length.toString()}-character input`, () =>
    agreementCheckPartial.exec(shortInput)
  );
  bench(`${longInput.length.toString()}-character input`, () =>
    agreementCheckPartial.exec(longInput)
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
