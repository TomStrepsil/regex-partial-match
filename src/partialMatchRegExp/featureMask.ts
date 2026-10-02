import { REGEX_FEATURES, type RegexFeature } from "./regexFeatures.ts";

export const enum Feature {
  patternCharacter = 1 << 0,
  startAnchor = 1 << 1,
  endAnchor = 1 << 2,
  wordBoundary = 1 << 3,
  nonWordBoundary = 1 << 4,
  lookahead = 1 << 5,
  negativeLookahead = 1 << 6,
  lookbehind = 1 << 7,
  negativeLookbehind = 1 << 8,
  backreference = 1 << 9,
  namedBackreference = 1 << 10,
  namedGroup = 1 << 11,
  capturingGroup = 1 << 12,
  lookaroundCapture = 1 << 13,
  nonCapturingGroup = 1 << 14,
  modifierGroup = 1 << 15,
  modifierGroupWithRemoval = 1 << 16,
  characterClass = 1 << 17,
  nestedCharacterClass = 1 << 18,
  classIntersection = 1 << 19,
  classSubtraction = 1 << 20,
  disjunction = 1 << 21,
  quantifier = 1 << 22,
  unicodePropertyEscape = 1 << 23,
  characterClassEscape = 1 << 24,
  controlEscape = 1 << 25,
  controlLetterEscape = 1 << 26,
  hexEscapeSequence = 1 << 27,
  unicodeEscapeSequence = 1 << 28,
  otherEscape = 1 << 29
}

export function featureSet(mask: number): Set<RegexFeature> {
  const features = new Set<RegexFeature>();
  for (let index = 0; index < REGEX_FEATURES.length; index++) {
    if (mask & (1 << index)) features.add(REGEX_FEATURES[index]);
  }
  return features;
}
