import { describe, expect, it } from "vitest";
import {
  CASE_INSENSITIVE,
  DOT_ALL,
  MULTILINE,
  UNICODE,
  UNICODE_SETS,
  WITHIN_LOOKAROUND,
  flagsOf,
  scopeOf,
  scopeWithModifiers
} from "./scope.ts";

describe("scopeOf", () => {
  it.each([
    [/a/, 0],
    [/a/i, CASE_INSENSITIVE],
    [/a/m, MULTILINE],
    [/a/s, DOT_ALL],
    [/a/u, UNICODE],
    [/a/v, UNICODE | UNICODE_SETS],
    [/a/dgimsy, CASE_INSENSITIVE | MULTILINE | DOT_ALL]
  ])("reads the flags of %s", (regex, scope) => {
    expect(scopeOf(regex)).toBe(scope);
  });

  it("reads a flag an older engine lacks as absent", () => {
    const withoutNewerFlags = Object.defineProperties(/a/m, {
      dotAll: { value: undefined },
      unicodeSets: { value: undefined }
    });

    expect(scopeOf(withoutNewerFlags)).toBe(MULTILINE);
  });
});

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
