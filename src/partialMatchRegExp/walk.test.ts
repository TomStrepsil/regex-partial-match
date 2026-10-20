import { describe, it, expect } from "vitest";
import PartialMatchRegExp from "./index.ts";
import { compiledOf } from "./partialMatchInternals.ts";
import { hitEndOf } from "../../test/hitEndOf.ts";
import type { CompiledStatic } from "./compilePartial/compiled.ts";

const E = "$(?![\\s\\S])";

const sourceOf = (pattern: RegExp) =>
  (compiledOf(new PartialMatchRegExp(pattern)) as CompiledStatic).regex.source;

describe("an unbounded quantifier on an atom runs as a native loop after the minimum, since a repetition past the minimum that took the end-of-input branch would match nothing", () => {
  it.each([
    [/a*/, "a*"],
    [/a*?/, "a*?"],
    [/a{0,}/, "a*"],
    [/a+/, `(?:a|${E})a*`],
    [/a+?/, `(?:a|${E})a*?`],
    [/a{1,}/, `(?:a|${E})a*`],
    [/a{3,}/, `(?:a|${E}){3}a*`],
    [/a{3,}?/, `(?:a|${E}){3}a*?`],
    [/a{03,}/, `(?:a|${E}){03}a*`],
    [/a{1000000000000000000000,}/u, `(?:a|${E}){1000000000000000000000}a*`],
    [/\S+/, `(?:\\S|${E})\\S*`],
    [/.+/, `(?:.|${E}).*`],
    [/[^{}]*/, "[^{}]*"],
    [/\x41+/, `(?:\\x41|${E})\\x41*`],
    [/\p{L}+/u, `(?:\\p{L}|${E})\\p{L}*`],
    [/\u{1F600}+/u, `(?:\\u{1F600}|${E})\\u{1F600}*`],
    [/[\q{abc}]+/v, `(?:[\\q{abc}]|${E})[\\q{abc}]*`],
    [/\p{RGI_Emoji}+/v, `(?:\\p{RGI_Emoji}|${E})\\p{RGI_Emoji}*`],
    [/(\S+)/, `((?:\\S|${E})\\S*)`]
  ])("compiles %s to %s", (pattern, expected) => {
    expect(sourceOf(pattern)).toBe(expected);
  });

  it.each([
    [/a?/, `(?:a|${E})?`],
    [/a{0,4}/, `(?:a|${E}){0,4}`],
    [/a{0,4}?/, `(?:a|${E}){0,4}?`],
    [/a{3,5}/, `(?:a|${E}){3,5}`],
    [/a{3}/, `(?:a|${E}){3}`],
    [/(?:ab)+/, `)+`]
  ])("leaves the bounded or grouped %s as it was", (pattern, looped) => {
    expect(sourceOf(pattern)).toContain(looped);
  });

  it.each([
    [/(\S+)/, `((?:\\S|${E})+)`, ["ab cd", "abc", ""]],
    [/\w{2,}c/, `(?:\\w|${E}){2,}(?:c|${E})`, ["abc", "a", "ab", "a c"]],
    [/(a+?)(a*)/, `((?:a|${E})+?)((?:a|${E})*)`, ["aaa", "b"]],
    [
      /x\d{3,}?y/,
      `(?:x|${E})(?:\\d|${E}){3,}?(?:y|${E})`,
      ["x12", "x123y", "x1234y"]
    ],
    [
      /\{\{[^{}]*\}\}/,
      `(?:\\{|${E})(?:\\{|${E})(?:[^{}]|${E})*(?:\\}|${E})(?:\\}|${E})`,
      ["{{ab}}", "{{ab", "{"]
    ],
    [/(?i:[ab]{2,})B/, `(?i:(?:[ab]|${E}){2,})(?:B|${E})`, ["A", "aB", "abb"]]
  ])("matches %s like the looped optional atoms it replaces", (pattern, looped, inputs) => {
    const partial = new PartialMatchRegExp(pattern);
    const reference = new RegExp(looped, pattern.flags);
    for (const input of inputs) {
      for (let end = 0; end <= input.length; end++) {
        const prefix = input.slice(0, end);
        partial.lastIndex = reference.lastIndex = 0;
        expect(partial.exec(prefix)).toEqual(reference.exec(prefix));
      }
    }
  });
});

describe("matches as the same atom repeated by a group, which keeps the truncation branch in every repetition, with the same hitEnd()", () => {
  const atoms = ["a", "[ab]", ".", "\\w", "[^b]", "[]"];
  const quantifiers = ["*", "+", "{0,}", "{1,}", "{2,}", "*?", "+?", "{2,}?"];
  const contexts = [
    (quantified: string) => quantified,
    (quantified: string) => "(" + quantified + ")c",
    (quantified: string) => "(?:" + quantified + "|b)c",
    (quantified: string) => "(?=" + quantified + "c)"
  ];
  const inputs = [""];
  for (let index = 0; inputs[index].length < 3; index++) {
    for (const character of ["a", "b", "c", "A", "\n"])
      inputs.push(inputs[index] + character);
  }

  it.each(
    atoms.flatMap((atom) => quantifiers.map((quantifier) => [atom, quantifier]))
  )("%s%s", (atom, quantifier) => {
    for (const context of contexts) {
      for (const flags of ["", "i"]) {
        const partial = new PartialMatchRegExp(context(atom + quantifier), flags);
        const grouped = new PartialMatchRegExp(
          context("(?:" + atom + ")" + quantifier),
          flags
        );
        for (const input of inputs) {
          const match = partial.exec(input);
          const expected = grouped.exec(input);
          expect(match && [match.index, ...match]).toEqual(
            expected && [expected.index, ...expected]
          );
          if (match === null || expected === null) continue;
          expect(hitEndOf(partial, input)).toBe(hitEndOf(grouped, input));
        }
      }
    }
  });
});
