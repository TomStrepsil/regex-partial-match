import { describe, expect, expectTypeOf, it } from "vitest";
import { Feature, featureSet, type RegexFeature } from "./regexFeatures.ts";

const bits: Record<RegexFeature, Feature> = {
  patternCharacter: Feature.patternCharacter,
  startAnchor: Feature.startAnchor,
  endAnchor: Feature.endAnchor,
  wordBoundary: Feature.wordBoundary,
  nonWordBoundary: Feature.nonWordBoundary,
  lookahead: Feature.lookahead,
  negativeLookahead: Feature.negativeLookahead,
  lookbehind: Feature.lookbehind,
  negativeLookbehind: Feature.negativeLookbehind,
  backreference: Feature.backreference,
  namedBackreference: Feature.namedBackreference,
  namedGroup: Feature.namedGroup,
  capturingGroup: Feature.capturingGroup,
  lookaroundCapture: Feature.lookaroundCapture,
  nonCapturingGroup: Feature.nonCapturingGroup,
  modifierGroup: Feature.modifierGroup,
  modifierGroupWithRemoval: Feature.modifierGroupWithRemoval,
  characterClass: Feature.characterClass,
  nestedCharacterClass: Feature.nestedCharacterClass,
  classIntersection: Feature.classIntersection,
  classSubtraction: Feature.classSubtraction,
  disjunction: Feature.disjunction,
  quantifier: Feature.quantifier,
  unicodePropertyEscape: Feature.unicodePropertyEscape,
  characterClassEscape: Feature.characterClassEscape,
  controlEscape: Feature.controlEscape,
  controlLetterEscape: Feature.controlLetterEscape,
  hexEscapeSequence: Feature.hexEscapeSequence,
  unicodeEscapeSequence: Feature.unicodeEscapeSequence,
  otherEscape: Feature.otherEscape
};

describe("Feature, a const enum so the walker's bits inline as numbers and only featureSet holds the names", () => {
  it.each(Object.keys(bits) as RegexFeature[])(
    "sets the one bit featureSet names %s",
    (name) => {
      expect(featureSet(bits[name])).toEqual(new Set([name]));
    }
  );
});

describe("RegexFeature, the names the public type lists, against the Feature enum the walker sets bits from", () => {
  it("names exactly the members of Feature, so neither list can gain an entry the other lacks", () => {
    expectTypeOf<keyof typeof Feature>().toEqualTypeOf<RegexFeature>();
  });
});
