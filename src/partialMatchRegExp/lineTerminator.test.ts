import { describe, expect, it } from "vitest";
import { asOptionalAtom } from "./atomSyntax.ts";
import canMatchLineTerminator from "./lineTerminator.ts";
import {
  CASE_INSENSITIVE,
  DOT_ALL,
  MULTILINE,
  UNICODE,
  UNICODE_SETS,
  flagsOf
} from "./scope.ts";

const LINE_TERMINATORS = ["\n", "\r", " ", " "];

const atomTexts = [
  ".", "a", "k", "-", "{", "}", "]", "\n", "\r", " ", " ", "\t",
  "\\n", "\\r", "\\s", "\\S", "\\w", "\\W", "\\d", "\\D", "\\t", "\\v", "\\f",
  "\\0", "\\-", "\\.", "\\/", "\\x0a", "\\x0d", "\\x41", "\\u2028", "\\u0041", "\\cJ", "\\cA",
  "\\p{L}", "\\P{L}", "[^a]", "[a-z]", "[\\n]", "[^\\n]", "[\\s\\S]", "[\\p{L}--[a]]",
  "\\W^", "\\n^", "\\W(?m:^)", "(?!)", "[]", "\u{1F600}"
];

const scopes = [0, UNICODE, UNICODE | UNICODE_SETS].flatMap((unicode) =>
  [0, CASE_INSENSITIVE, MULTILINE, DOT_ALL, CASE_INSENSITIVE | MULTILINE | DOT_ALL].map(
    (flags) => unicode | flags
  )
);

function matchesALineTerminatorWhole(text: string, flags: string) {
  const whole = new RegExp("(?:" + text + ")(?![\\s\\S])", flags + "y");
  return LINE_TERMINATORS.some((terminator) => {
    whole.lastIndex = 0;
    return whole.test(terminator);
  });
}

const cases = atomTexts.flatMap((text) =>
  scopes.flatMap((scope) => {
    const flags = flagsOf(scope);
    try {
      return [{ text, scope, flags, expected: matchesALineTerminatorWhole(text, flags) }];
    } catch {
      return [];
    }
  })
);

describe("canMatchLineTerminator", () => {
  it.each(cases)(
    "agrees with the compiled atom for $text under /$flags/",
    ({ text, scope, expected }) => {
      expect(canMatchLineTerminator(asOptionalAtom(text), scope)).toBe(expected);
    }
  );

  it("conservatively treats a v-mode class string as able to end a line, since it can consume more than one character", () => {
    expect(
      canMatchLineTerminator(asOptionalAtom("[\\q{a\\n}]"), UNICODE | UNICODE_SETS)
    ).toBe(true);
  });

  it("does not mistake \\q{ for a class string outside v mode, where it has no special meaning", () => {
    expect(
      canMatchLineTerminator(asOptionalAtom("[\\q{2}]"), 0)
    ).toBe(false);
  });
});
