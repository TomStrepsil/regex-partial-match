import { describe, it, expect } from "vitest";
import { roleOf } from "./partRole.ts";
import type { Backreference } from "../part.ts";
import {
  GROUP_CLOSING,
  MULTILINE_CARET,
  ONLY_AT_END_OF_INPUT,
  START_ANCHOR,
  UNSATISFIABLE,
  WORD_BOUNDARY_ATOMS,
  asOptionalAtom,
  isWordBoundaryAtom
} from "../atomSyntax.ts";

describe("roleOf (pins the exact Part shapes walk() renders, so a future rendering change fails here rather than silently desyncing truncationProbe.ts)", () => {
  it("classifies an unnamed capturing group open", () => {
    expect(roleOf("(")).toBe("groupOpen");
  });

  it("classifies a named capturing group open", () => {
    expect(roleOf("(?<name>")).toBe("groupOpen");
  });

  it("classifies a non-capturing group open as plain", () => {
    expect(roleOf("(?:")).toBe("plain");
  });

  it("classifies a lookbehind as a raw lookaround", () => {
    expect(roleOf("(?<=foo)")).toBe("rawLookaround");
  });

  it("classifies a negative lookbehind as a raw lookaround", () => {
    expect(roleOf("(?<!foo)")).toBe("rawLookaround");
  });

  it("classifies a negative lookahead as a raw lookaround", () => {
    expect(roleOf("(?!foo)")).toBe("rawLookaround");
  });

  it("does not mistake a positive lookahead's plain closing paren for a raw lookaround", () => {
    expect(roleOf(")")).toBe("plain");
  });

  it("classifies the bare group-closing truncation marker", () => {
    expect(roleOf("|$(?![\\s\\S]))")).toBe("truncationEnd");
  });

  it("classifies an optional atom (literal character wrapped for truncation)", () => {
    expect(roleOf("(?:a|$(?![\\s\\S]))")).toBe("truncationEnd");
  });

  it("classifies an optional atom with a multiline caret folded into its taken branch", () => {
    expect(roleOf("(?:\\W^|$(?![\\s\\S]))")).toBe("truncationEnd");
  });

  it("classifies the closing of a group body wrapped for a following caret as plain", () => {
    expect(roleOf(")^")).toBe("plain");
  });

  it("classifies a character class wrapped for truncation", () => {
    expect(roleOf("(?:[abc]|$(?![\\s\\S]))")).toBe("truncationEnd");
  });

  it("classifies structural syntax as plain", () => {
    expect(roleOf("^")).toBe("plain");
    expect(roleOf("$")).toBe("plain");
    expect(roleOf("|")).toBe("plain");
    expect(roleOf("*")).toBe("plain");
    expect(roleOf("{2,3}")).toBe("plain");
  });

  it("classifies a numeric backreference", () => {
    const backref: Backreference = {
      ref: 1,
      start: 0,
      end: 2,
      caseInsensitive: false
    };
    expect(roleOf(backref)).toBe("backreference");
  });

  it("classifies a named backreference", () => {
    const backref: Backreference = {
      ref: "name",
      start: 0,
      end: 8,
      caseInsensitive: false
    };
    expect(roleOf(backref)).toBe("backreference");
  });
});

describe("roleOf, for every shape the multiline caret rule emits", () => {
  it.each([
    ["an atom with a caret folded into its taken branch", asOptionalAtom("\\W" + START_ANCHOR)],
    ["an atom with a multiline caret folded into its taken branch", asOptionalAtom("\\W" + MULTILINE_CARET)],
    ["a caret at an uncertain position", asOptionalAtom(START_ANCHOR)],
    ["a multiline caret at an uncertain position", asOptionalAtom(MULTILINE_CARET)],
    ["the atom a quantifier repeating zero times is left with", ONLY_AT_END_OF_INPUT],
    ["a word boundary", WORD_BOUNDARY_ATOMS[0]],
    ["a non-word boundary", WORD_BOUNDARY_ATOMS[1]]
  ])("classifies %s as a truncation end", (_, part) => {
    expect(roleOf(part)).toBe("truncationEnd");
  });

  it.each([
    ["the closing of a group wrapped for a caret", GROUP_CLOSING + START_ANCHOR],
    ["the closing of a group wrapped for a multiline caret", GROUP_CLOSING + MULTILINE_CARET],
    ["a multiline caret", MULTILINE_CARET],
    ["the part a path no continuation completes is given, rather than a raw lookaround", UNSATISFIABLE]
  ])("classifies %s as plain", (_, part) => {
    expect(roleOf(part)).toBe("plain");
  });

  it("recognises both word boundary atoms", () => {
    expect(isWordBoundaryAtom(WORD_BOUNDARY_ATOMS[0])).toBe(true);
    expect(isWordBoundaryAtom(WORD_BOUNDARY_ATOMS[1])).toBe(true);
    expect(isWordBoundaryAtom(asOptionalAtom("b"))).toBe(false);
  });
});
