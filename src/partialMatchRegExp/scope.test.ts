import { describe, expect, it } from "vitest";
import {
  CASE_INSENSITIVE,
  DOT_ALL,
  MULTILINE,
  UNICODE,
  UNICODE_SETS,
  scopeOf
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
