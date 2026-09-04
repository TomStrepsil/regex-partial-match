type LengthUpToOneBitMask<Counted extends unknown[] = []> =
  Counted["length"] extends 33
    ? never
    : Counted["length"] | LengthUpToOneBitMask<[...Counted, unknown]>;

const REGEX_FEATURES = [
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

export const FEATURE_BIT = {} as Record<RegexFeature, number>;
for (let index = 0; index < REGEX_FEATURES.length; index++) {
  FEATURE_BIT[REGEX_FEATURES[index]] = 1 << index;
}

export function hasFeature(mask: number, feature: RegexFeature): boolean {
  return (mask & FEATURE_BIT[feature]) !== 0;
}

export function featureSet(mask: number): Set<RegexFeature> {
  const features = new Set<RegexFeature>();
  for (let index = 0; index < REGEX_FEATURES.length; index++) {
    if (mask & (1 << index)) features.add(REGEX_FEATURES[index]);
  }
  return features;
}
