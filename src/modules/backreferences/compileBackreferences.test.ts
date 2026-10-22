import { describe, it, expect, vi } from "vitest";
import PartialMatchRegExp from "../../partialMatchRegExp/index.ts";
import withModules from "../../partialMatchRegExp/withModules.ts";
import { compiledOf } from "../../partialMatchRegExp/partialMatchInternals.ts";
import carets from "../carets/index.ts";
import backreferences, { backreferencesWith } from "./index.ts";

const resultOf = (match: RegExpExecArray | null) =>
  match && [match.index, ...match];

function hiddenGroupsOf(
  partial: PartialMatchRegExp,
  internalCompiledOf: typeof compiledOf = compiledOf
) {
  const compiled = internalCompiledOf(partial);
  return "backreferencePath" in compiled
    ? compiled.backreferencePath.hiddenGroups
    : [];
}

describe("a backreference running out of input part way through its capture", () => {
  it.each([
    [/(\w\w)\1/, "abxcdc", [3, "cdc", "cd"]],
    [/(ab|ba)\1/, "abxbab", [3, "bab", "ba"]],
    [/(ab|a)\1|(a|b)\2/, "baba", [1, "aba", "ab", undefined]],
    [/(\w+)-\1/, "ab-xbc-b", [4, "bc-b", "bc"]],
    [/^(a+b)\1|^(a+bc)\2/, "abca", [0, "abca", undefined, "abc"]],
    [/(a|b+)\1(a|b)\2a/, "aaba", [3, "a", "a", ""]],
    [/(?<n>ab|ba)\k<n>/, "abxbab", [3, "bab", "ba"]],
    [/(?:(?<n>abc)|(?<n>b))-\k<n>/, "abc-ab", [0, "abc-ab", "abc", undefined]],
    [/(ab)\1/i, "xabA", [1, "abA", "ab"]],
    [/(?=(\w\w))\w\1/, "baa", [1, "aa", "aa"]],
    [/(?=.(a|bcd))\1/, "xa", [1, "", ""]],
    [/(?=\w(\w|\w\w\w))\1/, "xyz", [2, "", ""]],
    [/(a+)\1(b+)\2/, "aabbb", [0, "aabbb", "a", "bbb"]],
    [/([\q{abc}])\1/v, "abcab", [0, "abcab", "abc"]],
    [/([\q{abc}]x)\1/v, "abcxab", [0, "abcxab", "abcx"]],
    [/(\p{RGI_Emoji})\1/v, "👨‍👩‍👧👨", [0, "👨‍👩‍👧👨", "👨‍👩‍👧"]]
  ])("finds %s's earliest partial match in %j", (pattern, input, expected) => {
    expect(resultOf(new PartialMatchRegExp(pattern).exec(input))).toEqual(
      expected
    );
  });

  it.each([
    [/(a)\1b|a/, "aa", [0, "aa", "a"]],
    [/(a+)\1b|a/, "aa", [0, "aa", "aa"]],
    [/(a)\1b|a/, "-aa", [1, "aa", "a"]]
  ])("prefers %s's higher-priority alternative that ran out of input in %j to a native match, as without a backreference", (pattern, input, expected) => {
    expect(resultOf(new PartialMatchRegExp(pattern).exec(input))).toEqual(
      expected
    );
  });

  it("prefers a native match the regex cannot reach, since a lookahead keeps the first capture it makes", () => {
    const partial = new PartialMatchRegExp(/(?=(a|-b){1,2})\1/);
    expect(resultOf(partial.exec("a-"))).toEqual([0, "a", "a"]);
    expect(resultOf(new PartialMatchRegExp(/^(?=(a|-b){1,2})\1/).exec("a-"))).toEqual([0, "a", "a"]);
  });

  it("keeps the regex's match over a native one at the same index", () => {
    expect(resultOf(new PartialMatchRegExp(/(?=(x))\1ab|x/).exec("-xa"))).toEqual([1, "xa", "x"]);
  });

  it("finds nothing where neither the regex nor the native pattern can match", () => {
    expect(new PartialMatchRegExp(/^(?=(a))\1b/).exec("x")).toBeNull();
  });

  it.each([
    [/(\w\w)\1/, "abxcdc", false],
    [/(?=(a|-b){1,2})\1/, "a", false],
    [/(?=(a|-b){1,2})\1/, "a-", true]
  ])("runs the native pattern for %s on %j only where a lookaround captures and the regex finds nothing at the start: %s", (pattern, input, runsNative) => {
    const partial = new PartialMatchRegExp(pattern);
    const exec = vi.spyOn(RegExp.prototype, "exec");
    try {
      partial.exec(input);
      expect(exec.mock.contexts.indexOf(partial) !== -1).toBe(runsNative);
    } finally {
      exec.mockRestore();
    }
  });

  it("matches a capture of any length without writing it into the pattern", () => {
    const input = "ab".repeat(8000);
    expect(new PartialMatchRegExp(/(\w+)\1x/).exec(input)?.index).toBe(0);
  });
});

