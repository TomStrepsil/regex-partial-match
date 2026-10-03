import { describe, it, expect } from "vitest";
import PartialMatchRegExp from "./corePartialMatchRegExp.ts";
import FullPartialMatchRegExp from "../partialMatchRegExp/index.ts";
import { compiledOf } from "../partialMatchRegExp/partialMatchInternals.ts";
import { CompiledStatic } from "../partialMatchRegExp/compilePartial/compiled.ts";
import withModules from "../partialMatchRegExp/withModules.ts";
import features from "../features/index.ts";
import backreferences from "../modules/backreferences/index.ts";

function renderedOf(partial: RegExp) {
  const { constructor, parts, featureMask } = compiledOf(partial);
  return { constructor, parts, featureMask };
}

function matchesOf(partial: RegExp, inputs: readonly string[]) {
  return inputs.map((input) => {
    partial.lastIndex = 0;
    const match = partial.exec(input);
    return match && { index: match.index, match: [...match] };
  });
}

describe("PartialMatchRegExp from ./core", () => {
  describe("refuses a caret in a group or positive lookahead, or under the m flag after a consuming part", () => {
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
      /(^\d+)/,
      /(^https?):/,
      /(?:^a|^b)c/,
      /(^a)+/,
      /x(^a)/,
      /(?:^|x)a/,
      /(?=^a)/,
      /(?-m:^a)b/m
    ])("throws a TypeError naming the carets module for %s", (pattern) => {
      expect(() => new PartialMatchRegExp(pattern)).toThrow(TypeError);
      expect(() => new PartialMatchRegExp(pattern)).toThrow(
        /carets module/
      );
    });

    it.each([/^foo/m, /a|^b/m, /\b^a/m, /$^a/m, /^^a/m, /a^b/, /x|a^/, /^(\d+)/])(
      "accepts %s and transforms it exactly as the full class does",
      (pattern) => {
        expect(renderedOf(new PartialMatchRegExp(pattern))).toEqual(
          renderedOf(new FullPartialMatchRegExp(pattern))
        );
      }
    );

    it.each([
      /(?<=^)a/,
      /(?<!^)a/m,
      /a(?!^)/m,
      /x(?<=a^)/m,
      /(a(?<=^))/,
      /(?=(?<=^))a/
    ])(
      "accepts %s, whose caret a lookbehind or negative lookahead keeps as written, and renders it as the full class does",
      (pattern) => {
        expect(renderedOf(new PartialMatchRegExp(pattern))).toEqual(
          renderedOf(new FullPartialMatchRegExp(pattern))
        );
      }
    );
  });

  it.each([
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
    expect(renderedOf(lean)).toEqual(renderedOf(full));
    expect(matchesOf(lean, inputs)).toEqual(matchesOf(full, inputs));
  });

  it("names its features through features() with no module bound", () => {
    expect(features(new PartialMatchRegExp(/^a/))).toEqual(
      new Set(["patternCharacter", "startAnchor"])
    );
  });

  it.each([/^[a-z]+/, /(?<y>\d{4})-\k<y>/, /a(?=(b))|[\p{L}--a]/v])(
    "reports through features() the full class's features for %s",
    (pattern) => {
      const Bound = withModules(backreferences);
      expect(features(new Bound(pattern))).toEqual(
        features(new FullPartialMatchRegExp(pattern))
      );
    }
  );

  it("is a RegExp subclass of its own, named as the full class is", () => {
    expect(new PartialMatchRegExp(/a/)).toBeInstanceOf(RegExp);
    expect(PartialMatchRegExp).not.toBe(FullPartialMatchRegExp);
    expect(PartialMatchRegExp.name).toBe(FullPartialMatchRegExp.name);
    expect(Object.getPrototypeOf(PartialMatchRegExp)).toBe(RegExp);
  });

  it("is its own species, and a subclass's species is the subclass", () => {
    class Sub extends PartialMatchRegExp {}
    expect(PartialMatchRegExp[Symbol.species]).toBe(PartialMatchRegExp);
    expect(Sub[Symbol.species]).toBe(Sub);
    expect(new Sub(/b/g)).toBeInstanceOf(Sub);
    expect(new Sub(/b/g)).toBeInstanceOf(PartialMatchRegExp);
    expect("abcb".split(new Sub(/b/g))).toEqual(["a", "c", ""]);
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
      const lean = renderedOf(new PartialMatchRegExp(pattern));
      expect(lean.constructor).toBe(CompiledStatic);
      expect(lean).toEqual(renderedOf(new FullPartialMatchRegExp(pattern)));
    }
  );
});

describe("PartialMatchRegExp from ./core names, in one TypeError, every module a pattern needs", () => {
  it.each([
    [/(^a)/, "Needs the carets module"],
    [/x^a/m, "Needs the carets module"],
    [/(a)\1/, "Needs the backreferences module"],
    [/(a)\1(^b)/, "Needs the carets and backreferences modules"],
    [/(^b)(a)\2/, "Needs the carets and backreferences modules"],
    [/(a)\1x^b/m, "Needs the carets and backreferences modules"]
  ])("throws for %s: %s", (pattern, message) => {
    expect(() => new PartialMatchRegExp(pattern)).toThrow(
      new TypeError(message)
    );
  });
});
