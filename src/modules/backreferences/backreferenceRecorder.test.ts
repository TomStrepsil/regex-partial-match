import { describe, expect, it } from "vitest";
import PartialMatchRegExp from "../../partialMatchRegExp/partialMatchRegExp.ts";
import { compiledOf } from "../../partialMatchRegExp/partialMatchInternals.ts";
import { isBackreference } from "../../partialMatchRegExp/part.ts";

const stampsOf = (pattern: RegExp) =>
  compiledOf(new PartialMatchRegExp(pattern)).parts
    .filter(isBackreference)
    .map(({ forward, caseInsensitive }) => ({ forward, caseInsensitive }));

describe("backreferenceRecorder, through the walk", () => {
  it.each<[RegExp, boolean[]]>([
    [/(a)\1/, [false]],
    [/\1(a)/, [true]],
    [/(a\1)/, [true]],
    [/((a)\2)\1/, [false, false]],
    [/(?<x>a)\k<x>/, [false]],
    [/\k<x>(?<x>a)/, [true]],
    [/(?<x>a)\k<y>(?<y>b)/, [true]]
  ])("stamps %s as forward %j", (pattern, forward) => {
    expect(stampsOf(pattern).map((stamp) => stamp.forward)).toEqual(forward);
  });

  it.each<[RegExp, boolean[]]>([
    [/^(?:(?<x>a)|\k<x>b(?<x>c))$/, [true]],
    [/^(?:(?<x>a)|(?<x>b))\k<x>$/, [true]],
    [/^(?:(?<x>a)|(?<x>b))(?<y>c)\k<y>\k<x>$/, [false, true]],
    [new RegExp("^(?:(?<\\u0078>a)|(?<x>b))\\k<x>$"), [true]]
  ])(
    "stamps every reference to a name declared more than once in %s as forward, before or after the second declaration",
    (pattern, forward) => {
      expect(stampsOf(pattern).map((stamp) => stamp.forward)).toEqual(forward);
    }
  );

  it.each<[RegExp, boolean[]]>([
    [/(a)\1/, [false]],
    [/(a)\1/i, [true]],
    [/(a)(?i:\1)\1/, [true, false]],
    [/(a)(?-i:\1)/i, [false]]
  ])("stamps %s as case-insensitive %j", (pattern, caseInsensitive) => {
    expect(stampsOf(pattern).map((stamp) => stamp.caseInsensitive)).toEqual(
      caseInsensitive
    );
  });
});