describe("the compiled path", () => {
  it.each([
    [/(a)\1/, PartialMatchRegExp],
    [/(["'])(?:\\.|(?!\1).)*\1/, PartialMatchRegExp],
    [/(\w+)-\1/, withModules(carets, backreferencesWith({ longestPartial: 0 }))]
  ])("takes %s down the static path, since no match needs anything removed", (pattern, Partial) => {
    expect("backreferencePath" in compiledOf(new Partial(pattern))).toBe(false);
  });

  it.each([/(\w\w)\1/, /(?=(a))\1/])("keeps %s on the backreference path, for its hidden groups or a capture inside a lookaround", (pattern) => {
    expect("backreferencePath" in compiledOf(new PartialMatchRegExp(pattern))).toBe(true);
  });
});

describe("the hidden groups", () => {
  it("leaves out a backreference whose group captures one character at most", () => {
    expect(hiddenGroupsOf(new PartialMatchRegExp(/(a)\1(\w\w)\2(a+)\3/))).toEqual([3, 6]);
  });

  it("leaves out a forward reference", () => {
    expect(hiddenGroupsOf(new PartialMatchRegExp(/\2(\w\w)(\w\w)\1/))).toEqual([3]);
  });

  it("leaves the match's captures, groups and indices as the pattern numbers them", () => {
    const match = new PartialMatchRegExp(/(?<x>a+)-\k<x>(?<y>b)/d).exec("aa-a");
    expect(resultOf(match)).toEqual([0, "aa-a", "aa", ""]);
    expect(match?.groups).toEqual({ x: "aa", y: "" });
    expect(match?.indices).toEqual(
      Object.assign([[0, 4], [0, 2], [4, 4]], {
        groups: { x: [0, 2], y: [4, 4] }
      })
    );
  });

  it("renumbers a reference inside a lookbehind to a group after a hidden one", () => {
    expect(
      resultOf(new PartialMatchRegExp(/(a+)\1(b+)c(?<=c)(?<!\2)d/).exec("aabbc"))
    ).toEqual([0, "aabbc", "a", "bb"]);
  });

  it("reads a reference inside a lookbehind to a group the pattern lacks as the escape it spells", () => {
    expect(
      resultOf(new PartialMatchRegExp(new RegExp("(a)\\1|(?<=\\2)bc")).exec("\x02b"))
    ).toEqual([1, "b", undefined]);
  });

  it.each([/(?<=x)(?<=(x))(a+)-\2/, /(?<=(x))(?<=x)(a+)-\2/])("numbers %s's hidden group after the groups inside earlier lookbehinds", (pattern) => {
    const partial = new PartialMatchRegExp(pattern);
    expect(hiddenGroupsOf(partial)).toEqual([3]);
    expect(resultOf(partial.exec("xaa-a"))).toEqual([1, "aa-a", "x", "aa"]);
  });

  it("renumbers a reference to a group after a hidden one and a lookbehind's group", () => {
    expect(
      resultOf(new PartialMatchRegExp(/(a+)-\1(?<=(a))(b+)-\3x/).exec("a-ab-b"))
    ).toEqual([0, "a-ab-b", "a", "a", "b"]);
  });

  it("renumbers a reference to a group opened by a lookbehind that ends the pattern", () => {
    expect(
      resultOf(new PartialMatchRegExp(/(a+)-\1b+(?<=\2(b))c/).exec("aa-aabb"))
    ).toEqual([0, "aa-aabb", "aa", "b"]);
  });

  it("leaves out a backreference to a group whose property escape matches one character", () => {
    expect(hiddenGroupsOf(new PartialMatchRegExp(/(\p{L})\1/u))).toEqual([]);
  });

  it("numbers a group inside a lookbehind among the pattern's groups", () => {
    expect(
      resultOf(new PartialMatchRegExp(/(a+)-\1(?<=(a))/).exec("aa-a"))
    ).toEqual([0, "aa-a", "aa", "a"]);
  });

  it("follows lastIndex under the g and y flags", () => {
    const global = new PartialMatchRegExp(/(\w+)-\1/g);
    expect(resultOf(global.exec("ab-ab cd-c"))).toEqual([0, "ab-ab", "ab"]);
    expect(global.lastIndex).toBe(5);
    expect(resultOf(global.exec("ab-ab cd-c"))).toEqual([6, "cd-c", "cd"]);
    expect(global.lastIndex).toBe(10);

    const sticky = new PartialMatchRegExp(/(\w+)-\1/y);
    sticky.lastIndex = 6;
    expect(resultOf(sticky.exec("ab-ab cd-c"))).toEqual([6, "cd-c", "cd"]);
    sticky.lastIndex = 5;
    expect(sticky.exec("ab-ab cd-c")).toBeNull();
    expect(sticky.lastIndex).toBe(0);
  });
});

describe("backreferencesWith", () => {
  it("matches only the endings no longer than longestPartial part way through a capture", () => {
    const Short = withModules(carets, backreferencesWith({ longestPartial: 2 }));
    expect(resultOf(new Short(/(\w+)-\1/).exec("abc-ab"))).toEqual([0, "abc-ab", "abc"]);
    expect(resultOf(new Short(/(\w+)-\1/).exec("abcd-abc"))).toEqual([5, "abc", "abc"]);
    expect(resultOf(new PartialMatchRegExp(/(\w+)-\1/).exec("abcd-abc"))).toEqual([0, "abcd-abc", "abcd"]);
  });

  it("matches a backreference only in full or at the end of the input with longestPartial 0", () => {
    const Atomic = withModules(carets, backreferencesWith({ longestPartial: 0 }));
    const partial = new Atomic(/(\w+)-\1/);
    expect(hiddenGroupsOf(partial)).toEqual([]);
    expect(resultOf(partial.exec("ab-a"))).toEqual([3, "a", "a"]);
  });

  it("returns the same module for the same options, and so the same class", () => {
    expect(backreferencesWith({ longestPartial: 64 })).toBe(backreferences);
    expect(backreferencesWith({ longestPartial: 8 })).toBe(backreferencesWith({ longestPartial: 8 }));
    expect(withModules(backreferencesWith({ longestPartial: 8 }))).toBe(
      withModules(backreferencesWith({ longestPartial: 8 }))
    );
    expect(withModules(backreferencesWith({ longestPartial: 8 }))).not.toBe(
      withModules(backreferences)
    );
  });

  it.each([-1, 1.5, Number.NaN, Infinity, 1e21, Number.MAX_SAFE_INTEGER + 1])("throws a RangeError for longestPartial %d", (longestPartial) => {
    expect(() => backreferencesWith({ longestPartial })).toThrow(
      new RangeError("longestPartial must be a whole number from 0 to Number.MAX_SAFE_INTEGER")
    );
  });

  it("refuses two backreferences modules in one class", () => {
    expect(() =>
      withModules(backreferences, backreferencesWith({ longestPartial: 8 }))
    ).toThrow(new TypeError("Two modules supply the same rules"));
  });
});

describe("on an engine that cannot parse a lookbehind", () => {
  it("matches a backreference only in full or at the end of the input", async () => {
    const NativeRegExp = RegExp;
    vi.resetModules();
    vi.stubGlobal(
      "RegExp",
      new Proxy(NativeRegExp, {
        construct(target, args: [string, string?], newTarget: NewableFunction) {
          if (args[0] === "(?<=a)") throw new SyntaxError("Invalid group");
          return Reflect.construct(target, args, newTarget) as RegExp;
        }
      })
    );
    try {
      const { default: Fresh } = await import("../../partialMatchRegExp/index.ts");
      const { default: freshHitEnd } = await import("../../hitEnd/index.ts");
      const internals = await import("../../partialMatchRegExp/partialMatchInternals.ts");
      const partial = new Fresh(/(\w\w)\1/);
      expect(hiddenGroupsOf(partial, internals.compiledOf)).toEqual([]);
      const match = partial.exec("abxcdc");
      expect(resultOf(match)).toEqual([4, "dc", "dc"]);
      expect(freshHitEnd(partial, match!)).toBe(true);
      expect(internals.compiledOf(partial).probe?.regex.source).not.toContain("(?<");
    } finally {
      vi.unstubAllGlobals();
      vi.resetModules();
    }
  });
});
