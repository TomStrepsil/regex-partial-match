import { describe, it, expect } from "vitest";
import PartialMatchRegExp from "./partialMatchRegExp.ts";

describe("preferLongerCaptures", () => {
  describe("named group match.groups sync for a repeated group", () => {
    it("match.groups[name] reflects the longer capture chosen for a repeated named group inside a quantifier", () => {
      const namedGroupInQuantifier = new PartialMatchRegExp(
        /^(?<word>abc)+\k<word>/
      );
      const m = namedGroupInQuantifier.exec("abcab");
      expect(m).toMatchObject({
        0: "abcab",
        1: "abc",
        groups: { word: "abc" }
      });
    });

    it("match[i] and match.groups[name] agree on the resolved capture for a repeated named group", () => {
      const namedGroupInQuantifier = new PartialMatchRegExp(
        /^(?<word>abc)+\k<word>/
      );
      const match = namedGroupInQuantifier.exec("abcab");
      expect(match).toMatchObject({ 1: match!.groups!.word });
    });

    it("match.groups is unchanged when the named group isn't repeated", () => {
      const simpleNamedBackref = new PartialMatchRegExp(
        /^(?<word>ab)\k<word>/
      );
      const m = simpleNamedBackref.exec("abab");
      expect(m).toMatchObject({ groups: { word: "ab" } });
    });
  });

  describe("match.indices sync with d flag for a repeated group", () => {
    it("match.indices[i] reflects the same resolved capture as match[i] for a repeated group", () => {
      const groupedBackrefWithIndices = new PartialMatchRegExp(/^(abc)+\1/d);
      const m = groupedBackrefWithIndices.exec("abcab");
      expect(m).toMatchObject({ 1: "abc", indices: { 1: [0, 3] } });
    });

    it("match.indices.groups[name] reflects the same resolved capture as match.groups[name]", () => {
      expect(
        new PartialMatchRegExp(/^(?<word>abc)+\k<word>/d).exec("abcab")
      ).toMatchObject({
        0: "abcab",
        1: "abc",
        groups: { word: "abc" },
        indices: { 0: [0, 5], 1: [0, 3], groups: { word: [0, 3] } }
      });
    });

    it("match[i] and match.indices[i] remain consistent for the resolved capture", () => {
      const m = new PartialMatchRegExp(/^(abc)+\1/d).exec("abcab");
      expect(m).not.toBeNull();
      const [captureStart, captureEnd] = m!.indices![1]!;
      expect(m!.input.slice(captureStart, captureEnd)).toBe(m![1]);
    });

    it("reflects the pipeline match's own position when an earlier partial wins over a later native complete match", () => {
      const partial = new PartialMatchRegExp(
        /((?<q>["']).*?\k<q>)|(\{)|(\})/d
      );
      const m = partial.exec(' a: "}{');
      expect(m).toMatchObject({
        0: '"}{',
        index: 4,
        indices: { 0: [4, 7], groups: { q: [4, 5] } }
      });
    });
  });

  describe("trailing group participates in the match but not in the shorter capture scan", () => {
    it("keeps a trailing optional group's capture when the scan settled for a shorter match without it", () => {
      const partial = new PartialMatchRegExp(/^(a)\1(b)?\1/);
      expect(partial.exec("aab")).toMatchObject({ 0: "aab", 1: "a", 2: "b" });
    });

    it("keeps a trailing optional group's capture through a nested backreference group", () => {
      const partial = new PartialMatchRegExp(/^((a)\2)\1(b)?/);
      expect(partial.exec("aaab")).toMatchObject({
        0: "aaab",
        1: "aa",
        2: "a",
        3: "b"
      });
    });

    it("keeps a multi-character trailing optional group's capture through a nested backreference group", () => {
      const partial = new PartialMatchRegExp(/^((a)\2)\1(bb)?/);
      expect(partial.exec("aaabb")).toMatchObject({
        0: "aaabb",
        1: "aa",
        2: "a",
        3: "bb"
      });
    });
  });
});
