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
});

[
  // ── Literals ──────────────────────────────────────────────────────────────
  { pattern: /^abc/, inputs: ["a", "ab", "abc", "xyz", "123", "!"] },
  {
    pattern: /^hello world/,
    inputs: ["h", "he", "hel", "hello", "hello ", "hello world", "goodbye"]
  },
  // ── Character escapes ─────────────────────────────────────────────────────
  { pattern: /^\x61\x62\x63/, inputs: ["a", "ab", "abc", "xyz"] },
  { pattern: /^\u0061\u0062/, inputs: ["a", "ab", "xyz"] },
  { pattern: /^\u{1F600}/u, inputs: ["😀", "xyz"] },
  {
    pattern: /^\p{Lowercase_Letter}+suffix/u,
    inputs: ["a", "ab", "asuffix", "Asuffix", "1suffix"]
  },
  { pattern: /^\cj\cMsuffix/, inputs: ["\n", "\n\r", "\n\rsuffix", "x"] },
  // ── Character classes ─────────────────────────────────────────────────────
  { pattern: /^[a-z]+/, inputs: ["a", "ab", "A", "1"] },
  {
    pattern: /^[^abc]+suffix/,
    inputs: ["x", "xy", "xysuffix", "asuffix", "bsuffix"]
  },
  { pattern: /^[ab\\]suffix/, inputs: ["a", "asuffix", "\\suffix", "csuffix"] },
  {
    pattern: /^[a-c]suffix/i,
    inputs: ["A", "Asuffix", "Bsuffix", "Csuffix", "dsuffix"]
  },
  {
    pattern: /^[a-z]+\s\w+/,
    inputs: ["a", "ab", " ", "ab ", "ab c", "ab cd", "!", "123"]
  },
  // ── Disjunction ───────────────────────────────────────────────────────────
  {
    pattern: /^foo|^bar/,
    inputs: ["f", "fo", "foo", "b", "ba", "bar", "xyz", "123", "!"]
  },
  { pattern: /^cat|^dog/, inputs: ["c", "ca", "cat", "d", "do", "dog", "xyz"] },
  // ── Quantifiers ───────────────────────────────────────────────────────────
  {
    pattern: /^\d{3}-\d{4}/,
    inputs: [
      "1",
      "12",
      "123",
      "123-",
      "123-4",
      "123-45",
      "123-456",
      "123-4567",
      "xyz",
      "!"
    ]
  },
  { pattern: /^ab*c/, inputs: ["a", "ab", "abc", "abbc", "ac", "b", "axc"] },
  { pattern: /^ab+c/, inputs: ["ab", "abc", "abbc", "a", "ac"] },
  { pattern: /^ab?c/, inputs: ["a", "ab", "abc", "ac", "axc"] },
  {
    pattern: /^ab{2,4}c/,
    inputs: ["ab", "abb", "abbb", "abbbb", "abbbbc", "abc", "abbbbbbc"]
  },
  { pattern: /^ab*?c/, inputs: ["a", "ab", "abc", "abbc", "ac", "axc"] },
  // ── Unicode sets (v flag) ─────────────────────────────────────────────────
  {
    pattern: /^[\p{Alphabetic}]+suffix/v,
    inputs: ["a", "aあ", "aあsuffix", "1suffix", "!suffix"]
  },
  // ── Modifiers ─────────────────────────────────────────────────────────────
  {
    pattern: /^(?i:abc)suffix/,
    inputs: ["A", "AB", "ABC", "ABCsuffix", "abcsuffix", "xyz"]
  },
  {
    pattern: /^(?-i:abc)suffix/i,
    inputs: ["a", "ab", "abcsuffix", "ABCsuffix", "xyz"]
  },
  // ── Groups ────────────────────────────────────────────────────────────────
  {
    pattern: /^(foo)(bar)/,
    inputs: ["f", "fo", "foo", "foob", "fooba", "foobar", "xyz"]
  },
  {
    pattern: /^(?:foo)(bar)/,
    inputs: ["f", "fo", "foo", "foob", "foobar", "xyz"]
  },
  {
    pattern: /^(?<tag>foo)bar/,
    inputs: ["f", "fo", "foo", "foob", "foobar", "xyz"]
  },
  {
    pattern: /^(ab(cd)e)f/,
    inputs: ["a", "ab", "abc", "abcd", "abcde", "abcdef", "xyz"]
  },
  // ── Lookahead assertions ──────────────────────────────────────────────────
  {
    pattern: /^foo(?=bar)/,
    inputs: ["f", "fo", "foo", "foob", "foobar", "fox"]
  },
  {
    pattern: /^foo(?!baz)/,
    inputs: ["f", "fo", "foo", "foob", "foobaz", "foobar"]
  },
  // ── Lookbehind assertions ─────────────────────────────────────────────────
  {
    pattern: /(?<=foo)bar/,
    inputs: ["b", "ba", "bar", "foob", "fooba", "foobar", "xbar"]
  },
  {
    pattern: /(?<!foo)bar/,
    inputs: ["b", "ba", "bar", "foob", "foobar", "xbar"]
  },
  // ── Boundary assertions ───────────────────────────────────────────────────
  { pattern: /^foo$/, inputs: ["f", "fo", "foo", "foo ", "xfoo"] },
  { pattern: /^\bfoo\b/, inputs: ["f", "fo", "foo", "foob", "xfoo"] },
  { pattern: /^\Bfoo\B/, inputs: ["f", "fo", "foo", "xfooy", "xfoo"] },
  // ── Multiline ─────────────────────────────────────────────────────────────
  { pattern: /^foo$/m, inputs: ["f", "fo", "foo", "foo ", "foo\nbar"] }
].forEach(({ pattern, inputs }) => {
  it(`fast-path parity with createPartialMatchRegex: /${pattern.source}/${pattern.flags}`, () => {
    const fast = new PartialMatchRegExp(pattern);
    const ref = createPartialMatchRegex(pattern);
    const originalMatchesEmpty = new RegExp(pattern.source, pattern.flags).test(
      ""
    );
    for (const s of inputs) {
      // PartialMatchRegExp suppresses sentinel matches (empty match at end-of-input)
      // that createPartialMatchRegex exposes as ["", index: s.length, ...].
      const m = ref.exec(s);
      const expected =
        m !== null &&
        (m.index < s.length || (s.length === 0 && originalMatchesEmpty));
      expect(fast.test(s)).toBe(expected);
    }
  });
});

describe("sentinel suppression — exec/test return null/false for non-matching inputs", () => {
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
