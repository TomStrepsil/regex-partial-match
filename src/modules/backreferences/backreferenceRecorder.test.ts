import { describe, expect, it } from "vitest";
import PartialMatchRegExp from "../../partialMatchRegExp/index.ts";
import { compiledOf } from "../../partialMatchRegExp/partialMatchInternals.ts";
import { isBackreference } from "../../partialMatchRegExp/part.ts";

const stampsOf = (pattern: RegExp) =>
  compiledOf(new PartialMatchRegExp(pattern)).parts
    .filter(isBackreference)
    .map(({ capture, caseInsensitive }) => ({
      forward: capture === undefined,
      caseInsensitive
    }));

describe("backreferenceRecorder, through the walk", () => {
  it.each([
    [/(a)\1/, [false]],
    [/\1(a)/, [true]],
    [/(a\1)/, [true]],
    [/((a)\2)\1/, [false, false]],
    [/(?<x>a)\k<x>/, [false]],
    [/\k<x>(?<x>a)/, [true]],
    [/\k<x>\k<x>(?<x>a)/, [true, true]],
    [/(?<x>a)\k<y>(?<y>b)/, [true]]
  ])("stamps %s as forward %j", (pattern, forward) => {
    expect(stampsOf(pattern).map((stamp) => stamp.forward)).toEqual(forward);
  });

  it.each([
    [/^(?:(?<x>a)|\k<x>b(?<x>c))$/, [true]],
    [/^(?:(?<x>a)|(?<x>b))\k<x>$/, [false]],
    [/^(?:(?<x>a)|(?<x>b))(?<y>c)\k<y>\k<x>$/, [false, false]],
    [new RegExp("^(?:(?<\\u0078>a)|(?<x>b))\\k<x>$"), [false]],
    [new RegExp("^(?:(?<x>a)\\k<x>|(?<\\u0078>b))$"), [true]],
    [/^(?:(?<x>a)|\k<x>b|(?<x>c))\k<x>$/, [true, false]],
    [/^(?:(?<x>a)|\k<x>\k<x>b|(?<x>c))$/, [true, true]]
  ])(
    "stamps a reference to a name declared more than once in %s as forward only when a declaration of that name follows it",
    (pattern, forward) => {
      expect(stampsOf(pattern).map((stamp) => stamp.forward)).toEqual(forward);
    }
  );

  it.each([
    [/(a)\1/, [false]],
    [/(a)\1/i, [true]],
    [/(a)(?i:\1)\1/, [true, false]],
    [/(a)(?-i:\1)/i, [false]]
  ])("stamps %s as case-insensitive %j", (pattern, caseInsensitive) => {
    expect(stampsOf(pattern).map((stamp) => stamp.caseInsensitive)).toEqual(
      caseInsensitive
    );
  });

  it.each([
    [/(a)\1/, [false]],
    [/(?=(a))\1/, [true]],
    [/(?=a(?:(b)|c))\1/, [true]],
    [/(?=(a)\1)/, [true]],
    [/(?<=(a))\1/, [false]],
    [/(?!(a))\1/, [false]],
    [/(?=(?<x>a))\k<x>/, [true]],
    [/(?:(?=(?<x>a))|(?<x>b))\k<x>/, [true]],
    [/(?=(a))(b)\2\1/, [false, true]]
  ])("stamps each backward reference in %s as reading a group captured inside a positive lookahead %j", (pattern, readsLookaheadCapture) => {
    expect(
      compiledOf(new PartialMatchRegExp(pattern))
        .parts.filter(isBackreference)
        .map((backreference) => backreference.capture?.readsLookaheadCapture)
    ).toEqual(readsLookaheadCapture);
  });

  it.each([
    [/(a)\1(b)\2/, [1, 2]],
    [/((a)\2)\1/, [2, 2]],
    [/(?:a)(?<x>b)\k<x>/, [1]],
    [/(a)(?<=(b)(c))\1(d)\4/, [3, 4]],
    [/(a)(?!(b))\1/, [2]],
    [/\1(a)/, [undefined]]
  ])("stamps each backward reference in %s with the capturing groups opened before it, %j, counting those inside a raw lookaround, and a forward one with no capture", (pattern, groupsBefore) => {
    expect(
      compiledOf(new PartialMatchRegExp(pattern))
        .parts.filter(isBackreference)
        .map((backreference) => backreference.capture?.groupsBefore)
    ).toEqual(groupsBefore);
  });
});
