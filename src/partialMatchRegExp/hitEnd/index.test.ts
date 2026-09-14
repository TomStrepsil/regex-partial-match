import { describe, it, expect } from "vitest";
import PartialMatchRegExp, { hitEnd } from "../index.ts";
import { hitEndOf } from "../../../test/vitest.setup.ts";

describe("hitEnd()", () => {
  describe("distinguishing a match that ran out of input from one that settled", () => {
    it("distinguishes prefixes that ran out of input from a settled match", () => {
      const partial = new PartialMatchRegExp(/hello world/);

      expect(hitEndOf(partial, "h")).toBe(true);
      expect(hitEndOf(partial, "hello")).toBe(true);
      expect(hitEndOf(partial, "hello world")).toBe(false);
    });

    it("separates the three states progressive validation needs", () => {
      const partial = new PartialMatchRegExp(/^\d{4}-\d{2}-\d{2}/);

      expect(hitEndOf(partial, "20xx")).toBeNull();
      expect(hitEndOf(partial, "2024")).toBe(true);
      expect(hitEndOf(partial, "2024-06")).toBe(true);
      expect(hitEndOf(partial, "2024-06-15")).toBe(false);
    });

    it("reports a match whose greedy tail ran to the end of input as having hit the end, though it is a match of the original", () => {
      expect(
        hitEndOf(new PartialMatchRegExp(/hello \w+/), "hello world")
      ).toBe(true);
    });

    it("cannot see a raw negative lookahead reading the end of input, so reports a match more input would invalidate as settled", () => {
      expect(hitEndOf(new PartialMatchRegExp(/^a(?!b)/), "a")).toBe(
        false
      );
    });

    it("reports the empty match at the true end of input as having hit the end", () => {
      const partial = new PartialMatchRegExp(/x/);

      expect(partial.exec("a")).toMatchAt({ match: "", index: 1 });
      expect(hitEndOf(partial, "a")).toBe(true);
    });

    it("reports a greedy star that ran to the end of input, even matching nothing, as having hit the end", () => {
      const partial = new PartialMatchRegExp(/a*/);

      expect(hitEndOf(partial, "")).toBe(true);
      expect(hitEndOf(partial, "aa")).toBe(true);
    });

    it("reports an exact-length match that consumed the last character without reading past it as settled", () => {
      expect(hitEndOf(new PartialMatchRegExp(/^\d{4}-\d{2}/), "2024-06")).toBe(false);
      expect(hitEndOf(new PartialMatchRegExp(/az/), "az")).toBe(false);
    });

    it("treats an equal-bound {n,n} quantifier as the exact-length {n} it's equivalent to, leading zeros included", () => {
      expect(hitEndOf(new PartialMatchRegExp(/^a{2,2}/), "aa")).toBe(false);
      expect(hitEndOf(new PartialMatchRegExp(/^a{02,2}/), "aa")).toBe(false);
    });

    it("still reports a saturated but unequal-bound {n,m} quantifier on an atom as conservative, matching the group case", () => {
      expect(hitEndOf(new PartialMatchRegExp(/^a{1,2}/), "aa")).toBe(true);
    });
  });

  describe("cases the position of the match alone cannot answer", () => {
    it("distinguishes a truncated branch inside a lookahead from a settled match", () => {
      const partial = new PartialMatchRegExp(/a(?=(?:b(?:x|(c))d|b))/);

      const truncated = partial.exec("ab")!;
      expect(truncated).toMatchAt({ match: "a", index: 0 });
      expect(truncated[1]).toBeUndefined();
      expect(hitEnd(partial, truncated)).toBe(true);

      const complete = partial.exec("abcd")!;
      expect(complete[1]).toBe("c");
      expect(hitEnd(partial, complete)).toBe(false);
    });

    it("answers where re-running the original pattern cannot", () => {
      const original = /a(?=(?:b(?:x|(c))d|b))/y;

      original.lastIndex = 0;
      expect(original.exec("ab")).toMatchAt({ match: "a", index: 0 });
      original.lastIndex = 0;
      expect(original.exec("abcd")).toMatchAt({ match: "a", index: 0 });
    });

    it("reports a match whose open-ended quantifier and $ both read the end of input as having hit the end", () => {
      const partial = new PartialMatchRegExp(/^[a-z]+@[a-z]+\.[a-z]{2,}$/);

      expect(hitEndOf(partial, "user@example")).toBe(true);
      expect(hitEndOf(partial, "user@example.com")).toBe(true);
    });

    it("distinguishes a truncated lookbehind-qualified atom from a settled match", () => {
      const partial = new PartialMatchRegExp(/(?<=foo)bar/);

      expect(hitEndOf(partial, "foob")).toBe(true);
      expect(hitEndOf(partial, "foobar")).toBe(false);
    });
  });

  describe("reads at the end of input that consume nothing", () => {
    it("sees a greedy capture inside a lookahead run to the end", () => {
      const partial = new PartialMatchRegExp(/a(?=(b+))/);
      const match = partial.exec("ab")!;

      expect(match[1]).toBe("b");
      expect(hitEnd(partial, match)).toBe(true);
      expect(/a(?=(b+))/.exec("abbX")?.[1]).toBe("bb");
    });

    it("sees a greedy quantifier on a group run to the end", () => {
      expect(hitEndOf(new PartialMatchRegExp(/^(?:ab)+/), "abab")).toBe(true);
      expect(hitEndOf(new PartialMatchRegExp(/^(?:ab)+/), "ababx")).toBe(false);
    });

    it("sees an optional atom left untaken at the end, but not one taken there", () => {
      const partial = new PartialMatchRegExp(/^abc?/);

      expect(hitEndOf(partial, "ab")).toBe(true);
      expect(hitEndOf(partial, "abc")).toBe(false);
    });

    it("does not read past a lazy quantifier that stopped short of the end", () => {
      expect(hitEndOf(new PartialMatchRegExp(/a+?/), "aa")).toBe(false);
    });

    it("sees a word boundary that only holds because the input ended", () => {
      expect(hitEndOf(new PartialMatchRegExp(/^ab\b/), "ab")).toBe(true);
      expect(hitEndOf(new PartialMatchRegExp(/^ab\b/), "ab-")).toBe(false);
    });

    it("sees a higher-priority alternative run out of input behind a native match on the backreference path", () => {
      const partial = new PartialMatchRegExp(/(a)\1b|a/);

      expect(partial.exec("aa")).toMatchAt({ match: "a", index: 0 });
      expect(hitEndOf(partial, "aa")).toBe(true);
      expect(hitEndOf(partial, "aab")).toBe(false);
    });

    it("sees a backreference in a higher-priority alternative run out part way through its captured text, behind a native match", () => {
      const partial = new PartialMatchRegExp(/(ab)\1|a/);

      expect(partial.exec("aba")).toMatchAt({ match: "a", index: 0 });
      expect(hitEndOf(partial, "aba")).toBe(true);
      expect(partial.exec("abab")).toMatchAt({ match: "abab", index: 0 });
    });

    it("sees a longer backreference in a higher-priority alternative run out part way through its captured text", () => {
      const partial = new PartialMatchRegExp(/(abc)\1|a/);

      expect(partial.exec("abcab")).toMatchAt({ match: "a", index: 0 });
      expect(hitEndOf(partial, "abcab")).toBe(true);
      expect(partial.exec("abcabc")).toMatchAt({ match: "abcabc", index: 0 });
    });

    it("sees a truncation inside a lookahead in an earlier iteration of a quantified group whose own quantifier stopped at the end", () => {
      const partial = new PartialMatchRegExp(/(b|a(?=bb))+/);

      expect(partial.exec("ab")).toMatchAt({ match: "ab", index: 0 });
      expect(hitEndOf(partial, "ab")).toBe(true);
      expect(/(b|a(?=bb))+/y.exec("ab")).toBeNull();
    });
  });

  describe("what hitEnd() cannot see", () => {
    it("cannot see a truncation inside a lookahead in an earlier iteration of a quantified group, whose captures the engine resets each iteration", () => {
      const partial = new PartialMatchRegExp(/(?:a(?=bcd)|b)+/);

      expect(partial.exec("abc")).toMatchAt({ match: "ab", index: 0 });
      expect(hitEndOf(partial, "abc")).toBe(false);
      expect(/(?:a(?=bcd)|b)+/.exec("abcx")).toMatchAt({ match: "b", index: 1 });
    });
  });

  describe("a caret in multiline mode", () => {
    it("reports a caret evaluated at the end of input as having hit the end, as the JDK's Caret does", () => {
      const partial = new PartialMatchRegExp(/a*\s*^/m);

      expect(partial.exec("a")).toMatchAt({ match: "a", index: 0 });
      expect(hitEndOf(partial, "a")).toBe(true);
      expect(/a*\s*^/m.exec("a\n")).toMatchAt({ match: "a\n", index: 0 });
    });

    it("reports a caret that held against a line terminator already in hand as settled", () => {
      expect(hitEndOf(new PartialMatchRegExp(/x\n^a/m), "x\nab")).toBe(false);
    });

    it("reports a caret that held at the start of input as settled", () => {
      expect(hitEndOf(new PartialMatchRegExp(/^a/m), "a")).toBe(false);
    });

    it("reports a caret that held at the end of input after a line terminator as settled, where the JDK refuses the match outright", () => {
      const partial = new PartialMatchRegExp(/a\n^/m);

      expect(partial.exec("a\n")).toMatchAt({ match: "a\n", index: 0 });
      expect(hitEndOf(partial, "a\n")).toBe(false);
      expect(/a\n^/m.exec("a\nx")).toMatchAt({ match: "a\n", index: 0 });
    });

    it("reports a caret inside a multiline modifier group, with no multiline flag on the pattern", () => {
      const partial = new PartialMatchRegExp(/(?m:\W^)/);

      expect(partial.exec("a")).toMatchAt({ match: "", index: 1 });
      expect(hitEndOf(partial, "a")).toBe(true);
    });

    it("leaves a caret under a negating multiline modifier raw, where no continuation can reach it", () => {
      expect(new PartialMatchRegExp(/\W(?-m:^)/m).exec("a")).toBeNull();
    });

    it.each([
      ["a character class escape", /\W^/m],
      ["a non-capturing group", /(?:-|\n)^/m],
      ["a capturing group", /(-|\n)^/m],
      ["a modifier group", /(?i:-|\n)^/m]
    ])(
      "reports a caret that held after %s took a line terminator as settled, and one refused at the end after it took another character as having hit the end",
      (_, pattern) => {
        const partial = new PartialMatchRegExp(pattern);

        expect(hitEndOf(partial, "\n")).toBe(false);
        expect(hitEndOf(partial, "-")).toBe(true);
      }
    );

    it("reports a caret after a greedy quantifier as having hit the end even where it held, since the quantifier read the end", () => {
      expect(hitEndOf(new PartialMatchRegExp(/\W*^/m), "\n")).toBe(true);
    });

    it("reports a zero-repeat quantifier before a caret as having hit the end only where it stopped at the end", () => {
      const partial = new PartialMatchRegExp(/\na*^/m);

      expect(hitEndOf(partial, "\n")).toBe(true);
      expect(hitEndOf(partial, "\na")).toBe(false);
    });

    it("sees a word boundary between a caret and its atom read the end of input", () => {
      expect(hitEndOf(new PartialMatchRegExp(/\n\B^/m), "\n")).toBe(true);
      expect(/\n\B^/m.exec("\na")).toBeNull();
      expect(hitEndOf(new PartialMatchRegExp(/\W\B^/m), "\n")).toBe(true);
      expect(hitEndOf(new PartialMatchRegExp(/\B^/m), "")).toBe(true);
      expect(new PartialMatchRegExp(/\B^/m).exec("a")).toBeNull();
    });

    it("sees a caret leading a multiline modifier group body read the end of input", () => {
      const partial = new PartialMatchRegExp(/\W*(?m:^)/);

      expect(hitEndOf(partial, "-")).toBe(true);
      expect(partial.exec("-\n")).toMatchAt({ match: "-\n", index: 0 });
    });

    it("settles a caret that held after a group turning multiline off", () => {
      expect(hitEndOf(new PartialMatchRegExp(/(?-m:\n)^/m), "\n")).toBe(false);
    });

    it("settles a match that did not take a lookahead alternative led by a caret", () => {
      expect(hitEndOf(new PartialMatchRegExp(/\W*(?=^|b)/m), "-b")).toBe(false);
    });
  });

  describe("a probe shared across matches", () => {
    it("builds a new probe for a match whose captures expand to different text than the last match asked about", () => {
      const partial = new PartialMatchRegExp(/(\w\w)(?:\1|cc)/);
      const expanded = partial.exec("cc")!;
      const native = partial.exec("aacc")!;

      for (let round = 0; round < 2; round++) {
        expect(hitEnd(partial, expanded)).toBe(true);
        expect(hitEnd(partial, native)).toBe(false);
      }
    });

    it("builds a new probe for a match whose captures expand to a different length than the last match asked about", () => {
      const partial = new PartialMatchRegExp(/(\w\w?)(?:\1|cc)/);
      const expanded = partial.exec("c")!;
      const native = partial.exec("aacc")!;

      for (let round = 0; round < 2; round++) {
        expect(hitEnd(partial, expanded)).toBe(true);
        expect(hitEnd(partial, native)).toBe(false);
      }
    });

    it("answers for fresh matches whose captures expand alike", () => {
      const partial = new PartialMatchRegExp(/(\w\w)(?:\1|cc)/);

      expect(hitEndOf(partial, "cc")).toBe(true);
      expect(hitEndOf(partial, "cc")).toBe(true);
      expect(hitEndOf(partial, "aacc")).toBe(false);
      expect(hitEndOf(partial, "aacc")).toBe(false);
    });
  });

  describe("a probe that cannot reproduce the match", () => {
    it("reports a match the probe cannot reproduce as having hit the end, since only a lookahead that ran out of input can make it diverge", () => {
      const partial = new PartialMatchRegExp(/(?=(a|-b){1,2})\1/);

      expect(partial.exec("a-")).toMatchAt({ match: "a", index: 0 });
      expect(hitEndOf(partial, "a-")).toBe(true);
      expect(partial.exec("a-b")).toMatchAt({ match: "-b", index: 1 });
      expect(hitEndOf(partial, "a-x")).toBe(false);
    });

    it("settles a native match whose probe the multiline caret rules must let match", () => {
      const partial = new PartialMatchRegExp(/(b)(?=^|b)\1/m);

      expect(hitEndOf(partial, "bb")).toBe(false);
      expect(hitEndOf(partial, "bbx")).toBe(false);
      expect(
        hitEndOf(
          new PartialMatchRegExp(new RegExp("(\\n)(?-m:\\n)^\\1", "m")),
          "\n\n\n"
        )
      ).toBe(false);
    });
  });

  describe("a backreference in a higher-priority alternative, behind a native match", () => {
    it.each([
      [/(ab)\1|a/, "aba", "abab"],
      [/(abc)\1|a/, "abca", "abcabc"],
      [/(abc)\1|a/, "abcab", "abcabc"],
      [/(?<g>ab)\k<g>|a/, "aba", "abab"],
      [/^(ab)\1|^a/, "aba", "abab"],
      [/(ab)\1|a/i, "abA", "abAB"],
      [/(a|ab)\1|a/, "aba", "abab"],
      [/(ab)(?:\1|a)/, "aba", "abab"]
    ])(
      "%s on %j reads the end part way through the capture, and %j changes the match",
      (pattern, input, continued) => {
        const partial = new PartialMatchRegExp(pattern);
        const match = partial.exec(input)!;
        const extended = partial.exec(continued)!;

        expect(hitEnd(partial, match)).toBe(true);
        expect([extended.index, extended[0]]).not.toEqual([match.index, match[0]]);
      }
    );

    it("re-expands behind a native match whose captures the pre-scan did not predict", () => {
      const partial = new PartialMatchRegExp(/((\S{1,2})??)\B\1{1,}?/m);

      expect(partial.exec("aaa")).toMatchAt({ match: "aa", index: 0 });
      expect(hitEndOf(partial, "aaa")).toBe(true);
      expect(partial.exec("aaaa")).toMatchAt({ match: "aaaa", index: 0 });
    });

    it("re-expands a one-character capture, which the un-expanded probe cannot see the match consume", () => {
      const partial = new PartialMatchRegExp(/([^b]+?)\1*\s/v);

      expect(partial.exec("\na\n")).toMatchAt({ match: "\na\n", index: 0 });
      expect(hitEndOf(partial, "\na\n")).toBe(true);
      expect(partial.exec("\na\na\n")).toMatchAt({
        match: "\na\na\n",
        index: 0
      });
    });

    it("settles a native match the higher-priority alternative completed", () => {
      expect(hitEndOf(new PartialMatchRegExp(/(ab)\1|a/), "abab")).toBe(false);
      expect(hitEndOf(new PartialMatchRegExp(/(ab)(?:\1|a)/), "abab")).toBe(false);
    });

    it("settles a native match no lower-priority alternative can displace", () => {
      expect(hitEndOf(new PartialMatchRegExp(/a|(ab)\1/), "aba")).toBe(false);
    });
  });

  describe("branches the transform never introduced", () => {
    it("ignores an end-of-input disjunction the pattern itself wrote inside a lookbehind", () => {
      const partial = new PartialMatchRegExp(/(?<=a|$(?![\s\S]))/);

      expect(partial.exec("")).toMatchAt({ match: "", index: 0 });
      expect(hitEndOf(partial, "")).toBe(false);
    });

    it("ignores an end-of-input disjunction the pattern itself wrote inside a negative lookahead", () => {
      expect(
        hitEndOf(new PartialMatchRegExp(/^x(?!a|$(?![\s\S]))/), "xb")
      ).toBe(false);
    });

    it("marks a $ that held at the end of input, but not an empty ^ match short of it", () => {
      expect(hitEndOf(new PartialMatchRegExp(/^$/), "")).toBe(true);
      expect(hitEndOf(new PartialMatchRegExp(/^/), "abc")).toBe(false);
    });
  });

  describe("marker names that the pattern could collide with", () => {
    it("renames its markers past a named group of the same name", () => {
      const partial = new PartialMatchRegExp(/^(?<truncation0>a)b/);

      expect(hitEndOf(partial, "a")).toBe(true);
      expect(hitEndOf(partial, "ab")).toBe(false);
      expect(partial.exec("ab")?.groups?.truncation0).toBe("a");
    });

    it("keeps renaming until the name is free", () => {
      const partial = new PartialMatchRegExp(
        /^(?<truncation0>a)(?<truncation_0>b)c/
      );

      expect(hitEndOf(partial, "ab")).toBe(true);
      expect(hitEndOf(partial, "abc")).toBe(false);
    });

    it("recognises a group name spelled with a unicode escape", () => {
      const partial = new PartialMatchRegExp(
        new RegExp("^(?<\\u0074runcation0>a)b")
      );

      expect(hitEndOf(partial, "a")).toBe(true);
      expect(hitEndOf(partial, "ab")).toBe(false);
    });

    it("does not mistake character class text for a named group", () => {
      const partial = new PartialMatchRegExp(
        new RegExp("[(?<\\u{110000}>]a")
      );

      expect(hitEndOf(partial, "(")).toBe(true);
      expect(hitEndOf(partial, "(a")).toBe(false);
    });

    it("does not rename past a marker name that only appears as class content", () => {
      const partial = new PartialMatchRegExp(
        new RegExp("^[(?<truncation0>]a")
      );

      expect(hitEndOf(partial, "(")).toBe(true);
      expect(hitEndOf(partial, "(a")).toBe(false);
    });

    it("takes the declared names from the walk, so class content cannot invalidate a reference", () => {
      const partial = new PartialMatchRegExp(
        new RegExp("^[(?<bogus>](?!\\k<bogus>)a")
      );

      expect(hitEndOf(partial, "(")).toBe(true);
      expect(hitEndOf(partial, "(a")).toBe(false);
    });
  });

  describe("across the constructs the walker transforms", () => {
    it("reports the input running out through a non-capturing group", () => {
      const partial = new PartialMatchRegExp(/^(?:ab)c/);

      expect(hitEndOf(partial, "ab")).toBe(true);
      expect(hitEndOf(partial, "abc")).toBe(false);
    });

    it("reports the input running out through a capturing group", () => {
      const partial = new PartialMatchRegExp(/^(ab)c/);

      expect(hitEndOf(partial, "ab")).toBe(true);
      expect(hitEndOf(partial, "abc")).toBe(false);
    });

    it("reports the input running out through a named group", () => {
      const partial = new PartialMatchRegExp(/^(?<pair>ab)c/);

      expect(hitEndOf(partial, "ab")).toBe(true);
      expect(hitEndOf(partial, "abc")).toBe(false);
    });

    it("reports the input running out through a disjunction", () => {
      const partial = new PartialMatchRegExp(/^(?:foo|bar)/);

      expect(hitEndOf(partial, "ba")).toBe(true);
      expect(hitEndOf(partial, "bar")).toBe(false);
    });

    it("reports the input running out through a modifier group", () => {
      const partial = new PartialMatchRegExp(/^(?i:AB)c/);

      expect(hitEndOf(partial, "ab")).toBe(true);
      expect(hitEndOf(partial, "abc")).toBe(false);
    });

    it("reports the input running out through an astral atom in unicode mode", () => {
      const partial = new PartialMatchRegExp(/^\u{1F600}x/u);

      expect(hitEndOf(partial, "\u{1F600}")).toBe(true);
      expect(hitEndOf(partial, "\u{1F600}x")).toBe(false);
    });

    it("reports the input running out through a nested character class in v mode", () => {
      const partial = new PartialMatchRegExp(/^[[a-z]--[c]]d/v);

      expect(hitEndOf(partial, "a")).toBe(true);
      expect(hitEndOf(partial, "ad")).toBe(false);
    });

    it("reports the input running out through a reclassified octal escape", () => {
      const partial = new PartialMatchRegExp(new RegExp("^\\8a"));

      expect(hitEndOf(partial, "8")).toBe(true);
      expect(hitEndOf(partial, "8a")).toBe(false);
    });

    it("reports the input running out through a reclassified octal escape a marker group could otherwise turn into a backreference", () => {
      const partial = new PartialMatchRegExp(new RegExp("^\\1a"));

      expect(hitEndOf(partial, "\x01")).toBe(true);
      expect(hitEndOf(partial, "\x01a")).toBe(false);
    });

    it("reports the input running out through a multi-digit reclassified octal escape with a literal digit left over", () => {
      const partial = new PartialMatchRegExp(new RegExp("^\\128x"));

      expect(hitEndOf(partial, "\n8")).toBe(true);
      expect(hitEndOf(partial, "\n8x")).toBe(false);
    });

    it("reports the input running out through a reclassified octal escape that follows a genuine backreference", () => {
      const partial = new PartialMatchRegExp(new RegExp("^(a)\\1\\3b"));

      expect(hitEndOf(partial, "aa\x03")).toBe(true);
      expect(hitEndOf(partial, "aa\x03b")).toBe(false);
    });

    it("reports the input running out through a reclassified named identity escape a marker group could otherwise turn into a broken backreference", () => {
      const partial = new PartialMatchRegExp(new RegExp("^\\k<bogus>a"));

      expect(hitEndOf(partial, "k<bogus>")).toBe(true);
      expect(hitEndOf(partial, "k<bogus>a")).toBe(false);
    });

    it("reports the input running out through a word boundary assertion", () => {
      const partial = new PartialMatchRegExp(/^\bfoo/);

      expect(hitEndOf(partial, "fo")).toBe(true);
      expect(hitEndOf(partial, "foo")).toBe(false);
    });
  });

  describe("under every flag", () => {
    it("reports the input running out with the d flag, leaving indices intact", () => {
      const partial = new PartialMatchRegExp(/^(ab)c/d);

      const match = partial.exec("ab")!;
      expect(hitEnd(partial, match)).toBe(true);
      expect(match.indices![1]).toEqual([0, 2]);
    });

    it("reports the input running out with the g flag without disturbing lastIndex", () => {
      const partial = new PartialMatchRegExp(/ab/g);

      const first = partial.exec("abab")!;
      expect(partial.lastIndex).toBe(2);
      expect(hitEnd(partial, first)).toBe(false);
      expect(partial.lastIndex).toBe(2);
      expect(partial.exec("abab")).toMatchAt({ match: "ab", index: 2 });
    });

    it("reports the input running out with the y flag", () => {
      const partial = new PartialMatchRegExp(/hello/y);

      partial.lastIndex = 2;
      expect(hitEndOf(partial, "xyhel")).toBe(true);
      partial.lastIndex = 2;
      expect(hitEndOf(partial, "xyhello")).toBe(false);
    });

    it("reports the input running out with the d, g and y flags combined", () => {
      expect(hitEndOf(new PartialMatchRegExp(/^(ab)c/dgy), "ab")).toBe(
        true
      );
    });

    it("reports the input running out with the m flag", () => {
      const partial = new PartialMatchRegExp(/^foo$/m);

      expect(hitEndOf(partial, "a\nfo")).toBe(true);
      expect(hitEndOf(partial, "a\nfoo\nb")).toBe(false);
      expect(hitEndOf(partial, "a\nfoo")).toBe(true);
    });

    it("reports the input running out with the i flag", () => {
      const partial = new PartialMatchRegExp(/^abc/i);

      expect(hitEndOf(partial, "AB")).toBe(true);
      expect(hitEndOf(partial, "ABC")).toBe(false);
    });
  });

  describe("patterns with backreferences", () => {
    it("distinguishes a truncated backreference expansion from a settled match", () => {
      const partial = new PartialMatchRegExp(/^(ab)\1/);

      expect(hitEndOf(partial, "aba")).toBe(true);
      expect(hitEndOf(partial, "abab")).toBe(false);
    });

    it("distinguishes a truncated named backreference expansion from a settled match", () => {
      const partial = new PartialMatchRegExp(/^(?<pair>ab)\k<pair>/);

      expect(hitEndOf(partial, "aba")).toBe(true);
      expect(hitEndOf(partial, "abab")).toBe(false);
    });

    it("reports a backreference that ran out of input as incomplete, even where the capture scan settled on a shorter value than the match did", () => {
      const partial = new PartialMatchRegExp(/^(ab?|ac?)\1/);

      expect(hitEndOf(partial, "aca")).toBe(true);
      expect(hitEndOf(partial, "acac")).toBe(false);
    });

    it("reports a truncated atom before the backreference as having hit the end", () => {
      expect(hitEndOf(new PartialMatchRegExp(/^(ab)\1/), "a")).toBe(
        true
      );
    });

    it("reports a native full match found later in the input as settled", () => {
      const partial = new PartialMatchRegExp(/(ab)\1/);

      expect(partial.exec("xxabab")).toMatchAt({ match: "abab", index: 2 });
      expect(hitEndOf(partial, "xxabab")).toBe(false);
    });

    it("answers from the unexpanded probe when the capture scan cannot reproduce a native match, which a lookahead the scan resolves differently can cause", () => {
      const partial = new PartialMatchRegExp(/(x)(?=\1(y|.))(?!\2)/);

      expect(partial.exec("xxy")).toMatchAt({ match: "x", index: 0 });
      expect(hitEndOf(partial, "xxy")).toBe(false);
    });

    it("reports a backreference to an unmatched group as settled", () => {
      expect(hitEndOf(new PartialMatchRegExp(/^(a)?b\1/), "b")).toBe(
        false
      );
    });

    it("reports incompleteness correctly in a pattern containing a forward reference, even though the reference itself never has to truncate", () => {
      const partial = new PartialMatchRegExp(/^\1a(b)/);

      expect(hitEndOf(partial, "a")).toBe(true);
      expect(hitEndOf(partial, "ab")).toBe(false);
    });

    it("answers repeatedly without rebuilding its probe", () => {
      const partial = new PartialMatchRegExp(/^(ab)\1/);
      const match = partial.exec("aba")!;

      expect(hitEnd(partial, match)).toBe(true);
      expect(hitEnd(partial, match)).toBe(true);
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

      expect(hitEndOf(partial, "xab")).toBe(true);
      expect(hitEndOf(partial, "xabc")).toBe(false);
    });

    it("shifts each group by its own count of preceding markers, not a single pattern-wide count", () => {
      const partial = new PartialMatchRegExp(/^vw(x)(yy)z(?!\1\2)w/);

      expect(hitEndOf(partial, "vwxyyz")).toBe(true);
      expect(hitEndOf(partial, "vwxyyzw")).toBe(false);
    });

    it("handles more than one raw backreference in the same lookaround", () => {
      const partial = new PartialMatchRegExp(/^xy(a)(b)c(?!\1\2)d/);

      expect(hitEndOf(partial, "xyabc")).toBe(true);
      expect(hitEndOf(partial, "xyabcd")).toBe(false);
    });

    it("handles a group and its own backreference both inside the same negative lookahead", () => {
      const partial = new PartialMatchRegExp(/^x(?!(a)\1)b/);

      expect(hitEndOf(partial, "x")).toBe(true);
      expect(hitEndOf(partial, "xb")).toBe(false);
    });

    it("handles a raw backreference inside a lookbehind", () => {
      const partial = new PartialMatchRegExp(/^v(a)(b)(?<=\1\2)c/);

      expect(hitEndOf(partial, "vab")).toBe(true);
      expect(hitEndOf(partial, "vabc")).toBe(false);
    });

    it("handles a group and its own backreference both inside the same lookbehind", () => {
      const partial = new PartialMatchRegExp(/^aa(?<=(a)\1)b/);

      expect(hitEndOf(partial, "aa")).toBe(true);
      expect(hitEndOf(partial, "aab")).toBe(false);
    });

    it("handles a raw backreference inside a negative lookbehind", () => {
      const partial = new PartialMatchRegExp(/^v(a)bb(?<!\1)c/);

      expect(hitEndOf(partial, "vabb")).toBe(true);
      expect(hitEndOf(partial, "vabbc")).toBe(false);
    });

    it("leaves a reference past the pattern's own group count untouched, rather than misreading it as a backreference", () => {
      const partial = new PartialMatchRegExp(new RegExp("^x(?!\\9)a"));

      expect(hitEndOf(partial, "x")).toBe(true);
      expect(hitEndOf(partial, "xa")).toBe(false);
    });

    it("canonicalises a \\0-led octal escape inside a lookaround, rather than letting the probe misread its ref as a real group 0", () => {
      const partial = new PartialMatchRegExp(new RegExp("^a(?!\\0128).{2}z"));

      expect(hitEndOf(partial, "a\x00")).toBe(true);
      expect(hitEndOf(partial, "axyz")).toBe(false);
    });

    it("canonicalises an Annex B named identity escape inside a lookaround, rather than letting a marker turn it into a broken reference", () => {
      const partial = new PartialMatchRegExp(new RegExp("^a(?!\\k<bogus>)b"));

      expect(hitEndOf(partial, "a")).toBe(true);
      expect(hitEndOf(partial, "ab")).toBe(false);
    });

    it("canonicalises a bare Annex B \\k inside a lookaround, which the probe's own named markers would otherwise invalidate", () => {
      const partial = new PartialMatchRegExp(new RegExp("^a(?!\\k)b"));

      expect(hitEndOf(partial, "a")).toBe(true);
      expect(hitEndOf(partial, "ab")).toBe(false);
    });

    it("does not treat a group name appearing inside a character class as a declaration", () => {
      const partial = new PartialMatchRegExp(
        new RegExp("^[(?<bogus>](?!\\k<bogus>)a")
      );

      expect(hitEndOf(partial, "(")).toBe(true);
      expect(hitEndOf(partial, "(a")).toBe(false);
    });

    it("canonicalises a named identity escape inside a lookbehind too", () => {
      const partial = new PartialMatchRegExp(new RegExp("^a(?<!\\k<bogus>)b"));

      expect(hitEndOf(partial, "a")).toBe(true);
      expect(hitEndOf(partial, "ab")).toBe(false);
    });

    it("leaves a named backreference inside a lookaround unaffected, since names don't renumber", () => {
      const partial = new PartialMatchRegExp(/^(?<g>a)b(?!\k<g>)c/);

      expect(hitEndOf(partial, "ab")).toBe(true);
      expect(hitEndOf(partial, "abc")).toBe(false);
    });

    it("also renumbers correctly on the backreference (dynamic) path", () => {
      const partial = new PartialMatchRegExp(/^(x)(a)b(?!\2)c\1/);

      expect(hitEndOf(partial, "xabc")).toBe(true);
      expect(hitEndOf(partial, "xabcx")).toBe(false);
    });

    it("renumbers a numeric backreference to a group that never participated, rather than reading a marker's own capture as the target", () => {
      const partial = new PartialMatchRegExp(/^x(a)(b)?\2cd/);

      expect(hitEndOf(partial, "xac")).toBe(true);
      expect(hitEndOf(partial, "xacd")).toBe(false);
    });

    it("leaves a named backreference to a group that never participated unrenumbered, since names don't renumber", () => {
      const partial = new PartialMatchRegExp(/^(?<g1>a)(?<g2>b)?\k<g2>cd/);

      expect(hitEndOf(partial, "ac")).toBe(true);
      expect(hitEndOf(partial, "acd")).toBe(false);
    });
  });

  describe("leaving the match it describes alone", () => {
    it("does not mutate the match", () => {
      const partial = new PartialMatchRegExp(/^(a)(?<second>b)/);
      const match = partial.exec("a")!;
      const beforeAsking = [...match];

      expect(hitEnd(partial, match)).toBe(true);
      expect([...match]).toEqual(beforeAsking);
      expect(match.groups).toEqual({ second: "" });
      expect(match.index).toBe(0);
      expect(match.input).toBe("a");
    });

    it("adds no own property to the match", () => {
      const partial = new PartialMatchRegExp(/^ab/);
      const match = partial.exec("a")!;
      const ownProperties = Object.getOwnPropertyNames(match);

      expect(hitEnd(partial, match)).toBe(true);
      expect(Object.getOwnPropertyNames(match)).toEqual(ownProperties);
    });

    it("reports on every match a global iteration yields", () => {
      const partial = new PartialMatchRegExp(/a|b/g);

      expect(hitEndOf(partial, "ab")).toBe(false);
      expect(hitEndOf(partial, "ab")).toBe(false);
      expect(hitEndOf(partial, "ab")).toBe(true);
    });
  });
});
