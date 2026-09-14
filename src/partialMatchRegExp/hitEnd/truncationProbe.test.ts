import { describe, it, expect } from "vitest";
import PartialMatchRegExp from "../index.ts";
import { compiledPartial } from "../partialMatchInternals.ts";
import { buildTruncationProbe } from "./truncationProbe.ts";
import { hitEndOf } from "../../../test/vitest.setup.ts";

function probeOf(pattern: RegExp) {
  const { parts, rawLookarounds, namedGroupOpenings } = new PartialMatchRegExp(
    pattern
  )[compiledPartial];
  return buildTruncationProbe(
    parts,
    rawLookarounds,
    namedGroupOpenings,
    pattern.flags
  );
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
    /^(?i:AB)c/
  ])("counts a marker for every marker group it emits in %s", (pattern) => {
    const { regex, markerName, markerCount } = probeOf(pattern);
    const markerGroups = regex.source.match(
      new RegExp("\\(\\?<" + markerName + "\\d+>\\)", "g")
    );

    expect(markerGroups?.length ?? 0).toBe(markerCount);
  });

  it("renumbers a raw lookaround's backreference past the two markers of a word boundary and the marker of a greedy quantifier before it", () => {
    const pattern = /^\ba+(b)c(?!\1)d/;
    const partial = new PartialMatchRegExp(pattern);

    expect(probeOf(pattern).regex.source).toContain("(?!\\5)");
    expect(hitEndOf(partial, "abc")).toBe(true);
    expect(hitEndOf(partial, "abcd")).toBe(false);
  });
});
