import { describe, expect, it } from "vitest";
import {
  CASE_INSENSITIVE,
  DOT_ALL,
  MULTILINE,
  UNICODE,
  UNICODE_SETS,
  WITHIN_LOOKAROUND,
  scopeOf
} from "../../partialMatchRegExp/scope.ts";
import flagsOf from "./flagsOf.ts";

describe("flagsOf", () => {
  it.each([
    [0, ""],
    [CASE_INSENSITIVE | MULTILINE | DOT_ALL, "ims"],
    [UNICODE, "u"],
    [UNICODE | UNICODE_SETS, "v"],
    [MULTILINE | WITHIN_LOOKAROUND, "m"]
  ])("renders scope %i as flags %j", (scope, flags) => {
    expect(flagsOf(scope)).toBe(flags);
  });

  it("renders the flags scopeOf read", () => {
    expect(flagsOf(scopeOf(/a/imsv))).toBe("imsv");
  });
});
