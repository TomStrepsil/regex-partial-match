import { describe, it, expect } from "vitest";
import PartialMatchRegExp from "./partialMatchRegExp.ts";
import { completenessOf } from "../test/vitest.setup.ts";

describe("isComplete()", () => {
  describe("distinguishing a match of the original pattern from a prefix", () => {
    it("distinguishes incomplete prefixes from the complete match", () => {
      const partial = new PartialMatchRegExp(/hello world/);

      expect(completenessOf(partial, "h")).toBe(false);
      expect(completenessOf(partial, "hello")).toBe(false);
      expect(completenessOf(partial, "hello world")).toBe(true);
    });

    it("separates the three states progressive validation needs", () => {
      const partial = new PartialMatchRegExp(/^\d{4}-\d{2}-\d{2}/);

      expect(completenessOf(partial, "20xx")).toBeNull();
      expect(completenessOf(partial, "2024")).toBe(false);
      expect(completenessOf(partial, "2024-06")).toBe(false);
      expect(completenessOf(partial, "2024-06-15")).toBe(true);
    });

    it("reports a complete match that more input would extend as complete", () => {
      expect(
        completenessOf(new PartialMatchRegExp(/hello \w+/), "hello world")
      ).toBe(true);
    });

    it("reports a complete match that more input would invalidate as complete", () => {
      expect(completenessOf(new PartialMatchRegExp(/^a(?!b)/), "a")).toBe(
        true
      );
    });

    it("reports the empty match at the true end of input as incomplete", () => {
      const partial = new PartialMatchRegExp(/x/);

      expect(partial.exec("a")).toMatchAt({ match: "", index: 1 });
      expect(completenessOf(partial, "a")).toBe(false);
    });

    it("reports a pattern that completely matches an empty string as complete", () => {
      const partial = new PartialMatchRegExp(/a*/);

      expect(completenessOf(partial, "")).toBe(true);
      expect(completenessOf(partial, "aa")).toBe(true);
    });
  });

  describe("cases the end-of-input heuristic cannot answer", () => {
    it("distinguishes a truncated branch inside a lookahead from a complete match", () => {
      const partial = new PartialMatchRegExp(/a(?=(?:b(?:x|(c))d|b))/);

      const truncated = partial.exec("ab")!;
      expect(truncated).toMatchAt({ match: "a", index: 0 });
      expect(truncated[1]).toBeUndefined();
      expect(partial.isComplete(truncated)).toBe(false);

      const complete = partial.exec("abcd")!;
      expect(complete[1]).toBe("c");
      expect(partial.isComplete(complete)).toBe(true);
    });

    it("answers where re-running the original pattern cannot", () => {
      const original = /a(?=(?:b(?:x|(c))d|b))/y;

      original.lastIndex = 0;
      expect(original.exec("ab")).toMatchAt({ match: "a", index: 0 });
      original.lastIndex = 0;
      expect(original.exec("abcd")).toMatchAt({ match: "a", index: 0 });
    });

    it("reports a complete match that ends at the end of input as complete", () => {
      const partial = new PartialMatchRegExp(/^[a-z]+@[a-z]+\.[a-z]{2,}$/);

      expect(completenessOf(partial, "user@example")).toBe(false);
      expect(completenessOf(partial, "user@example.com")).toBe(true);
    });

    it("distinguishes a truncated lookbehind-qualified atom from a complete match", () => {
      const partial = new PartialMatchRegExp(/(?<=foo)bar/);

      expect(completenessOf(partial, "foob")).toBe(false);
      expect(completenessOf(partial, "foobar")).toBe(true);
    });
  });

  describe("what isComplete() cannot see", () => {
    it("reports a greedy capture inside a lookahead as complete, though more input would still extend it", () => {
      const partial = new PartialMatchRegExp(/a(?=(b+))/);
      const match = partial.exec("ab")!;

      expect(match[1]).toBe("b");
      expect(partial.isComplete(match)).toBe(true);
    });

    it("shows the same capture growing once the input actually continues", () => {
      expect(/a(?=(b+))/.exec("abbX")?.[1]).toBe("bb");
    });
  });

  describe("branches the transform never introduced", () => {
    it("ignores an end-of-input disjunction the pattern itself wrote inside a lookbehind", () => {
      const partial = new PartialMatchRegExp(/(?<=a|$(?![\s\S]))/);

      expect(partial.exec("")).toMatchAt({ match: "", index: 0 });
      expect(completenessOf(partial, "")).toBe(true);
    });

    it("ignores an end-of-input disjunction the pattern itself wrote inside a negative lookahead", () => {
      expect(
        completenessOf(new PartialMatchRegExp(/^x(?!a|$(?![\s\S]))/), "xb")
      ).toBe(true);
    });

    it("reports a pattern with no truncatable atoms as complete", () => {
      expect(completenessOf(new PartialMatchRegExp(/^$/), "")).toBe(true);
      expect(completenessOf(new PartialMatchRegExp(/^/), "abc")).toBe(true);
    });
  });

  describe("marker names that the pattern could collide with", () => {
    it("renames its markers past a named group of the same name", () => {
      const partial = new PartialMatchRegExp(/^(?<truncation0>a)b/);

      expect(completenessOf(partial, "a")).toBe(false);
      expect(completenessOf(partial, "ab")).toBe(true);
      expect(partial.exec("ab")?.groups?.truncation0).toBe("a");
    });

    it("keeps renaming until the name is free", () => {
      const partial = new PartialMatchRegExp(
        /^(?<truncation0>a)(?<truncation_0>b)c/
      );

      expect(completenessOf(partial, "ab")).toBe(false);
      expect(completenessOf(partial, "abc")).toBe(true);
    });

    it("recognises a group name spelled with a unicode escape", () => {
      const partial = new PartialMatchRegExp(
        new RegExp("^(?<\\u0074runcation0>a)b")
      );

      expect(completenessOf(partial, "a")).toBe(false);
      expect(completenessOf(partial, "ab")).toBe(true);
    });

    it("does not mistake character class text for a named group", () => {
      const partial = new PartialMatchRegExp(
        new RegExp("[(?<\\u{110000}>]a")
      );

      expect(completenessOf(partial, "(")).toBe(false);
      expect(completenessOf(partial, "(a")).toBe(true);
    });

    it("does not rename past a marker name that only appears as class content", () => {
      const partial = new PartialMatchRegExp(
        new RegExp("^[(?<truncation0>]a")
      );

      expect(completenessOf(partial, "(")).toBe(false);
      expect(completenessOf(partial, "(a")).toBe(true);
    });

    it("takes the declared names from the walk, so class content cannot invalidate a reference", () => {
      const partial = new PartialMatchRegExp(
        new RegExp("^[(?<bogus>](?!\\k<bogus>)a")
      );

      expect(completenessOf(partial, "(")).toBe(false);
      expect(completenessOf(partial, "(a")).toBe(true);
    });
  });

  describe("across the constructs the walker transforms", () => {
    it("reports completeness through a non-capturing group", () => {
      const partial = new PartialMatchRegExp(/^(?:ab)c/);

      expect(completenessOf(partial, "ab")).toBe(false);
      expect(completenessOf(partial, "abc")).toBe(true);
    });

    it("reports completeness through a capturing group", () => {
      const partial = new PartialMatchRegExp(/^(ab)c/);

      expect(completenessOf(partial, "ab")).toBe(false);
      expect(completenessOf(partial, "abc")).toBe(true);
    });

    it("reports completeness through a named group", () => {
      const partial = new PartialMatchRegExp(/^(?<pair>ab)c/);

      expect(completenessOf(partial, "ab")).toBe(false);
      expect(completenessOf(partial, "abc")).toBe(true);
    });

    it("reports completeness through a disjunction", () => {
      const partial = new PartialMatchRegExp(/^(?:foo|bar)/);

      expect(completenessOf(partial, "ba")).toBe(false);
      expect(completenessOf(partial, "bar")).toBe(true);
    });

    it("reports completeness through a modifier group", () => {
      const partial = new PartialMatchRegExp(/^(?i:AB)c/);

      expect(completenessOf(partial, "ab")).toBe(false);
      expect(completenessOf(partial, "abc")).toBe(true);
    });

    it("reports completeness through an astral atom in unicode mode", () => {
      const partial = new PartialMatchRegExp(/^\u{1F600}x/u);

      expect(completenessOf(partial, "\u{1F600}")).toBe(false);
      expect(completenessOf(partial, "\u{1F600}x")).toBe(true);
    });

    it("reports completeness through a nested character class in v mode", () => {
      const partial = new PartialMatchRegExp(/^[[a-z]--[c]]d/v);

      expect(completenessOf(partial, "a")).toBe(false);
      expect(completenessOf(partial, "ad")).toBe(true);
    });

    it("reports completeness through a reclassified octal escape", () => {
      const partial = new PartialMatchRegExp(new RegExp("^\\8a"));

      expect(completenessOf(partial, "8")).toBe(false);
      expect(completenessOf(partial, "8a")).toBe(true);
    });

    it("reports completeness through a reclassified octal escape a marker group could otherwise turn into a backreference", () => {
      const partial = new PartialMatchRegExp(new RegExp("^\\1a"));

      expect(completenessOf(partial, "\x01")).toBe(false);
      expect(completenessOf(partial, "\x01a")).toBe(true);
    });

    it("reports completeness through a multi-digit reclassified octal escape with a literal digit left over", () => {
      const partial = new PartialMatchRegExp(new RegExp("^\\128x"));

      expect(completenessOf(partial, "\n8")).toBe(false);
      expect(completenessOf(partial, "\n8x")).toBe(true);
    });

    it("reports completeness through a reclassified octal escape that follows a genuine backreference", () => {
      const partial = new PartialMatchRegExp(new RegExp("^(a)\\1\\3b"));

      expect(completenessOf(partial, "aa\x03")).toBe(false);
      expect(completenessOf(partial, "aa\x03b")).toBe(true);
    });

    it("reports completeness through a reclassified named identity escape a marker group could otherwise turn into a broken backreference", () => {
      const partial = new PartialMatchRegExp(new RegExp("^\\k<bogus>a"));

      expect(completenessOf(partial, "k<bogus>")).toBe(false);
      expect(completenessOf(partial, "k<bogus>a")).toBe(true);
    });

    it("reports completeness through a word boundary assertion", () => {
      const partial = new PartialMatchRegExp(/^\bfoo/);

      expect(completenessOf(partial, "fo")).toBe(false);
      expect(completenessOf(partial, "foo")).toBe(true);
    });
  });

  describe("under every flag", () => {
    it("reports completeness with the d flag, leaving indices intact", () => {
      const partial = new PartialMatchRegExp(/^(ab)c/d);

      const match = partial.exec("ab")!;
      expect(partial.isComplete(match)).toBe(false);
      expect(match.indices![1]).toEqual([0, 2]);
    });

    it("reports completeness with the g flag without disturbing lastIndex", () => {
      const partial = new PartialMatchRegExp(/ab/g);

      const first = partial.exec("abab")!;
      expect(partial.lastIndex).toBe(2);
      expect(partial.isComplete(first)).toBe(true);
      expect(partial.lastIndex).toBe(2);
      expect(partial.exec("abab")).toMatchAt({ match: "ab", index: 2 });
    });

    it("reports completeness with the y flag", () => {
      const partial = new PartialMatchRegExp(/hello/y);

      partial.lastIndex = 2;
      expect(completenessOf(partial, "xyhel")).toBe(false);
      partial.lastIndex = 2;
      expect(completenessOf(partial, "xyhello")).toBe(true);
    });

    it("reports completeness with the d, g and y flags combined", () => {
      expect(completenessOf(new PartialMatchRegExp(/^(ab)c/dgy), "ab")).toBe(
        false
      );
    });

    it("reports completeness with the m flag", () => {
      const partial = new PartialMatchRegExp(/^foo$/m);

      expect(completenessOf(partial, "a\nfo")).toBe(false);
      expect(completenessOf(partial, "a\nfoo")).toBe(true);
    });

    it("reports completeness with the i flag", () => {
      const partial = new PartialMatchRegExp(/^abc/i);

      expect(completenessOf(partial, "AB")).toBe(false);
      expect(completenessOf(partial, "ABC")).toBe(true);
    });
  });

  describe("patterns with backreferences", () => {
    it("distinguishes a truncated backreference expansion from a complete match", () => {
      const partial = new PartialMatchRegExp(/^(ab)\1/);

      expect(completenessOf(partial, "aba")).toBe(false);
      expect(completenessOf(partial, "abab")).toBe(true);
    });

    it("distinguishes a truncated named backreference expansion from a complete match", () => {
      const partial = new PartialMatchRegExp(/^(?<pair>ab)\k<pair>/);

      expect(completenessOf(partial, "aba")).toBe(false);
      expect(completenessOf(partial, "abab")).toBe(true);
    });

    it("reports a truncated atom before the backreference as incomplete", () => {
      expect(completenessOf(new PartialMatchRegExp(/^(ab)\1/), "a")).toBe(
        false
      );
    });

    it("reports a native full match found later in the input as complete", () => {
      const partial = new PartialMatchRegExp(/(ab)\1/);

      expect(partial.exec("xxabab")).toMatchAt({ match: "abab", index: 2 });
      expect(completenessOf(partial, "xxabab")).toBe(true);
    });

    it("reports a backreference to an unmatched group as complete", () => {
      expect(completenessOf(new PartialMatchRegExp(/^(a)?b\1/), "b")).toBe(
        true
      );
    });

    it("answers repeatedly without rebuilding its probe", () => {
      const partial = new PartialMatchRegExp(/^(ab)\1/);
      const match = partial.exec("aba")!;

      expect(partial.isComplete(match)).toBe(false);
      expect(partial.isComplete(match)).toBe(false);
    });

    it("returns null, with nothing to report, when no partial match exists", () => {
      expect(new PartialMatchRegExp(/^(ab)\1/).exec("z")).toBeNull();
      expect(
        new PartialMatchRegExp(/^(ab)\1|^(abc)\2/).exec("abca")
      ).toBeNull();
    });
  });

  // A numeric backreference inside a negative lookahead or either lookbehind is never extracted as its own token — the walker copies the whole construct in as one opaque, unparsed string (see `appendRawLookaround` in walk.ts), since none of it is individually partial-matchable. The truncation markers inserted elsewhere in the pattern are new capturing groups, so they renumber every group that follows them — including ones a raw backreference still points at by number.
  describe("a raw numeric backreference inside a lookaround", () => {
    it("distinguishes a genuine prefix from a complete match (the motivating case)", () => {
      const partial = new PartialMatchRegExp(/^x(a)b(?!\1)c/);

      expect(completenessOf(partial, "xab")).toBe(false);
      expect(completenessOf(partial, "xabc")).toBe(true);
    });

    it("shifts each group by its own count of preceding markers, not a single pattern-wide count", () => {
      const partial = new PartialMatchRegExp(/^vw(x)(yy)z(?!\1\2)w/);

      expect(completenessOf(partial, "vwxyyz")).toBe(false);
      expect(completenessOf(partial, "vwxyyzw")).toBe(true);
    });

    it("handles more than one raw backreference in the same lookaround", () => {
      const partial = new PartialMatchRegExp(/^xy(a)(b)c(?!\1\2)d/);

      expect(completenessOf(partial, "xyabc")).toBe(false);
      expect(completenessOf(partial, "xyabcd")).toBe(true);
    });

    it("handles a group and its own backreference both inside the same negative lookahead", () => {
      const partial = new PartialMatchRegExp(/^x(?!(a)\1)b/);

      expect(completenessOf(partial, "x")).toBe(false);
      expect(completenessOf(partial, "xb")).toBe(true);
    });

    it("handles a raw backreference inside a lookbehind", () => {
      const partial = new PartialMatchRegExp(/^v(a)(b)(?<=\1\2)c/);

      expect(completenessOf(partial, "vab")).toBe(false);
      expect(completenessOf(partial, "vabc")).toBe(true);
    });

    it("handles a group and its own backreference both inside the same lookbehind", () => {
      const partial = new PartialMatchRegExp(/^aa(?<=(a)\1)b/);

      expect(completenessOf(partial, "aa")).toBe(false);
      expect(completenessOf(partial, "aab")).toBe(true);
    });

    it("handles a raw backreference inside a negative lookbehind", () => {
      const partial = new PartialMatchRegExp(/^v(a)bb(?<!\1)c/);

      expect(completenessOf(partial, "vabb")).toBe(false);
      expect(completenessOf(partial, "vabbc")).toBe(true);
    });

    it("leaves a reference past the pattern's own group count untouched, rather than misreading it as a backreference", () => {
      const partial = new PartialMatchRegExp(new RegExp("^x(?!\\9)a"));

      expect(completenessOf(partial, "x")).toBe(false);
      expect(completenessOf(partial, "xa")).toBe(true);
    });

    it("canonicalises an Annex B named identity escape inside a lookaround, rather than letting a marker turn it into a broken reference", () => {
      const partial = new PartialMatchRegExp(new RegExp("^a(?!\\k<bogus>)b"));

      expect(completenessOf(partial, "a")).toBe(false);
      expect(completenessOf(partial, "ab")).toBe(true);
    });

    it("canonicalises a bare Annex B \\k inside a lookaround, which the probe's own named markers would otherwise invalidate", () => {
      const partial = new PartialMatchRegExp(new RegExp("^a(?!\\k)b"));

      expect(completenessOf(partial, "a")).toBe(false);
      expect(completenessOf(partial, "ab")).toBe(true);
    });

    it("does not treat a group name appearing inside a character class as a declaration", () => {
      const partial = new PartialMatchRegExp(
        new RegExp("^[(?<bogus>](?!\\k<bogus>)a")
      );

      expect(completenessOf(partial, "(")).toBe(false);
      expect(completenessOf(partial, "(a")).toBe(true);
    });

    it("canonicalises a named identity escape inside a lookbehind too", () => {
      const partial = new PartialMatchRegExp(new RegExp("^a(?<!\\k<bogus>)b"));

      expect(completenessOf(partial, "a")).toBe(false);
      expect(completenessOf(partial, "ab")).toBe(true);
    });

    it("leaves a named backreference inside a lookaround unaffected, since names don't renumber", () => {
      const partial = new PartialMatchRegExp(/^(?<g>a)b(?!\k<g>)c/);

      expect(completenessOf(partial, "ab")).toBe(false);
      expect(completenessOf(partial, "abc")).toBe(true);
    });

    it("also renumbers correctly on the backreference (dynamic) path", () => {
      const partial = new PartialMatchRegExp(/^(x)(a)b(?!\2)c\1/);

      expect(completenessOf(partial, "xabc")).toBe(false);
      expect(completenessOf(partial, "xabcx")).toBe(true);
    });

    it("renumbers a numeric backreference to a group that never participated, rather than reading a marker's own capture as the target", () => {
      const partial = new PartialMatchRegExp(/^x(a)(b)?\2cd/);

      expect(completenessOf(partial, "xac")).toBe(false);
      expect(completenessOf(partial, "xacd")).toBe(true);
    });

    it("leaves a named backreference to a group that never participated unrenumbered, since names don't renumber", () => {
      const partial = new PartialMatchRegExp(/^(?<g1>a)(?<g2>b)?\k<g2>cd/);

      expect(completenessOf(partial, "ac")).toBe(false);
      expect(completenessOf(partial, "acd")).toBe(true);
    });
  });

  describe("leaving the match it describes alone", () => {
    it("does not mutate the match", () => {
      const partial = new PartialMatchRegExp(/^(a)(?<second>b)/);
      const match = partial.exec("a")!;
      const beforeAsking = [...match];

      expect(partial.isComplete(match)).toBe(false);
      expect([...match]).toEqual(beforeAsking);
      expect(match.groups).toEqual({ second: "" });
      expect(match.index).toBe(0);
      expect(match.input).toBe("a");
    });

    it("adds no own property to the match", () => {
      const partial = new PartialMatchRegExp(/^ab/);
      const match = partial.exec("a")!;
      const ownProperties = Object.getOwnPropertyNames(match);

      expect(partial.isComplete(match)).toBe(false);
      expect(Object.getOwnPropertyNames(match)).toEqual(ownProperties);
    });

    it("reports on every match a global iteration yields", () => {
      const partial = new PartialMatchRegExp(/a|b/g);

      expect(completenessOf(partial, "ab")).toBe(true);
      expect(completenessOf(partial, "ab")).toBe(true);
      expect(completenessOf(partial, "ab")).toBe(false);
    });
  });
});
