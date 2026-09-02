const OCCURRENCES_REGEX = /\{\d+,?\d*\}/y;
const NOT_NUMBERS_REGEX = /\D/g;
export const DISJUNCTION_TO_END_OF_INPUT = "|$(?![\\s\\S]))";
export const OPTIONAL_ATOM_OPENING = "(?:";
export const NAMED_GROUP_OPENING = "(?<";
const LITERAL_K_ATOM =
  OPTIONAL_ATOM_OPENING + "k" + DISJUNCTION_TO_END_OF_INPUT;

interface NumericBackreference {
  ref: number;
  start: number;
  end: number;
}

interface NamedBackreference {
  ref: string;
  start: number;
  end: number;
}

export type Backreference = NumericBackreference | NamedBackreference;
export type Part = string | Backreference;

export interface RawLookaroundInfo {
  sourceStart: number;
  capturingGroupsOpened: number;
  backreferences: Backreference[];
}

const NO_RAW_LOOKAROUNDS: readonly RawLookaroundInfo[] = [];
const NO_NAMED_GROUP_OPENINGS: readonly string[] = [];

export const groupNameOf = (namedGroupOpening: string): string =>
  namedGroupOpening.slice(NAMED_GROUP_OPENING.length, -1);

export const isBackreference = (part: Part): part is Backreference =>
  typeof part !== "string";

export const isNumericBackreference = (
  part: Part
): part is NumericBackreference =>
  isBackreference(part) && typeof part.ref === "number";

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

const FEATURE_BIT = {} as Record<RegexFeature, number>;
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

