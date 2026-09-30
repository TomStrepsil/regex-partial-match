import { describe, it, expect } from "vitest";
import PartialMatchRegExp from "./partialMatchRegExp.ts";
import FullPartialMatchRegExp from "../partialMatchRegExp/partialMatchRegExp.ts";
import { compiledPartial } from "../partialMatchRegExp/partialMatchInternals.ts";
import withModules from "./withModules.ts";
import backreferences from "../modules/backreferences/index.ts";
import features from "../modules/features/index.ts";

function matchesOf(partial: RegExp, inputs: readonly string[]) {
  return inputs.map((input) => {
    partial.lastIndex = 0;
    const match = partial.exec(input);
    return match && { index: match.index, match: [...match] };
  });
}

describe("PartialMatchRegExp from ./core", () => {
  describe("refuses a caret in a group or lookaround, or under the m flag after a consuming part", () => {
    it.each([
      /a^b/m,
      /x^a/m,
      /(^a)/m,
      /a(?=^b)/m,
      /(?:a^)+/m,
      /a*(^a)/m,
      /a|b^c/m,
      /(?m:^a)/,
      /a(?m:^b)/,
      /(^a)/,
      /(?:^|x)a/,
      /(?=^a)/,
      /(?-m:^a)b/m
    ])("throws a TypeError naming the carets module for %s", (pattern) => {
      expect(() => new PartialMatchRegExp(pattern)).toThrow(TypeError);
      expect(() => new PartialMatchRegExp(pattern)).toThrow(
        /carets module/
      );
    });

    it.each([/^foo/m, /a|^b/m, /\b^a/m, /$^a/m, /^^a/m, /a^b/, /x|a^/])(
      "accepts %s and transforms it exactly as the full class does",
      (pattern) => {
        const lean = new PartialMatchRegExp(pattern);
        const full = new FullPartialMatchRegExp(pattern);
        expect(lean[compiledPartial].parts).toEqual(
          full[compiledPartial].parts
        );
        expect(lean[compiledPartial].featureMask).toBe(
          full[compiledPartial].featureMask
        );
      }
    );
  });

  it.each<[RegExp, string[]]>([
    [/^ab|c$/, ["", "a", "ab", "xc", "x"]],
    [/^a/m, ["", "a", "b\na", "b"]],
    [/(?-m:a)^b/, ["", "a", "ab", "b"]],
    [/a$\nb/m, ["a", "a\n", "a\nb"]],
    [/[^a]+\^b/m, ["", "x", "x^", "x^b"]],
    [new RegExp("x\\8y"), ["", "x", "x8", "x8y"]],
    [new RegExp("(a)\\2"), ["", "a", "a\u0002"]],
    [/(?<=a)b(?!c)/, ["a", "ab", "abc"]],
    [/\bfoo\B/iu, ["f", "foo", "fooo"]]
  ])("transforms %s exactly as the full class does", (pattern, inputs) => {
    const lean = new PartialMatchRegExp(pattern);
    const full = new FullPartialMatchRegExp(pattern);
    expect(lean[compiledPartial].parts).toEqual(full[compiledPartial].parts);
    expect(lean[compiledPartial].featureMask).toBe(
      full[compiledPartial].featureMask
    );
    expect(matchesOf(lean, inputs)).toEqual(matchesOf(full, inputs));
  });

  describe("leaves features to the features module", () => {
    it("throws a TypeError naming the features module when features is read", () => {
      const lean = new PartialMatchRegExp(/^[a-z]+/);
      expect(() => lean.features).toThrow(TypeError);
      expect(() => lean.features).toThrow(/features module/);
    });

    it.each([/^[a-z]+/, /(?<y>\d{4})-\k<y>/, /a(?=(b))|[\p{L}--a]/v])(
      "reports the full class's features for %s once the module is bound",
      (pattern) => {
        const Bound = withModules(features, backreferences);
        expect(new Bound(pattern).features).toEqual(
          new FullPartialMatchRegExp(pattern).features
        );
      }
    );
  });

  it("is a RegExp subclass of its own, named as the full class is", () => {
    expect(new PartialMatchRegExp(/a/)).toBeInstanceOf(RegExp);
    expect(PartialMatchRegExp).not.toBe(FullPartialMatchRegExp);
    expect(PartialMatchRegExp.name).toBe(FullPartialMatchRegExp.name);
    expect(Object.getPrototypeOf(PartialMatchRegExp)).toBe(RegExp);
  });

  it("rebuilds itself through Symbol.species", () => {
    const partial = new PartialMatchRegExp(/b/g);
    expect("abcb".split(partial)).toEqual(
      "abcb".split(new FullPartialMatchRegExp(/b/g))
    );
    expect([..."abcb".matchAll(partial)].map((match) => match.index)).toEqual(
      [1, 3, 4]
    );
  });
});

describe("PartialMatchRegExp from ./core refuses a pattern exactly when a backreference in it refers to a group, since only the backreferences module can match it", () => {
  it.each([
    /(a)\1/,
    /(\w)\1/,
    /\1(a)/,
    /(?<k>a|b)\k<k>c/g,
    /\k<k>(?<k>a)/,
    /(a)\1/u,
    /(?i:(a))\1/,
    /(a)(?:\1)+/
  ])("throws a TypeError naming the backreferences module for %s", (pattern) => {
    expect(() => new PartialMatchRegExp(pattern)).toThrow(TypeError);
    expect(() => new PartialMatchRegExp(pattern)).toThrow(
      /backreferences module/
    );
  });

  it.each([
    "x\\8y",
    "\\101",
    "(a)\\2",
    "\\k<k>",
    "[\\1](a)",
    "\\\\1(a)",
    "(a)(?!\\1)",
    "(?<k>a)(?<!\\k<k>)"
  ])(
    "accepts /%s/, whose escape is compiled statically",
    (source) => {
      const pattern = new RegExp(source);
      const lean = new PartialMatchRegExp(pattern)[compiledPartial];
      const full = new FullPartialMatchRegExp(pattern)[compiledPartial];
      expect(lean.kind).toBe("static");
      expect(lean.parts).toEqual(full.parts);
    }
  );
});
