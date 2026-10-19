import { describe, it, expect } from "vitest";
import PartialMatchRegExp from "../index.ts";
import { compiledOf } from "../partialMatchInternals.ts";
import { hitEndOf } from "../../../test/hitEndOf.ts";
import type { CompiledStatic } from "./compiled.ts";

const E = "$(?![\\s\\S])";
const EIGHT_MIB = 8 * 2 ** 20;

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
    [/a{03,}/, `(?:a|${E}){3}a*`],
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

describe("a modifier group around a quantified atom keeps its flags on every repetition", () => {
  it.each([
    [/(?i:[ab]{2,})B/, "A", "A", 0],
    [/(?i:[ab]{3})B/, "A", "A", 0],
    [/(?i:[ab]{0,2}?)B/, "A", "A", 0],
    [/(?-i:[ab]{2,})b/i, "A", "", 1]
  ])("matches %s against %j as %j at %i", (pattern, input, match, index) => {
    expect(new PartialMatchRegExp(pattern).exec(input)).toMatchAt({
      match,
      index
    });
  });
});

describe("multi-megabyte runs through a quantified atom neither overflow the stack on exec nor in hitEnd's probe", () => {
  it.each([
    ["an 8 MiB run of \\S+", /\S+/, "x".repeat(EIGHT_MIB)],
    ["an 8 MiB run of \\w{2,}", /\w{2,}/, "x".repeat(EIGHT_MIB)],
    [
      "an 8 MiB unclosed {{",
      /\{\{[\s\S]*?\}\}/,
      "{{" + "x".repeat(EIGHT_MIB)
    ],
    [
      "an 8 MiB run through the backreference path",
      /(a)x+\1/,
      "a" + "x".repeat(EIGHT_MIB)
    ]
  ])("matches %s to the end of input, having hit the end", (_, pattern, input) => {
    const partial = new PartialMatchRegExp(pattern);
    const match = partial.exec(input);
    expect(match?.index).toBe(0);
    expect(match?.[0].length).toBe(input.length);
    expect(hitEndOf(new PartialMatchRegExp(pattern), input)).toBe(true);
  });
});
