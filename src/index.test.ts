import { describe, it, expect } from "vitest";
import createPartialMatchRegex from "./index.ts";

describe("regexp-partial-match", () => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags
  describe("supporting flags", () => {
    it("should preserve the flags of the original regex", () => {
      let input = /hello world/dgimsuy;
      let partial = createPartialMatchRegex(input);
      expect(partial.flags).toEqual(input.flags);

      input = /hello world/dgimsvy;
      partial = createPartialMatchRegex(input);
      expect(partial.flags).toEqual(input.flags);
    });
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Literal_character
  describe("literal character expressions", () => {
    const string = "hello world";
    const input = new RegExp(string);
    const partial = createPartialMatchRegex(input);

    it("should support partial matching of literal character expressions", () => {
      for (let i = 1; i < string.length; i++) {
        const partialString = string.substring(0, i);
        const result = partial.exec(partialString);
        expect(result).toMatchAt({ match: partialString, index: 0 });
      }
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
      const partial = createPartialMatchRegex(new RegExp(string));
      const result = partial.exec(string);
      expect(result).toMatchAt({ match: string, index: 0 });
    });

    it("should support partial matching of grapheme clusters", () => {
      const input = /ásuffix/u;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["a", "́", ..."suffix".split("")]
      });
    });
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_escape
  describe("character escape expressions", () => {
    it("should support partial matching of whitespace character escape expressions", () => {
      for (const character of ["\f", "\n", "\r", "\t", "\v"]) {
        const input = new RegExp(character + "+suffix");
        const partial = createPartialMatchRegex(input);
        expect(partial).toMatchPartially({
          characters: [character, ..."suffix".split("")]
        });
      }
    });

    it("should support partial matching of control character escape expressions", () => {
      const input = /\cj\cMsuffix/;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["\n", "\r", ..."suffix".split("")]
      });
    });

    it("should support partial matching of null character escape expressions", () => {
      const input = /\0suffix/;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["\0", ..."suffix".split("")]
      });
    });

    it("should support partial matching of hexadecimal character escape expressions", () => {
      const input = /\x61\x62\x63suffix/;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["a", "b", "c", ..."suffix".split("")]
      });
    });

    it("should support partial matching of utf-16 character escape expressions", () => {
      const input = /\u0061\u0062\u0063suffix/;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["a", "b", "c", ..."suffix".split("")]
      });
    });

    it("should support partial matching of unicode character escape expressions with braces", () => {
      const input = /\u{2622}suffix/u;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["☢", ..."suffix".split("")]
      });
    });

    it("should support partial matching of astral plane character escape expressions with braces (with caveat that surrogate pairs do not match independently in unicode mode)", () => {
      const input = /\u{1F600}suffix/u;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["😀", ..."suffix".split("")] // "😀".length === 2
      });
    });

    it("should support partial matching of lone unicode property escape expressions", () => {
      const input = /\p{Lowercase_Letter}+suffix/u;
      const partial = createPartialMatchRegex(input);
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
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["1", "a", "c", "-", "å", "ä", "ö", ..."suffix".split("")]
      });
      expect(partial.exec("A")).toNotMatch();
    });

    it("should support partial matching of unicode property escape expressions with key/value", () => {
      const input = /\p{General_Category=Letter}+suffix/u;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["A", "b", "c", "å", "ä", "ö", ..."suffix".split("")]
      });
      expect(partial.exec("1")).toNotMatch();
    });

    it("should support partial matching of negated unicode property escape expressions with key/value", () => {
      const input = /\P{General_Category=Letter}+suffix/u;
      const partial = createPartialMatchRegex(input);
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
        const partial = createPartialMatchRegex(input);
        for (const char of chars) {
          const result = partial.exec(char + "suf");
          expect(result).toMatchAt({ match: char + "suf", index: 0 });
        }
      });
    });

    it("should not match with characters outside of the class expression", () => {
      const input = /[a-c]suffix/;
      const partial = createPartialMatchRegex(input);
      expect(partial.exec("dsuf")).toNotMatch();
    });
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Disjunction
  describe("disjunctions", () => {
    it("should support partial matching of disjunctions", () => {
      const input = /cat|dog/;
      const partial = createPartialMatchRegex(input);
      const animals = ["cat", "dog"];

      for (const animal of animals) {
        for (let i = 1; i < animal.length; i++) {
          const partialString = animal.substring(0, i);
          const result = partial.exec(partialString);
          expect(result).toMatchAt({ match: partialString, index: 0 });
        }
      }
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
        name: "more-than-n greedy quantifiers",
        input: /ab{2,}c/,
        testStrings: ["ab", "abb", "abbbc"],
        negativeCase: "abc"
      },
      {
        name: "more-than-n non-greedy quantifiers",
        input: /ab{2,}?c/,
        testStrings: ["ab", "abb", "abbbc"],
        negativeCase: "abc"
      },
      {
        name: "between-n-and-m greedy quantifiers",
        input: /a.{2,4}b/,
        testStrings: ["a", "aX", "aXX", "aXXX", "aXXXX", "aXXXXb"],
        negativeCase: "aXXXXXb"
      },
      {
        name: "between-n-and-m non-greedy quantifiers",
        input: /a.{2,4}?b/,
        testStrings: ["a", "aX", "aXX", "aXXX", "aXXXX", "aXXXXb"],
        negativeCase: "aXXXXXb"
      }
    ].forEach(({ name, input, testStrings, negativeCase }) => {
      it(`should support partial matching of patterns with ${name}`, () => {
        const partial = createPartialMatchRegex(input);
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
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["a", "あ", "c", ..."suffix".split("")]
      });
      expect(partial.exec("1")).toNotMatch();
    });

    it("should support partial matching of grapheme clusters / string properties (with caveat that individual code points do not match independently)", () => {
      const input = /[\p{RGI_Emoji_Flag_Sequence}]suffix/v;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["🇺🇳", ..."suffix".split("")] // "🇺🇳".length === 4
      });
      expect(partial.exec("A")).toNotMatch();
    });

    it("should support partial matching of grapheme clusters / string properties including string subtraction (with caveat that individual code points do not match independently)", () => {
      const input = /[\p{RGI_Emoji_Flag_Sequence}--\q{🇺🇸|🇷🇺}]suffix/v;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["🇺🇦", ..."suffix".split("")] // "🇺🇦".length === 4
      });
      expect(partial.exec("🇺🇸")).toNotMatch();
      expect(partial.exec("🇷🇺")).toNotMatch();
    });

    it("should support partial matching of unicode set expressions using key/value syntax", () => {
      const input = /[\p{Script=Hiragana}]+suffix/v;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["あ", "い", "う", ..."suffix".split("")]
      });
      expect(partial.exec("A")).toNotMatch();
    });

    it("should support partial matching of negated unicode set expressions", () => {
      const input = /[\P{Script=Hiragana}]+suffix/v;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["A", "b", "1", "_", "å", "ä", "ö", ..."suffix".split("")]
      });
      expect(partial.exec("あ")).toNotMatch();
    });

    it("should support partial matching of negated unicode set expressions using complement syntax", () => {
      const input = /[^\p{Script=Hiragana}]+suffix/v;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["A", "b", "1", "_", "å", "ä", "ö", ..."suffix".split("")]
      });
      expect(partial.exec("あ")).toNotMatch();
    });

    it("should support empty sets as a non-match in unicode set character class expressions", () => {
      const input = /[[]]suffix/v;
      const partial = createPartialMatchRegex(input);
      const result = partial.exec("a");
      expect(result).toNotMatch();
    });

    it("should support partial matching of negated empty sets in unicode set character class expressions", () => {
      const input = /[^]+suffix/v;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["A", "b", "1", "-", "ä", "π", "α", ..."suffix".split("")]
      });
    });

    it("should support partial matching of subtraction in unicode set character class expressions", () => {
      const input = /[\p{Script_Extensions=Greek}--π]+suffix/v;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["α", "β", "γ", "δ", "ε", ..."suffix".split("")]
      });
      expect(partial.exec("π")).toNotMatch();
    });

    it("should support partial matching of intersection in unicode set character class expressions", () => {
      const input = /[\p{Script_Extensions=Greek}&&[αβγδε]]+suffix/v;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["α", "β", "γ", "δ", "ε", ..."suffix".split("")]
      });
    });

    it("should support partial matching of union in unicode set character class expressions", () => {
      const input = /[[\p{Script_Extensions=Greek}][xyz]]+suffix/v;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["α", "γ", "δ", "ε", "x", "y", "z", ..."suffix".split("")]
      });
    });

    it("should support partial matching of negated subtraction in unicode set character class expressions", () => {
      const input = /[^\p{Script_Extensions=Greek}--π]+suffix/v;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["A", "b", "1", "_", "ä", "ö", "π", ..."suffix".split("")]
      });
      expect(partial.exec("α")).toNotMatch();
    });

    it("should support partial matching of nested subtraction in unicode set character class expressions", () => {
      const input = /[\p{Script_Extensions=Greek}--[αβγ]]+suffix/v;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["δ", "ε", "ζ", "η", "θ", ..."suffix".split("")]
      });
    });

    it("should support partial matching of negated nested subtraction in unicode set character class expressions", () => {
      const input = /[^\p{Script_Extensions=Greek}--[αβγ]]+suffix/v;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["A", "b", "ä", "ö", "α", "γ", ..."suffix".split("")]
      });
      expect(partial.exec("δ")).toNotMatch();
    });

    it("should support partial matching of multiple nested subtraction in unicode set character class expressions", () => {
      const input = /^[[a-z]--[[aeiou]--[eo]]]+suffix/v; // i.e., [[a-z]--[[aeiou]--[eo]]] = [[a-z]--[aiu]] = [b-hj-tv-z]
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["b", "c", "g", "h", "j", "k", ..."suffix".split("")]
      });
      expect(partial).toNotMatchPartially({
        characters: ["a", "i", "u", ..."suffix".split("")]
      });
    });

    it("should support partial matching of subtraction with property escapes in unicode set character class expressions", () => {
      const input = /^[\p{General_Category=Letter}--\p{Script=Greek}]+suffix/v;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["A", "b", "c", "å", "ä", "ö", ..."suffix".split("")]
      });
      expect(partial).toNotMatchPartially({
        characters: ["α", "β", "γ", "δ", "ε", ..."suffix".split("")]
      });
    });

    it("should support partial matching of nested subtraction resulting in empty set in unicode set character class expressions", () => {
      const input = /^[[a-z]--[[[aeiou]--[aeiou]]--[]]]+suffix/v; // i.e., [[a-z]--[[[aeiou]--[aeiou]]--[]]] = [[a-z]--[[]]] = [a-z]
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["a", "b", "c", "d", "e", "f", "g", ..."suffix".split("")]
      });
      expect(partial).toNotMatchPartially({
        characters: ["[", "]", ..."suffix".split("")]
      });
    });

    it("should support partial matching of subtraction in unicode set character class expressions with escaped brackets", () => {
      const input = /^[[\[\]a-z]--[[\[]--[\[]]]suffix/v; // i.e., [[\[\]a-z]--[[\[]--[\[]]] = [[\[\]a-z]--[]] = [\[\]a-z]
      const partial = createPartialMatchRegex(input);
      for (const character of ["[", "]", "a", "b", "c", "d", "e", "f", "g"]) {
        expect(partial).toMatchPartially({
          characters: [character, ..."suffix".split("")]
        });
      }
    });

    it("should support partial matching of property subtraction in unicode set character class expressions", () => {
      const input = /^[[\p{Letter}]--[\p{Mark}]]+suffix/v;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["A", "é", "Ω", "Ж", "中", ..."suffix".split("")]
      });
      expect(partial).toNotMatchPartially({
        characters: ["́", "̀", "̂", "̃", "̄", ..."suffix".split("")]
      });
    });

    it("should support partial matching of doubly-nested property subtraction in unicode set character class expressions", () => {
      const input = /^[[\p{Letter}]--[[\p{Script=Latin}]--[aeiou]]]+suffix/v;
      const partial = createPartialMatchRegex(input);
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
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["A", "Z", "Ω", "Ж", ..."suffix".split("")]
      });
      expect(partial).toNotMatchPartially({
        characters: ["a", "z", "β", ..."suffix".split("")]
      });
    });

    it("should support numeric properties with nested subtraction in unicode set character class expressions", () => {
      const input = /^[[\p{Number}]--[[\p{Decimal_Number}]--[0-9]]]+suffix/v; //
      const partial = createPartialMatchRegex(input);
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
      const partial = createPartialMatchRegex(input);
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
      const partial = createPartialMatchRegex(input);
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
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["A", "b", "C", ..."suffix".split("")]
      });
      expect(partial.exec("ABCs")).toMatchAt({ match: "ABCs", index: 0 });
      expect(partial.exec("ABCs")).not.toMatchAt({ match: "ABCS", index: 0 });
    });

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/dotAll
    it("should support partial matching of patterns with a dot-all modifier", () => {
      const input = /(?s:a.c)suf.ix/;
      const partial = createPartialMatchRegex(input);
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
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["a", "b", "c", "\n", ..."suffix".split("")]
      });
    });

    it("should support partial matching of patterns with multiple modifiers", () => {
      const input = /(?ism:^a.c$)\nsuffix/;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["A", "\n", "C", "\n", ..."suffix".split("")]
      });
      expect(partial.exec(`ABC\nS`)).not.toMatchAt({
        match: "ABC\nS",
        index: 0
      }); // s not modified to case-insensitive
      expect(
        createPartialMatchRegex(/(?ism:^abc$).suffix/).exec(`ABC\nS`)
      ).not.toMatchAt({ match: "ABC\nS", index: 0 }); // . not modified to match newlines
      expect(
        createPartialMatchRegex(/(?ism:^abc$)\n^suffix/).exec(`ABC\nS`)
      ).not.toMatchAt({ match: "ABC\ns", index: 0 }); // ^ not modified to multiline
    });

    it("should support partial matching of patterns with a negating case insensitive modifier", () => {
      const input = /(?-i:abc)suffix/i;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["a", "b", "c", ..."SuFfIx".split("")]
      });
      expect(partial.exec("A")).toNotMatch();
    });

    it("should support partial matching of patterns with a negating dot-all modifier", () => {
      const input = /(?-s:a.c)suffix/s;
      const partial = createPartialMatchRegex(input);
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
      const partial = createPartialMatchRegex(input);
      expect(partial.exec(`\nabc\nsuffix`)).toNotMatch();
    });

    it("should support partial matching of patterns with multiple negating modifiers", () => {
      const input = /(?-ism:^a.c$)\nsuffix/;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["a", ".", "c"]
      });
      expect(partial.exec(`abc\n`)).toNotMatch(); // multiline disabled
      expect(partial.exec(`Abc`)).toNotMatch(); // case-insensitive disabled
      expect(partial.exec(`a\nc`)).toNotMatch(); // dot-all disabled
    });

    it("should support partial matching of patterns with positive and negative modifiers combined", () => {
      const input = /(?i-s:a.c)suffix/;
      const partial = createPartialMatchRegex(input);
      expect(partial).toMatchPartially({
        characters: ["A", "b", "C", ..."suffix".split("")]
      });
      expect(partial.exec(`A\nC`)).toNotMatch(); // dot-all disabled
    });

    it("should support partial matching of patterns with multiple positive and negative modifiers combined", () => {
      const input = /(?im-s:^a.c$)\nsuffix/;
      const partial = createPartialMatchRegex(input);
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
        const partial = createPartialMatchRegex(input);
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
      const partial = createPartialMatchRegex(input);
      const string = "foobar";

      for (let i = 1; i < string.length; i++) {
        const partialString = string.substring(0, i);
        const result = partial.exec(partialString);
        expect(result).toMatchAt({
          match: partialString.slice(0, 3),
          index: 0
        });
      }
    });

    it("should support partial matching of negative lookahead assertions", () => {
      const input = /foo(?!bar)/;
      const partial = createPartialMatchRegex(input);
      const string = "foobaz";

      for (let i = 1; i < string.length; i++) {
        const partialString = string.substring(0, i);
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
      const partial = createPartialMatchRegex(input);
      const string = "fooba";

      for (let i = 3; i < string.length; i++) {
        const partialString = string.substring(0, i);
        const result = partial.exec(partialString);
        expect(result).toMatchAt({ match: partialString.slice(3), index: 3 });
      }
    });

    it("should support partial matching of negative lookbehind assertions", () => {
      const input = /(?<!foo)bar/;
      const partial = createPartialMatchRegex(input);
      const string = "ba";

      for (let i = 1; i < string.length; i++) {
        const partialString = string.substring(0, i);
        const result = partial.exec(partialString);
        expect(result).toMatchAt({ match: partialString, index: 0 });
      }

      expect(partial.exec("fo")).toNotMatch();
      expect(partial.exec("foo")).toNotMatch();
      expect(partial.exec("foob")).toNotMatch();
    });

    it("should support partial matching of lookbehind assertions with lookahead assertions (with caveat that the lookbehind is not partially matched whilst forming)", () => {
      const input = /(?<=foo)bar(?=baz)/;
      const partial = createPartialMatchRegex(input);
      const string = "foobarba";

      for (let i = 3; i < string.length; i++) {
        const partialString = string.substring(0, i);
        const result = partial.exec(partialString);
        expect(result).toMatchAt({
          match: partialString.slice(3, 6),
          index: 3
        });
      }
    });

    it("should support partial matching of positive and negative lookahead assertions", () => {
      const input = /(?!.*#)(?=.*:)foo/;
      const partial = createPartialMatchRegex(input);
      const testStrings = ["foobar", "foob:"];

      for (const string of testStrings) {
        for (let i = 1; i < string.length; i++) {
          const partialString = string.substring(0, i);
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
      const partial = createPartialMatchRegex(input);
      const string = "abcsuffix";
      for (let i = 2; i < string.length; i++) {
        const partialString = string.substring(0, i);
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
      const partial = createPartialMatchRegex(input);
      const testStrings = ["fooXY:A", "barXYZ:B"];

      for (const string of testStrings) {
        for (let i = 1; i < string.length; i++) {
          const partialString = string.substring(0, i);
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
      const partial = createPartialMatchRegex(input);
      const string = "foo";

      for (let i = 1; i < string.length; i++) {
        const partialString = string.substring(0, i);
        const result = partial.exec(partialString);
        expect(result).toMatchAt({ match: partialString, index: 0 });
      }

      expect(partial.exec(" foo")).toNotMatch();
    });

    it("should support partial matching of end-of-input assertions", () => {
      const input = /foo$/;
      const partial = createPartialMatchRegex(input);
      const string = "foo";

      for (let i = 1; i < string.length; i++) {
        const partialString = string.substring(0, i);
        const result = partial.exec(partialString);
        expect(result).toMatchAt({ match: partialString, index: 0 });
      }

      expect(partial.exec("foo ")).toNotMatch(); // N.B. test passes without "appendRaw" case for "$", since `(?:$|$)` is equivalent to `$` - but the latter is more succinct
    });

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/multiline
    it("should support partial matching of lines in multiline mode", () => {
      const input = /^foo$/gm;
      const partial = createPartialMatchRegex(input);
      const string = "foo\nfoo";

      for (let i = 1; i < string.length; i++) {
        const partialString = string.substring(0, i);
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
      const partial = createPartialMatchRegex(input);
      const string = "f\no\nf\no";

      for (let i = 1; i < string.length; i++) {
        const partialString = string.substring(0, i);
        const result = partial.exec(partialString);
        expect(result).toMatchAt({
          match: partialString.slice(0, 3), // always matches up to "foo", stripping newline, before wrapping to next line
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
      const partial = createPartialMatchRegex(input);
      const string = "foo";

      for (let i = 1; i < string.length; i++) {
        const partialString = string.substring(0, i);
        const result = partial.exec(partialString);
        expect(result).toMatchAt({ match: partialString, index: 0 });
      }

      expect(partial.exec(" foo")).toMatchAt({ match: "foo", index: 1 });
      expect(partial.exec("foo ")).toMatchAt({ match: "foo", index: 0 });
      expect(partial.exec("xfoo")).toNotMatch();
      expect(partial.exec("foox")).toNotMatch();
    });

    it("should support partial matching of non-word boundary assertions", () => {
      const input = /\Bfoo\B/;
      const partial = createPartialMatchRegex(input);
      const string = "xfooy";

      for (let i = 1; i < string.length; i++) {
        const partialString = string.substring(0, i);
        const result = partial.exec(partialString);
        expect(result).toMatchAt({ match: partialString.slice(1), index: 1 });
      }

      expect(partial.exec("xfooy")).toMatchAt({ match: "foo", index: 1 });
      expect(partial.exec(" foo ")).toNotMatch();
    });
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Backreference
  describe.only("backreferences", () => {
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
        const partial = createPartialMatchRegex(input);
        for (const testString of testStrings) {
          const result = partial.exec(testString);
          expect(result).toMatchAt({ match: testString, index: 0 });
          expect(result).toMatchObject(expected(testString));
        }
      });
    });
  });
});
