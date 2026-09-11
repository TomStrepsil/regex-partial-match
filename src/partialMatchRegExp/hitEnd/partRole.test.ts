import { describe, it, expect } from "vitest";
import { roleOf } from "./partRole.ts";
import type { Backreference } from "../part.ts";

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
