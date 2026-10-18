import { describe, it, expect } from "vitest";
import PartialMatchRegExp from "../index.ts";
import { compiledOf } from "../partialMatchInternals.ts";
import type { CompiledStatic } from "./compiled.ts";

const E = "$(?![\\s\\S])";
const FIVE_MIB = 5 * 2 ** 20;

const sourceOf = (pattern: RegExp) =>
  (compiledOf(new PartialMatchRegExp(pattern)) as CompiledStatic).regex.source;

describe("quantified single-character atoms keep the truncation branch outside the loop", () => {
  it.each([
    [/\S+/, `(?:\\S+|${E})`],
    [/\S+?/, `(?:\\S+?|${E})`],
    [/a*/, "a*"],
    [/a*?/, "a*?"],
    [/a{0,}/, "a{0,}"],
    [/a{0,4}/, "a{0,4}"],
    [/a{0,4}?/, "a{0,4}?"],
    [/a{1,}/, `(?:a{1,}|${E})`],
    [/a{1,4}/, `(?:a{1,4}|${E})`],
    [/a{3,}/, `(?:a{3,}|a{0,2}${E})`],
    [/a{3,}?/, `(?:a{3,}?|a{0,2}?${E})`],
    [/a{3,5}/, `(?:a{3,5}|a{0,2}${E})`],
    [/a{3,5}?/, `(?:a{3,5}?|a{0,2}?${E})`],
    [/a{3}/, `(?:a{3}|a{0,2}${E})`],
    [/a{03,5}/, `(?:a{03,5}|a{0,2}${E})`],
    [/[^{}]*/, "[^{}]*"],
    [/.+/, `(?:.+|${E})`],
    [/\x41+/, `(?:\\x41+|${E})`],
    [/\p{L}+/u, `(?:\\p{L}+|${E})`],
    [/\u{1F600}+/u, `(?:\\u{1F600}+|${E})`],
    [/(\S+)/, `((?:\\S+|${E}))`]
  ])("compiles %s to %s", (pattern, expected) => {
    expect(sourceOf(pattern)).toBe(expected);
  });

  it.each([
    [/a?/, `(?:a|${E})?`],
    [/(?:ab)+/, `)+`],
    [/[\q{abc}]+/v, `(?:[\\q{abc}]|${E})+`],
    [/\p{RGI_Emoji}+/v, `(?:\\p{RGI_Emoji}|${E})+`]
  ])("leaves %s looped", (pattern, looped) => {
    const partial = new PartialMatchRegExp(pattern);
    const source = (compiledOf(partial) as CompiledStatic).regex.source;
    expect(source).toBe((compiledOf(partial).parts as string[]).join(""));
    expect(source).toContain(looped);
  });

  it.each([
    [/(\S+)/, ["ab cd", "abc", ""]],
    [/(?=\S+)\w/, ["  ab", "a"]],
    [/a{2,4}b/, ["aaaaab", "aaa", "a", "xaab"]],
    [/x\d{3}?y/, ["x12", "x123y", "x1234y"]],
    [/^\w+$/m, ["ab\ncd", "ab cd"]],
    [/\{\{[^{}]*\}\}/, ["{{ab}}", "{{ab", "{"]],
    [/(a+?)(a*)/, ["aaa", "b"]],
    [/\s*(\w{2,})/g, ["  a", "  ab", "a b"]]
  ])("matches %s like its unrewritten parts", (pattern, inputs) => {
    const partial = new PartialMatchRegExp(pattern);
    const unrewritten = new RegExp(
      (compiledOf(partial).parts as string[]).join(""),
      pattern.flags
    );
    for (const input of inputs) {
      for (let end = 0; end <= input.length; end++) {
        const prefix = input.slice(0, end);
        partial.lastIndex = unrewritten.lastIndex = 0;
        expect(partial.exec(prefix)).toEqual(unrewritten.exec(prefix));
      }
    }
  });

  it("matches a 5 MiB run of \\S+ without overflowing the stack", () => {
    const input = "x".repeat(FIVE_MIB);
    expect(new PartialMatchRegExp(/\S+/).exec(input)?.[0].length).toBe(
      FIVE_MIB
    );
  });

  it("matches a 5 MiB unterminated {{...}} without overflowing the stack", () => {
    const input = "{{" + "x".repeat(FIVE_MIB);
    expect(
      new PartialMatchRegExp(/\{\{[^{}]*\}\}/).exec(input)?.[0].length
    ).toBe(input.length);
  });

  it("matches a 5 MiB run through the backreference path without overflowing the stack", () => {
    const input = "a" + "x".repeat(FIVE_MIB);
    const match = new PartialMatchRegExp(/(a)\S+\1/).exec(input);
    expect(match?.index).toBe(0);
    expect(match?.[0].length).toBe(input.length);
  });
});
