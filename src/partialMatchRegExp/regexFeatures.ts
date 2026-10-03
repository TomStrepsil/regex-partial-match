type LengthUpToOneBitMask<Counted extends unknown[] = []> =
  Counted["length"] extends 33
    ? never
    : Counted["length"] | LengthUpToOneBitMask<[...Counted, unknown]>;

export const REGEX_FEATURES = [
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
  "nestedCharacterClass",
  "classIntersection",
  "classSubtraction",
  "disjunction",
  "quantifier",
  "unicodePropertyEscape",
  "characterClassEscape",
  "controlEscape",
  "controlLetterEscape",
  "hexEscapeSequence",
  "unicodeEscapeSequence",
  "otherEscape"
] as const satisfies { length: LengthUpToOneBitMask };

export type RegexFeature = (typeof REGEX_FEATURES)[number];

/** @internal */
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

/** @internal */
export function featureSet(mask: number): Set<RegexFeature> {
  const features = new Set<RegexFeature>();
  for (let index = 0; index < REGEX_FEATURES.length; index++) {
    if (mask & (1 << index)) features.add(REGEX_FEATURES[index]);
  }
  return features;
}