export function walk(
  regex: RegExp,
  declaresNamedGroup: boolean
): {
  parts: Part[];
  groupCount: number;
  featureMask: number;
  rawLookarounds: readonly RawLookaroundInfo[];
  namedGroupOpenings: readonly string[];
} {
  const source = regex.source;
  const isUnicode = regex.unicode || regex.unicodeSets;

  let i = 0;
  let groupCount = 0;
  let featureMask = 0;
  let rawLookarounds: RawLookaroundInfo[] | undefined;
  let namedGroupOpenings: string[] | undefined;
  let currentRawLookaroundBackreferences: Backreference[] | undefined;

  function extractSlice(length: number) {
    return source.slice(i, (i += length));
  }

  function process(withinLookaround: boolean, declaresNamedGroup: boolean) {
    const result: Part[] = [];

    function appendOptional(length: number) {
      result.push("(?:" + extractSlice(length) + DISJUNCTION_TO_END_OF_INPUT);
    }

    function appendRaw(length: number) {
      result.push(extractSlice(length));
    }

    function appendDigitRun(forcedRef?: number) {
      featureMask |= FEATURE_BIT.backreference;
      NOT_NUMBERS_REGEX.lastIndex = i + 1;
      const nextNonDigit = NOT_NUMBERS_REGEX.exec(source);
      const start = i;
      const end = nextNonDigit ? nextNonDigit.index : source.length;
      const ref = forcedRef ?? Number(source.slice(start + 1, end));
      i = end;
      const backreference = { ref, start, end };
      result.push(backreference);
      currentRawLookaroundBackreferences?.push(backreference);
    }

    function appendRawLookaround(prefixLength: number) {
      const start = i;
      i += prefixLength;
      const groupCountBefore = groupCount;
      const isOutermost = currentRawLookaroundBackreferences === undefined;
      const backreferences: Backreference[] =
        currentRawLookaroundBackreferences ?? [];
      if (isOutermost) currentRawLookaroundBackreferences = backreferences;
      process(true, declaresNamedGroup);
      if (isOutermost) {
        (rawLookarounds ??= []).push({
          sourceStart: start,
          capturingGroupsOpened: groupCount - groupCountBefore,
          backreferences
        });
        currentRawLookaroundBackreferences = undefined;
      }
      result.push(source.slice(start, i));
    }

    while (i < source.length) {
      switch (source[i]) {
        case "\\":
          switch (source[i + 1]) {
            case "c":
              featureMask |= FEATURE_BIT.controlLetterEscape;
              appendOptional(3);
              break;
            case "k": {
              const referenceEnd =
                source[i + 2] === "<" ? source.indexOf(">", i) : -1;
              if (referenceEnd !== -1 && declaresNamedGroup) {
                featureMask |= FEATURE_BIT.namedBackreference;
                const start = i;
                const ref = source.slice(i + 3, referenceEnd);
                i = referenceEnd + 1;
                const namedBackreference = { ref, start, end: i };
                result.push(namedBackreference);
                currentRawLookaroundBackreferences?.push(namedBackreference);
              } else if (currentRawLookaroundBackreferences) {
                const start = i;
                i += 2;
                currentRawLookaroundBackreferences.push({
                  ref: "",
                  start,
                  end: i
                });
              } else {
                result.push(LITERAL_K_ATOM);
                i += 2;
              }
              break;
            }
            case "u":
              featureMask |= FEATURE_BIT.unicodeEscapeSequence;
              if (isUnicode && source[i + 2] === "{") {
                appendOptional(source.indexOf("}", i) - i + 1);
              } else {
                appendOptional(6);
              }
              break;
            case "p":
            case "P":
              if (isUnicode) {
                featureMask |= FEATURE_BIT.unicodePropertyEscape;
                appendOptional(source.indexOf("}", i) - i + 1);
              } else {
                appendOptional(2);
              }
              break;
            case "x":
              featureMask |= FEATURE_BIT.hexEscapeSequence;
              appendOptional(4);
              break;
            case "b":
              featureMask |= FEATURE_BIT.wordBoundary;
              appendOptional(2);
              break;
            case "B":
              featureMask |= FEATURE_BIT.nonWordBoundary;
              appendOptional(2);
              break;
            case "f":
            case "n":
            case "r":
            case "t":
            case "v":
              featureMask |= FEATURE_BIT.controlEscape;
              appendOptional(2);
              break;
            case "0":
              if (isUnicode) {
                featureMask |= FEATURE_BIT.otherEscape;
                appendOptional(2);
              } else {
                appendDigitRun(0);
              }
              break;
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
              appendDigitRun();
              break;
            case "d":
            case "D":
            case "w":
            case "W":
            case "s":
            case "S":
              featureMask |= FEATURE_BIT.characterClassEscape;
              appendOptional(2);
              break;
            default:
              featureMask |= FEATURE_BIT.otherEscape;
              appendOptional(2);
              break;
          }
          break;
        case "[": {
          featureMask |= FEATURE_BIT.characterClass;
          let depth = 1,
            j = i + 1,
            previousSetOperatorCharacter: string | undefined;
          while (depth) {
            const character = source[j];
            switch (character) {
              case "\\":
                j += 2;
                previousSetOperatorCharacter = undefined;
                continue;
              case "[":
                if (regex.unicodeSets) {
                  featureMask |= FEATURE_BIT.nestedCharacterClass;
                  depth++;
                }
                break;
              case "]":
                depth--;
                break;
              case "&":
                if (regex.unicodeSets && previousSetOperatorCharacter === "&") {
                  featureMask |= FEATURE_BIT.classIntersection;
                }
                break;
              case "-":
                if (regex.unicodeSets && previousSetOperatorCharacter === "-") {
                  featureMask |= FEATURE_BIT.classSubtraction;
                }
                break;
            }
            previousSetOperatorCharacter = character;
            j++;
          }
          appendOptional(j - i);
          break;
        }
        case "^":
          featureMask |= FEATURE_BIT.startAnchor;
          appendRaw(1);
          break;
        case "$":
          featureMask |= FEATURE_BIT.endAnchor;
          appendRaw(1);
          break;
        case "|":
          featureMask |= FEATURE_BIT.disjunction;
          appendRaw(1);
          break;
        case "*":
        case "+":
        case "?":
          featureMask |= FEATURE_BIT.quantifier;
          appendRaw(1);
          break;
        case "{": {
          OCCURRENCES_REGEX.lastIndex = i;
          const regExpExecArray = OCCURRENCES_REGEX.exec(source);
          if (regExpExecArray) {
            featureMask |= FEATURE_BIT.quantifier;
            appendRaw(regExpExecArray[0].length);
          } else {
            appendOptional(1);
          }
          break;
        }
        case "(":
          if (source[i + 1] == "?") {
            switch (source[i + 2]) {
              case ":":
                featureMask |= FEATURE_BIT.nonCapturingGroup;
                result.push("(?:");
                i += 3;
                result.push(
                  ...process(withinLookaround, declaresNamedGroup),
                  DISJUNCTION_TO_END_OF_INPUT
                );
                break;
              case "=":
                featureMask |= FEATURE_BIT.lookahead;
                result.push("(?=");
                i += 3;
                result.push(...process(true, declaresNamedGroup), ")");
                break;
              case "-":
              case "i":
              case "s":
              case "m": {
                const flagsStart = i + 2,
                  colonIndex = source.indexOf(":", flagsStart);
                const modifiers = source.slice(flagsStart, colonIndex);
                featureMask |= modifiers.includes("-")
                  ? FEATURE_BIT.modifierGroupWithRemoval
                  : FEATURE_BIT.modifierGroup;
                result.push("(?" + modifiers + ":");
                i = colonIndex + 1;
                result.push(
                  ...process(withinLookaround, declaresNamedGroup),
                  ")"
                );
                break;
              }
              case "!":
                featureMask |= FEATURE_BIT.negativeLookahead;
                appendRawLookaround(3);
                break;
              case "<":
                switch (source[i + 3]) {
                  case "=":
                    featureMask |= FEATURE_BIT.lookbehind;
                    appendRawLookaround(4);
                    break;
                  case "!":
                    featureMask |= FEATURE_BIT.negativeLookbehind;
                    appendRawLookaround(4);
                    break;
                  default: {
                    featureMask |= FEATURE_BIT.namedGroup;
                    featureMask |= FEATURE_BIT.capturingGroup;
                    if (withinLookaround)
                      featureMask |= FEATURE_BIT.lookaroundCapture;
                    ++groupCount;
                    const opening = extractSlice(
                      source.indexOf(">", i) - i + 1
                    );
                    (namedGroupOpenings ??= []).push(opening);
                    result.push(opening);
                    result.push(
                      ...process(withinLookaround, declaresNamedGroup),
                      DISJUNCTION_TO_END_OF_INPUT
                    );
                    break;
                  }
                }
                break;
            }
          } else {
            featureMask |= FEATURE_BIT.capturingGroup;
            if (withinLookaround) featureMask |= FEATURE_BIT.lookaroundCapture;
            ++groupCount;
            appendRaw(1);
            result.push(
              ...process(withinLookaround, declaresNamedGroup),
              DISJUNCTION_TO_END_OF_INPUT
            );
          }
          break;
        case ")":
          ++i;
          return result;
        default:
          featureMask |= FEATURE_BIT.patternCharacter;
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- i < source.length is the loop invariant, so codePointAt(i) is always defined
          appendOptional(isUnicode && source.codePointAt(i)! > 0xffff ? 2 : 1);
          break;
      }
    }
    return result;
  }

  return {
    parts: process(false, declaresNamedGroup),
    groupCount,
    featureMask,
    rawLookarounds: rawLookarounds ?? NO_RAW_LOOKAROUNDS,
    namedGroupOpenings: namedGroupOpenings ?? NO_NAMED_GROUP_OPENINGS
  };
}
