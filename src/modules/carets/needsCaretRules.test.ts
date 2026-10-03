import { describe, expect, it } from "vitest";
import createPartialMatchRegExp from "../../partialMatchRegExp/createPartialMatchRegExp.ts";
import PartialMatchRegExp from "../../partialMatchRegExp/index.ts";
import { compiledOf } from "../../partialMatchRegExp/partialMatchInternals.ts";
import caretRecorder from "./caretRecorder.ts";
import needsCaretRules from "./needsCaretRules.ts";

describe("needsCaretRules, the carets module's guess from the source whether a pattern needs the caret rules", () => {
  it.each(["a", "^a", "^a|^b", "a|^b", "[^a]", "^[^a]|^b"])(
    "is false for %s, where every ^ starts the pattern, follows a | before any (, or opens a class",
    (source) => {
      expect(needsCaretRules(source)).toBe(false);
    }
  );

  it.each(["a^", "(^a)", "(a)|^b", "\\^", "a\\n^"])(
    "is true for %s",
    (source) => {
      expect(needsCaretRules(source)).toBe(true);
    }
  );
});

describe("A pattern the carets module wrongly guesses needs no caret rules costs a second walk, not a wrong result", () => {
  const AlwaysGuessesNo = createPartialMatchRegExp({
    caret: (source) => (source === undefined ? caretRecorder() : undefined)
  });

  it.each([/(^a)/, /(^a|^b)+/, /\W^/m, /(?=a)^a/m])(
    "renders %s as the default class does",
    (pattern) => {
      expect(compiledOf(new AlwaysGuessesNo(pattern)).parts).toEqual(
        compiledOf(new PartialMatchRegExp(pattern)).parts
      );
    }
  );
});
