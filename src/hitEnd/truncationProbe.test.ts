import { describe, it, expect } from "vitest";
import PartialMatchRegExp from "../index.ts";
import { compiledOf } from "../partialMatchRegExp/partialMatchInternals.ts";
import { buildTruncationProbe } from "./truncationProbe.ts";
import { hitEndOf } from "../../test/hitEndOf.ts";

function probeOf(pattern: RegExp) {
  return buildTruncationProbe(
    compiledOf(new PartialMatchRegExp(pattern)),
    pattern.flags
  );
}

function emptyGroupNumbers(source: string) {
  const numbers: number[] = [];
  let groupsOpened = 0;
  let inClass = false;
  for (let index = 0; index < source.length; index++) {
    const char = source[index];
    if (char === "\\") {
      index++;
    } else if (inClass) {
      inClass = char !== "]";
    } else if (char === "[") {
      inClass = true;
    } else if (char === "(" && opensCapturingGroup(source, index)) {
      groupsOpened++;
      if (source[index + 1] === ")") numbers.push(groupsOpened);
    }
  }
  return numbers;
}

function opensCapturingGroup(source: string, index: number) {
  if (source[index + 1] !== "?") return true;
  return source[index + 2] === "<" && !"=!".includes(source[index + 3]);
}

describe("buildTruncationProbe", () => {
  it.each([
    /hello world/,
    /^\d{4}-\d{2}-\d{2}/,
    /^[a-z]+@[a-z]+\.[a-z]{2,}$/,
    /^abc?/,
    /a+?/,
    /a??b/,
    /^ab\b/,
    /^\B-/,
    /^(ab)\1?c/,
    /^(?:ab)+/,
    /a(?=(b+))/,
    /^x(a)b(?!\1)c/,
    /^vw(x)(yy)z(?!\1\2)w/,
    /^v(a)(b)(?<=\1\2)c/,
    /^aa(?<=(a)\1)b/,
    /^(?<truncation0>a)(?<truncation_0>b)c/,
    /^(?<g>a)b(?!\k<g>)c/,
    /\W^/m,
    /\W*^/m,
    /\na*^/m,
    /(-|\n)^/m,
    /(?-m:\n)^/m,
    /\W(?m:^)/,
    /^(?i:AB)c/,
    /(\w+)-\1(b+)\2(?!\1)/,
    /(a(b))\2\1(?<=\1)c/,
    /(?<n>\w\w)\k<n>x(y)/
  ])("numbers every marker group it emits in %s", (pattern) => {
    const { regex, markerGroups } = probeOf(pattern);

    expect(markerGroups).toEqual(emptyGroupNumbers(regex.source));
  });

  it.each([/^abc/, /^ab\b/, /^x(a)b(?!\1)c/, /^(a)\1?c/])(
    "emits no ES2018 group syntax for the ES2015 pattern %s",
    (pattern) => {
      expect(probeOf(pattern).regex.source).not.toContain("(?<");
    }
  );

  it("renumbers a raw lookaround's backreference past the two markers of a word boundary and the marker of a greedy quantifier before it", () => {
    const pattern = /^\ba+(b)c(?!\1)d/;
    const partial = new PartialMatchRegExp(pattern);

    expect(probeOf(pattern).regex.source).toContain("(?!\\5)");
    expect(hitEndOf(partial, "abc")).toBe(true);
    expect(hitEndOf(partial, "abcd")).toBe(false);
  });

  it.each([/(a)\1?(\w+)-\2/, /(a)a?(\w+)-\2/])(
    "renumbers a backreference after a greedy optional backreference or optional atom past no marker of the ?, in %s",
    (pattern) => {
      const partial = new PartialMatchRegExp(pattern);

      expect(probeOf(pattern).regex.source).toContain("(?!\\4)");
      expect(pattern.exec("ab-b")?.[0]).toBe("ab-b");
      expect(hitEndOf(partial, "ab-")).toBe(true);
      expect(hitEndOf(partial, "ab-b")).toBe(false);
    }
  );

  it("counts the groups a second raw lookaround opens when numbering a backreference after it", () => {
    const pattern = /(?<=a)b(?<=(b))(c+)-\2/;
    const partial = new PartialMatchRegExp(pattern);

    expect(pattern.exec("abcc-cc")?.[0]).toBe("bcc-cc");
    expect(pattern.exec("abcc-ccz")?.[0]).toBe("bcc-cc");
    expect(hitEndOf(partial, "abcc-c")).toBe(true);
    expect(hitEndOf(partial, "abcc-cc")).toBe(false);
  });

  it("renumbers a raw lookaround's backreference after a greedy optional backreference past no marker of the ?", () => {
    const pattern = /^(a)\1?(\w+)-(?!\2)c/;
    const partial = new PartialMatchRegExp(pattern);

    expect(probeOf(pattern).regex.source).toContain("(?!\\4)(?:c|");
    expect(pattern.exec("ab-cz")?.[0]).toBe("ab-c");
    expect(hitEndOf(partial, "ab-c")).toBe(false);
  });
});

describe("the raw lookarounds construction records for the probe", () => {
  it.each([
    ["no lookaround", PartialMatchRegExp, /^ab/],
    ["a lookbehind and a negative lookahead holding no reference", PartialMatchRegExp, /^(?<=a)b(?!c)/],
    ["a numbered reference outside any raw lookaround", PartialMatchRegExp, /^(a)\1(?<=b)/],
    ["a named reference outside any raw lookaround", PartialMatchRegExp, /^(?<g>a)\k<g>(?!b)/]
  ])("records nothing for %s", (_, PartialClass, pattern) => {
    expect(compiledOf(new PartialClass(pattern)).rawLookarounds).toBeUndefined();
  });

  it("records only the lookaround holding a reference, in its place among the others", () => {
    const { rawLookarounds } = compiledOf(
      new PartialMatchRegExp(/^(?!x)(a)(?<=\1)b(?<=a)/)
    );

    expect(Object.keys(rawLookarounds ?? {})).toEqual(["1"]);
    expect(rawLookarounds?.[1]).toEqual({
      sourceStart: 9,
      capturingGroupsOpened: 0,
      references: [{ ref: 1, start: 13, end: 15 }]
    });
  });

  it("records the groups a lookbehind opens, which a numbered reference after it counts past", () => {
    const partial = new PartialMatchRegExp(/(?<=(a))(b)\2c/);

    expect(compiledOf(partial).rawLookarounds).toEqual([
      { sourceStart: 0, capturingGroupsOpened: 1, references: [] }
    ]);
    expect(hitEndOf(partial, "abb")).toBe(true);
    expect(hitEndOf(partial, "abbc")).toBe(false);
  });
});
