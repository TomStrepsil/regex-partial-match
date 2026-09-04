import { describe, it, expect } from "vitest";
import { legacyEscapeAtoms, legacyEscapeAsLiteral } from "./legacyEscape.ts";

describe("legacyEscapeAtoms", () => {
  it("returns no atoms for an empty digit run", () => {
    expect(legacyEscapeAtoms("")).toEqual([]);
  });

  describe("identity escapes (\\8, \\9)", () => {
    it("treats a lone 8 as its own atom", () => {
      expect(legacyEscapeAtoms("8")).toEqual(["8"]);
    });

    it("treats a lone 9 as its own atom", () => {
      expect(legacyEscapeAtoms("9")).toEqual(["9"]);
    });

    it("splits a run of identity digits into one atom each", () => {
      expect(legacyEscapeAtoms("89")).toEqual(["8", "9"]);
    });
  });

  describe("octal escapes starting 0-3", () => {
    it("zero-pads a single octal digit", () => {
      expect(legacyEscapeAtoms("1")).toEqual(["\\x01"]);
    });

    it("consumes a leading zero as octal rather than treating it as identity", () => {
      expect(legacyEscapeAtoms("0")).toEqual(["\\x00"]);
    });

    it("consumes a two-digit run starting with a leading zero", () => {
      expect(legacyEscapeAtoms("00")).toEqual(["\\x00"]);
    });

    it("consumes the full three-digit run when every digit is octal", () => {
      expect(legacyEscapeAtoms("012")).toEqual(["\\x0a"]);
    });

    it("consumes exactly three digits at the top of the range", () => {
      expect(legacyEscapeAtoms("377")).toEqual(["\\xff"]);
    });

    it("stops at the first non-octal digit, leaving it as a trailing atom", () => {
      expect(legacyEscapeAtoms("128")).toEqual(["\\x0a", "8"]);
    });

    it("stops after one digit when the next two are non-octal", () => {
      expect(legacyEscapeAtoms("188")).toEqual(["\\x01", "8", "8"]);
    });
  });

  describe("octal escapes starting 4-7", () => {
    it("consumes a two-digit run when the second digit is octal", () => {
      expect(legacyEscapeAtoms("47")).toEqual(["\\x27"]);
    });

    it("stops at one digit when the second digit is non-octal", () => {
      expect(legacyEscapeAtoms("78")).toEqual(["\\x07", "8"]);
    });

    it("stops at two digits even when a third octal digit follows", () => {
      expect(legacyEscapeAtoms("471")).toEqual(["\\x27", "1"]);
    });
  });

  describe("hex zero-padding", () => {
    it("pads a code unit below 0x10", () => {
      expect(legacyEscapeAtoms("1")).toEqual(["\\x01"]);
    });

    it("does not pad a code unit at or above 0x10", () => {
      expect(legacyEscapeAtoms("47")).toEqual(["\\x27"]);
    });
  });
});

describe("legacyEscapeAsLiteral", () => {
  it("returns an empty string for an empty digit run", () => {
    expect(legacyEscapeAsLiteral("")).toBe("");
  });

  it("joins the atoms of a single octal escape", () => {
    expect(legacyEscapeAsLiteral("1")).toBe("\\x01");
  });

  it("joins the atoms of an octal escape with a trailing literal digit", () => {
    expect(legacyEscapeAsLiteral("128")).toBe("\\x0a8");
  });

  it("joins the atoms of an identity-escape run", () => {
    expect(legacyEscapeAsLiteral("89")).toBe("89");
  });
});
