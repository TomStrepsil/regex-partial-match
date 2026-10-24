import { describe, it, expect } from "vitest";
import PartialMatchRegExp from "../../partialMatchRegExp/index.ts";
import { compiledOf } from "../../partialMatchRegExp/partialMatchInternals.ts";
import { isBackreference } from "../../partialMatchRegExp/part.ts";
import longestCaptureOf from "./longestCaptures.ts";

function longestCapturesRead(pattern: RegExp) {
  const { parts } = compiledOf(new PartialMatchRegExp(pattern));
  const longestCapture = longestCaptureOf(pattern.flags.indexOf("v") !== -1);
  return parts
    .filter(isBackreference)
    .map((backreference) => longestCapture(backreference));
}

describe("longestCaptureOf", () => {
  it.each([
    [/(a)\1/, [1]],
    [/(ab|a)\1/, [2]],
    [/(a|bcd)\1/, [3]],
    [/(\w{1,3})\1/, [3]],
    [/(a?b?)\1/, [2]],
    [/((?:ab){2})\1/, [4]],
    [/(a{0})\1/, [0]],
    [/(a(?=bcd))\1/, [1]],
    [/((a)b)\2\1/, [1, 2]],
    [/(?<n>abc)\k<n>/, [3]],
    [/(?:(?<n>abc)|(?<n>b))\k<n>/, [3]],
    [/(?:(?<n>b)|(?<n>abc))\k<n>/, [3]],
    [/(a)(\1b)\2/, [1, 2]],
    [/(ab)(\1c)\2/, [2, 3]],
    [/(\2a)(b)\1/, [Infinity, Infinity]],
    [/(^a$)\1/, [1]],
    [/(a(?<=a)b)\1/, [2]],
    [/(?=(ab))\1/, [2]],
    [/(a)(?:|b)\1/, [1]],
    [/(a??)\1/, [1]],
    [/(a{1,2}?b)\1/, [3]]
  ])("reads the longest capture %s's backreferences can repeat as %j", (pattern, longest) => {
    expect(longestCapturesRead(pattern)).toEqual(longest);
  });

  it.each([
    [/(a+)\1/, "a quantifier (+) without a maximum"],
    [/(a*)\1/, "a quantifier (*) without a maximum"],
    [/(a{2,})\1/, "a quantifier ({2,}) without a maximum"],
    [/(\2a)(b)\1/, "a group holding a forward reference"],
    [/(a)(\2b)\2/, "a group holding a backreference to itself"],
    [/([\q{abc}])\1/v, "a class that can match a string"],
    [/(\p{RGI_Emoji})\1/v, "a property of strings"]
  ])("reads %s as unbounded, for %s", (pattern) => {
    expect(longestCapturesRead(pattern)).toContain(Infinity);
  });

  it.each([
    [/(?<=(b))(a)\2/, [1]],
    [/(?<=(b)(c))(ab)\3/, [2]],
    [/(?<!(b))(?<n>a)\k<n>/, [1]],
    [/(?<=(b))\1(a)/, [Infinity]],
    [/(?<=x)(?<=(b))(a)\2/, [1]]
  ])("numbers the groups after a lookbehind that captures, reading %s's backreferences as %j", (pattern, longest) => {
    expect(longestCapturesRead(pattern)).toEqual(longest);
  });
});
