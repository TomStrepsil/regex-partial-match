import { describe, it, expect } from "vitest";
import PartialMatchRegExp from "./partialMatchRegExp.ts";

describe("PartialMatchRegExp", () => {
  it("is an instance of RegExp", () => {
    expect(new PartialMatchRegExp(/abc/)).toBeInstanceOf(RegExp);
  });

  it("passes flags through from a RegExp argument", () => {
    expect(new PartialMatchRegExp(/abc/d).hasIndices).toBe(true);
    expect(new PartialMatchRegExp(/abc/g).global).toBe(true);
    expect(new PartialMatchRegExp(/abc/i).ignoreCase).toBe(true);
    expect(new PartialMatchRegExp(/abc/m).multiline).toBe(true);
    expect(new PartialMatchRegExp(/abc/s).dotAll).toBe(true);
    expect(new PartialMatchRegExp(/abc/u).unicode).toBe(true);
    expect(new PartialMatchRegExp(/abc/v).unicodeSets).toBe(true);
    expect(new PartialMatchRegExp(/abc/y).sticky).toBe(true);
    expect(new PartialMatchRegExp(/abc/gi).global).toBe(true);
    expect(new PartialMatchRegExp(/abc/gi).ignoreCase).toBe(true);
    expect(new PartialMatchRegExp(/abc/i, "m").ignoreCase).toBe(false);
    expect(new PartialMatchRegExp(/abc/i, "m").multiline).toBe(true);
  });

  it("applies the flags argument when pattern is a string", () => {
    expect(new PartialMatchRegExp("abc").ignoreCase).toBe(false);
    expect(new PartialMatchRegExp("abc", "d").hasIndices).toBe(true);
    expect(new PartialMatchRegExp("abc", "i").ignoreCase).toBe(true);
    expect(new PartialMatchRegExp("abc", "m").multiline).toBe(true);
    expect(new PartialMatchRegExp("abc", "s").dotAll).toBe(true);
    expect(new PartialMatchRegExp("abc", "u").unicode).toBe(true);
    expect(new PartialMatchRegExp("abc", "v").unicodeSets).toBe(true);
    expect(new PartialMatchRegExp("abc", "y").sticky).toBe(true);
    expect(new PartialMatchRegExp("abc", "g").global).toBe(true);
    expect(new PartialMatchRegExp("abc", "gi").global).toBe(true);
    expect(new PartialMatchRegExp("abc", "gi").ignoreCase).toBe(true);
  });

  describe("features", () => {
    it("reports only 'patternCharacter' for a plain literal pattern", () => {
      expect(new PartialMatchRegExp(/foo/).features).toEqual(
        new Set(["patternCharacter"])
      );
    });

    it("detects a top-level ^ as a start anchor", () => {
      expect(new PartialMatchRegExp(/^foo/).features).toContain("startAnchor");
    });

    it("detects a top-level $ as an end anchor", () => {
      expect(new PartialMatchRegExp(/foo$/).features).toContain("endAnchor");
    });

    it("does not mistake a character class's ^/$ for an anchor", () => {
      const features = new PartialMatchRegExp(/[^a$bc]/).features;
      expect(features).not.toContain("startAnchor");
      expect(features).not.toContain("endAnchor");
    });

    it("does not mistake nested v-flag character classes for a closed class", () => {
      const dollar = new PartialMatchRegExp(/[[a-z]$]/v).features;
      expect(dollar).not.toContain("endAnchor");
      const caret = new PartialMatchRegExp(/[[a-z]^]/v).features;
      expect(caret).not.toContain("startAnchor");
    });

    it("detects a ^ that isn't at the start of the pattern", () => {
      expect(new PartialMatchRegExp(/foo^bar/).features).toContain(
        "startAnchor"
      );
    });

    it("detects a $ that isn't at the end of the pattern", () => {
      expect(new PartialMatchRegExp(/foo$bar/).features).toContain("endAnchor");
    });

    it("detects a ^ inside an alternation branch, a realistic multiline-style shape", () => {
      expect(new PartialMatchRegExp(/foo|^bar/).features).toContain(
        "startAnchor"
      );
    });

    it("detects a ^ inside a non-capturing group used as a line-start alternative", () => {
      expect(new PartialMatchRegExp(/(?:^|\n)ERROR/).features).toContain(
        "startAnchor"
      );
    });

    it("detects a top-level \\b as a word boundary", () => {
      expect(new PartialMatchRegExp(/\bfoo/).features).toContain(
        "wordBoundary"
      );
    });

    it("detects a top-level \\B as a non-word-boundary", () => {
      expect(new PartialMatchRegExp(/foo\B/).features).toContain(
        "nonWordBoundary"
      );
    });

    it("does not mistake a [\\b] backspace character class for a word boundary", () => {
      const features = new PartialMatchRegExp(/[\b]/).features;
      expect(features).not.toContain("wordBoundary");
      expect(features).not.toContain("nonWordBoundary");
    });

    it("detects a positive lookahead", () => {
      expect(new PartialMatchRegExp(/foo(?=bar)/).features).toContain(
        "lookahead"
      );
    });

    it("detects a negative lookahead", () => {
      expect(new PartialMatchRegExp(/foo(?!bar)/).features).toContain(
        "negativeLookahead"
      );
    });

    it("does not mistake a positive lookahead for a negative one", () => {
      expect(new PartialMatchRegExp(/foo(?=bar)/).features).not.toContain(
        "negativeLookahead"
      );
    });

    it("detects a positive lookbehind", () => {
      expect(new PartialMatchRegExp(/(?<=foo)bar/).features).toContain(
        "lookbehind"
      );
    });

    it("detects a negative lookbehind", () => {
      expect(new PartialMatchRegExp(/(?<!foo)bar/).features).toContain(
        "negativeLookbehind"
      );
    });

    it("does not mistake a positive lookbehind for a negative one", () => {
      expect(new PartialMatchRegExp(/(?<=foo)bar/).features).not.toContain(
        "negativeLookbehind"
      );
    });

    it("detects a named capturing group as both namedGroup and capturingGroup", () => {
      const features = new PartialMatchRegExp(/(?<name>foo)/).features;
      expect(features).toContain("namedGroup");
      expect(features).toContain("capturingGroup");
      expect(features).not.toContain("lookbehind");
      expect(features).not.toContain("negativeLookbehind");
    });

    it("detects a plain capturing group, without namedGroup", () => {
      const features = new PartialMatchRegExp(/(foo)/).features;
      expect(features).toContain("capturingGroup");
      expect(features).not.toContain("namedGroup");
    });

    it("gives every feature outside unicode sets its own bit", () => {
      const everyFeatureOutsideUnicodeSets =
        /^(?<name>a)\k<name>(b)\1o+[c-d]\d\n\cA\x41\u0041q\.(?:e)(?i:f)(?i-s:g)\bh\Bi(?=j)(?!(k))(?<=l)(?<!m)|n$/;

      expect(
        new PartialMatchRegExp(everyFeatureOutsideUnicodeSets).features
      ).toEqual(
        new Set([
          "patternCharacter",
          "startAnchor",
          "endAnchor",
          "wordBoundary",
          "nonWordBoundary",
          "lookahead",
          "negativeLookahead",
          "lookbehind",
          "negativeLookbehind",
          "backreference",
          "namedBackreference",
          "namedGroup",
          "capturingGroup",
          "lookaroundCapture",
          "nonCapturingGroup",
          "modifierGroup",
          "modifierGroupWithRemoval",
          "characterClass",
          "disjunction",
          "quantifier",
          "characterClassEscape",
          "controlEscape",
          "controlLetterEscape",
          "hexEscapeSequence",
          "unicodeEscapeSequence",
          "otherEscape"
        ])
      );
    });

    it("gives every unicode sets feature its own bit", () => {
      const everyUnicodeSetsFeature =
        /[[a-z]&&[b-c]][\p{ASCII}--\p{Lowercase}]\p{Letter}/v;

      expect(new PartialMatchRegExp(everyUnicodeSetsFeature).features).toEqual(
        new Set([
          "characterClass",
          "nestedCharacterClass",
          "classIntersection",
          "classSubtraction",
          "unicodePropertyEscape"
        ])
      );
    });

    it("detects a capturing group inside a positive lookahead", () => {
      expect(new PartialMatchRegExp(/a(?=(b))/).features).toContain(
        "lookaroundCapture"
      );
    });

    it("detects a capturing group nested deeper inside a lookahead", () => {
      expect(
        new PartialMatchRegExp(/a(?=(?:b(?:x|(c))d|b))/).features
      ).toContain("lookaroundCapture");
    });

    it("detects a capturing group inside a negative lookahead", () => {
      expect(new PartialMatchRegExp(/a(?!(b))/).features).toContain(
        "lookaroundCapture"
      );
    });

    it("detects a capturing group inside a positive lookbehind", () => {
      expect(new PartialMatchRegExp(/(?<=(a))b/).features).toContain(
        "lookaroundCapture"
      );
    });

    it("detects a capturing group inside a negative lookbehind", () => {
      expect(new PartialMatchRegExp(/(?<!(a))b/).features).toContain(
        "lookaroundCapture"
      );
    });

    it("detects a named capturing group inside a lookaround", () => {
      const features = new PartialMatchRegExp(/(?=(?<name>a))/).features;
      expect(features).toContain("lookaroundCapture");
      expect(features).toContain("namedGroup");
      expect(features).toContain("capturingGroup");
    });

    it("detects a capturing group inside a modifier group inside a lookaround", () => {
      expect(new PartialMatchRegExp(/(?=(?i:(a)))/).features).toContain(
        "lookaroundCapture"
      );
    });

    it("detects a capturing group inside a lookaround nested in a lookaround", () => {
      expect(new PartialMatchRegExp(/(?=(?<!(a))b)/).features).toContain(
        "lookaroundCapture"
      );
    });

    it("does not report a capturing group that precedes a lookaround", () => {
      expect(new PartialMatchRegExp(/(\w+)(?= END)/).features).not.toContain(
        "lookaroundCapture"
      );
    });

    it("does not report a capturing group that follows a lookaround", () => {
      expect(new PartialMatchRegExp(/(?=a)(b)/).features).not.toContain(
        "lookaroundCapture"
      );
    });

    it("does not report a capturing group that follows a nested lookaround", () => {
      expect(new PartialMatchRegExp(/(?:(?=a)(b))/).features).not.toContain(
        "lookaroundCapture"
      );
    });

    it("does not report a lookaround nested inside a capturing group", () => {
      expect(new PartialMatchRegExp(/(a(?=b))/).features).not.toContain(
        "lookaroundCapture"
      );
    });

    it("does not report a lookaround containing only a non-capturing group", () => {
      const features = new PartialMatchRegExp(/(?=(?:x))/).features;
      expect(features).toContain("nonCapturingGroup");
      expect(features).not.toContain("lookaroundCapture");
    });

    it("does not report a capturing group without any lookaround", () => {
      expect(new PartialMatchRegExp(/(a)/).features).not.toContain(
        "lookaroundCapture"
      );
    });

    it("does not report a capturing group inside a modifier group", () => {
      expect(new PartialMatchRegExp(/(?i:(a))/).features).not.toContain(
        "lookaroundCapture"
      );
    });

    it("does not report a capturing group inside a remove-only modifier group", () => {
      expect(new PartialMatchRegExp(/(?-s:(a))/).features).not.toContain(
        "lookaroundCapture"
      );
    });

    it("does not report a capturing group nested inside a named group", () => {
      expect(new PartialMatchRegExp(/(?<name>(a))/).features).not.toContain(
        "lookaroundCapture"
      );
    });

    it("does not report a named group nested inside a named group", () => {
      expect(
        new PartialMatchRegExp(/(?<outer>x(?<inner>y))/).features
      ).not.toContain("lookaroundCapture");
    });

    it("does not report a capturing group nested inside a non-capturing group", () => {
      expect(new PartialMatchRegExp(/(?:(a))/).features).not.toContain(
        "lookaroundCapture"
      );
    });

    it("does not report a capturing group nested inside a capturing group", () => {
      expect(new PartialMatchRegExp(/((a))/).features).not.toContain(
        "lookaroundCapture"
      );
    });

    it("does not mistake a lookaround's character class ( for a capturing group", () => {
      expect(new PartialMatchRegExp(/(?=[(])/).features).not.toContain(
        "lookaroundCapture"
      );
    });

    it("does not mistake a lookaround's escaped ( for a capturing group", () => {
      expect(new PartialMatchRegExp(/(?=\(a\))/).features).not.toContain(
        "lookaroundCapture"
      );
    });

    it("detects a non-capturing group", () => {
      expect(new PartialMatchRegExp(/(?:foo)/).features).toContain(
        "nonCapturingGroup"
      );
    });

    it("detects an add-only modifier group", () => {
      expect(new PartialMatchRegExp(/(?i:foo)/).features).toContain(
        "modifierGroup"
      );
    });

    it("detects an add-and-remove modifier group, distinct from add-only", () => {
      const features = new PartialMatchRegExp(/(?i-s:foo)/).features;
      expect(features).toContain("modifierGroupWithRemoval");
      expect(features).not.toContain("modifierGroup");
    });

    it("detects a remove-only modifier group as add-and-remove", () => {
      expect(new PartialMatchRegExp(/(?-s:foo)/).features).toContain(
        "modifierGroupWithRemoval"
      );
    });

    it("detects a character class", () => {
      expect(new PartialMatchRegExp(/[a-z]/).features).toContain(
        "characterClass"
      );
    });

    it("detects a nested character class under the v flag", () => {
      expect(new PartialMatchRegExp(/[[a-z]$]/v).features).toContain(
        "nestedCharacterClass"
      );
    });

    it("does not report a nested character class without the v flag", () => {
      expect(new PartialMatchRegExp(/[a-z]/).features).not.toContain(
        "nestedCharacterClass"
      );
    });

    it("detects the && intersection operator under the v flag", () => {
      expect(
        new PartialMatchRegExp(/[\p{Lowercase}&&\p{Script=Greek}]/v).features
      ).toContain("classIntersection");
    });

    it("detects the -- subtraction operator under the v flag", () => {
      expect(
        new PartialMatchRegExp(/[\p{Lowercase}--\p{ASCII}]/v).features
      ).toContain("classSubtraction");
    });

    it("does not mistake a plain range's single - for a subtraction operator", () => {
      expect(new PartialMatchRegExp(/[a-z]/v).features).not.toContain(
        "classSubtraction"
      );
    });

    it("does not mistake an escaped & or - for a set operator", () => {
      const ampersand = new PartialMatchRegExp(/[\&\&]/v).features;
      expect(ampersand).not.toContain("classIntersection");
      const dash = new PartialMatchRegExp(/[\-\-]/v).features;
      expect(dash).not.toContain("classSubtraction");
    });

    it("does not report a set operator without the v flag", () => {
      expect(new PartialMatchRegExp(/[a&&b]/).features).not.toContain(
        "classIntersection"
      );
    });

    it("detects disjunction", () => {
      expect(new PartialMatchRegExp(/foo|bar/).features).toContain(
        "disjunction"
      );
    });

    it("detects quantifiers, both symbolic and bounded", () => {
      expect(new PartialMatchRegExp(/a+/).features).toContain("quantifier");
      expect(new PartialMatchRegExp(/a*/).features).toContain("quantifier");
      expect(new PartialMatchRegExp(/a{2}/).features).toContain("quantifier");
      expect(new PartialMatchRegExp(/a{2,}/).features).toContain("quantifier");
      expect(new PartialMatchRegExp(/a{2,4}/).features).toContain("quantifier");
    });

    it("does not mistake a literal, unclosed { for a quantifier", () => {
      expect(new PartialMatchRegExp(/a{/).features).not.toContain("quantifier");
      expect(new PartialMatchRegExp(/a{2/).features).not.toContain(
        "quantifier"
      );
      expect(new PartialMatchRegExp(/a{2,4/).features).not.toContain(
        "quantifier"
      );
    });

    it("detects a numbered backreference, distinct from a named one", () => {
      const features = new PartialMatchRegExp(/(a)\1/).features;
      expect(features).toContain("backreference");
      expect(features).not.toContain("namedBackreference");
    });

    it("detects a named backreference, distinct from a numbered one", () => {
      const features = new PartialMatchRegExp(/(?<a>x)\k<a>/).features;
      expect(features).toContain("namedBackreference");
      expect(features).not.toContain("backreference");
    });

    it("does not mistake an unresolvable \\k for a backreference", () => {
      const features = new PartialMatchRegExp(/\k/).features;
      expect(features).not.toContain("backreference");
      expect(features).not.toContain("namedBackreference");
    });

    it("detects unicode property escapes under the u/v flags", () => {
      expect(new PartialMatchRegExp(/\p{Letter}/u).features).toContain(
        "unicodePropertyEscape"
      );
    });

    it("does not mistake \\p for a property escape without the u/v flag", () => {
      expect(new PartialMatchRegExp(/\p/).features).not.toContain(
        "unicodePropertyEscape"
      );
    });

    it("detects a control letter escape (\\cX), distinct from controlEscape", () => {
      const features = new PartialMatchRegExp(/\cA/).features;
      expect(features).toContain("controlLetterEscape");
      expect(features).not.toContain("controlEscape");
    });

    it("detects control escapes (\\f\\n\\r\\t\\v), distinct from \\cX", () => {
      for (const source of ["\\f", "\\n", "\\r", "\\t", "\\v"]) {
        const features = new PartialMatchRegExp(new RegExp(source)).features;
        expect(features).toContain("controlEscape");
        expect(features).not.toContain("controlLetterEscape");
        expect(features).not.toContain("otherEscape");
      }
    });

    it("detects a hex escape sequence", () => {
      expect(new PartialMatchRegExp(/\x41/).features).toContain(
        "hexEscapeSequence"
      );
    });

    it("detects a unicode escape sequence", () => {
      const pattern = new RegExp("\\u0041");
      expect(new PartialMatchRegExp(pattern).features).toContain(
        "unicodeEscapeSequence"
      );
    });

    it("detects character class escapes, distinct from other escapes", () => {
      for (const source of ["\\d", "\\D", "\\w", "\\W", "\\s", "\\S"]) {
        const features = new PartialMatchRegExp(new RegExp(source)).features;
        expect(features).toContain("characterClassEscape");
        expect(features).not.toContain("otherEscape");
      }
    });

    it("detects any other escape as otherEscape", () => {
      expect(new PartialMatchRegExp(/\./).features).toContain("otherEscape");
    });

    it("detects a plain literal character", () => {
      expect(new PartialMatchRegExp(/foo/).features).toContain(
        "patternCharacter"
      );
    });

    it("does not mistake escaped, literal lookaround-shaped text for real syntax", () => {
      expect(new PartialMatchRegExp(/\(\?!\)/).features).not.toContain(
        "negativeLookahead"
      );
    });
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags
  describe("supporting flags", () => {
    it("should preserve the flags of the original regex", () => {
      let input = /hello world/dgimsuy;
      let partial = new PartialMatchRegExp(input);
      expect(partial.flags).toEqual(input.flags);

      input = /hello world/dgimsvy;
      partial = new PartialMatchRegExp(input);
      expect(partial.flags).toEqual(input.flags);
    });

    it("should advance lastIndex past the match when the sticky flag is set", () => {
      const partial = new PartialMatchRegExp(/ab/y);
      expect(partial.exec("abcd")).toMatchAt({ match: "ab", index: 0 });
      expect(partial.lastIndex).toBe(2);
    });

    it("should respect an externally set lastIndex when the global flag is set", () => {
      const partial = new PartialMatchRegExp(/ab/g);
      partial.lastIndex = 0;
      expect(partial.exec("abxyab")).toMatchAt({ match: "ab", index: 0 });
      expect(partial.lastIndex).toBe(2);
    });

    it("should respect an externally set lastIndex when the sticky flag is set", () => {
      const partial = new PartialMatchRegExp(/ab/y);
      partial.lastIndex = 4;
      expect(partial.exec("abxyab")).toMatchAt({ match: "ab", index: 4 });
      expect(partial.lastIndex).toBe(6);
    });

    it("should support combining the global and sticky flags", () => {
      const partial = new PartialMatchRegExp(/ab/gy);
      expect(partial.global).toBe(true);
      expect(partial.sticky).toBe(true);
      expect(partial.exec("ab")).toMatchAt({ match: "ab", index: 0 });
    });
  });

  describe("validation via test()", () => {
    it("should return false from test() for a string that is not a viable prefix", () => {
      const partial = new PartialMatchRegExp(/^foo/);
      expect(partial.test("bar")).toBe(false);
      expect(partial.test("xyz")).toBe(false);
    });

    it("should return true from test() for a viable prefix of the pattern", () => {
      const partial = new PartialMatchRegExp(/^foobar/);
      expect(partial.test("f")).toBe(true);
      expect(partial.test("foo")).toBe(true);
      expect(partial.test("foobar")).toBe(true);
    });

    it("should return true from test('') when the original pattern matches empty", () => {
      expect(new PartialMatchRegExp(/^a*/).test("")).toBe(true);
      expect(new PartialMatchRegExp(/^x?$/).test("")).toBe(true);
      expect(new PartialMatchRegExp(/^$/).test("")).toBe(true);
    });
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Literal_character
  describe("literal character expressions", () => {
    const string = "hello world";
    const input = new RegExp(string);
    const partial = new PartialMatchRegExp(input);

    it("should support partial matching of literal character expressions", () => {
      expect(partial).toMatchPartially({ characters: string.split("") });
    });

    it("should support a complete match", () => {
      const result = partial.exec(string);
      expect(result).toMatchAt({ match: string, index: 0 });
    });

    it("should support a complete match with extra literal character content as a suffix", () => {
      const result = partial.exec(string + " more");
      expect(result).toMatchAt({ match: string, index: 0 });
    });

    it("should support a complete match with extra literal character content as a prefix", () => {
      const result = partial.exec("more " + string);
      expect(result).toMatchAt({ match: string, index: "more ".length });
    });

    it("should not match with inputs that are not a prefix of the expression", () => {
      expect(partial.exec("ello world")).toNotMatch();
    });

    it("should support open brace that does not form part of an occurrences quantifier", () => {
      const string = "hello{world";
      const partial = new PartialMatchRegExp(new RegExp(string));
      const result = partial.exec(string);
      expect(result).toMatchAt({ match: string, index: 0 });
    });

    it("should partially match an open brace when an occurrences quantifier appears later", () => {
      const input = /a{b}c{1}/;
      const partial = new PartialMatchRegExp(input);
      expect(partial.exec("a{")).toMatchAt({
        match: "a{",
        index: 0
      });
    });

    it("should support partial matching of grapheme clusters", () => {
      const input = /ásuffix/u;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["a", "́", ..."suffix".split("")]
      });
    });

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Literal_character
    describe("astral plane characters", () => {
      it("should support partial matching of literal astral plane characters in unicode mode (with caveat that surrogate pairs do not match independently)", () => {
        const input = /😀suffix/u;
        const partial = new PartialMatchRegExp(input);
        expect(partial).toMatchPartially({
          characters: ["😀", ..."suffix".split("")] // "😀".length === 2
        });
      });

      it("should support partial matching of literal astral plane characters in unicodeSets mode (with caveat that surrogate pairs do not match independently)", () => {
        const input = /😀suffix/v;
        const partial = new PartialMatchRegExp(input);
        expect(partial).toMatchPartially({
          characters: ["😀", ..."suffix".split("")]
        });
      });

      it("should support partial matching of individual surrogate code units of literal astral plane characters, in non-unicode mode", () => {
        const input = /😀suffix/;
        const partial = new PartialMatchRegExp(input);
        expect(partial).toMatchPartially({
          characters: [..."😀".split(""), ..."suffix".split("")]
        });
      });
    });
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Wildcard
  describe("wildcard expressions", () => {
    it("should support partial matching of wildcards", () => {
      const input = /a.suffix/;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["a", "x", ..."suffix".split("")]
      });

      expect(partial.exec("absuffix")).toMatchAt({
        match: "absuffix",
        index: 0
      });
      expect(partial.exec("a\nsuffix")).toNotMatch();
    });

    it("should support partial matching of utf-16 code units with wildcards, in non-unicode mode", () => {
      const input = /a..suffix/;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["a", ..."😄".split(""), ..."suffix".split("")]
      });

      expect(partial.exec("a😄suffix")).toMatchAt({
        match: "a😄suffix",
        index: 0
      });
    });

    it("should support partial matching of unicode characters with wildcards, in unicode mode", () => {
      const input = /a.suffix/u;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["a", "😄", ..."suffix".split("")]
      });

      expect(partial.exec("a😄suffix")).toMatchAt({
        match: "a😄suffix",
        index: 0
      });
    });
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_escape
  describe("character escape expressions", () => {
    it("should support partial matching of whitespace character escape expressions", () => {
      for (const character of ["\f", "\n", "\r", "\t", "\v"]) {
        const input = new RegExp(character + "+suffix");
        const partial = new PartialMatchRegExp(input);
        expect(partial).toMatchPartially({
          characters: [character, ..."suffix".split("")]
        });
      }
    });

    it("should support partial matching of control character escape expressions", () => {
      const input = /\cj\cMsuffix/;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["\n", "\r", ..."suffix".split("")]
      });
    });

    it("should support partial matching of null character escape expressions", () => {
      const input = /\0suffix/;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["\0", ..."suffix".split("")]
      });
    });

    it("should support partial matching of hexadecimal character escape expressions", () => {
      const input = /\x61\x62\x63suffix/;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["a", "b", "c", ..."suffix".split("")]
      });
    });

    it("should support partial matching of utf-16 character escape expressions", () => {
      const input = /\u0061\u0062\u0063suffix/;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["a", "b", "c", ..."suffix".split("")]
      });
    });

    it("should support partial matching of unicode character escape expressions with braces", () => {
      const input = /\u{2622}suffix/u;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["☢", ..."suffix".split("")]
      });
    });

    it("should support partial matching of astral plane character escape expressions with braces (with caveat that surrogate pairs do not match independently in unicode mode)", () => {
      const input = /\u{1F600}suffix/u;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["😀", ..."suffix".split("")] // "😀".length === 2
      });
    });

    it("should support partial matching of lone unicode property escape expressions", () => {
      const input = /\p{Lowercase_Letter}+suffix/u;
      const partial = new PartialMatchRegExp(input);
      const characters = [...Array<undefined>(26)].map((_, i) =>
        String.fromCharCode(97 + i)
      );
      expect(partial).toMatchPartially({
        characters: [...characters, ..."suffix".split("")]
      });
      expect(partial.exec("A")).toNotMatch();
    });

    it("should support partial matching of negated lone unicode property escape expressions", () => {
      const input = /\P{Uppercase_Letter}+suffix/u;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["1", "a", "c", "-", "å", "ä", "ö", ..."suffix".split("")]
      });
      expect(partial.exec("A")).toNotMatch();
    });

    it("should support partial matching of unicode property escape expressions with key/value", () => {
      const input = /\p{General_Category=Letter}+suffix/u;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["A", "b", "c", "å", "ä", "ö", ..."suffix".split("")]
      });
      expect(partial.exec("1")).toNotMatch();
    });

    it("should support partial matching of negated unicode property escape expressions with key/value", () => {
      const input = /\P{General_Category=Letter}+suffix/u;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["1", "_", "-", "!", "%", ..."suffix".split("")]
      });
      expect(partial.exec("A")).toNotMatch();
    });
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes
  describe("character class expressions", () => {
    [
      {
        input: /[abc]suffix/,
        chars: ["a", "b", "c"]
      },
      {
        input: /[a-c]suffix/,
        chars: ["a", "b", "c"],
        suffix: " including ranges"
      },
      {
        input: /[.]suffix/,
        chars: ["."],
        suffix: " including literal dots"
      },
      {
        input: /[\u2000-\u2002]suffix/,
        chars: ["\u2000", "\u2001", "\u2002"],
        suffix: " including unicode ranges"
      },
      {
        input: /[ab\]]suffix/,
        chars: ["a", "b", "]"],
        suffix: " including escaped square brackets"
      },
      {
        input: /[a[b]suffix/,
        chars: ["a", "[", "b"],
        suffix: " including literal opening brackets, outside unicodeSets mode"
      },
      {
        input: /[ab\\]suffix/,
        chars: ["a", "b", "\\"],
        suffix: " including escaped backslashes"
      },
      {
        input: /[ab\d]suffix/,
        chars: ["a", "b", "1"],
        suffix: " including digit character class escapes"
      },
      {
        input: /[\D]suffix/,
        chars: ["x", "y", "z"],
        suffix: " including non-digit character class escapes"
      },
      {
        input: /[\w]suffix/,
        chars: ["a", "B", "1", "_"],
        suffix: " including word character class escapes"
      },
      {
        input: /[\W]suffix/,
        chars: ["å", "!", "%"],
        suffix: " including non-word character class escapes"
      },
      {
        input: /[\s]suffix/,
        chars: [
          "\f",
          "\n",
          "\r",
          "\t",
          "\v",
          "\u0020",
          "\u00a0",
          "\u1680",
          ...Array.from(Array(11).keys()).map((i: number) =>
            String.fromCharCode(0x2000 + i)
          ),
          "\u2028",
          "\u2029",
          "\u202f",
          "\u205f",
          "\u3000",
          "\ufeff"
        ],
        suffix: " including whitespace character class escapes"
      },
      {
        input: /[\S]suffix/,
        chars: ["å", "!", "%"],
        suffix: " including non-whitespace character class escapes"
      },
      {
        input: /[ab\t]suffix/,
        chars: ["a", "b", "\t"],
        suffix: " including horizontal tabs"
      },
      {
        input: /[ab\r]suffix/,
        chars: ["a", "b", "\r"],
        suffix: " including carriage returns"
      },
      {
        input: /[ab\n]suffix/,
        chars: ["a", "b", "\n"],
        suffix: " including linefeeds"
      },
      {
        input: /[ab\v]suffix/,
        chars: ["a", "b", "\v"],
        suffix: " including vertical tabs"
      },
      {
        input: /[ab\f]suffix/,
        chars: ["a", "b", "\f"],
        suffix: " including form-feeds"
      },
      {
        input: /[ab\b]suffix/,
        chars: ["a", "b", "\b"],
        suffix: " including backspaces"
      },
      {
        input: /[ab\0]suffix/,
        chars: ["a", "b", "\0"],
        suffix: " including null characters"
      },
      {
        input: /[ab\cM\cj]suffix/,
        chars: ["a", "b", "\r", "\n"],
        suffix:
          " including control character escapes expressed using caret notation"
      },
      {
        input: /[\x61\x62\x63]suffix/,
        chars: ["a", "b", "c"],
        suffix: " including characters expressed using two hexadecimal digits"
      },
      {
        input: /[\u0061\u0062\u0063]suffix/,
        chars: ["a", "b", "c"],
        suffix:
          " including utf-16 characters expressed using four hexadecimal digits"
      },
      {
        input: /[ab\u2622]suffix/,
        chars: ["a", "b", "☢"],
        suffix:
          " including emoji characters expressed using four hexadecimal digits"
      },
      {
        input: /[ab/\u{2622}]suffix/u,
        chars: ["a", "b", "☢"],
        suffix:
          " including characters expressed using four hexadecimal digits, braced, in unicode mode"
      },
      {
        input: /[\uD800-\uDBFF][\uDC00-\uDFFF]suffix/,
        chars: ["😄", "😑", "😛"],
        suffix:
          " including astral plane characters expressed using surrogate pair ranges"
      },
      {
        input: /[ab\u{1F600}]suffix/u,
        chars: ["a", "b", "😀"],
        suffix:
          " including characters expressed using five hexadecimal digits, braced, in unicode mode"
      },
      {
        input: /[a😑c]suffix/u,
        chars: ["a", "😑", "c"],
        suffix: " including astral plane characters, in unicode mode"
      },
      {
        input: /[😄-😛]suffix/u,
        chars: ["😄", "😑", "😛"],
        suffix: " including astral plane ranges, in unicode mode"
      },
      {
        input: /[1\p{Lowercase_Letter}2]suffix/u,
        chars: ["1", "a", "b", "c", "2"],
        suffix: " including lone property unicode character class escapes"
      },
      {
        input: /[1\P{Lowercase_Letter}2]suffix/u,
        chars: ["1", "A", "-", "*", "2"],
        suffix:
          " including negated lone property unicode character class escapes"
      },
      {
        input: /[1\p{General_Category=Letter}2]suffix/u,
        chars: ["1", "a", "b", "c", "2"],
        suffix: " including key/value unicode character class escapes"
      },
      {
        input: /[1\P{General_Category=Letter}2]suffix/u,
        chars: ["1", "$", "7", "*", "2"],
        suffix: " including negated key/value unicode character class escapes"
      },
      {
        input: /[a-cx-z]suffix/,
        chars: ["a", "b", "c", "x", "y", "z"],
        suffix: " including multiple ranges"
      },
      {
        input: /[a-c\dX-Z]suffix/,
        chars: ["a", "b", "c", "1", "X", "Y", "Z"],
        suffix: " including multiple ranges and escapes"
      },
      {
        input: /[^b-d]suffix/,
        chars: ["a", "e", "1", "%"],
        suffix: " including negated character classes"
      },
      {
        input: /[a\-c]suffix/,
        chars: ["a", "-", "c"],
        suffix: " including literal hyphens when escaped"
      },
      {
        input: /[ac-]suffix/,
        chars: ["a", "-", "c"],
        suffix: " including literal hyphens when at the end of the class"
      },
      {
        input: /[-ac]suffix/,
        chars: ["a", "-", "c"],
        suffix: " including literal hyphens when at the start of the class"
      },
      {
        input: /[--1]suffix/,
        chars: ["-", "0", "1"],
        suffix:
          " including literal hyphens when at the start of the class and as a range separator"
      },
      {
        input: /[a-c]suffix/i,
        chars: ["A", "B", "C"],
        suffix: " with ignore case flag"
      },
      {
        input: /[áàâäãåā]suffix/i,
        chars: ["Á", "À", "Â", "Ä", "Ã", "Å", "Ā"],
        suffix: " with ignore case flag and accented characters"
      }
    ].forEach(({ input, chars, suffix }) => {
      it(`should support partial matching of character class expressions${
        suffix ?? ""
      }`, () => {
        const partial = new PartialMatchRegExp(input);
        for (const char of chars) {
          const result = partial.exec(char + "suf");
          expect(result).toMatchAt({ match: char + "suf", index: 0 });
        }
      });
    });

    it("should not match with characters outside of the class expression", () => {
      const input = /[a-c]suffix/;
      const partial = new PartialMatchRegExp(input);
      expect(partial.exec("dsuf")).toNotMatch();
    });

    it("should end the class at the first unescaped closing bracket outside unicodeSets mode, treating subsequent brackets as literal characters", () => {
      const input = /[a[b]c]/;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["a", "c", "]"]
      });
      expect(partial.exec("ac]")).toMatchAt({ match: "ac]", index: 0 });
      expect(partial.exec("bc]")).toMatchAt({ match: "bc]", index: 0 });
      expect(partial.exec("[c]")).toMatchAt({ match: "[c]", index: 0 });
    });
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Disjunction
  describe("disjunctions", () => {
    it("should support partial matching of disjunctions", () => {
      const input = /cat|dog/;
      const partial = new PartialMatchRegExp(input);

      expect(partial).toMatchPartially({ characters: "cat".split("") });
      expect(partial).toMatchPartially({ characters: "dog".split("") });
    });
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Quantifiers
  describe("quantifiers", () => {
    [
      {
        name: "zero-or-more greedy quantifiers",
        input: /ab*c/,
        testStrings: ["a", "ab", "abc", "abbc", "ac"]
      },
      {
        name: "zero-or-more non-greedy quantifiers",
        input: /ab*?c/,
        testStrings: ["a", "ab", "abc", "abbc", "ac"]
      },
      {
        name: "one-or-more greedy quantifiers",
        input: /ab+c/,
        testStrings: ["ab", "abc", "abbc", "abbbc"]
      },
      {
        name: "one-or-more non greedy quantifiers",
        input: /ab+?c/,
        testStrings: ["ab", "abc", "abbc", "abbbc"]
      },
      {
        name: "optional quantifiers",
        input: /ab?c/,
        testStrings: ["a", "ab", "ac", "abc"]
      },
      {
        name: "exactly-n quantifiers (greedy, but non-greedy irrelevant - see https://github.com/mdn/content/issues/42270)",
        input: /ab{2}c/,
        testStrings: ["ab", "abb", "abbc"],
        negativeCase: "abc"
      },
      {
        name: "exactly-n quantifiers with prior opening braces",
        input: /a{c{1}d/,
        testStrings: ["a", "a{", "a{c", "a{cd"],
        negativeCase: "a{ccd"
      },
      {
        name: "more-than-n greedy quantifiers",
        input: /ab{2,}c/,
        testStrings: ["ab", "abb", "abbbc"],
        negativeCase: "abc"
      },
      {
        name: "more-than-n greedy quantifiers with prior opening braces",
        input: /a{c{2,}d/,
        testStrings: ["a", "a{", "a{c", "a{cc", "a{ccc"],
        negativeCase: "a{cd"
      },
      {
        name: "more-than-n non-greedy quantifiers",
        input: /ab{2,}?c/,
        testStrings: ["ab", "abb", "abbbc"],
        negativeCase: "abc"
      },
      {
        name: "more-than-n non-greedy quantifiers with prior opening braces",
        input: /a{c{2,}?d/,
        testStrings: ["a", "a{", "a{c", "a{cc", "a{ccd"],
        negativeCase: "a{cd"
      },
      {
        name: "between-n-and-m greedy quantifiers",
        input: /a.{2,4}b/,
        testStrings: ["a", "aX", "aXX", "aXXX", "aXXXX", "aXXXXb"],
        negativeCase: "aXXXXXb"
      },
      {
        name: "between-n-and-m greedy quantifiers with prior opening braces",
        input: /a{c{1,2}d/,
        testStrings: ["a", "a{", "a{c", "a{cc", "a{ccd"],
        negativeCase: "a{ccc"
      },
      {
        name: "between-n-and-m non-greedy quantifiers",
        input: /a.{2,4}?b/,
        testStrings: ["a", "aX", "aXX", "aXXX", "aXXXX", "aXXXXb"],
        negativeCase: "aXXXXXb"
      },
      {
        name: "between-n-and-m non-greedy quantifiers with prior opening braces",
        input: /a{c{1,2}?d/,
        testStrings: ["a", "a{", "a{c", "a{cc", "a{ccd"],
        negativeCase: "a{cccd"
      }
    ].forEach(({ name, input, testStrings, negativeCase }) => {
      it(`should support partial matching of patterns with ${name}`, () => {
        const partial = new PartialMatchRegExp(input);
        for (const testString of testStrings) {
          const result = partial.exec(testString);
          expect(result).toMatchAt({ match: testString, index: 0 });
        }
        if (negativeCase) {
          expect(partial.exec(negativeCase)).toNotMatch();
        }
      });
    });
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets
  describe("unicode sets (extending features)", () => {
    it("should support partial matching of unicode set expressions", () => {
      const input = /[\p{Alphabetic}]+suffix/v;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["a", "あ", "c", ..."suffix".split("")]
      });
      expect(partial.exec("1")).toNotMatch();
    });

    it("should support partial matching of grapheme clusters / string properties (with caveat that individual code points do not match independently)", () => {
      const input = /[\p{RGI_Emoji_Flag_Sequence}]suffix/v;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["🇺🇳", ..."suffix".split("")] // "🇺🇳".length === 4
      });
      expect(partial.exec("A")).toNotMatch();
    });

    it("should support partial matching of grapheme clusters / string properties including string subtraction (with caveat that individual code points do not match independently)", () => {
      const input = /[\p{RGI_Emoji_Flag_Sequence}--\q{🇺🇸|🇷🇺}]suffix/v;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["🇺🇦", ..."suffix".split("")] // "🇺🇦".length === 4
      });
      expect(partial.exec("🇺🇸")).toNotMatch();
      expect(partial.exec("🇷🇺")).toNotMatch();
    });

    it("should support partial matching of unicode set expressions using key/value syntax", () => {
      const input = /[\p{Script=Hiragana}]+suffix/v;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["あ", "い", "う", ..."suffix".split("")]
      });
      expect(partial.exec("A")).toNotMatch();
    });

    it("should support partial matching of negated unicode set expressions", () => {
      const input = /[\P{Script=Hiragana}]+suffix/v;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["A", "b", "1", "_", "å", "ä", "ö", ..."suffix".split("")]
      });
      expect(partial.exec("あ")).toNotMatch();
    });

    it("should support partial matching of negated unicode set expressions using complement syntax", () => {
      const input = /[^\p{Script=Hiragana}]+suffix/v;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["A", "b", "1", "_", "å", "ä", "ö", ..."suffix".split("")]
      });
      expect(partial.exec("あ")).toNotMatch();
    });

    it("should support empty sets as a non-match in unicode set character class expressions", () => {
      const input = /[[]]suffix/v;
      const partial = new PartialMatchRegExp(input);
      const result = partial.exec("a");
      expect(result).toNotMatch();
    });

    it("should support partial matching of negated empty sets in unicode set character class expressions", () => {
      const input = /[^]+suffix/v;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["A", "b", "1", "-", "ä", "π", "α", ..."suffix".split("")]
      });
    });

    it("should support partial matching of subtraction in unicode set character class expressions", () => {
      const input = /[\p{Script_Extensions=Greek}--π]+suffix/v;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["α", "β", "γ", "δ", "ε", ..."suffix".split("")]
      });
      expect(partial.exec("π")).toNotMatch();
    });

    it("should support partial matching of intersection in unicode set character class expressions", () => {
      const input = /[\p{Script_Extensions=Greek}&&[αβγδε]]+suffix/v;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["α", "β", "γ", "δ", "ε", ..."suffix".split("")]
      });
    });

    it("should support partial matching of union in unicode set character class expressions", () => {
      const input = /[[\p{Script_Extensions=Greek}][xyz]]+suffix/v;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["α", "γ", "δ", "ε", "x", "y", "z", ..."suffix".split("")]
      });
    });

    it("should support partial matching of negated subtraction in unicode set character class expressions", () => {
      const input = /[^\p{Script_Extensions=Greek}--π]+suffix/v;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["A", "b", "1", "_", "ä", "ö", "π", ..."suffix".split("")]
      });
      expect(partial.exec("α")).toNotMatch();
    });

    it("should support partial matching of nested subtraction in unicode set character class expressions", () => {
      const input = /[\p{Script_Extensions=Greek}--[αβγ]]+suffix/v;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["δ", "ε", "ζ", "η", "θ", ..."suffix".split("")]
      });
    });

    it("should support partial matching of negated nested subtraction in unicode set character class expressions", () => {
      const input = /[^\p{Script_Extensions=Greek}--[αβγ]]+suffix/v;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["A", "b", "ä", "ö", "α", "γ", ..."suffix".split("")]
      });
      expect(partial.exec("δ")).toNotMatch();
    });

    it("should support partial matching of multiple nested subtraction in unicode set character class expressions", () => {
      const input = /^[[a-z]--[[aeiou]--[eo]]]+suffix/v; // i.e., [[a-z]--[[aeiou]--[eo]]] = [[a-z]--[aiu]] = [b-hj-tv-z]
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["b", "c", "g", "h", "j", "k", ..."suffix".split("")]
      });
      expect(partial).toNotMatchPartially({
        characters: ["a", "i", "u", ..."suffix".split("")]
      });
    });

    it("should support partial matching of subtraction with property escapes in unicode set character class expressions", () => {
      const input = /^[\p{General_Category=Letter}--\p{Script=Greek}]+suffix/v;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["A", "b", "c", "å", "ä", "ö", ..."suffix".split("")]
      });
      expect(partial).toNotMatchPartially({
        characters: ["α", "β", "γ", "δ", "ε", ..."suffix".split("")]
      });
    });

    it("should support partial matching of nested subtraction resulting in empty set in unicode set character class expressions", () => {
      const input = /^[[a-z]--[[[aeiou]--[aeiou]]--[]]]+suffix/v; // i.e., [[a-z]--[[[aeiou]--[aeiou]]--[]]] = [[a-z]--[[]]] = [a-z]
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["a", "b", "c", "d", "e", "f", "g", ..."suffix".split("")]
      });
      expect(partial).toNotMatchPartially({
        characters: ["[", "]", ..."suffix".split("")]
      });
    });

    it("should support partial matching of subtraction in unicode set character class expressions with escaped brackets", () => {
      const input = /^[[\[\]a-z]--[[\[]--[\[]]]suffix/v; // i.e., [[\[\]a-z]--[[\[]--[\[]]] = [[\[\]a-z]--[]] = [\[\]a-z]
      const partial = new PartialMatchRegExp(input);
      for (const character of ["[", "]", "a", "b", "c", "d", "e", "f", "g"]) {
        expect(partial).toMatchPartially({
          characters: [character, ..."suffix".split("")]
        });
      }
    });

    it("should support partial matching of property subtraction in unicode set character class expressions", () => {
      const input = /^[[\p{Letter}]--[\p{Mark}]]+suffix/v;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["A", "é", "Ω", "Ж", "中", ..."suffix".split("")]
      });
      expect(partial).toNotMatchPartially({
        characters: ["́", "̀", "̂", "̃", "̄", ..."suffix".split("")]
      });
    });

    it("should support partial matching of doubly-nested property subtraction in unicode set character class expressions", () => {
      const input = /^[[\p{Letter}]--[[\p{Script=Latin}]--[aeiou]]]+suffix/v;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["a", "e", "Ω", "Ж", "中", ..."suffix".split("")]
      });
      expect(partial).toNotMatchPartially({
        characters: ["b", "c", "z", ..."suffix".split("")]
      });
    });

    it("should support partial matching of triply-nested property subtraction with pathological overlapping subtraction in unicode set character class expressions", () => {
      const input =
        /^[[\p{Alphabetic}]--[[\p{Letter}]--[\p{Uppercase}]]]+suffix/v;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["A", "Z", "Ω", "Ж", ..."suffix".split("")]
      });
      expect(partial).toNotMatchPartially({
        characters: ["a", "z", "β", ..."suffix".split("")]
      });
    });

    it("should support numeric properties with nested subtraction in unicode set character class expressions", () => {
      const input = /^[[\p{Number}]--[[\p{Decimal_Number}]--[0-9]]]+suffix/v; //
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["Ⅷ", "Ⅸ", "Ⅰ", "½", "0", "9", ..."suffix".split("")]
      });
      expect(partial).toNotMatchPartially({
        characters: ["६", "৭", "𑜹", ..."suffix".split("")]
      });
    });

    it("should support partial matching of emoji property with nested subtraction in unicode set character class expressions", () => {
      const input =
        /^[[\p{Emoji}]--[[\p{Emoji_Presentation}]--[😀😃😄]]]+suffix/v;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["⚙", "✂", "😀", ..."suffix".split("")]
      });
      expect(partial).toNotMatchPartially({
        characters: ["💀", "💣", ..."suffix".split("")]
      });
    });

    it("should support partial matching of deeply-nested property subtraction in unicode set character class expressions", () => {
      const input =
        /^[[[[[[\p{Letter}]]]]--[[[[[aeiou]]]]--[[[ei]]]]]]+suffix/v; // i.e., [[[[[[\p{Letter}]]]]--[[[[[aeiou]]]]--[[[ei]]]]]] = [[[[[\p{Letter}]]]]--[[[aou]]]] = [[[ \p{Letter}]]--[aou]] = [\p{Letter}--[aou]]
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["A", "b", "f", "g", "h", "e", "i", ..."suffix".split("")]
      });
      expect(partial).toNotMatchPartially({
        characters: ["a", "o", "u", ..."suffix".split("")]
      });
    });
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Modifier
  describe("modifiers", () => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/ignoreCase
    it("should support partial matching of patterns with a case-insensitive modifier", () => {
      const input = /(?i:abc)suffix/;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["A", "b", "C", ..."suffix".split("")]
      });
      expect(partial.exec("ABCs")).toMatchAt({ match: "ABCs", index: 0 });
      expect(partial.exec("ABCs")).not.toMatchAt({ match: "ABCS", index: 0 });
    });

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/dotAll
    it("should support partial matching of patterns with a dot-all modifier", () => {
      const input = /(?s:a.c)suf.ix/;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["a", "\n", "c", ..."suffix".split("")]
      });
      expect(
        partial.exec(`a
csuffix`)
      ).toMatchAt({
        match: `a
csuffix`,
        index: 0
      });
      expect(
        partial.exec(`abcsuf
ix`)
      ).not.toMatchAt({
        match: `abcsuf
ix`,
        index: 0
      });
    });

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/multiline
    it("should support partial matching of patterns with a multiline modifier", () => {
      const input = /(?m:^abc$)\nsuffix/;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["a", "b", "c", "\n", ..."suffix".split("")]
      });
    });

    it("should not treat a coincidental line boundary as end-of-input inside a multiline modifier group, even without a top-level multiline flag", () => {
      const input = /(?m:^foobar)/;
      const partial = new PartialMatchRegExp(input);
      expect(partial.exec("foo\nbaz")).toNotMatch();
      expect(partial.exec("foobar")).toMatchAt({ match: "foobar", index: 0 });
    });

    it("should support partial matching of patterns with multiple modifiers", () => {
      const input = /(?ism:^a.c$)\nsuffix/;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["A", "\n", "C", "\n", ..."suffix".split("")]
      });
      expect(partial.exec(`ABC\nS`)).not.toMatchAt({
        match: "ABC\nS",
        index: 0
      }); // s not modified to case-insensitive
      expect(
        new PartialMatchRegExp(/(?ism:^abc$).suffix/).exec(`ABC\nS`)
      ).not.toMatchAt({ match: "ABC\nS", index: 0 }); // . not modified to match newlines
      expect(
        new PartialMatchRegExp(/(?ism:^abc$)\n^suffix/).exec(`ABC\nS`)
      ).not.toMatchAt({ match: "ABC\ns", index: 0 }); // ^ not modified to multiline
    });

    it("should support partial matching of patterns with a negating case insensitive modifier", () => {
      const input = /(?-i:abc)suffix/i;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["a", "b", "c", ..."SuFfIx".split("")]
      });
      expect(partial.exec("A")).toNotMatch();
    });

    it("should support partial matching of patterns with a negating dot-all modifier", () => {
      const input = /(?-s:a.c)suffix/s;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["a", "b", "c", ..."suffix".split("")]
      });
      expect(
        partial.exec(`a
c`)
      ).toNotMatch();
    });

    it("should prevent partial matching of patterns with a negating multiline modifier", () => {
      const input = /\n(?-m:^abc$)\nsuffix/m;
      const partial = new PartialMatchRegExp(input);
      expect(partial.exec(`\nabc\nsuffix`)).toNotMatch();
    });

    it("should support partial matching of patterns with multiple negating modifiers", () => {
      const input = /(?-ism:^a.c$)\nsuffix/;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["a", "b", "c"]
      });
      expect(partial.exec(`abc\n`)).toNotMatch(); // multiline disabled
      expect(partial.exec(`Abc`)).toNotMatch(); // case-insensitive disabled
      expect(partial.exec(`a\nc`)).toNotMatch(); // dot-all disabled
    });

    it("should support partial matching of patterns with positive and negative modifiers combined", () => {
      const input = /(?i-s:a.c)suffix/;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["A", "b", "C", ..."suffix".split("")]
      });
      expect(partial.exec(`A\nC`)).toNotMatch(); // dot-all disabled
    });

    it("should support partial matching of patterns with multiple positive and negative modifiers combined", () => {
      const input = /(?im-s:^a.c$)\nsuffix/;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["A", "b", "C", "\n", ..."suffix".split("")]
      });
      expect(partial.exec(`ABC\nsuffix`)).toMatchAt({
        match: "ABC\nsuffix",
        index: 0
      });
      expect(partial.exec(`A\nC`)).toNotMatch(); // dot-all disabled
    });
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Groups_and_backreferences
  describe("groups", () => {
    [
      {
        name: "groups",
        input: /(ab)c/,
        testStrings: ["a", "ab", "abc"],
        expected: (str: string) => ({ 0: str, 1: str.slice(0, 2) })
      },
      {
        name: "groups with disjunctions",
        input: /(ab|cd)e/,
        testStrings: ["a", "ab", "c", "cd", "abe", "cde"],
        expected: (str: string) => ({ 0: str, 1: str.slice(0, 2) })
      },
      {
        name: "multiple groups",
        input: /(ab)(cd)e/,
        testStrings: ["a", "ab", "abc", "abcd", "abcde"],
        expected: (str: string) => ({
          0: str,
          1: str.slice(0, 2),
          2: str.slice(2, 4)
        })
      },
      {
        name: "nested groups",
        input: /(ab(cd)e)f/,
        testStrings: ["a", "ab", "abc", "abcd", "abcde", "abcdef"],
        expected: (str: string) => ({
          0: str,
          1: str.slice(0, 5),
          2: str.slice(2, 4)
        })
      },
      {
        name: "non-capturing groups",
        input: /(?:ab)c/,
        testStrings: ["a", "ab", "abc"],
        expected: (str: string) => ({ 0: str }),
        expectedNotToHave: { 1: expect.anything() as string }
      },
      {
        name: "nested non-capturing groups (non-match nested)",
        input: /(ab(?:cd)e)f/,
        testStrings: ["a", "ab", "abc", "abcd", "abcde", "abcdef"],
        expected: (str: string) => ({ 0: str, 1: str.slice(0, 5) }),
        expectedNotToHave: { 2: expect.anything() as string }
      },
      {
        name: "nested non-capturing groups (non-match outer)",
        input: /(?:ab(cd)e)f/,
        testStrings: ["a", "ab", "abc", "abcd", "abcde", "abcdef"],
        expected: (str: string) => ({ 0: str, 1: str.slice(2, 4) }),
        notExpected: { 2: expect.anything() as string }
      },
      {
        name: "named capturing groups",
        input: /(?<first>ab)c/,
        testStrings: ["a", "ab", "abc"],
        expected: (str: string) => ({
          0: str,
          groups: { first: str.slice(0, 2) }
        })
      },
      {
        name: "nested named capturing groups",
        input: /(?<outer>ab(?<inner>cd)e)f/,
        testStrings: ["a", "ab", "abc", "abcd", "abcde", "abcdef"],
        expected: (str: string) => ({
          0: str,
          groups: {
            outer: str.slice(0, 5),
            inner: str.slice(2, 4)
          }
        })
      },
      {
        name: "named and non-capturing groups",
        input: /(?<named>ab(?:cd)e)f/,
        testStrings: ["a", "ab", "abc", "abcd", "abcde", "abcdef"],
        expected: (str: string) => ({
          0: str,
          groups: { named: str.slice(0, 5) }
        }),
        expectedNotToHave: { 2: expect.anything() as string }
      },
      {
        name: "groups with indices",
        input: /(ab)c/d,
        testStrings: ["a", "ab", "abc"],
        expected: (str: string) => ({
          0: str,
          indices: { 0: [0, str.length], 1: [0, Math.min(2, str.length)] }
        })
      },
      {
        name: "named groups with indices",
        input: /(?<first>ab)c/d,
        testStrings: ["a", "ab", "abc"],
        expected: (str: string) => ({
          0: str,
          1: str.slice(0, 2),
          indices: {
            0: [0, str.length],
            1: [0, Math.min(2, str.length)],
            groups: {
              first: [0, Math.min(2, str.length)]
            }
          },
          groups: {
            first: str.slice(0, 2)
          }
        })
      }
    ].forEach(({ name, input, testStrings, expected, notExpected }) => {
      it(`should support partial matching of ${name}`, () => {
        const partial = new PartialMatchRegExp(input);
        for (const testString of testStrings) {
          const result = partial.exec(testString);
          expect(result).toMatchAt({ match: testString, index: 0 });
          expect(result).toMatchObject(expected(testString));
          if (notExpected) {
            expect(result).not.toMatchObject(notExpected);
          }
        }
      });
    });
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookahead_assertion
  describe("lookahead assertions", () => {
    it("should support partial matching of positive lookahead assertions", () => {
      const input = /foo(?=bar)/;
      const partial = new PartialMatchRegExp(input);
      const string = "foobar";

      for (let i = 1; i < string.length; i++) {
        const partialString = string.slice(0, i);
        const result = partial.exec(partialString);
        expect(result).toMatchAt({
          match: partialString.slice(0, 3),
          index: 0
        });
      }
    });

    it("should support partial matching of negative lookahead assertions", () => {
      const input = /foo(?!bar)/;
      const partial = new PartialMatchRegExp(input);
      const string = "foobaz";

      for (let i = 1; i < string.length; i++) {
        const partialString = string.slice(0, i);
        const result = partial.exec(partialString);
        expect(result).toMatchAt({
          match: partialString.slice(0, 3),
          index: 0
        });
      }

      expect(partial.exec("foobar")).toNotMatch();
    });

    it("should support partial matching of positive lookbehind assertions (with caveat that the lookbehind is not partially matched whilst forming)", () => {
      const input = /(?<=foo)bar/;
      const partial = new PartialMatchRegExp(input);
      const string = "fooba";

      for (let i = 3; i < string.length; i++) {
        const partialString = string.slice(0, i);
        const result = partial.exec(partialString);
        expect(result).toMatchAt({ match: partialString.slice(3), index: 3 });
      }
    });

    it("should support partial matching of negative lookbehind assertions", () => {
      const input = /(?<!foo)bar/;
      const partial = new PartialMatchRegExp(input);

      expect(partial).toMatchPartially({ characters: "ba".split("") });

      expect(partial.exec("fo")).toNotMatch();
      expect(partial.exec("foo")).toNotMatch();
      expect(partial.exec("foob")).toNotMatch();
    });

    it("should support partial matching of lookbehind assertions with lookahead assertions (with caveat that the lookbehind is not partially matched whilst forming)", () => {
      const input = /(?<=foo)bar(?=baz)/;
      const partial = new PartialMatchRegExp(input);
      const string = "foobarba";

      for (let i = 3; i < string.length; i++) {
        const partialString = string.slice(0, i);
        const result = partial.exec(partialString);
        expect(result).toMatchAt({
          match: partialString.slice(3, 6),
          index: 3
        });
      }
    });

    it("should support partial matching of positive and negative lookahead assertions", () => {
      const input = /(?!.*#)(?=.*:)foo/;
      const partial = new PartialMatchRegExp(input);
      const testStrings = ["foobar", "foob:"];

      for (const string of testStrings) {
        for (let i = 1; i < string.length; i++) {
          const partialString = string.slice(0, i);
          const result = partial.exec(partialString);
          expect(result).toMatchAt({
            match: partialString.slice(0, 3),
            index: 0
          });
        }
      }

      expect(partial.exec("foob:#")).toNotMatch();
    });

    it("should support variable length lookbehind assertions", () => {
      const input = /(?<=([ab]+)([bc]+))suffix/;
      const partial = new PartialMatchRegExp(input);
      const string = "abcsuffix";
      for (let i = 2; i < string.length; i++) {
        const partialString = string.slice(0, i);
        const result = partial.exec(partialString);
        expect(result).toMatchObject({
          0: partialString.slice(3),
          1: "a",
          2: partialString.slice(1, 3)
        });
      }
    });

    it("should support nested lookahead assertions", () => {
      const input = /(?=(?:foo\w*(?=:A)|bar\w*(?=:B)))(?:foo\w*|bar\w*)/;
      const partial = new PartialMatchRegExp(input);
      const testStrings = ["fooXY:A", "barXYZ:B"];

      for (const string of testStrings) {
        for (let i = 1; i < string.length; i++) {
          const partialString = string.slice(0, i);
          const result = partial.exec(partialString);
          expect(result).toMatchAt({
            match: partialString.slice(0, string.indexOf(":")),
            index: 0
          });
        }
      }
    });
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Input_boundary_assertion
  describe("input boundary assertions", () => {
    it("should support partial matching of start-of-input assertions", () => {
      const input = /^foo/;
      const partial = new PartialMatchRegExp(input);

      expect(partial).toMatchPartially({ characters: "foo".split("") });

      expect(partial.exec(" foo")).toNotMatch();
    });

    it("should support partial matching of end-of-input assertions", () => {
      const input = /foo$/;
      const partial = new PartialMatchRegExp(input);

      expect(partial).toMatchPartially({ characters: "foo".split("") });

      expect(partial.exec("foo ")).toNotMatch();
    });

    it("should support a bare end-of-input assertion, matching at the end of any string", () => {
      const partial = new PartialMatchRegExp(/$/);
      expect(partial.exec("abc")).toMatchAt({ match: "", index: 3 });
      expect(partial.exec("a")).toMatchAt({ match: "", index: 1 });
      expect(partial.exec("")).toMatchAt({ match: "", index: 0 });
    });

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/multiline
    describe("multiline mode", () => {
      it("should support a bare end-of-input assertion at a line boundary in multiline mode", () => {
        const partial = new PartialMatchRegExp(/$/m);
        expect(partial.exec("abc\n")).toMatchAt({ match: "", index: 3 });
      });

      it("should not treat a coincidental line boundary as end-of-input when the pattern has no assertion there", () => {
        const partial = new PartialMatchRegExp(/^foobar/m);
        expect(partial.exec("foo\nbaz")).toNotMatch();
        expect(partial.exec("foo")).toMatchAt({ match: "foo", index: 0 });
        expect(partial.exec("foobar")).toMatchAt({ match: "foobar", index: 0 });
      });

      it("should support partial matching of lines in multiline mode", () => {
        const input = /^foo$/gm;
        const partial = new PartialMatchRegExp(input);
        const string = "foo\nfoo";

        for (let i = 1; i < string.length; i++) {
          const partialString = string.slice(0, i);
          const result = partial.exec(partialString);
          expect(result).toMatchAt({
            match: partialString.slice(0, 3), // always matches up to "foo", stripping newline, before wrapping to next line
            index: 0
          });
          partial.lastIndex = 0;
        }
      });

      it("should support partial matching of lines in multiline mode with dotAll flag", () => {
        const input = /^f.o$/gms;
        const partial = new PartialMatchRegExp(input);
        const string = "f\no\nf\no";

        for (let i = 1; i < string.length; i++) {
          const partialString = string.slice(0, i);
          const result = partial.exec(partialString);
          expect(result).toMatchAt({
            match: partialString.slice(0, 3), // matches the available prefix up to "f\no" without consuming the following line terminator
            index: 0
          });
          partial.lastIndex = 0;
        }
      });

      it("should support matching an unanchored pattern wherever its literal text occurs, unaffected by line boundaries", () => {
        const pattern = new PartialMatchRegExp(/foo/m);
        expect(pattern.test("f")).toBe(true);
        expect(pattern.test("fo")).toBe(true);
        expect(pattern.test("foo")).toBe(true);
      });
    });
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Word_boundary_assertion
  describe("word boundary assertions", () => {
    it("should support partial matching of word boundary assertions", () => {
      const input = /\bfoo\b/;
      const partial = new PartialMatchRegExp(input);

      expect(partial).toMatchPartially({ characters: "foo".split("") });

      expect(partial.exec(" foo")).toMatchAt({ match: "foo", index: 1 });
      expect(partial.exec("foo ")).toMatchAt({ match: "foo", index: 0 });
      expect(partial.exec("xfoo")).toNotMatch();
      expect(partial.exec("foox")).toNotMatch();
    });

    it("should support partial matching of non-word boundary assertions", () => {
      const input = /\Bfoo\B/;
      const partial = new PartialMatchRegExp(input);
      const string = "xfooy";

      for (let i = 1; i < string.length; i++) {
        const partialString = string.slice(0, i);
        const result = partial.exec(partialString);
        expect(result).toMatchAt({ match: partialString.slice(1), index: 1 });
      }

      expect(partial.exec("xfooy")).toMatchAt({ match: "foo", index: 1 });
      expect(partial.exec(" foo ")).toNotMatch();
    });
  });

  describe("parity with reference implementations", () => {
    // Apache Lucene TestRegExp.java — testRegExpNoStackOverflow
    // Lucene verifies its automaton builder does not stack-overflow on very deeply nested patterns.
    describe("deep nesting safety (Lucene-inspired)", () => {
      it("should not throw on a high-count top-level alternation (wide pattern)", () => {
        const width = 1000;
        const pattern = new RegExp(
          Array(width).fill("(?:a)").join("|") + "|(?:b)"
        );
        const partial = new PartialMatchRegExp(pattern);
        expect(() => partial.exec("a")).not.toThrow();
        expect(() => partial.exec("b")).not.toThrow();
        expect(() => partial.exec("z")).not.toThrow();
      });

      it("should not throw on deeply nested non-capturing groups", () => {
        const depth = 100;
        const pattern = new RegExp(
          "(?:".repeat(depth) + "a" + ")".repeat(depth) + "suffix"
        );
        const partial = new PartialMatchRegExp(pattern);
        expect(() => partial.exec("a")).not.toThrow();
        expect(() => partial.exec("asuffix")).not.toThrow();
      });
    });

    // Apache Lucene TestRegExp.java — testRepeatWithEmptyString
    // Lucene tests quantifiers whose subpatterns can match an empty string (e.g. [^y]*{1,2}).
    describe("quantifiers over empty-matching subpatterns (Lucene-inspired)", () => {
      it("should support patterns where the quantified atom matches zero characters (a*suffix)", () => {
        const partial = new PartialMatchRegExp(/a*suffix/);
        // zero repetitions of "a" — falls through directly to "suffix"
        expect(partial.exec("s")).toMatchAt({ match: "s", index: 0 });
        expect(partial.exec("suffix")).toMatchAt({ match: "suffix", index: 0 });
        expect(partial.exec("asuffix")).toMatchAt({
          match: "asuffix",
          index: 0
        });
        expect(partial.exec("aas")).toMatchAt({ match: "aas", index: 0 });
      });

      it("should support optional (?) quantifier where the atom matches zero characters", () => {
        const partial = new PartialMatchRegExp(/a?suffix/);
        expect(partial.exec("s")).toMatchAt({ match: "s", index: 0 });
        expect(partial.exec("as")).toMatchAt({ match: "as", index: 0 });
        expect(partial.exec("suffix")).toMatchAt({ match: "suffix", index: 0 });
        expect(partial.exec("asuffix")).toMatchAt({
          match: "asuffix",
          index: 0
        });
      });

      it("should support character class quantifier that can match empty (Lucene [^y]*{1,2} style)", () => {
        const partial = new PartialMatchRegExp(/^[^y]*suffix/);
        expect(partial).toMatchPartially({
          characters: ["a", "b", ..."suffix".split("")]
        });
      });

      it("should not match when the excluded character appears where the anchored quantifier must match zero characters", () => {
        const partial = new PartialMatchRegExp(/^[^y]*suffix/);
        expect(partial.exec("ysuffix")).toNotMatch();
      });
    });

    // Apache Lucene TestRegExp.java — testUnicodeAsciiInsensitiveFlags
    // Lucene explicitly tests Unicode case folding (σ/Σ, ῼ, ﬗ) with case-insensitive flags.
    describe("Unicode case folding (Lucene-inspired)", () => {
      it("should support case-insensitive partial matching of Greek lowercase sigma (σ) against uppercase (Σ)", () => {
        const partial = new PartialMatchRegExp(/σsuffix/iu);
        // Σ (U+03A3) is the uppercase of σ (U+03C3) under Unicode case folding
        expect(partial.exec("Σs")).toMatchAt({ match: "Σs", index: 0 });
        expect(partial.exec("σs")).toMatchAt({ match: "σs", index: 0 });
        expect(partial).toMatchPartially({
          characters: ["Σ", ..."suffix".split("")]
        });
      });

      it("should support case-insensitive partial matching of uppercase sigma (Σ) against lowercase (σ)", () => {
        const partial = new PartialMatchRegExp(/Σsuffix/iu);
        expect(partial.exec("σs")).toMatchAt({ match: "σs", index: 0 });
        expect(partial.exec("Σs")).toMatchAt({ match: "Σs", index: 0 });
      });

      it("should support case-insensitive partial matching of Greek capital letter omega with prosgegrammeni (ῼ)", () => {
        const partial = new PartialMatchRegExp(/ῼsuffix/iu);
        expect(partial.exec("ῼ")).toMatchAt({ match: "ῼ", index: 0 });
        expect(partial).toMatchPartially({
          characters: ["ῼ", ..."suffix".split("")]
        });
      });
    });

    // JDK RegExTest.java — hitEndTest
    // Java's Matcher.hitEnd() returns true when the engine consumed all input before failing,
    // meaning a longer string could potentially produce a match (i.e. the input is a valid prefix).
    // In this library, a non-empty exec result is the equivalent of hitEnd()=true, and an empty
    // (or null) result is the equivalent of hitEnd()=false.
    describe("hitEnd() semantic equivalence (JDK-inspired)", () => {
      it("returns non-empty prefix match when input is a prefix of the pattern (hitEnd=true equivalent)", () => {
        // JDK: /^squidattack/.hitEnd("squid") === true — engine ran off end of input
        const partial = new PartialMatchRegExp(/^squidattack/);
        expect(partial.exec("squid")?.[0]).toBe("squid");
      });

      it("returns null when input diverges from the pattern before end of input (hitEnd=false equivalent)", () => {
        // JDK: /^squidattack/.hitEnd("squack") === false — engine diverged at 4th char
        const partial = new PartialMatchRegExp(/^squidattack/);
        expect(partial.exec("squack")).toBeNull();
      });

      it("returns non-empty prefix when input is a prefix of a simple literal", () => {
        // JDK: /^abc/ on 'ab'
        const partial = new PartialMatchRegExp(/^abc/);
        expect(partial.exec("ab")?.[0]).toBe("ab");
      });

      it("returns null when input diverges early", () => {
        // JDK: /^abc/ on 'ad'
        const partial = new PartialMatchRegExp(/^abc/);
        expect(partial.exec("ad")).toBeNull();
      });

      it("returns non-empty partial match for a non-anchored pattern occurring mid-string (hitEnd=true via unanchored find)", () => {
        // JDK: /catattack/ on "attackattackattackcatatta" — hitEnd=true (prefix found at end)
        const partial = new PartialMatchRegExp(/catattack/);
        const m = partial.exec("attackattackattackcatatta");
        expect(m).toMatchObject({ 0: "catatta", index: 18 });
      });
    });

    // JDK RegExTest.java — caretAtEndTest
    // Java tests that ^ with MULTILINE matches at the start of a new line after \r (bare CR).
    describe("CRLF boundary in multiline mode (JDK caretAtEndTest-inspired)", () => {
      it("should recognise ^ at position 0 and after bare CR in multiline mode", () => {
        const partial = new PartialMatchRegExp(/^x?/gm);
        const m1 = partial.exec("\rfoo");
        expect(m1).toMatchObject({ index: 0 });
        if (m1?.[0] === "") partial.lastIndex++; // advance past zero-length match
        const m2 = partial.exec("\rfoo");
        expect(m2).toMatchObject({ index: 1 }); // ^ matches at start of new line after \r
      });

      it("should match $ before bare CR, since \\r is a line terminator in multiline mode", () => {
        const partial = new PartialMatchRegExp(/^foo$/m);
        expect(partial.exec("foo\r")).toMatchAt({ match: "foo", index: 0 });
      });
    });

    // JDK RegExTest.java — wordSearchTest
    // Java's Matcher.find(pos) advances through successive matches by position.
    // The equivalent in JS is advancing lastIndex on a global-flag regex.
    describe("progressive find() via lastIndex (JDK wordSearchTest-inspired)", () => {
      it("should find successive word-prefixed partial matches by advancing lastIndex", () => {
        // JDK wordSearchTest: /\b/ on "word1 word2 word3" with progressive find(pos) calls
        const partial = new PartialMatchRegExp(/\bwor/g);
        const input = "word1 word2 word3";
        const positions: number[] = [];
        let m;
        while ((m = partial.exec(input)) !== null && m[0] !== "") {
          positions.push(m.index);
        }
        expect(positions).toEqual([0, 6, 12]);
      });

      it("should support find(position) equivalent by setting lastIndex before exec", () => {
        const partial = new PartialMatchRegExp(/\bwor/g);
        const input = "word1 word2 word3";
        // Start from position 6 (equivalent to JDK's find(6))
        partial.lastIndex = 6;
        const m = partial.exec(input);
        expect(m).toMatchObject({ 0: "wor", index: 6 });
      });
    });

    // PCRE2 testdata/testinput7, testinput15, testinput17, testinput18
    // Many cases map directly; others (JIT controls, POSIX wrapper, allusedtext metadata)
    // are engine/interface-specific and therefore mapped conceptually.
    describe("PCRE2 testdata parity (ECMAScript-compatible subset)", () => {
      it("should support /abcd*/ style prefix matching (PCRE2 \\=ps / \\=ph inspired)", () => {
        const partial = new PartialMatchRegExp(/abcd*/);
        expect(partial.exec("xxxxab")).toMatchAt({ match: "ab", index: 4 });
        expect(partial.exec("xxxxabc")).toMatchAt({ match: "abc", index: 4 });
        expect(partial.exec("xxxxabcd")).toMatchAt({
          match: "abcd",
          index: 4
        });
      });

      it("should support case-insensitive /abcd*/ behaviour with uppercase input (PCRE2 /i inspired)", () => {
        const partial = new PartialMatchRegExp(/abcd*/i);
        expect(partial.exec("XXXXAB")).toMatchAt({ match: "AB", index: 4 });
        expect(partial.exec("XXXXABCD")).toMatchAt({
          match: "ABCD",
          index: 4
        });
      });

      it("should support /abc\\d*/ prefixes (PCRE2 inspired)", () => {
        const partial = new PartialMatchRegExp(/abc\d*/);
        expect(partial.exec("xxxxab")).toMatchAt({ match: "ab", index: 4 });
        expect(partial.exec("xxxxabc1")).toMatchAt({
          match: "abc1",
          index: 4
        });
      });

      it("should support /abc[de]*/ prefixes (PCRE2 inspired)", () => {
        const partial = new PartialMatchRegExp(/abc[de]*/);
        expect(partial.exec("xxxxab")).toMatchAt({ match: "ab", index: 4 });
        expect(partial.exec("xxxxabcde")).toMatchAt({
          match: "abcde",
          index: 4
        });
      });

      it("should support \\bthe cat\\b with both complete and partial prefixes (PCRE2 inspired)", () => {
        const partial = new PartialMatchRegExp(/\bthe cat\b/);
        expect(partial.exec("the cat")).toMatchAt({
          match: "the cat",
          index: 0
        });
        expect(partial.exec("the ca")).toMatchAt({ match: "the ca", index: 0 });
      });

      it("should support CR subjects for wildcard quantifier prefixes in dotAll mode (PCRE2 newline-mode inspired)", () => {
        const partial = new PartialMatchRegExp(/.{2,3}/s);
        expect(partial.exec("\r")).toMatchAt({ match: "\r", index: 0 });
        expect(partial.exec("\r\r")).toMatchAt({ match: "\r\r", index: 0 });
        expect(partial.exec("\r\r\r")).toMatchAt({ match: "\r\r\r", index: 0 });
      });

      it("should support CR subjects for single wildcard in dotAll mode (PCRE2 /./ newline-mode inspired)", () => {
        const partial = new PartialMatchRegExp(/./s);
        expect(partial.exec("\r")).toMatchAt({ match: "\r", index: 0 });
      });

      it("should support CR subjects for non-greedy wildcard quantifier prefixes in dotAll mode (PCRE2 /.{2,3}?/ inspired)", () => {
        const partial = new PartialMatchRegExp(/.{2,3}?/s);
        expect(partial.exec("\r")).toMatchAt({ match: "\r", index: 0 });
        expect(partial.exec("\r\r")).toMatchAt({ match: "\r\r", index: 0 });
        expect(partial.exec("\r\r\r")).toMatchAt({ match: "\r\r", index: 0 });
      });

      it("should support lookbehind-based partial continuation (PCRE2 /(?<=abc)123/ inspired)", () => {
        const partial = new PartialMatchRegExp(/(?<=abc)123/);
        expect(partial.exec("xyzabc12")).toMatchAt({ match: "12", index: 6 });
        expect(partial.exec("xyzabc123")).toMatchAt({
          match: "123",
          index: 6
        });
      });

      it("should support boundary-sensitive partial continuation (PCRE2 /\\babc\\b/ inspired)", () => {
        const partial = new PartialMatchRegExp(/\babc\b/);
        expect(partial.exec("+++ab")).toMatchAt({ match: "ab", index: 3 });
        expect(partial.exec("+++abc+++")).toMatchAt({ match: "abc", index: 3 });
      });

      it("should support nested lookbehind with trailing wildcard (PCRE2 /(?<=(?<=a)b)c.*/ inspired)", () => {
        const partial = new PartialMatchRegExp(/(?<=(?<=a)b)c.*/);
        expect(partial.exec("abc")).toMatchAt({ match: "c", index: 2 });
        expect(partial.exec("abcXYZ")).toMatchAt({
          match: "cXYZ",
          index: 2
        });
        expect(partial.exec("xbc")).toNotMatch();
      });

      it("should support fixed-width lookbehind with trailing wildcard (PCRE2 /(?<=ab)c.*/ inspired)", () => {
        const partial = new PartialMatchRegExp(/(?<=ab)c.*/);
        expect(partial.exec("abc")).toMatchAt({ match: "c", index: 2 });
        expect(partial.exec("abcXYZ")).toMatchAt({
          match: "cXYZ",
          index: 2
        });
        expect(partial.exec("xbc")).toNotMatch();
      });

      it("should support inline lookbehind assertion near the split point (PCRE2 /abc(?<=bc)def/ inspired)", () => {
        const partial = new PartialMatchRegExp(/abc(?<=bc)def/);
        // PCRE2 allusedtext output may include left context; JS match arrays expose consumed text only.
        expect(partial.exec("xxxabcd")).toMatchAt({ match: "abcd", index: 3 });
        expect(partial.exec("xxxabcdef")).toMatchAt({
          match: "abcdef",
          index: 3
        });
      });

      it("should support lookbehind-gated continuation where only consumed text is returned (PCRE2 /(?<=ab)cdef/ inspired)", () => {
        const partial = new PartialMatchRegExp(/(?<=ab)cdef/);
        expect(partial.exec("xxabcd")).toMatchAt({ match: "cd", index: 4 });
        expect(partial.exec("xxabcdef")).toMatchAt({
          match: "cdef",
          index: 4
        });
      });

      it("should support lookbehind-gated continuation for /(?<=abc)def/ (PCRE2 inspired)", () => {
        const partial = new PartialMatchRegExp(/(?<=abc)def/);
        expect(partial.exec("abc")).toMatchAt({ match: "", index: 3 });
        expect(partial.exec("abcde")).toMatchAt({ match: "de", index: 3 });
        expect(partial.exec("abcdef")).toMatchAt({
          match: "def",
          index: 3
        });
      });

      it("should support lookbehind-gated continuation for /(?<=123)abc/ (PCRE2 MARK-adjacent inspired)", () => {
        const partial = new PartialMatchRegExp(/(?<=123)abc/);
        expect(partial.exec("xxxx123a")).toMatchAt({ match: "a", index: 7 });
        expect(partial.exec("xxxx123abc")).toMatchAt({
          match: "abc",
          index: 7
        });
      });

      it("should support deeply nested lookbehind chains (PCRE2 /(?<=(?<=(?<=a)b)c)./ inspired)", () => {
        const partial = new PartialMatchRegExp(/(?<=(?<=(?<=a)b)c)./);
        expect(partial.exec("123abcXYZ")).toMatchAt({ match: "X", index: 6 });
      });

      it("should support captures inside nested lookbehind (PCRE2 /(?<=ab(cd(?<=...)))./ inspired)", () => {
        const partial = new PartialMatchRegExp(/(?<=ab(cd(?<=...)))./);
        const match = partial.exec("abcdX");
        expect(match).toMatchAt({ match: "X", index: 4 });
        expect(match).toMatchObject({ 1: "cd" });
      });

      it("should support alternate nesting layout for captures in lookbehind (PCRE2 /(?<=ab((?<=...)cd))./ inspired)", () => {
        const partial = new PartialMatchRegExp(/(?<=ab((?<=...)cd))./);
        const match = partial.exec("ZabcdX");
        expect(match).toMatchAt({ match: "X", index: 5 });
        expect(match).toMatchObject({ 1: "cd" });
      });

      it("should cover /abcd/ partial behaviour independently of engine mode (PCRE2 JIT/interpretive inspired)", () => {
        const partial = new PartialMatchRegExp(/abcd/);
        expect(partial.exec("ab")).toMatchAt({ match: "ab", index: 0 });
        expect(partial.exec("abcd")).toMatchAt({ match: "abcd", index: 0 });
        expect(partial.exec("xyz")).toNotMatch();
      });

      it("should document that PCRE2 POSIX partial_hard behaviour has no JS equivalent", () => {
        // PCRE2 testinput18/testoutput18: partial_hard is ignored by the POSIX wrapper.
        // This library has no POSIX API layer, so behaviour is a normal partial regex.
        const partial = new PartialMatchRegExp(/abc/);
        expect(partial.exec("ab")).toMatchAt({ match: "ab", index: 0 });
      });
    });
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Backreference
  describe("backreferences", () => {
    [
      {
        name: "simple backreference, at end of string",
        input: /(a)\1/,
        testStrings: ["a", "aa"],
        expected: (str: string) => ({ 0: str, 1: "a" })
      },
      {
        name: "simple backreference, not at end of string",
        input: /(a)\1b/,
        testStrings: ["a", "aa", "aab"],
        expected: (str: string) => ({ 0: str, 1: "a" })
      },
      {
        name: "backreference with disjunction",
        input: /(a|b)\1/,
        testStrings: ["a", "aa", "b", "bb"],
        expected: ([char]: string) => ({ 1: char })
      },
      {
        name: "nested backreferences",
        input: /((a))\2\1/,
        testStrings: ["a", "aa", "aaa"],
        expected: () => ({ 1: "a", 2: "a" })
      },
      {
        name: "two-digit backreference",
        input: /((((((((((a))))))))))\10/,
        testStrings: ["a", "aa"],
        expected: () => ({
          10: "a"
        })
      },
      {
        name: "three-digit backreference",
        input:
          /((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((a))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))\100/,
        testStrings: ["a", "aa"],
        expected: () => ({
          100: "a"
        })
      },
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Named_backreference
      {
        name: "named backreference",
        input: /(?<char>a)\k<char>/,
        testStrings: ["a", "aa"],
        expected: (str: string) => ({ 0: str, groups: { char: "a" } })
      }
    ].forEach(({ name, input, testStrings, expected }) => {
      it(`should support pass-through of ${name} (despite not being able to partially match non-atomic captures, since matching is atomic)`, () => {
        const partial = new PartialMatchRegExp(input);
        for (const testString of testStrings) {
          const result = partial.exec(testString);
          expect(result).toMatchAt({ match: testString, index: 0 });
          expect(result).toMatchObject(expected(testString));
        }
      });
    });

    it("rejects input that diverges from an anchored backreference pattern immediately", () => {
      const partial = new PartialMatchRegExp(/^(ab)\1/);
      expect(partial.test("xy")).toBe(false);
      expect(partial.test("xyz")).toBe(false);
    });

    [
      {
        name: "simple backreference, at end of string",
        input: /^(a)\1/,
        validInputs: ["a", "aa"],
        expected: (str: string) => ({ 0: str, 1: "a" })
      },
      {
        name: "multi-character simple backreference, at end of string",
        input: /^(ab)\1/,
        validInputs: ["a", "ab", "aba", "abab"],
        expected: (str: string) => ({ 0: str, 1: "ab".slice(0, str.length) })
      },
      {
        name: "simple backreference, not at end of string",
        input: /^(a)\1b/,
        validInputs: ["a", "aa", "aab"],
        expected: (str: string) => ({ 0: str, 1: "a" })
      },
      {
        name: "multi-character simple backreference, not at end of string",
        input: /^(ab)\1c/,
        validInputs: ["a", "ab", "aba", "abab", "ababc"],
        expected: (str: string) => ({ 0: str, 1: "ab".slice(0, str.length) })
      },
      {
        name: "backreference with disjunction",
        input: /^(a|b)\1/,
        validInputs: ["a", "aa", "b", "bb"],
        invalidInputs: ["ab", "ba"],
        expected: (str: string) => ({ 0: str, 1: str[0] })
      },
      {
        name: "multi-character backreference with disjunction",
        input: /^(ab|cd)\1/,
        validInputs: ["a", "ab", "aba", "abab", "c", "cd", "cdc", "cdcd"],
        invalidInputs: ["ac", "abc", "abcd", "cda", "cdab"],
        expected: (str: string) => ({ 0: str, 1: str.slice(0, 2) })
      },
      {
        name: "multi-character backreference with disjunction with common prefix",
        input: /^(abc|abb)\1/,
        validInputs: [
          "a",
          "ab",
          "abc",
          "abca",
          "abcabc",
          "abb",
          "abba",
          "abbabb"
        ],
        invalidInputs: ["abab", "abcabb", "abbabc"],
        expected: (str: string) => ({ 0: str, 1: str.slice(0, 3) })
      },
      {
        name: "multi-character backreference with optional capture",
        input: /^(ab?|ac?)\1/,
        validInputs: ["a", "ab", "aba", "abab", "ac", "aca", "acac"],
        invalidInputs: [],
        expected: (str: string) => ({ 0: str, 1: str.slice(0, 2) })
      },
      {
        name: "backreference used twice",
        input: /^(ab)\1\1/,
        validInputs: ["a", "ab", "aba", "abab", "ababa", "ababab"],
        invalidInputs: ["ac", "abb", "abac"],
        expected: (str: string) => ({
          0: str,
          1: "ab".slice(0, Math.min(str.length, 2))
        })
      },
      {
        name: "two independent groups",
        input: /^(ab)(cd)\1\2/,
        validInputs: [
          "a",
          "ab",
          "abc",
          "abcd",
          "abcda",
          "abcdab",
          "abcdabc",
          "abcdabcd"
        ],
        invalidInputs: ["abcdabce", "abcdbacd", "abcdabdc"],
        expected: (str: string) => ({
          0: str,
          1: "ab".slice(0, str.length),
          2: "cd".slice(0, Math.max(0, str.length - 2))
        })
      },
      {
        name: "nested backreferences",
        input: /^((a))\2\1/,
        validInputs: ["a", "aa", "aaa"],
        expected: () => ({ 1: "a", 2: "a" })
      },
      {
        name: "nested backreference with disjunction",
        input: /^((a|b))\2\1/,
        validInputs: ["a", "aa", "aaa", "b", "bb", "bbb"],
        expected: ([char]: string) => ({ 1: char, 2: char })
      },
      {
        name: "prefix-ambiguous alternation",
        input: /^(a|ab)\1/,
        validInputs: ["a", "aa", "ab", "aba", "abab"],
        invalidInputs: ["ac", "ba", "abc"],
        expected: (str: string) => ({
          0: str,
          1: str.startsWith("ab") ? "ab" : "a"
        })
      },
      {
        name: "nested outer group",
        input: /^((a|b)c)\1/,
        validInputs: ["a", "ac", "aca", "acac", "b", "bc", "bcb", "bcbc"],
        invalidInputs: ["acbc", "bcac", "acab"],
        expected: (str: string) => ({
          0: str,
          1: (str[0] + "c").slice(0, Math.min(str.length, 2)),
          2: str[0]
        })
      },
      {
        name: "case-insensitive backreference",
        input: /^(abc)\1/i,
        validInputs: [
          "a",
          "ab",
          "abc",
          "abcA",
          "abcAB",
          "abcABC",
          "ABCa",
          "ABCabc",
          "ABCABC"
        ],
        invalidInputs: ["abcx", "ABCx"],
        expected: (str: string) => ({ 0: str, 1: str.slice(0, 3) })
      },
      {
        name: "optional group: undefined capture when the group doesn't participate",
        input: /^(a)?b\1c/,
        validInputs: ["b", "bc", "a", "ab", "aba", "abac"],
        invalidInputs: ["c", "ac", "ba"],
        expected: (str: string) => ({
          0: str,
          ...(str.startsWith("a") ? { 1: "a" } : {})
        })
      },
      {
        name: "top-level alternation: groups from inactive branch are undefined in cap",
        input: /^(ab)\1|^(cd)\2/,
        validInputs: ["a", "ab", "aba", "abab", "c", "cd", "cdc", "cdcd"],
        invalidInputs: ["ac", "ad", "bc", "ca", "abcd", "cdab"],
        expected: (str: string) => ({
          0: str,
          ...(str.startsWith("a") ? { 1: str.slice(0, 2) } : {}),
          ...(str.startsWith("c") ? { 2: str.slice(0, 2) } : {})
        })
      },
      {
        name: "non-participating group via alternation — ECMA: backreference to non-participating group matches empty string",
        input: /^(ab)\1|^cd\1/,
        validInputs: ["a", "ab", "aba", "abab", "c", "cd"],
        invalidInputs: ["b", "d", "ac", "ca", "dc"],
        expected: (str: string) => ({
          0: str,
          ...(str.startsWith("a") ? { 1: str.slice(0, 2) } : {})
        })
      },
      {
        name: "non-participating named group via alternation — ECMA: named backreference to non-participating group matches empty string",
        input: /^(?<grp>ab)\k<grp>|^cd\k<grp>/,
        validInputs: ["a", "ab", "aba", "abab", "c", "cd"],
        invalidInputs: ["b", "d", "ac", "ca", "dc"],
        expected: (str: string) => ({
          0: str,
          ...(str.startsWith("a")
            ? { 1: str.slice(0, 2), groups: { grp: str.slice(0, 2) } }
            : {})
        })
      },
      {
        name: "backreference inside positive lookahead",
        input: /^(foo)(?=\1)/,
        validInputs: ["f", "fo", "foo", "foof", "foofo", "foofoo"],
        invalidInputs: ["fox", "food"],
        expected: (str: string) => ({
          0: str.slice(0, 3),
          1: str.slice(0, 3)
        })
      },
      {
        name: "disjunction in capture with lookahead backreference",
        input: /^(a|b)(?=\1)/,
        validInputs: ["a", "aa", "b", "bb"],
        invalidInputs: ["ab", "ba"],
        expected: (str: string) => ({ 0: str[0], 1: str[0] })
      },
      {
        name: "multi-character disjunction in capture with lookahead backreference",
        input: /^(ab|cd)(?=\1)/,
        validInputs: ["a", "ab", "aba", "abab", "c", "cd", "cdc", "cdcd"],
        invalidInputs: ["ac", "abcd"],
        expected: (str: string) => ({
          0: str.slice(0, 2),
          1: str.slice(0, 2)
        })
      },
      {
        name: "optional capture disjunction with lookahead backreference",
        input: /^(ab?|ac?)(?=\1)/,
        validInputs: ["a", "aa", "ab", "aba", "abab", "ac", "aca", "acac"],
        invalidInputs: ["b", "c"],
        expected: (str: string) => {
          const g = str.startsWith("ab")
            ? "ab"
            : str.startsWith("ac")
              ? "ac"
              : "a";
          return { 0: g, 1: g };
        }
      },
      {
        name: "group inside quantifier",
        input: /^(ab)+\1/,
        validInputs: ["a", "ab", "aba", "abab", "ababab"],
        invalidInputs: ["b", "ba", "abc"],
        expected: (str: string) => ({
          0: str,
          1: str.slice(0, 2)
        })
      },
      {
        name: "named group inside quantifier",
        input: /^(?<word>ab)+\k<word>/,
        validInputs: ["a", "ab", "aba", "abab", "ababab"],
        invalidInputs: ["b", "ba", "abc"],
        expected: (str: string) => ({
          0: str,
          1: str.slice(0, 2)
        })
      },
      {
        name: "quantifier inside capture group",
        input: /^(ab+)\1/,
        validInputs: [
          "a",
          "ab",
          "aba",
          "abab",
          "abb",
          "abba",
          "abbab",
          "abbabb"
        ],
        invalidInputs: ["b"],
        expected: (str: string) => ({
          0: str,
          1: str.match(/^ab*/)?.[0] ?? "a"
        })
      },
      {
        name: "alternation with common prefixes in capture group",
        input: /^(abc|ab|a)\1/,
        validInputs: [
          "a",
          "aa",
          "ab",
          "aba",
          "abab",
          "abc",
          "abca",
          "abcab",
          "abcabc"
        ],
        invalidInputs: ["b", "c", "ac", "ba", "abb", "abcc"],
        expected: (str: string) => ({
          0: str,
          1: str.startsWith("abc") ? "abc" : str.startsWith("ab") ? "ab" : "a"
        })
      },
      {
        name: "greedy quantifier inside capture group",
        input: /^(a+b)\1/,
        validInputs: ["a", "ab", "aba", "abab", "aab", "aaba", "aabaab"],
        invalidInputs: ["b", "ba"],
        expected: (str: string) => ({
          0: str,
          1: str.match(/^a+b/)?.[0] ?? "a"
        })
      },
      {
        name: "case-insensitive fixed-length capture",
        input: /^([A-C]{3})\1/i,
        validInputs: ["ABC", "ABCa", "ABCaB", "ABCabc", "ABCABC"],
        invalidInputs: ["ABCd", "ABCAD"],
        expected: (str: string) => ({ 0: str, 1: "ABC" })
      },
      {
        name: "dotAll flag — capture containing newline",
        input: /^(a.c)\1/s,
        validInputs: ["a\nc", "a\nca", "a\nca\n", "a\nca\nc"],
        invalidInputs: ["a\ncb", "a\ncad"],
        expected: (str: string) => ({ 0: str, 1: "a\nc" })
      },
      {
        name: "three-char group inside quantifier with multiple candidate capture lengths",
        input: /^(abc)+\1/,
        validInputs: [
          "abc",
          "abca",
          "abcab",
          "abcabc",
          "abcabca",
          "abcabcab",
          "abcabcabc"
        ],
        invalidInputs: ["abce", "abcabd"],
        expected: (str: string) => ({
          0: str.match(/^(abc)+\1/)?.[0] ?? str,
          1: "abc"
        })
      },
      {
        name: "three-char group inside lazy quantifier",
        input: /^(abc)+?\1/,
        validInputs: [
          "abc",
          "abca",
          "abcab",
          "abcabc",
          "abcabca",
          "abcabcab",
          "abcabcabc"
        ],
        invalidInputs: ["abce", "abcad"],
        expected: (str: string) => ({
          0: str.match(/^(abc)+?\1/)?.[0] ?? str,
          1: "abc"
        })
      }
    ].forEach(({ name, input, validInputs, invalidInputs = [], expected }) => {
      it(`should support partial matching of ${name}`, () => {
        const partial = new PartialMatchRegExp(input);

        for (const str of validInputs) {
          const result = partial.exec(str);
          expect(result).toMatchObject(expected(str));
        }
        for (const str of invalidInputs) {
          const result = partial.exec(str);
          expect(result).not.toMatchObject(expected(str));
        }
      });
    });

    describe("ECMA spec: backreference to non-participating capturing group matches nothing", () => {
      it("numeric: partial prefix of branch that leaves group non-participating is accepted", () => {
        const partial = new PartialMatchRegExp(/^(ab)\1|^cd\1/);

        expect(partial.exec("c")).toMatchObject({ 0: "c", 1: undefined });
        expect(partial.exec("cd")).toMatchObject({ 0: "cd", 1: undefined });
        expect(partial.exec("d")).toBeNull();
        expect(partial.exec("dc")).toBeNull();
      });

      it("named: partial prefix of branch that leaves named group non-participating is accepted", () => {
        const partial = new PartialMatchRegExp(/^(?<grp>ab)\k<grp>|^cd\k<grp>/);

        expect(partial.exec("c")).toMatchObject({
          0: "c",
          1: undefined,
          groups: { grp: undefined }
        });
        expect(partial.exec("cd")).toMatchObject({
          0: "cd",
          1: undefined,
          groups: { grp: undefined }
        });
      });
    });

    describe("lastIndex behaviour for backreference patterns", () => {
      it("ignores a manually-set lastIndex on a non-global, non-sticky pattern, matching native RegExp.prototype.exec semantics", () => {
        const partial = new PartialMatchRegExp(
          /((?<q>["']).*?\k<q>)|(\{)|(\})/
        );
        partial.lastIndex = 10;
        expect(partial.exec(' a: "}{')).toMatchAt({ match: '"}{', index: 4 });
        expect(partial.lastIndex).toBe(10);
      });

      it("uses a non-zero lastIndex and propagates it to the original pattern on a full match", () => {
        const partial = new PartialMatchRegExp(/(ab)\1/g);
        partial.lastIndex = 2;

        const m = partial.exec("zzabab");
        expect(m).toMatchObject({ 0: "abab" });
        expect(partial.lastIndex).toBe(6);
      });

      it("uses a non-zero lastIndex for partial matching and propagates partial regex lastIndex", () => {
        const partial = new PartialMatchRegExp(/(ab)\1/g);
        partial.lastIndex = 5;

        const m = partial.exec("ababxaba");
        expect(m).toMatchObject({ 0: "aba" });
        expect(partial.lastIndex).toBe(8);
      });

      it("resets lastIndex to zero when no match is possible from an anchored start, for global and sticky", () => {
        const g = new PartialMatchRegExp(/^(ab)\1/g);
        g.lastIndex = 1;
        expect(g.exec("a")).toBeNull();
        expect(g.lastIndex).toBe(0);

        const y = new PartialMatchRegExp(/^(ab)\1/y);
        y.lastIndex = 1;
        expect(y.exec("a")).toBeNull();
        expect(y.lastIndex).toBe(0);
      });

      it("resets lastIndex to zero for a backreference pattern when no match is possible at the sticky, anchored position", () => {
        const y = new PartialMatchRegExp(/^(ab)\1/y);
        y.lastIndex = 1;
        expect(y.exec("zzzz")).toBeNull();
        expect(y.lastIndex).toBe(0);
      });

      it("resets lastIndex to zero when a capture is found but the expanded backreference match fails at a sticky position", () => {
        const y = new PartialMatchRegExp(/([ab])\1/y);
        y.lastIndex = 1;
        expect(y.exec("aab")).toBeNull();
        expect(y.lastIndex).toBe(0);
      });

      it("resets lastIndex to zero when a capture is found but the expanded backreference match fails at an anchored global position", () => {
        const g = new PartialMatchRegExp(/^([ab])\1/g);
        g.lastIndex = 0;
        expect(g.exec("ab")).toBeNull();
        expect(g.lastIndex).toBe(0);
      });

      it("advances lastIndex to the pipeline match's end when an earlier partial wins over a later native complete match", () => {
        const partial = new PartialMatchRegExp(
          /((?<q>["']).*?\k<q>)|(\{)|(\})/g
        );
        expect(partial.exec(' a: "}{')).toMatchAt({ match: '"}{', index: 4 });
        expect(partial.lastIndex).toBe(7);
      });

      it("continues advancing lastIndex on the next call once past a pipeline-sourced match", () => {
        const partial = new PartialMatchRegExp(
          /((?<q>["']).*?\k<q>)|(\{)|(\})/g
        );
        partial.exec(' a: "}{');
        expect(partial.exec(' a: "}{')).toMatchAt({ match: "", index: 7 });
        expect(partial.lastIndex).toBe(7);
      });
    });

    describe("backreference resolution respects the original pattern's flags", () => {
      it("honours a non-zero global lastIndex instead of matching an earlier decoy", () => {
        const partial = new PartialMatchRegExp(/(ab)\1/g);
        partial.lastIndex = 8;
        expect(partial.exec("ababxxxxxa")).toMatchAt({ match: "a", index: 9 });
      });

      it("honours a non-zero sticky lastIndex instead of matching an earlier decoy", () => {
        const partial = new PartialMatchRegExp(/(ab)\1/y);
        partial.lastIndex = 5;
        expect(partial.exec("ababxa")).toMatchAt({ match: "a", index: 5 });
      });

      it("honours the ignoreCase flag when resolving a backreference", () => {
        const partial = new PartialMatchRegExp(/(AB)\1c/i);
        expect(partial.exec("aBab")).toMatchAt({ match: "aBab", index: 0 });
      });

      it("honours the dotAll flag when resolving a backreference", () => {
        const partial = new PartialMatchRegExp(/(a.c)\1d/s);
        expect(partial.exec("a\nca\nc")).toMatchAt({
          match: "a\nca\nc",
          index: 0
        });
      });

      it.each(["u", "v"])(
        "honours the %s flag when resolving an astral-plane backreference",
        (flag) => {
          const partial = new PartialMatchRegExp(
            new RegExp("(\u{1F600})\\1x", flag)
          );
          expect(partial.exec("\u{1F600}\u{1F600}")).toMatchAt({
            match: "\u{1F600}\u{1F600}",
            index: 0
          });
        }
      );

      it("honours the multiline flag when resolving a backreference", () => {
        const partial = new PartialMatchRegExp(/(^ab)\1c/m);
        expect(partial.exec("xx\nabab")).toMatchAt({ match: "abab", index: 3 });
      });
    });

    describe("backref patterns that match the empty string", () => {
      it("exec('') returns a match when the backref pattern matches the empty string", () => {
        const emptyCapturingBackref = new PartialMatchRegExp(/^(a?)\1/);
        const m = emptyCapturingBackref.exec("");
        expect(m).toMatchObject({ 0: "", 1: "" });
      });

      it("test('') returns true when the backref pattern matches the empty string", () => {
        expect(new PartialMatchRegExp(/^(a*)\1/).test("")).toBe(true);
      });

      it("partial prefixes are still matched correctly for non-empty inputs", () => {
        const partial = new PartialMatchRegExp(/^(ab)\1/);
        expect(partial.exec("a")?.[0]).toBe("a");
        expect(partial.exec("ab")?.[0]).toBe("ab");
        expect(partial.exec("aba")?.[0]).toBe("aba");
        expect(partial.exec("abab")?.[0]).toBe("abab");
      });
    });

    it("accepts every prefix of 'abab' and rejects nearby non-prefix strings", () => {
      const partial = new PartialMatchRegExp(/^(ab)\1/);

      expect(partial).toMatchPartially({ characters: "abab".split("") });
      expect(partial.exec("abab")).toMatchObject({ 0: "abab" });

      for (const input of ["b", "abb", "ababa", "abac", "abba", "xyz"]) {
        const match = partial.exec(input);
        expect(match?.[0] === input).toBe(false);
      }
    });

    it("matches the optional-group branch when the capture is unmatched", () => {
      const partial = new PartialMatchRegExp(/^(a)?b\1/);
      const match = partial.exec("b");
      expect(match).toMatchObject({ 0: "b", 1: undefined });
    });

    it("accepts input ending mid-named-backreference via exec", () => {
      const partial = new PartialMatchRegExp(/^(?<word>xy)\k<word>/);

      const match = partial.exec("xyx");
      expect(match).toMatchObject({
        0: "xyx",
        1: "xy",
        groups: { word: "xy" }
      });
    });

    it("accepts every prefix of 'xyxy' for a named backreference and rejects nearby non-prefix strings", () => {
      const partial = new PartialMatchRegExp(/^(?<word>xy)\k<word>/);

      expect(partial).toMatchPartially({ characters: "xyxy".split("") });
      expect(partial.exec("xyxy")).toMatchObject({ 0: "xyxy" });

      for (const input of ["y", "xyy", "xyxyx", "xyxz", "xyyx", "xyz"]) {
        const match = partial.exec(input);
        expect(match?.[0] === input).toBe(false);
      }
    });

    it("does not misinterpret a character class while resolving a backreference", () => {
      const partial = new PartialMatchRegExp(/^([ab])\1/);
      expect(partial.exec("ab")).toBeNull();
    });

    describe("non-greedy (lazy) quantifier semantics", () => {
      it("lazy quantifier produces a shorter match than greedy on the same input", () => {
        const greedy = new PartialMatchRegExp(/^(abc)+\1/);
        const lazy = new PartialMatchRegExp(/^(abc)+?\1/);
        expect(greedy.exec("abcabcabc")?.[0]).toBe("abcabcabc");
        expect(lazy.exec("abcabcabc")?.[0]).toBe("abcabc");
      });

      it("lazy and greedy agree on partial inputs shorter than a full backref cycle", () => {
        const greedy = new PartialMatchRegExp(/^(abc)+\1/);
        const lazy = new PartialMatchRegExp(/^(abc)+?\1/);
        expect(greedy.exec("abcab")?.[0]).toBe("abcab");
        expect(lazy.exec("abcab")?.[0]).toBe("abcab");
        expect(greedy.exec("abcab")?.[1]).toBe("abc");
        expect(lazy.exec("abcab")?.[1]).toBe("abc");
      });
    });

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

    describe("ECMAScript ordered alternation (first-match) semantics", () => {
      it("shorter first alternative wins when both alternatives can satisfy the backref", () => {
        const partial = new PartialMatchRegExp(/^(a|aa)\1/);
        const m = partial.exec("aaaa");
        expect(m).toMatchObject({ 0: "aa", 1: "a" });
      });

      it("alternation order determines the result — longer listed first wins when tried first", () => {
        const partial = new PartialMatchRegExp(/^(aa|a)\1/);
        const m = partial.exec("aaaa");
        expect(m).toMatchObject({ 0: "aaaa", 1: "aa" });
      });

      it("resolves a partial prefix against (a|aa)\\1 using the first matching alternative 'a', not the longer 'aa'", () => {
        const partial = new PartialMatchRegExp(/^(a|aa)\1/);
        const m = partial.exec("a");
        expect(m).toMatchObject({ 1: "a" });
      });

      it("keeps the longer match when the pattern itself backtracks to a later alternative — distinct from the quantified-group capture-length ambiguity above", () => {
        const partial = new PartialMatchRegExp(/^(a|ab)\1/);
        const m = partial.exec("ab");
        expect(m).toMatchObject({ 1: "ab" });
      });
    });

    describe("leftmost partial wins over a later native complete match", () => {
      it("returns an earlier viable partial across a top-level alternation instead of a later complete match", () => {
        const partial = new PartialMatchRegExp(
          /((?<q>["']).*?\k<q>)|(\{)|(\})/
        );
        expect(partial.exec(' a: "}{')).toMatchAt({ match: '"}{', index: 4 });
      });

      it("a static twin of the same pattern (no backreference) already agrees on the earlier index", () => {
        const partial = new PartialMatchRegExp(
          /("[^"]*")|(\{)|(\})/
        );
        expect(partial.exec(' a: "}{')).toMatchAt({ match: '"}{', index: 4 });
      });

      it("returns an earlier viable partial when no top-level alternation is involved", () => {
        const partial = new PartialMatchRegExp(/(.*?)[^"]*?}\1/);
        expect(partial.exec(' x" bx<}{')).toMatchAt({
          match: ' x" bx<}{',
          index: 0
        });
      });

      it("keeps the native complete match when the only pipeline candidate is at a later index than it", () => {
        const partial = new PartialMatchRegExp(/(ab|a)\1x/);
        expect(partial.exec("abXaax")).toMatchAt({ match: "aax", index: 3 });
      });

      it("falls back to the native complete match when the partial pipeline cannot resolve any candidate", () => {
        const partial = new PartialMatchRegExp(/^(ab|a)\1x/m);
        expect(partial.exec("abXaax\naax")).toMatchAt({
          match: "aax",
          index: 7
        });
      });
    });
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex
  describe("lastIndex propagation", () => {
    it("global flag: lastIndex advances past the match on every exec call, not just the first, so repeated calls don't re-match the same position", () => {
      const partial = new PartialMatchRegExp(/ab/g);
      expect(partial.exec("abxyab")?.[0]).toBe("ab");
      expect(partial.lastIndex).toBe(2);
      expect(partial.exec("abxyab")?.[0]).toBe("ab");
      expect(partial.lastIndex).toBe(6);
    });

    it("global flag: an unanchored pattern still matches an empty string at the true end of input once past all real matches (see the .test()/.exec() caveat in the README)", () => {
      const partial = new PartialMatchRegExp(/ab/g);
      partial.lastIndex = 6;
      expect(partial.exec("abxyab")).toMatchObject({ 0: "", index: 6 });
      expect(partial.lastIndex).toBe(6);
    });

    it("sticky flag: lastIndex advances past the match so the next sticky exec uses the new position", () => {
      const partial = new PartialMatchRegExp(/ab/y);
      expect(partial.exec("abcd")?.[0]).toBe("ab");
      expect(partial.lastIndex).toBe(2); // sticky must advance; otherwise next exec retries pos 0
    });

    it("global flag: lastIndex resets to 0 when no match is possible from an anchored start", () => {
      const partial = new PartialMatchRegExp(/^foo/g);
      partial.lastIndex = 1;
      expect(partial.exec("XXX")).toBeNull();
      expect(partial.lastIndex).toBe(0);
    });

    it("sticky flag: lastIndex resets to 0 when no match is possible at the current position", () => {
      const partial = new PartialMatchRegExp(/^foo/y);
      partial.lastIndex = 1;
      expect(partial.exec("XXX")).toBeNull();
      expect(partial.lastIndex).toBe(0);
    });
  });

  describe("rejecting non-matching input", () => {
    it("exec() returns null for a string that cannot match", () => {
      const partial = new PartialMatchRegExp(/^foo/);
      expect(partial.exec("bar")).toBeNull();
      expect(partial.exec("xyz")).toBeNull();
    });

    it("string.match() returns null for non-matching input", () => {
      const partial = new PartialMatchRegExp(/^foo/);
      expect("bar".match(partial)).toBeNull();
      expect("fo".match(partial)).not.toBeNull();
    });

    it("/^x*$/ returns true for complete matches like 'xx'", () => {
      expect(new PartialMatchRegExp(/^x*$/).test("xx")).toBe(true);
      expect(new PartialMatchRegExp(/^x*$/).test("")).toBe(true);
    });
  });

  // https://tc39.es/ecma262/#sec-regular-expressions-patterns
  describe("Annex B literal \\k escapes", () => {
    it("should tolerate \\k escapes with no named group reference to complete them", () => {
      const partial = new PartialMatchRegExp(new RegExp("\\k"));
      expect(partial.exec("k")).toMatchAt({ match: "k", index: 0 });
    });

    it("should support partial matching of \\k escapes followed by an unterminated reference opening", () => {
      const partial = new PartialMatchRegExp(new RegExp("\\k<suffix"));
      expect(partial).toMatchPartially({
        characters: ["k", "<", ..."suffix".split("")]
      });
    });

    it("should support partial matching of \\k escapes when a closing angle bracket appears later in the pattern", () => {
      const partial = new PartialMatchRegExp(new RegExp("\\ka>b"));
      expect(partial).toMatchPartially({
        characters: ["k", "a", ">", "b"]
      });
    });
  });
  describe("isComplete()", () => {
    const completenessOf = (
      regex: PartialMatchRegExp,
      input: string
    ): boolean | null => {
      const match = regex.exec(input);
      return match === null ? null : regex.isComplete(match);
    };

    describe("distinguishing a match of the original pattern from a prefix", () => {
      it("reports every proper prefix of a literal pattern as incomplete", () => {
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

        const truncated = partial.exec("ab");
        expect(truncated).toMatchAt({ match: "a", index: 0 });
        expect(truncated?.[1]).toBeUndefined();
        expect(truncated && partial.isComplete(truncated)).toBe(false);

        const complete = partial.exec("abcd");
        expect(complete?.[1]).toBe("c");
        expect(complete && partial.isComplete(complete)).toBe(true);
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

      it("reports a truncated lookbehind-qualified atom as incomplete", () => {
        const partial = new PartialMatchRegExp(/(?<=foo)bar/);

        expect(completenessOf(partial, "foob")).toBe(false);
        expect(completenessOf(partial, "foobar")).toBe(true);
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

      it("reports completeness through a word boundary assertion", () => {
        const partial = new PartialMatchRegExp(/^\bfoo/);

        expect(completenessOf(partial, "fo")).toBe(false);
        expect(completenessOf(partial, "foo")).toBe(true);
      });
    });

    describe("under every flag", () => {
      it("reports completeness with the d flag, leaving indices intact", () => {
        const partial = new PartialMatchRegExp(/^(ab)c/d);

        const match = partial.exec("ab");
        expect(match && partial.isComplete(match)).toBe(false);
        expect(match?.indices?.[1]).toEqual([0, 2]);
      });

      it("reports completeness with the g flag without disturbing lastIndex", () => {
        const partial = new PartialMatchRegExp(/ab/g);

        const first = partial.exec("abab");
        expect(partial.lastIndex).toBe(2);
        expect(first && partial.isComplete(first)).toBe(true);
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
      it("reports a truncated backreference expansion as incomplete", () => {
        const partial = new PartialMatchRegExp(/^(ab)\1/);

        expect(completenessOf(partial, "aba")).toBe(false);
        expect(completenessOf(partial, "abab")).toBe(true);
      });

      it("reports a truncated named backreference expansion as incomplete", () => {
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
        const match = partial.exec("aba");

        expect(match && partial.isComplete(match)).toBe(false);
        expect(match && partial.isComplete(match)).toBe(false);
      });

      it("returns null, with nothing to report, when no partial match exists", () => {
        expect(new PartialMatchRegExp(/^(ab)\1/).exec("z")).toBeNull();
        expect(
          new PartialMatchRegExp(/^(ab)\1|^(abc)\2/).exec("abca")
        ).toBeNull();
      });
    });

    describe("leaving the match it describes alone", () => {
      it("does not mutate the match", () => {
        const partial = new PartialMatchRegExp(/^(a)(?<second>b)/);
        const match = partial.exec("a");
        const beforeAsking = [...(match ?? [])];

        expect(match && partial.isComplete(match)).toBe(false);
        expect(match && [...match]).toEqual(beforeAsking);
        expect(match?.groups).toEqual({ second: "" });
        expect(match?.index).toBe(0);
        expect(match?.input).toBe("a");
      });

      it("adds no own property to the match", () => {
        const partial = new PartialMatchRegExp(/^ab/);
        const match = partial.exec("a");
        const ownProperties = Object.getOwnPropertyNames(match ?? {});

        expect(match && partial.isComplete(match)).toBe(false);
        expect(Object.getOwnPropertyNames(match ?? {})).toEqual(ownProperties);
      });

      it("reports on every match a global iteration yields", () => {
        const partial = new PartialMatchRegExp(/a|b/g);

        expect(completenessOf(partial, "ab")).toBe(true);
        expect(completenessOf(partial, "ab")).toBe(true);
        expect(completenessOf(partial, "ab")).toBe(false);
      });
    });
  });
});
