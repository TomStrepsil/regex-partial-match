import { describe, it, expect } from "vitest";
import { maximumOf, minimumOf } from "./quantifierBounds.ts";

describe("quantifier bounds", () => {
  it.each([
    ["*", 0, Infinity],
    ["+", 1, Infinity],
    ["?", 0, 1],
    ["{3}", 3, 3],
    ["{2,}", 2, Infinity],
    ["{2,5}", 2, 5],
    ["{0}", 0, 0]
  ])("reads %s as from %d to %d", (quantifier, minimum, maximum) => {
    expect(minimumOf(quantifier)).toBe(minimum);
    expect(maximumOf(quantifier, minimum)).toBe(maximum);
  });
});
