import { describe, it, expect } from "vitest";
import PartialMatchRegExp from "./partialMatchRegExp.ts";

describe("PartialMatchRegExp", () => {
  it("is an instance of RegExp", () => {
    expect(new PartialMatchRegExp(/abc/)).toBeInstanceOf(RegExp);
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags
  describe("supporting flags", () => {
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

    it("preserves full flag combinations on the instance", () => {
      expect(new PartialMatchRegExp(/abc/dgimsuy).flags).toBe("dgimsuy");
      expect(new PartialMatchRegExp(/abc/dgimsvy).flags).toBe("dgimsvy");
      expect(new PartialMatchRegExp(/abc/).flags).toBe("");
    });

    describe("global flag", () => {
      it("lastIndex advances past the match so iteration can continue forward", () => {
        const re = new PartialMatchRegExp(/ab/g);
        expect(re.exec("abxyab")?.[0]).toBe("ab");
        expect(re.lastIndex).toBe(2);
        expect(re.exec("abxyab")?.[0]).toBe("ab");
        expect(re.lastIndex).toBe(6);
        expect(re.exec("abxyab")).toBeNull();
        expect(re.lastIndex).toBe(0);
      });

      it("exec respects an externally set lastIndex", () => {
        const re = new PartialMatchRegExp(/ab/g);
        re.exec("abxyab");
        re.lastIndex = 0;
        expect(re.exec("abxyab")).toMatchAt({ match: "ab", index: 0 });
        expect(re.lastIndex).toBe(2);
      });

      it("exec returns null and resets lastIndex when nothing matches beyond lastIndex", () => {
        const re = new PartialMatchRegExp(/foo/g);
        re.lastIndex = 1;
        expect(re.exec("XXX")).toBeNull();
        expect(re.lastIndex).toBe(0);
      });

      it("exec returns null and resets lastIndex for an empty string that cannot match", () => {
        const re = new PartialMatchRegExp(/foo/g);
        expect(re.exec("")).toBeNull();
        expect(re.lastIndex).toBe(0);
      });

      it("test('') reflects whether the underlying pattern matches the empty string", () => {
        expect(new PartialMatchRegExp(/^a*/g).test("")).toBe(true);
        expect(new PartialMatchRegExp(/^foo/g).test("")).toBe(false);
      });
    });

    describe("sticky flag", () => {
      it("lastIndex advances past the match so the next sticky exec uses the new position", () => {
        const re = new PartialMatchRegExp(/ab/y);
        expect(re.exec("abcd")?.[0]).toBe("ab");
        expect(re.lastIndex).toBe(2);
      });

      it("exec respects an externally set lastIndex", () => {
        const re = new PartialMatchRegExp(/ab/y);
        re.exec("abxyab");
        re.lastIndex = 4;
        expect(re.exec("abxyab")).toMatchAt({ match: "ab", index: 4 });
        expect(re.lastIndex).toBe(6);
      });

      it("exec returns null and resets lastIndex when nothing matches at lastIndex", () => {
        const re = new PartialMatchRegExp(/foo/y);
        re.lastIndex = 3;
        expect(re.exec("XXX")).toBeNull();
        expect(re.lastIndex).toBe(0);
      });

      it("test('') reflects whether the underlying pattern matches the empty string", () => {
        expect(new PartialMatchRegExp(/^a*/y).test("")).toBe(true);
        expect(new PartialMatchRegExp(/^foo/y).test("")).toBe(false);
      });
    });

    describe("global + sticky flag", () => {
      it("constructor does not throw when both g and y are combined", () => {
        const re = new PartialMatchRegExp(/ab/gy);
        expect(re.global).toBe(true);
        expect(re.sticky).toBe(true);
        expect(re.exec("ab")).toMatchAt({ match: "ab", index: 0 });
      });
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

    it("should return null for input unrelated to the pattern", () => {
      expect(new PartialMatchRegExp(/foo/).exec("bar")).toBeNull();
      expect(new PartialMatchRegExp(/foo/).exec("")).toBeNull();
    });

    it("should support open brace that does not form part of an occurrences quantifier", () => {
      const string = "hello{world";
      const partial = new PartialMatchRegExp(new RegExp(string));
      const result = partial.exec(string);
      expect(result).toMatchAt({ match: string, index: 0 });
    });

    it("should support partial matching of grapheme clusters", () => {
      const input = /ásuffix/u;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["a", "́", ..."suffix".split("")]
      });
    });

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
        characters: ["😀", ..."suffix".split("")]
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

    // A '{' that does not form a quantifier is a literal character and must
    // partially match, regardless of quantifiers appearing elsewhere in the
    // pattern.
    it("should partially match a literal '{' when a quantifier appears later in the pattern", () => {
      expect(new PartialMatchRegExp(/a{b}c{2}/).exec("a{")).toMatchAt({
        match: "a{",
        index: 0
      });
    });

    it("should partially match a literal '{' when no quantifier appears later", () => {
      expect(new PartialMatchRegExp(/a{b}c/).exec("a{")).toMatchAt({
        match: "a{",
        index: 0
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
        characters: ["🇺🇳", ..."suffix".split("")]
      });
      expect(partial.exec("A")).toNotMatch();
    });

    it("should support partial matching of grapheme clusters / string properties including string subtraction (with caveat that individual code points do not match independently)", () => {
      const input = /[\p{RGI_Emoji_Flag_Sequence}--\q{🇺🇸|🇷🇺}]suffix/v;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["🇺🇦", ..."suffix".split("")]
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
      const input = /^[[a-z]--[[aeiou]--[eo]]]+suffix/v;
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
      const input = /^[[a-z]--[[[aeiou]--[aeiou]]--[]]]+suffix/v;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["a", "b", "c", "d", "e", "f", "g", ..."suffix".split("")]
      });
      expect(partial).toNotMatchPartially({
        characters: ["[", "]", ..."suffix".split("")]
      });
    });

    it("should support partial matching of subtraction in unicode set character class expressions with escaped brackets", () => {
      const input = /^[[\[\]a-z]--[[\[]--[\[]]]suffix/v;
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
      const input = /^[[\p{Number}]--[[\p{Decimal_Number}]--[0-9]]]+suffix/v;
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
        /^[[[[[[\p{Letter}]]]]--[[[[[aeiou]]]]--[[[ei]]]]]]+suffix/v;
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

    it("should support partial matching of patterns with multiple modifiers", () => {
      const input = /(?ism:^a.c$)\nsuffix/;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["A", "\n", "C", "\n", ..."suffix".split("")]
      });

      const caseInsensitivityDoesNotExtendPastModifierScope =
        new PartialMatchRegExp(/(?ism:^a.c$)\nsuffix/);
      expect(
        caseInsensitivityDoesNotExtendPastModifierScope.exec(`ABC\nS`)
      ).not.toMatchAt({ match: "ABC\nS", index: 0 });

      const dotAllDoesNotExtendPastModifierScope = new PartialMatchRegExp(
        /(?ism:^abc$).suffix/
      );
      expect(dotAllDoesNotExtendPastModifierScope.exec(`ABC\nS`)).not.toMatchAt(
        { match: "ABC\nS", index: 0 }
      );

      const multilineDoesNotExtendPastModifierScope = new PartialMatchRegExp(
        /(?ism:^abc$)\n^suffix/
      );
      expect(
        multilineDoesNotExtendPastModifierScope.exec(`ABC\nS`)
      ).not.toMatchAt({ match: "ABC\ns", index: 0 });
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

      const wouldOnlyMatchIfMultilineWereActive = `abc\n`;
      expect(partial.exec(wouldOnlyMatchIfMultilineWereActive)).toNotMatch();

      const wouldOnlyMatchIfCaseInsensitiveWereActive = `Abc`;
      expect(
        partial.exec(wouldOnlyMatchIfCaseInsensitiveWereActive)
      ).toNotMatch();

      const wouldOnlyMatchIfDotAllWereActive = `a\nc`;
      expect(partial.exec(wouldOnlyMatchIfDotAllWereActive)).toNotMatch();
    });

    it("should support partial matching of patterns with positive and negative modifiers combined", () => {
      const input = /(?i-s:a.c)suffix/;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({
        characters: ["A", "b", "C", ..."suffix".split("")]
      });

      const wouldOnlyMatchIfDotAllWereActive = `A\nC`;
      expect(partial.exec(wouldOnlyMatchIfDotAllWereActive)).toNotMatch();
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

      const wouldOnlyMatchIfDotAllWereActive = `A\nC`;
      expect(partial.exec(wouldOnlyMatchIfDotAllWereActive)).toNotMatch();
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

    it("should commit to an empty match once real input partially satisfies a lookahead", () => {
      expect(new PartialMatchRegExp(/(?=abc)/).exec("a")).toMatchAt({
        match: "",
        index: 0
      });
    });

    it("should not match a bare lookahead against empty input", () => {
      expect(new PartialMatchRegExp(/(?=abc)/).exec("")).toBeNull();
    });
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookbehind_assertion
  describe("lookbehind assertions", () => {
    it("should support partial matching of positive lookbehind assertions (with caveat that the lookbehind is not partially matched whilst forming)", () => {
      const input = /(?<=foo)bar/;
      const partial = new PartialMatchRegExp(input);
      const string = "fooba";

      for (let i = 3; i < string.length; i++) {
        const partialString = string.slice(0, i);
        const result = partial.exec(partialString);
        expect(result).toMatchAt({
          match: partialString.slice(3),
          index: 3
        });
      }
    });

    it("should support partial matching of negative lookbehind assertions", () => {
      const input = /(?<!foo)bar/;
      const partial = new PartialMatchRegExp(input);
      const string = "ba";

      for (let i = 1; i < string.length; i++) {
        const partialString = string.slice(0, i);
        const result = partial.exec(partialString);
        expect(result).toMatchAt({ match: partialString, index: 0 });
      }

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

    it("should support partial matching of lookbehind assertions with multiline flag", () => {
      const input = /(?<=foo)bar/m;
      const partial = new PartialMatchRegExp(input);
      const string = "abc\nfooba";
      const lookbehindSatisfiedAt = "abc\nfoo".length;

      for (let i = lookbehindSatisfiedAt; i < string.length; i++) {
        const partialString = string.slice(0, i);
        const result = partial.exec(partialString);
        expect(result).toMatchAt({
          match: partialString.slice(lookbehindSatisfiedAt),
          index: lookbehindSatisfiedAt
        });
      }
    });

    it("should keep a satisfied lookbehind empty match when the ignore-case flag affects the lookbehind body", () => {
      expect(new PartialMatchRegExp(/(?<=foo)bar/i).exec("FOO")).toMatchAt({
        match: "",
        index: 3
      });
    });

    it("should keep a satisfied lookbehind empty match with the unicodeSets flag", () => {
      expect(new PartialMatchRegExp(/(?<=[\p{L}])b/v).exec("a")).toMatchAt({
        match: "",
        index: 1
      });
    });

    it("matches a satisfied lookbehind only at the end of the string in multiline mode", () => {
      const partial = new PartialMatchRegExp(/(?<=foo)bar/m);
      expect(partial.exec("foo\nfoo")).toMatchAt({ match: "", index: 7 });
    });

    it("returns null in multiline mode when the lookbehind is not satisfied at the end of the string", () => {
      const partial = new PartialMatchRegExp(/(?<=foo)bar/m);
      expect(partial.exec("foo\nbaz")).toBeNull();
    });

    describe("empty matches", () => {
      it("keeps the empty match once a lookbehind is satisfied by real input", () => {
        const re = new PartialMatchRegExp(/(?<=foo)bar/);
        expect(re.exec("foo")).toMatchAt({ match: "", index: 3 });
        expect(re.exec("xxx")).toBeNull();
        expect(re.exec("foob")).toMatchAt({ match: "b", index: 3 });
      });

      it("matches normally when the only lookbehind is negative", () => {
        const partial = new PartialMatchRegExp(/(?<!foo)bar/);
        expect(partial.exec("bar")).toMatchAt({ match: "bar", index: 0 });
        expect(partial.exec("baz")).toBeNull();
      });

      it("returns null when two required lookbehinds cannot hold at the same position", () => {
        const partial = new PartialMatchRegExp(/(?<=foo)(?<=bar)x/);
        expect(partial.exec("foox")).toBeNull();
      });

      it("keeps the empty match when the satisfied lookbehind is inside a capturing group", () => {
        const partial = new PartialMatchRegExp(/((?<=foo)bar)/);
        expect(partial.exec("foo")).toMatchAt({ match: "", index: 3 });
        expect(partial.exec("xyz")).toBeNull();
      });

      it("returns null for unrelated input, keeping the empty match only for the satisfied-lookbehind branch", () => {
        const partial = new PartialMatchRegExp(/(?<=foo)bar|baz/);
        expect(partial.exec("xyz")).toBeNull();
        expect(partial.exec("b")).toMatchAt({ match: "b", index: 0 });
        expect(partial.exec("foo")).toMatchAt({ match: "", index: 3 });
      });

      it("keeps the empty match when either alternation branch's lookbehind is satisfied, and returns null otherwise", () => {
        const partial = new PartialMatchRegExp(/(?<=foo)x|(?<=bar)y/);
        expect(partial.exec("foo")).toMatchAt({ match: "", index: 3 });
        expect(partial.exec("bar")).toMatchAt({ match: "", index: 3 });
        expect(partial.exec("baz")).toBeNull();
      });

      it("keeps the empty match for every alternative inside a single lookbehind", () => {
        const partial = new PartialMatchRegExp(/(?<=foo|bar)x/);
        expect(partial.exec("foo")).toMatchAt({ match: "", index: 3 });
        expect(partial.exec("bar")).toMatchAt({ match: "", index: 3 });
        expect(partial.exec("baz")).toBeNull();
        expect(partial.exec("foox")).toMatchAt({ match: "x", index: 3 });
      });

      it("returns null when the only lookbehind is nested inside another lookbehind", () => {
        expect(
          new PartialMatchRegExp(/(?<=(?<=a)b)x|(y)/).exec("z")
        ).toBeNull();
      });

      it("returns null when the only lookbehind is inside a negative lookahead", () => {
        expect(
          new PartialMatchRegExp(/(?!(?<=q)u)(a)b|cd/).exec("x")
        ).toBeNull();
      });

      it("returns null when every lookbehind is nested inside another assertion", () => {
        expect(
          new PartialMatchRegExp(/(?:(?<=a(?<=a))|q)(x)y/).exec("z")
        ).toBeNull();
      });

      it("returns null when a lookbehind is nested inside a negative lookbehind", () => {
        expect(
          new PartialMatchRegExp(/(?<=Q)(?<!(?<=a)b)x|(y)/).exec("z")
        ).toBeNull();
      });

      it("keeps the empty match when a real lookbehind is satisfied after one nested inside a negative lookahead", () => {
        expect(
          new PartialMatchRegExp(/(?!(?<=q)u)(a)?(?<=f)b/).exec("f")
        ).toMatchAt({ match: "", index: 1 });
      });

      it("control: returns null for a plain alternation with a capture group", () => {
        expect(new PartialMatchRegExp(/bx|(y)/).exec("z")).toBeNull();
      });

      it("control: returns null for a negative lookahead without a nested lookbehind", () => {
        expect(new PartialMatchRegExp(/(?!u)(a)b|cd/).exec("x")).toBeNull();
      });

      // Documented caveat (README, "Assertions in alternation branches"): when
      // an earlier alternation branch can reach end of input, an assertion
      // satisfied in a later branch does not keep the empty match.
      it("returns null when the satisfied lookbehind is in the second alternation branch", () => {
        expect(new PartialMatchRegExp(/zz|(?<=f)b/).exec("f")).toBeNull();
      });

      it("returns null when the satisfied lookbehind is in the third alternation branch", () => {
        expect(new PartialMatchRegExp(/zz|qq|(?<=f)b/).exec("f")).toBeNull();
      });

      it("returns null when the satisfied lookbehind is inside a nested alternation", () => {
        expect(new PartialMatchRegExp(/(?:zz|(?<=f)b)x/).exec("f")).toBeNull();
      });

      it("returns null when the satisfied lookbehind's branch is anchored to the start of input", () => {
        expect(new PartialMatchRegExp(/zz|^(?<=f)b/).exec("f")).toBeNull();
      });

      it("returns no match when an optional lookbehind body matched zero characters", () => {
        expect(new PartialMatchRegExp(/(?<=a?)foo/).test("xyz")).toBe(false);
      });

      it("returns no match when a star-quantified lookbehind body matched zero characters", () => {
        expect(new PartialMatchRegExp(/(?<=x*)foo/).test("xyz")).toBe(false);
      });

      it("returns no match for an empty lookbehind body", () => {
        expect(new PartialMatchRegExp(/(?<=)foo/).test("xyz")).toBe(false);
      });

      it("keeps the empty match when a lookbehind alternative consumed real input", () => {
        expect(new PartialMatchRegExp(/(?<=a|bb)c/).exec("bb")).toMatchAt({
          match: "",
          index: 2
        });
      });

      it("keeps the empty match when a quantified lookbehind body consumed real input", () => {
        expect(new PartialMatchRegExp(/(?<=a+)b/).exec("aaa")).toMatchAt({
          match: "",
          index: 3
        });
      });

      it("should commit to an empty match when a real newline satisfies ^ in multiline mode", () => {
        expect(new PartialMatchRegExp(/^foo/m).exec("bar\n")).toMatchAt({
          match: "",
          index: 4
        });
      });

      it("should commit to an empty match when a real CRLF satisfies ^ in multiline mode", () => {
        expect(new PartialMatchRegExp(/^foo/m).exec("bar\r\n")).toMatchAt({
          match: "",
          index: 5
        });
      });

      it("should commit to an empty match when a real line separator satisfies ^ in multiline mode", () => {
        expect(new PartialMatchRegExp(/^foo/m).exec("bar\u2028")).toMatchAt({
          match: "",
          index: 4
        });
      });

      it("should commit to an empty match when a real paragraph separator satisfies ^ in multiline mode", () => {
        expect(new PartialMatchRegExp(/^foo/m).exec("bar\u2029")).toMatchAt({
          match: "",
          index: 4
        });
      });

      it("should commit to an empty match when a real word character satisfies a word boundary", () => {
        expect(new PartialMatchRegExp(/\b-foo/).exec("x")).toMatchAt({
          match: "",
          index: 1
        });
      });
    });

    describe("capture groups", () => {
      it("matches correctly when the lookbehind body contains capture groups", () => {
        const partial = new PartialMatchRegExp(/(?<=(a)(b))foo/);
        expect(partial.exec("ab")).toMatchAt({ match: "", index: 2 });
      });

      it("keeps the empty match when the lookbehind consumed a real character while a capture group inside it matched none", () => {
        expect(new PartialMatchRegExp(/(?<=(a?)b)c/).exec("b")).toMatchAt({
          match: "",
          index: 1
        });
      });

      it("reports the correct capture groups when the lookbehind body starts with an empty group", () => {
        const partial = new PartialMatchRegExp(/(?<=()(a))bar/);
        const m = partial.exec("abar");
        expect(m).toMatchAt({ match: "bar", index: 1 });
        expect(m?.[1]).toBe("");
        expect(m?.[2]).toBe("a");
      });
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

    it("should return false/null when input contradicts the start-of-input assertion", () => {
      const re = new PartialMatchRegExp(/^foo/);
      expect(re.test("bar")).toBe(false);
      expect(re.test("xyz")).toBe(false);
      expect(re.exec("bar")).toBeNull();
      expect(re.exec("xyz")).toBeNull();
    });

    it("should return true via test() for every valid prefix of an anchored pattern", () => {
      const re = new PartialMatchRegExp(/^foobar/);
      expect(re.test("f")).toBe(true);
      expect(re.test("fo")).toBe(true);
      expect(re.test("foo")).toBe(true);
      expect(re.test("foob")).toBe(true);
      expect(re.test("fooba")).toBe(true);
      expect(re.test("foobar")).toBe(true);
    });

    it("should return false for the empty string when the anchored pattern does not match empty", () => {
      expect(new PartialMatchRegExp(/^foo/).test("")).toBe(false);
      expect(new PartialMatchRegExp(/^[a-z]+/).test("")).toBe(false);
    });

    it("should return true for the empty string when the anchored pattern matches empty", () => {
      expect(new PartialMatchRegExp(/^a*/).test("")).toBe(true);
      expect(new PartialMatchRegExp(/^x?$/).test("")).toBe(true);
      expect(new PartialMatchRegExp(/^$/).test("")).toBe(true);
    });

    it("should integrate with String.prototype.match(), returning null for non-matching input", () => {
      const re = new PartialMatchRegExp(/^foo/);
      expect("bar".match(re)).toBeNull();
      expect("fo".match(re)).not.toBeNull();
    });

    it("should support partial matching of end-of-input assertions", () => {
      const input = /foo$/;
      const partial = new PartialMatchRegExp(input);
      expect(partial).toMatchPartially({ characters: "foo".split("") });
      expect(partial.exec("foo ")).toNotMatch();
    });

    it("should keep an end-of-input empty match that the original pattern genuinely produces", () => {
      expect(new PartialMatchRegExp(/$/).test("abc")).toBe(true);
      expect(new PartialMatchRegExp(/$/).test("a")).toBe(true);
      expect(new PartialMatchRegExp(/$/).test("")).toBe(true);
      expect(new PartialMatchRegExp(/$/).exec("abc")).toMatchAt({
        match: "",
        index: 3
      });
      expect(new PartialMatchRegExp(/^x*$/).test("xx")).toBe(true);
      expect(new PartialMatchRegExp(/^x*$/).test("")).toBe(true);
    });

    it("should return no match when the input cannot satisfy an anchored pattern", () => {
      expect(new PartialMatchRegExp(/^abc/).test("xy")).toBe(false);
      expect(new PartialMatchRegExp(/a$/).exec("bc")).toBeNull();
    });

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/multiline
    it("should support partial matching of lines in multiline mode", () => {
      const input = /^foo$/gm;
      const partial = new PartialMatchRegExp(input);
      const string = "foo\nfoo";
      const lineLength = "foo".length;

      for (let i = 1; i < string.length; i++) {
        const partialString = string.slice(0, i);
        const result = partial.exec(partialString);
        expect(result).toMatchAt({
          match: partialString.slice(0, lineLength),
          index: 0
        });
        partial.lastIndex = 0;
      }
    });

    it("should not produce a spurious match at a mid-string line boundary", () => {
      expect(new PartialMatchRegExp(/foo/m).exec("abc\nxyz")).toBeNull();
    });

    it("should still find a real match on a later line after an earlier line produces no match", () => {
      expect(new PartialMatchRegExp(/foo/m).exec("abc\nfoo")).toMatchAt({
        match: "foo",
        index: 4
      });
    });

    it("should keep a mid-string line-boundary match that the original pattern genuinely matches", () => {
      expect(new PartialMatchRegExp(/$/m).test("abc\n")).toBe(true);
      expect(new PartialMatchRegExp(/$/m).exec("abc\n")).toMatchAt({
        match: "",
        index: 3
      });
    });

    it("should not treat the start of empty input as commitment in multiline mode", () => {
      expect(new PartialMatchRegExp(/^foo/m).exec("")).toBeNull();
    });

    it("should support partial matching of lines in multiline mode with dotAll flag", () => {
      const input = /^f.o$/gms;
      const partial = new PartialMatchRegExp(input);
      const string = "f\no\nf\no";
      const lineLength = "f\no".length;

      for (let i = 1; i < string.length; i++) {
        const partialString = string.slice(0, i);
        const result = partial.exec(partialString);
        expect(result).toMatchAt({
          match: partialString.slice(0, lineLength),
          index: 0
        });
        partial.lastIndex = 0;
      }
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

      expect(partial.exec("x")).toBeNull();

      for (let i = 2; i < string.length; i++) {
        const partialString = string.slice(0, i);
        const result = partial.exec(partialString);
        expect(result).toMatchAt({ match: partialString.slice(1), index: 1 });
      }

      expect(partial.exec("xfooy")).toMatchAt({ match: "foo", index: 1 });
      expect(partial.exec(" foo ")).toNotMatch();
    });

    it("should not treat empty input as satisfying a word boundary", () => {
      expect(new PartialMatchRegExp(/\bfoo/).exec("")).toBeNull();
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

    it("keeps the empty match for a satisfied lookbehind in a pattern that also uses a backreference", () => {
      expect(
        new PartialMatchRegExp(/(?<=(ab)c)(x*)(?<=\2)y/).exec("abc")
      ).toMatchAt({ match: "", index: 3 });
    });

    it("keeps the empty match when a lookbehind body uses a multi-digit backreference to a nested group", () => {
      expect(
        new PartialMatchRegExp(/(?<=(((((((((a)))))))))b)(k?)(?<=\10)z/).exec(
          "ab"
        )
      ).toMatchAt({ match: "", index: 2 });
    });

    it("keeps the empty match when a lookbehind body contains an octal escape satisfied by real input", () => {
      expect(new PartialMatchRegExp("(a)?(?<=\\12)b").exec("xa\n")).toMatchAt({
        match: "",
        index: 3
      });
    });

    it("keeps the empty match when a negative lookbehind references a group captured by a satisfied lookbehind", () => {
      expect(new PartialMatchRegExp(/(?<=(a)b)(?<!\1)d/).exec("ab")).toMatchAt({
        match: "",
        index: 2
      });
    });

    it("keeps the empty match when a negative lookahead references a group captured by a satisfied lookbehind", () => {
      expect(new PartialMatchRegExp(/(?<=(a)b)(?!\1)d/).exec("ab")).toMatchAt({
        match: "",
        index: 2
      });
    });

    it("returns null when a negative lookbehind referencing a lookbehind's group genuinely fails", () => {
      expect(new PartialMatchRegExp(/(?<=(a)a)(?<!\1)d/).exec("aa")).toBeNull();
    });

    it("should leave backreferences that precede any lookbehind unaffected", () => {
      expect(new PartialMatchRegExp(/(a)\1x/).exec("aa")).toMatchAt({
        match: "aa",
        index: 0
      });
    });

    it("does not let a backreference outside a lookbehind alter that lookbehind's body", () => {
      expect(new PartialMatchRegExp(/(x?)\1(?<=q)r/).exec("q")).toMatchAt({
        match: "",
        index: 1
      });
    });

    it("keeps the empty match when a backreference inside a lookahead is satisfied by real input", () => {
      expect(new PartialMatchRegExp(/(?=(a)\1q)z?/).exec("aa")).toMatchAt({
        match: "",
        index: 0
      });
    });

    it("keeps the empty match from a satisfied lookbehind when a following lookahead contains a backreference", () => {
      expect(new PartialMatchRegExp(/(?<=(a)b)(?=\1q)z?/).exec("aba")).toMatchAt(
        {
          match: "",
          index: 2
        }
      );
    });

    it("keeps the empty match when an octal escape follows a satisfied lookbehind", () => {
      expect(new PartialMatchRegExp("(?<=f)\\12z?").exec("f")).toMatchAt({
        match: "",
        index: 1
      });
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
        const partial = new PartialMatchRegExp(/^squidattack/);
        expect(partial.exec("squid")?.[0]).toBe("squid");
      });

      it("returns null when input diverges from the pattern before end of input (hitEnd=false equivalent)", () => {
        const partial = new PartialMatchRegExp(/^squidattack/);
        expect(partial.exec("squack")).toBeNull();
      });

      it("returns non-empty prefix when input is a prefix of a simple literal (JDK: /^abc/ on 'ab')", () => {
        const partial = new PartialMatchRegExp(/^abc/);
        expect(partial.exec("ab")?.[0]).toBe("ab");
      });

      it("returns null when input diverges early (JDK: /^abc/ on 'ad')", () => {
        const partial = new PartialMatchRegExp(/^abc/);
        expect(partial.exec("ad")).toBeNull();
      });

      it("returns non-empty partial match for a non-anchored pattern occurring mid-string (hitEnd=true via unanchored find)", () => {
        const partial = new PartialMatchRegExp(/catattack/);
        const m = partial.exec("attackattackattackcatatta");
        expect(m).toMatchAt({ match: "catatta", index: 18 });
      });
    });

    // JDK RegExTest.java — caretAtEndTest
    // Java tests that ^ with MULTILINE matches at the start of a new line after \r (bare CR).
    describe("CRLF boundary in multiline mode (JDK caretAtEndTest-inspired)", () => {
      it("should recognise ^ at position 0 and after bare CR in multiline mode", () => {
        // Use "\rfoo" so the second line is non-empty and the engine can find a match there.
        // For zero-length matches, lastIndex must be advanced manually — standard JS pattern.
        const partial = new PartialMatchRegExp(/^x?/gm);
        const m1 = partial.exec("\rfoo");
        expect(m1).toMatchObject({ index: 0 });
        if (m1?.[0] === "") partial.lastIndex++;
        const m2 = partial.exec("\rfoo");
        expect(m2).toMatchObject({ index: 1 });
      });

      it("should match $ before bare CR in multiline mode", () => {
        const partial = new PartialMatchRegExp(/^foo$/m);
        // \r is a line terminator in multiline mode, so "foo" is a complete line
        expect(partial.exec("foo\r")).toMatchAt({ match: "foo", index: 0 });
      });
    });

    // JDK RegExTest.java — wordSearchTest
    // Java's Matcher.find(pos) advances through successive matches by position.
    // The equivalent in JS is advancing lastIndex on a global-flag regex.
    describe("progressive find() via lastIndex (JDK wordSearchTest-inspired)", () => {
      it("should find successive word-prefixed partial matches by advancing lastIndex", () => {
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
        partial.lastIndex = 6;
        const m = partial.exec(input);
        expect(m).toMatchAt({ match: "wor", index: 6 });
      });
    });
  });
});
