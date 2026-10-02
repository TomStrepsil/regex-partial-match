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
