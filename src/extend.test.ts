import { describe, it, expect, beforeAll, afterAll } from "vitest";

describe("RegExp.prototype.toPartialMatchRegex", () => {
  beforeAll(async () => {
    await import("./extend.ts");
  });

  afterAll(() => {
    delete (RegExp.prototype as Partial<RegExp>).toPartialMatchRegex;
  });

  it("should add toPartialMatchRegex to RegExp.prototype", () => {
    expect(typeof /foo/.toPartialMatchRegex).toBe("function");
  });

  it("should return a RegExp instance", () => {
    const partial = /foo/.toPartialMatchRegex();
    expect(partial).toBeInstanceOf(RegExp);
  });

  it("should produce a partial matching regex", () => {
    const partial = /foo/.toPartialMatchRegex();
    expect(partial.exec("fo")?.[0]).not.toEqual("");
    expect(partial.exec("bar")?.[0]).toEqual("");
  });
});
