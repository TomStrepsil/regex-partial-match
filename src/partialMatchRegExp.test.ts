import { describe, it, expect } from "vitest";
import { PartialMatchRegExp } from "./partialMatchRegExp.ts";
import createPartialMatchRegex from "./createPartialMatchRegex.ts";

describe("PartialMatchRegExp", () => {
  it("is an instance of RegExp", () => {
    expect(new PartialMatchRegExp(/abc/)).toBeInstanceOf(RegExp);
  });

  it("passes flags through from a RegExp argument", () => {
    expect(new PartialMatchRegExp(/abc/d).hasIndices).toBe(true);
    expect(new PartialMatchRegExp(/abc/g).global).toBe(true);
    expect(new PartialMatchRegExp(/abc/i).ignoreCase).toBe(true);
    expect(new PartialMatchRegExp(/abc/m).multiline).toBe(true);
    expect(new PartialMatchRegExp(/abc/s).dotAll).toBe(true);
    expect(new PartialMatchRegExp(/abc/u).unicode).toBe(true);
    expect(new PartialMatchRegExp(/abc/v).unicodeSets).toBe(true);
    expect(new PartialMatchRegExp(/abc/y).sticky).toBe(true);
    expect(new PartialMatchRegExp(/abc/gi).global).toBe(true);
    expect(new PartialMatchRegExp(/abc/gi).ignoreCase).toBe(true);
    expect(new PartialMatchRegExp(/abc/i, "m").ignoreCase).toBe(false);
    expect(new PartialMatchRegExp(/abc/i, "m").multiline).toBe(true);
  });

  it("applies the flags argument when pattern is a string", () => {
    expect(new PartialMatchRegExp("abc").ignoreCase).toBe(false);
    expect(new PartialMatchRegExp("abc", "d").hasIndices).toBe(true);
    expect(new PartialMatchRegExp("abc", "i").ignoreCase).toBe(true);
    expect(new PartialMatchRegExp("abc", "m").multiline).toBe(true);
    expect(new PartialMatchRegExp("abc", "s").dotAll).toBe(true);
    expect(new PartialMatchRegExp("abc", "u").unicode).toBe(true);
    expect(new PartialMatchRegExp("abc", "v").unicodeSets).toBe(true);
    expect(new PartialMatchRegExp("abc", "y").sticky).toBe(true);
    expect(new PartialMatchRegExp("abc", "g").global).toBe(true);
    expect(new PartialMatchRegExp("abc", "gi").global).toBe(true);
    expect(new PartialMatchRegExp("abc", "gi").ignoreCase).toBe(true);
  });

  it("global flag: lastIndex advances past the match so iteration can continue forward", () => {
    const re = new PartialMatchRegExp(/ab/g);
    expect(re.exec("abxyab")?.[0]).toBe("ab");
    expect(re.lastIndex).toBe(2);
    expect(re.exec("abxyab")?.[0]).toBe("ab");
    expect(re.lastIndex).toBe(6);
    expect(re.exec("abxyab")).toBeNull();
    expect(re.lastIndex).toBe(0);
  });

  it("sticky flag: lastIndex advances past the match so the next sticky exec uses the new position", () => {
    const re = new PartialMatchRegExp(/ab/y);
    expect(re.exec("abcd")?.[0]).toBe("ab");
    expect(re.lastIndex).toBe(2);
  });

  it("global regex: exec respects an externally set lastIndex", () => {
    const re = new PartialMatchRegExp(/ab/g);
    re.exec("abxyab");
    re.lastIndex = 0;
    expect(re.exec("abxyab")).toMatchObject({ 0: "ab", index: 0 });
    expect(re.lastIndex).toBe(2);
  });

  it("sticky regex: exec respects an externally set lastIndex", () => {
    const re = new PartialMatchRegExp(/ab/y);
    re.exec("abxyab");
    re.lastIndex = 4;
    expect(re.exec("abxyab")).toMatchObject({ 0: "ab", index: 4 });
    expect(re.lastIndex).toBe(6);
  });

  it("g+y flags: constructor does not throw when both g and y are combined", () => {
    const re = new PartialMatchRegExp(/ab/gy);
    expect(re.global).toBe(true);
    expect(re.sticky).toBe(true);
    expect(re.exec("ab")).toMatchObject({ 0: "ab", index: 0 });
  });
});

