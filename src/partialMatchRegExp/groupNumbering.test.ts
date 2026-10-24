import { describe, it, expect } from "vitest";
import PartialMatchRegExp from "../index.ts";
import { compiledOf } from "./partialMatchInternals.ts";
import {
  groupsOpenedBefore,
  isCapturingGroupOpening,
  shiftForGroupOf
} from "./groupNumbering.ts";

describe("isCapturingGroupOpening (pins the group openings walk() renders)", () => {
  it.each(["(", "(?<name>"])("recognises %j", (part) => {
    expect(isCapturingGroupOpening(part)).toBe(true);
  });

  it.each(["(?:", "(?=", "(?<=foo)", "(?<!foo)", "(?i:"])("doesn't recognise %j", (part) => {
    expect(isCapturingGroupOpening(part)).toBe(false);
  });
});

describe("groupsOpenedBefore", () => {
  it("counts each capturing group, including those a lookbehind opens, before each part and after the last", () => {
    const compiled = compiledOf(new PartialMatchRegExp(/(a)(?:b)(?<=(c)(d))(?<n>e)\1/));
    const before = groupsOpenedBefore(compiled.parts, compiled.rawLookarounds ?? []);

    expect(before).toHaveLength(compiled.parts.length + 1);
    expect(before[0]).toBe(0);
    expect(before[before.length - 1]).toBe(4);
    expect(before[compiled.parts.indexOf("(?<n>")]).toBe(3);
  });
});

describe("shiftForGroupOf", () => {
  it("shifts each group by the groups added before it opens, through the last part", () => {
    expect(shiftForGroupOf([0, 1, 1, 3], (index) => (index === 1 ? 2 : 0))).toEqual([0, 0, 2, 2]);
  });
});
