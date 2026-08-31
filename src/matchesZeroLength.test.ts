import { describe, it, expect } from "vitest";
import matchesZeroLength from "./matchesZeroLength.ts";

describe("matchesZeroLength", () => {
  it("reports false for a pattern that must consume at least one character", () => {
    expect(matchesZeroLength(/a/)).toBe(false);
    expect(matchesZeroLength(/ab/)).toBe(false);
    expect(matchesZeroLength(/\d{4}/)).toBe(false);
  });

  it("reports true for an optional quantifier", () => {
    expect(matchesZeroLength(/a?/)).toBe(true);
    expect(matchesZeroLength(/a*/)).toBe(true);
  });

  it("reports false for a quantifier requiring at least one occurrence", () => {
    expect(matchesZeroLength(/a+/)).toBe(false);
  });

  it("reports true for a counted quantifier with a zero minimum", () => {
    expect(matchesZeroLength(/a{0,2}/)).toBe(true);
    expect(matchesZeroLength(/a{0}/)).toBe(true);
    expect(matchesZeroLength(/a{0,}/)).toBe(true);
  });

  it("reports false for a counted quantifier with a non-zero minimum", () => {
    expect(matchesZeroLength(/a{1,2}/)).toBe(false);
    expect(matchesZeroLength(/a{2}/)).toBe(false);
    expect(matchesZeroLength(/a{2,}/)).toBe(false);
  });

  it("treats the ? of a lazy quantifier as laziness rather than optionality", () => {
    expect(matchesZeroLength(/a+?/)).toBe(false);
    expect(matchesZeroLength(/a{1,2}?/)).toBe(false);
    expect(matchesZeroLength(/a*?/)).toBe(true);
    expect(matchesZeroLength(/a??/)).toBe(true);
  });

  it("reports false for an unterminated brace treated as a literal", () => {
    expect(matchesZeroLength(/a{/)).toBe(false);
    expect(matchesZeroLength(/a{2/)).toBe(false);
  });

  it("reports true for an empty pattern", () => {
    expect(matchesZeroLength(new RegExp(""))).toBe(true);
    expect(matchesZeroLength(/(?:)/)).toBe(true);
  });

  it("reports true when any alternative is empty", () => {
    expect(matchesZeroLength(/x|/)).toBe(true);
    expect(matchesZeroLength(/|x/)).toBe(true);
    expect(matchesZeroLength(/(?:a|)/)).toBe(true);
  });

  it("reports false when every alternative consumes", () => {
    expect(matchesZeroLength(/ab|cd/)).toBe(false);
  });

  it("reports true for a lookaround, which is zero width", () => {
    expect(matchesZeroLength(/(?=a)/)).toBe(true);
    expect(matchesZeroLength(/(?!a)/)).toBe(true);
    expect(matchesZeroLength(/(?<=a)/)).toBe(true);
    expect(matchesZeroLength(/(?<!a)/)).toBe(true);
  });

  it("reports true for a quantified lookaround", () => {
    expect(matchesZeroLength(/(?=a)*/)).toBe(true);
    expect(matchesZeroLength(/(?!a)+/)).toBe(true);
    expect(matchesZeroLength(/(?=a){2,3}/)).toBe(true);
  });

  it("reports true for a lookaround nested inside a lookaround", () => {
    expect(matchesZeroLength(/(?=(?=a))/)).toBe(true);
    expect(matchesZeroLength(/(?<=(?!a)b)/)).toBe(true);
    expect(matchesZeroLength(/(?=(?=a))b/)).toBe(false);
  });

  it("derives a group containing only zero-width atoms as zero length", () => {
    expect(matchesZeroLength(/(?:^)*/)).toBe(true);
    expect(matchesZeroLength(/((?=a))/)).toBe(true);
    expect(matchesZeroLength(/((?=a))b/)).toBe(false);
    expect(matchesZeroLength(/(?:\b|^)/)).toBe(true);
  });

  it("descends into a group to find the assertions nested in it", () => {
    expect(matchesZeroLength(/(\b)/)).toBe(true);
    expect(matchesZeroLength(/(\ba)/)).toBe(false);
    expect(matchesZeroLength(/(?:(?:(?!a)))/)).toBe(true);
    expect(matchesZeroLength(/(?:(?:(?!a)b))/)).toBe(false);
    expect(matchesZeroLength(/(?i:^)/)).toBe(true);
    expect(matchesZeroLength(/(?<n>(?<=a))/)).toBe(true);
    expect(matchesZeroLength(/(?<n>(?<=a)b)/)).toBe(false);
  });

  it("does not mistake a $ inside a group name for an anchor", () => {
    expect(matchesZeroLength(/(?<$d>a)/)).toBe(false);
    expect(matchesZeroLength(/(?<$d>\b)/)).toBe(true);
    expect(matchesZeroLength(/(?<a$b>x)(?<c$d>y)/)).toBe(false);
  });

  it("descends into a group to find the backreferences nested in it", () => {
    expect(matchesZeroLength(/(x)(\1)/)).toBe(false);
    expect(matchesZeroLength(/(x)?(\1)/)).toBe(true);
  });

  it("reports true for consecutive zero-width atoms", () => {
    expect(matchesZeroLength(/\b\B/)).toBe(true);
    expect(matchesZeroLength(/(?=a)(?<=b)\b^$/)).toBe(true);
  });

  it("treats an escaped anchor as a literal rather than an assertion", () => {
    expect(matchesZeroLength(/\^/)).toBe(false);
    expect(matchesZeroLength(/\$/)).toBe(false);
    expect(matchesZeroLength(/\^\$/)).toBe(false);
  });

  it("treats anchor and boundary characters inside a class as literals", () => {
    expect(matchesZeroLength(/[\b]/)).toBe(false);
    expect(matchesZeroLength(/[a^$b]/)).toBe(false);
    expect(matchesZeroLength(/[[a-z]$]/v)).toBe(false);
  });

  it("reports true for a backreference nested inside a lookaround", () => {
    expect(matchesZeroLength(/(?<=(a)b)\1/)).toBe(true);
    expect(matchesZeroLength(/(?=(a))\1/)).toBe(true);
    expect(matchesZeroLength(/(?<=(a)b)\1c/)).toBe(false);
  });

  it("reports false for a lookaround followed by a consuming atom", () => {
    expect(matchesZeroLength(/(?=a)b/)).toBe(false);
    expect(matchesZeroLength(/(?!a)b/)).toBe(false);
    expect(matchesZeroLength(/(?<=a)b/)).toBe(false);
    expect(matchesZeroLength(/(?<!a)b/)).toBe(false);
  });

  it("reports true for an anchor, which is zero width", () => {
    expect(matchesZeroLength(/^$/)).toBe(true);
    expect(matchesZeroLength(/\b/)).toBe(true);
    expect(matchesZeroLength(/\B/)).toBe(true);
  });

  it("reports false for an anchor followed by a consuming atom", () => {
    expect(matchesZeroLength(/^a$/)).toBe(false);
    expect(matchesZeroLength(/\ba/)).toBe(false);
    expect(matchesZeroLength(/\Ba/)).toBe(false);
  });

  it("derives a group's contribution from its contents", () => {
    expect(matchesZeroLength(/(a)/)).toBe(false);
    expect(matchesZeroLength(/(a?)/)).toBe(true);
    expect(matchesZeroLength(/(?:a)/)).toBe(false);
    expect(matchesZeroLength(/(?:a)?/)).toBe(true);
    expect(matchesZeroLength(/(?<n>a)/)).toBe(false);
    expect(matchesZeroLength(/(?<n>a)?/)).toBe(true);
    expect(matchesZeroLength(/(?i:a)/)).toBe(false);
    expect(matchesZeroLength(/(?i:a?)/)).toBe(true);
  });

  it("ignores the contents of a lookaround when deriving its contribution", () => {
    expect(matchesZeroLength(/(?=a?)b/)).toBe(false);
    expect(matchesZeroLength(/(?<=a?)b/)).toBe(false);
  });

  it("assumes a backreference can match empty", () => {
    expect(matchesZeroLength(/(a)?\1/)).toBe(true);
    expect(matchesZeroLength(/(?<a>x)?\k<a>/)).toBe(true);
  });

  it("treats an unterminated \\k reference as an Annex B literal", () => {
    expect(matchesZeroLength(new RegExp("\\k"))).toBe(false);
    expect(matchesZeroLength(new RegExp("\\k<"))).toBe(false);
    expect(matchesZeroLength(new RegExp("\\k<a"))).toBe(false);
    expect(matchesZeroLength(new RegExp("\\ka>b"))).toBe(false);
    expect(matchesZeroLength(new RegExp("\\k<\\b"))).toBe(false);
    expect(matchesZeroLength(new RegExp("\\k<|\\b"))).toBe(true);
  });

  it("assumes an escape Annex B rewrites as a literal can match empty", () => {
    expect(matchesZeroLength(new RegExp("\\1"))).toBe(true);
    expect(matchesZeroLength(new RegExp("\\8"))).toBe(true);
    expect(matchesZeroLength(new RegExp("\\9"))).toBe(true);
    expect(matchesZeroLength(new RegExp("\\k<absent>"))).toBe(true);
  });

  it("assumes a contradictory pattern is satisfiable", () => {
    expect(matchesZeroLength(/(?=a)(?=b)/)).toBe(true);
    expect(matchesZeroLength(/(?=a)(?!a)/)).toBe(true);
  });

  it("reports false when a backreference follows a consuming group", () => {
    expect(matchesZeroLength(/(a)\1/)).toBe(false);
    expect(matchesZeroLength(/(?<a>x)\k<a>/)).toBe(false);
  });

  it("reports false for escapes that consume a character", () => {
    expect(matchesZeroLength(/\n/)).toBe(false);
    expect(matchesZeroLength(/\d/)).toBe(false);
    expect(matchesZeroLength(/\x41/)).toBe(false);
    expect(matchesZeroLength(/A/)).toBe(false);
    expect(matchesZeroLength(/\u{1F600}/u)).toBe(false);
    expect(matchesZeroLength(/\p{Letter}/u)).toBe(false);
    expect(matchesZeroLength(/\p/)).toBe(false);
    expect(matchesZeroLength(/\cA/)).toBe(false);
    expect(matchesZeroLength(/\./)).toBe(false);
    expect(matchesZeroLength(/\k/)).toBe(false);
  });

  it("reports false for a character class", () => {
    expect(matchesZeroLength(/[a-z]/)).toBe(false);
    expect(matchesZeroLength(/[^a-z]/)).toBe(false);
  });

  it("reports false for an astral literal under the unicode flag", () => {
    expect(matchesZeroLength(/😀/u)).toBe(false);
  });

  it("is unaffected by flags that cannot change the answer", () => {
    expect(matchesZeroLength(/(?=a)/g)).toBe(true);
    expect(matchesZeroLength(/a?/y)).toBe(true);
    expect(matchesZeroLength(/^/m)).toBe(true);
    expect(matchesZeroLength(/a/dgimsy)).toBe(false);
  });

  it("returns the same answer when called repeatedly", () => {
    const backreference = /(a)\1(b)\2/;
    expect(matchesZeroLength(backreference)).toBe(false);
    expect(matchesZeroLength(backreference)).toBe(false);
    expect(matchesZeroLength(backreference)).toBe(false);

    const zeroWidth = /(?=a)/;
    expect(matchesZeroLength(zeroWidth)).toBe(true);
    expect(matchesZeroLength(zeroWidth)).toBe(true);
  });
});
