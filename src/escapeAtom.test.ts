import { describe, it, expect, beforeAll, afterAll } from "vitest";
import escapeAtom from "./escapeAtom";

const METACHARACTERS = [".", "*", "+", "?", "^", "$", "{", "}", "(", ")", "|", "[", "]", "\\"];

function runContractTests(escape: (s: string) => string): void {
  it("returns an empty string unchanged", () => {
    expect(escape("")).toBe("");
  });

  it("result for a plain alphanumeric string matches it as a literal", () => {
    for (const s of ["abc", "Hello World 123"]) {
      const re = new RegExp(`^${escape(s)}$`);
      expect(re.test(s)).toBe(true);
    }
  });

  METACHARACTERS.forEach((char) => {
    it(`result for ${JSON.stringify(char)} matches the character as a literal`, () => {
      const re = new RegExp(`^${escape(char)}$`);
      expect(re.test(char)).toBe(true);
    });
  });

  it("a string of all metacharacters matches itself as a literal after escaping", () => {
    const allMeta = METACHARACTERS.join("");
    const re = new RegExp(`^${escape(allMeta)}$`);
    expect(re.test(allMeta)).toBe(true);
  });

  it("escaped dot is not treated as a wildcard", () => {
    const re = new RegExp(`^${escape("a.b")}$`);
    expect(re.test("a.b")).toBe(true);
    expect(re.test("axb")).toBe(false);
  });

  it("escaped pipe is not treated as an alternation operator", () => {
    const re = new RegExp(`^${escape("a|b")}$`);
    expect(re.test("a|b")).toBe(true);
    expect(re.test("a")).toBe(false);
    expect(re.test("b")).toBe(false);
  });

  it("escaped backslash is not treated as an escape prefix", () => {
    const re = new RegExp(`^${escape("a\\b")}$`);
    expect(re.test("a\\b")).toBe(true);
    expect(re.test("ab")).toBe(false);
  });

  it("escaped star does not make the preceding token optional", () => {
    const re = new RegExp(`^${escape("a*b")}$`);
    expect(re.test("a*b")).toBe(true);
    expect(re.test("b")).toBe(false);
  });
}

describe("escapeAtom — native RegExp.escape path", () => {
  const nativeEscape = (RegExp as { escape?: (s: string) => string }).escape;

  if (typeof nativeEscape === "function") {
    runContractTests(escapeAtom);

    it("delegates to RegExp.escape rather than the fallback", () => {
      expect(escapeAtom("a.b*c+d?e^f$g{h}i(j)k|l[m]n\\o")).toBe(
        nativeEscape("a.b*c+d?e^f$g{h}i(j)k|l[m]n\\o")
      );
    });
  } else {
    it.skip("RegExp.escape not available in this engine — skipping native-path tests", () => {
      /* no-op */
    });
  }
});

describe("escapeAtom — fallback path (RegExp.escape absent)", () => {
  let saved: ((s: string) => string) | undefined;

  beforeAll(() => {
    saved = (RegExp as { escape?: (s: string) => string }).escape;
    delete (RegExp as { escape?: (s: string) => string }).escape;
  });

  afterAll(() => {
    if (saved !== undefined) {
      (RegExp as { escape?: (s: string) => string }).escape = saved;
    }
  });

  runContractTests(escapeAtom);

  it("leaves non-metacharacter strings unchanged", () => {
    expect(escapeAtom("abc123 \t\n")).toBe("abc123 \t\n");
  });

  METACHARACTERS.forEach((char) => {
    it(`prefixes metacharacter ${JSON.stringify(char)} with a backslash`, () => {
      expect(escapeAtom(char)).toBe(`\\${char}`);
    });
  });

  it("output matches the isolated fallback implementation exactly", () => {
    const samples = [
      "a.b",
      "a|b",
      "a\\b",
      "a*b",
      "a+b",
      "a?b",
      "a^b",
      "a$b",
      "a{b}",
      "a(b)c",
      "a[b]c",
      METACHARACTERS.join(""),
    ];
    for (const s of samples) {
      expect(escapeAtom(s)).toBe(s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    }
  });
});