[
  // ── Literals ──────────────────────────────────────────────────────────────
  {
    pattern: /^abc/,
    expected: ["a", "ab", "abc"],
    notExpected: ["xyz", "123", "!"]
  },
  {
    pattern: /^hello world/,
    expected: ["h", "he", "hel", "hello", "hello ", "hello world"],
    notExpected: ["goodbye"]
  },
  // ── Character escapes ─────────────────────────────────────────────────────
  {
    pattern: /^\x61\x62\x63/,
    expected: ["a", "ab", "abc"],
    notExpected: ["xyz"]
  },
  {
    pattern: /^\u0061\u0062/,
    expected: ["a", "ab"],
    notExpected: ["xyz"]
  },
  {
    pattern: /^\u{1F600}/u,
    expected: ["😀"],
    notExpected: ["xyz"]
  },
  {
    pattern: /^\p{Lowercase_Letter}+suffix/u,
    expected: ["a", "ab", "asuffix"],
    notExpected: ["Asuffix", "1suffix"]
  },
  {
    pattern: /^\cj\cMsuffix/,
    expected: ["\n", "\n\r", "\n\rsuffix"],
    notExpected: ["x"]
  },
  // ── Character classes ─────────────────────────────────────────────────────
  {
    pattern: /^[a-z]+/,
    expected: ["a", "ab"],
    notExpected: ["A", "1"]
  },
  {
    pattern: /^[^abc]+suffix/,
    expected: ["x", "xy", "xysuffix"],
    notExpected: ["asuffix", "bsuffix"]
  },
  {
    pattern: /^[ab\\]suffix/,
    expected: ["a", "asuffix", "\\suffix"],
    notExpected: ["csuffix"]
  },
  {
    pattern: /^[a-c]suffix/i,
    expected: ["A", "Asuffix", "Bsuffix", "Csuffix"],
    notExpected: ["dsuffix"]
  },
  {
    pattern: /^[a-z]+\s\w+/,
    expected: ["a", "ab", "ab ", "ab c", "ab cd"],
    notExpected: [" ", "!", "123"]
  },
  // ── Disjunction ───────────────────────────────────────────────────────────
  {
    pattern: /^foo|^bar/,
    expected: ["f", "fo", "foo", "b", "ba", "bar"],
    notExpected: ["xyz", "123", "!"]
  },
  {
    pattern: /^cat|^dog/,
    expected: ["c", "ca", "cat", "d", "do", "dog"],
    notExpected: ["xyz"]
  },
  // ── Quantifiers ───────────────────────────────────────────────────────────
  {
    pattern: /^\d{3}-\d{4}/,
    expected: [
      "1",
      "12",
      "123",
      "123-",
      "123-4",
      "123-45",
      "123-456",
      "123-4567"
    ],
    notExpected: ["xyz", "!"]
  },
  {
    pattern: /^ab*c/,
    expected: ["a", "ab", "abc", "abbc", "ac"],
    notExpected: ["b", "axc"]
  },
  {
    pattern: /^ab+c/,
    expected: ["ab", "abc", "abbc", "a"],
    notExpected: ["ac"]
  },
  {
    pattern: /^ab?c/,
    expected: ["a", "ab", "abc", "ac"],
    notExpected: ["axc"]
  },
  {
    pattern: /^ab{2,4}c/,
    expected: ["ab", "abb", "abbb", "abbbb", "abbbbc"],
    notExpected: ["abc", "abbbbbbc"]
  },
  {
    pattern: /^ab*?c/,
    expected: ["a", "ab", "abc", "abbc", "ac"],
    notExpected: ["axc"]
  },
  // ── Unicode sets (v flag) ─────────────────────────────────────────────────
  {
    pattern: /^[\p{Alphabetic}]+suffix/v,
    expected: ["a", "aあ", "aあsuffix"],
    notExpected: ["1suffix", "!suffix"]
  },
  // ── Modifiers ─────────────────────────────────────────────────────────────
  {
    pattern: /^(?i:abc)suffix/,
    expected: ["A", "AB", "ABC", "ABCsuffix", "abcsuffix"],
    notExpected: ["xyz"]
  },
  {
    pattern: /^(?-i:abc)suffix/i,
    expected: ["a", "ab", "abcsuffix"],
    notExpected: ["ABCsuffix", "xyz"]
  },
  // ── Groups ────────────────────────────────────────────────────────────────
  {
    pattern: /^(foo)(bar)/,
    expected: ["f", "fo", "foo", "foob", "fooba", "foobar"],
    notExpected: ["xyz"]
  },
  {
    pattern: /^(?:foo)(bar)/,
    expected: ["f", "fo", "foo", "foob", "foobar"],
    notExpected: ["xyz"]
  },
  {
    pattern: /^(?<tag>foo)bar/,
    expected: ["f", "fo", "foo", "foob", "foobar"],
    notExpected: ["xyz"]
  },
  {
    pattern: /^(ab(cd)e)f/,
    expected: ["a", "ab", "abc", "abcd", "abcde", "abcdef"],
    notExpected: ["xyz"]
  },
  // ── Lookahead assertions ──────────────────────────────────────────────────
  {
    pattern: /^foo(?=bar)/,
    expected: ["f", "fo", "foo", "foob", "foobar"],
    notExpected: ["fox"]
  },
  {
    pattern: /^foo(?!baz)/,
    expected: ["f", "fo", "foo", "foob", "foobar"],
    notExpected: ["foobaz"]
  },
  // ── Lookbehind assertions ─────────────────────────────────────────────────
  {
    pattern: /(?<=foo)bar/,
    expected: ["foob", "fooba", "foobar"],
    notExpected: ["b", "ba", "bar", "xbar"]
  },
  {
    pattern: /(?<!foo)bar/,
    expected: ["b", "ba", "bar", "xbar"],
    notExpected: ["foob", "foobar"]
  },
  // ── Boundary assertions ───────────────────────────────────────────────────
  {
    pattern: /^foo$/,
    expected: ["f", "fo", "foo"],
    notExpected: ["foo ", "xfoo"]
  },
  {
    pattern: /^\bfoo\b/,
    expected: ["f", "fo", "foo"],
    notExpected: ["foob", "xfoo"]
  },
  {
    pattern: /^\Bfoo\B/,
    expected: [],
    notExpected: ["f", "fo", "foo", "xfooy", "xfoo"]
  },
  // ── Multiline ─────────────────────────────────────────────────────────────
  {
    pattern: /^foo$/m,
    expected: ["f", "fo", "foo", "foo\nbar"],
    notExpected: ["foo "]
  },
  // ── End-of-input anchors ──────────────────────────────────────────────────
  {
    pattern: /$/,
    expected: ["", "a", "abc"],
    notExpected: []
  },
  {
    pattern: /^x*$/,
    expected: ["", "x", "xx"],
    notExpected: ["y"]
  }
].forEach(({ pattern, expected, notExpected }) => {
  it(`parity with createPartialMatchRegex: /${pattern.source}/${pattern.flags}`, () => {
    const re = new PartialMatchRegExp(pattern);
    const ref = createPartialMatchRegex(pattern);
    for (const s of expected) {
      expect(re.test(s), s).toBe(true);
      expect(ref.exec(s)).not.toBeNull();
    }
    for (const s of notExpected) {
      expect(re.test(s), s).toBe(false);
      const refMatch = ref.exec(s);
      expect(refMatch === null || refMatch.index === s.length).toBe(true);
    }
  });
});

