import { describe, expect, it } from "vitest";
import {
  CASE_INSENSITIVE,
  DOT_ALL,
  MULTILINE,
  UNICODE,
  UNICODE_SETS,
  WITHIN_LOOKAROUND
} from "../partialMatchRegExp/scope.ts";
import scopeWithModifiers from "./scopeWithModifiers.ts";

describe("scopeWithModifiers", () => {
  const everyFlag = CASE_INSENSITIVE | MULTILINE | DOT_ALL;

  it.each([
    ["i", 0, CASE_INSENSITIVE],
    ["i", everyFlag, everyFlag],
    ["-i", 0, 0],
    ["-i", everyFlag, MULTILINE | DOT_ALL],
    ["i-m", MULTILINE, CASE_INSENSITIVE],
    ["i-m", DOT_ALL, CASE_INSENSITIVE | DOT_ALL],
    ["ms-i", 0, MULTILINE | DOT_ALL],
    ["ms-i", everyFlag, MULTILINE | DOT_ALL],
    ["s-", 0, DOT_ALL]
  ])("applies (?%s:…) to scope %i", (modifiers, scope, expected) => {
    expect(scopeWithModifiers(scope, modifiers)).toBe(expected);
  });

  it("leaves the bits a modifier group cannot change alone", () => {
    const fixed = UNICODE | UNICODE_SETS | WITHIN_LOOKAROUND;

    expect(scopeWithModifiers(fixed | MULTILINE, "i-ms")).toBe(
      fixed | CASE_INSENSITIVE
    );
  });
});
