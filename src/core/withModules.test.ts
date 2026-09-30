import { describe, it, expect, vi } from "vitest";
import withModules from "./withModules.ts";
import PartialMatchRegExp from "./partialMatchRegExp.ts";
import FullPartialMatchRegExp from "../partialMatchRegExp/partialMatchRegExp.ts";
import carets from "../modules/carets/index.ts";
import backreferences from "../modules/backreferences/index.ts";
import { isBackreference } from "../partialMatchRegExp/part.ts";
import { compiledPartial } from "../partialMatchRegExp/partialMatchInternals.ts";

function countedCaretHooks() {
  const append = vi.fn(carets.caret);
  return { append, hooks: { caret: append } };
}

const recordersBuilt = (append: ReturnType<typeof vi.fn>) =>
  append.mock.results.filter((result) => result.value !== undefined).length;

describe("withModules", () => {
  it("returns the same class for the same set of modules, in any order", () => {
    const other = {};
    expect(withModules(carets)).toBe(
      withModules(carets)
    );
    expect(withModules(carets, other)).toBe(
      withModules(other, carets)
    );
    expect(withModules(carets, carets)).toBe(
      withModules(carets)
    );
    expect(withModules()).toBe(withModules());
  });

  it("returns a different class for a different set of modules", () => {
    const other = countedCaretHooks().hooks;
    expect(withModules(carets)).not.toBe(withModules(other));
    expect(withModules(carets)).not.toBe(
      withModules(carets, other)
    );
    expect(withModules()).not.toBe(withModules(carets));
  });

  it("returns a RegExp subclass named as the ./core class is", () => {
    const Bound = withModules(carets);
    expect(new Bound(/a/)).toBeInstanceOf(Bound);
    expect(new Bound(/a/)).toBeInstanceOf(RegExp);
    expect(Bound).not.toBe(PartialMatchRegExp);
    expect(Bound.name).toBe(PartialMatchRegExp.name);
  });

  it("binds no rules when given no modules", () => {
    const Bound = withModules();
    expect(() => new Bound(/x^a/m)).toThrow(/carets module/);
    expect(() => new Bound(/(a)\1/)).toThrow(/backreferences module/);
  });

  it.each([/^a/m, /x(^a)+/m, /(?:a|b)(?=^c)/m, /(a|^b){2}^c/m, /(?m:^a)/])(
    "binds the multiline caret rules the full class applies to %s",
    (pattern) => {
      const Bound = withModules(carets);
      expect(new Bound(pattern)[compiledPartial].parts).toEqual(
        new FullPartialMatchRegExp(pattern)[compiledPartial].parts
      );
    }
  );

  // A modifier group changes the flags its body is read under, and only the modules read those flags, so each module brings the rule itself: either alone reads a modifier group as the full class does.
  describe("reading a modifier group's flags", () => {
    it.each<[string, RegExp, string, { match: string; index: number } | null]>([
      ["a (?m:^) after a line break, still open", /x\n(?m:^y)/, "x\n", { match: "x\n", index: 0 }],
      ["a (?m:^) after a line break, complete", /x\n(?m:^y)/, "x\ny", { match: "x\ny", index: 0 }],
      ["a (?-m:^) after a line break under m", /x\n(?-m:^y)/m, "x\n", null],
      ["a (?m:^) after an alternative that may take a line break", /(?:a|\n)(?m:^b)/, "\n", { match: "\n", index: 0 }]
    ])("with the carets module alone, matches %s", (_, pattern, input, expected) => {
      const match = new (withModules(carets))(pattern).exec(input);
      if (expected === null) expect(match).toBeNull();
      else expect(match).toMatchAt(expected);
    });

    it.each<[RegExp, boolean[]]>([
      [/(a)(?i:\1)\1/, [true, false]],
      [/(a)(?-i:\1)/i, [false]]
    ])(
      "with the backreferences module alone, stamps each reference in %s as case-insensitive %j",
      (pattern, caseInsensitive) => {
        const parts = new (withModules(backreferences))(pattern)[compiledPartial]
          .parts;
        expect(
          parts.filter(isBackreference).map((part) => part.caseInsensitive)
        ).toEqual(caseInsensitive);
      }
    );
  });

  it.each<[RegExp, number]>([
    [/^a/m, 0],
    [/^a|^b/m, 0],
    [/a$/m, 0],
    [/[^a]b/m, 0],
    [/(^a)/, 1],
    [/\n^a/m, 1],
    [/a(?=^b)/m, 1],
    [/a|(^b)/m, 1],
    [/a\|^b/m, 1]
  ])(
    "builds the caret recorder for %s only when the pattern may need it (%i times)",
    (pattern, times) => {
      const { append, hooks } = countedCaretHooks();
      const partial = new (withModules(hooks))(pattern);
      expect(recordersBuilt(append)).toBe(times);
      expect(partial[compiledPartial].parts).toEqual(
        new FullPartialMatchRegExp(pattern)[compiledPartial].parts
      );
    }
  );

  describe("keeps the modules bound through Symbol.species", () => {
    const input = "a\nb\nab\nb";

    it("in split()", () => {
      const { append, hooks } = countedCaretHooks();
      const partial = new (withModules(hooks))(/\n^b/m);
      expect(append).toHaveBeenCalledTimes(1);
      expect(input.split(partial)).toEqual(
        input.split(new FullPartialMatchRegExp(/\n^b/m))
      );
      expect(append).toHaveBeenCalledTimes(2);
    });

    it("in matchAll()", () => {
      const { append, hooks } = countedCaretHooks();
      const partial = new (withModules(hooks))(/\n^b/gm);
      expect(append).toHaveBeenCalledTimes(1);
      expect([...input.matchAll(partial)].map((match) => match.index)).toEqual(
        [...input.matchAll(new FullPartialMatchRegExp(/\n^b/gm))].map(
          (match) => match.index
        )
      );
      expect(append).toHaveBeenCalledTimes(2);
    });

    it("in replace(), which rebuilds nothing", () => {
      const { append, hooks } = countedCaretHooks();
      const partial = new (withModules(hooks))(/\n^b/gm);
      expect(input.replace(partial, "x")).toBe(
        input.replace(new FullPartialMatchRegExp(/\n^b/gm), "x")
      );
      expect(append).toHaveBeenCalledTimes(1);
    });
  });
});