describe("sentinel suppression", () => {
  describe("exec/test return null/false for non-matching inputs", () => {
    it("test() returns false for a string that cannot match", () => {
      const re = new PartialMatchRegExp(/^foo/);
      expect(re.test("bar")).toBe(false);
      expect(re.test("xyz")).toBe(false);
      expect(re.test("foobar".slice(3))).toBe(false); // "bar"
    });

    it("exec() returns null for a string that cannot match", () => {
      const re = new PartialMatchRegExp(/^foo/);
      expect(re.exec("bar")).toBeNull();
      expect(re.exec("xyz")).toBeNull();
    });

    it("valid prefixes are not suppressed", () => {
      const re = new PartialMatchRegExp(/^foobar/);
      expect(re.test("f")).toBe(true);
      expect(re.test("fo")).toBe(true);
      expect(re.test("foo")).toBe(true);
      expect(re.test("foob")).toBe(true);
      expect(re.test("fooba")).toBe(true);
      expect(re.test("foobar")).toBe(true);
    });

    it("empty string returns false when the original pattern does not match empty", () => {
      expect(new PartialMatchRegExp(/^foo/).test("")).toBe(false);
      expect(new PartialMatchRegExp(/^[a-z]+/).test("")).toBe(false);
    });

    it("empty string returns true when the original pattern matches empty", () => {
      expect(new PartialMatchRegExp(/^a*/).test("")).toBe(true);
      expect(new PartialMatchRegExp(/^x?$/).test("")).toBe(true);
      expect(new PartialMatchRegExp(/^$/).test("")).toBe(true);
    });

    it("string.match() returns null for non-matching input", () => {
      const re = new PartialMatchRegExp(/^foo/);
      expect("bar".match(re)).toBeNull();
      expect("fo".match(re)).not.toBeNull();
    });

    it("global regex with non-zero lastIndex resets lastIndex to 0 after sentinel suppression", () => {
      const re = new PartialMatchRegExp(/foo/g);
      re.lastIndex = 1;
      expect(re.exec("XXX")).toBeNull();
      expect(re.lastIndex).toBe(0);
    });

    it("sticky regex resets lastIndex to 0 after sentinel suppression", () => {
      const re = new PartialMatchRegExp(/foo/y);
      re.lastIndex = 3;
      expect(re.exec("XXX")).toBeNull();
      expect(re.lastIndex).toBe(0);
    });

    it("global regex: test('') mirrors whether the original pattern matches empty", () => {
      expect(new PartialMatchRegExp(/^a*/g).test("")).toBe(true);
      expect(new PartialMatchRegExp(/^foo/g).test("")).toBe(false);
    });

    it("sticky regex: test('') mirrors whether the original pattern matches empty", () => {
      expect(new PartialMatchRegExp(/^a*/y).test("")).toBe(true);
      expect(new PartialMatchRegExp(/^foo/y).test("")).toBe(false);
    });
  });

  describe("with multiline flag — mid-string line-boundary sentinels", () => {
    it("test() returns false when the only match is an empty sentinel at a mid-string line boundary", () => {
      expect(new PartialMatchRegExp(/foo/m).test("abc\ndef")).toBe(false);
    });

    it("exec() returns null in the same case", () => {
      expect(new PartialMatchRegExp(/foo/m).exec("abc\ndef")).toBeNull();
    });

    it("test() returns true when the original pattern genuinely matches at a mid-string line boundary", () => {
      expect(new PartialMatchRegExp(/$/m).test("abc\n")).toBe(true);
    });

    it("exec() returns the match object when the original pattern genuinely matches at a mid-string line boundary", () => {
      expect(new PartialMatchRegExp(/$/m).exec("abc\n")).toMatchObject({
        0: "",
        index: 3
      });
    });
  });

  describe("end-of-input matches — not suppressed when original matches there", () => {
    it("/$/ already matches end of a non-empty string, so test returns true", () => {
      expect(new PartialMatchRegExp(/$/).test("abc")).toBe(true);
      expect(new PartialMatchRegExp(/$/).test("a")).toBe(true);
    });

    it("/$/ matches the empty string", () => {
      expect(new PartialMatchRegExp(/$/).test("")).toBe(true);
    });

    it("exec() returns the match object (not null) for /$/ on a non-empty string", () => {
      const m = new PartialMatchRegExp(/$/).exec("abc");
      expect(m).toMatchObject({ 0: "", index: 3 });
    });

    it("/^x*$/ returns true for complete matches like 'xx'", () => {
      expect(new PartialMatchRegExp(/^x*$/).test("xx")).toBe(true);
      expect(new PartialMatchRegExp(/^x*$/).test("")).toBe(true);
    });

    it("sentinels from patterns that cannot yet match at end-of-input are still suppressed", () => {
      expect(new PartialMatchRegExp(/^abc/).test("xy")).toBe(false);
      expect(new PartialMatchRegExp(/a$/).test("bc")).toBe(false);
    });
  });
});
