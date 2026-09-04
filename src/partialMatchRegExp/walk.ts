import { DISJUNCTION_TO_END_OF_INPUT, OPTIONAL_ATOM_OPENING } from "./atomSyntax.ts";
import { groupNameOf, decodeGroupName } from "./groupName.ts";
import { FEATURE_BIT } from "./regexFeatures.ts";
import type { Backreference, Part, RawLookaroundInfo } from "./part.ts";

const OCCURRENCES_REGEX = /\{\d+,?\d*\}/y;
const NOT_NUMBERS_REGEX = /\D/g;
const LITERAL_K_ATOM =
  OPTIONAL_ATOM_OPENING + "k" + DISJUNCTION_TO_END_OF_INPUT;

const NO_RAW_LOOKAROUNDS: readonly RawLookaroundInfo[] = [];
const NO_NAMED_GROUP_OPENINGS: readonly string[] = [];

const declaresGroupNamed = (
  closedGroupNames: ReadonlySet<string> | undefined,
  name: string
) => closedGroupNames?.has(decodeGroupName(name)) ?? false;

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
  let closedGroupNumbers: Set<number> | undefined;
  let closedGroupNames: Set<string> | undefined;
  let namedBackreferencesSeen: Array<{ ref: string; forward?: boolean }> | undefined;
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
      const backreference = {
        ref,
        start,
        end,
        forward: !closedGroupNumbers?.has(ref)
      };
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
                const namedBackreference = {
                  ref,
                  start,
                  end: i,
                  forward: !declaresGroupNamed(closedGroupNames, ref)
                };
                result.push(namedBackreference);
                currentRawLookaroundBackreferences?.push(namedBackreference);
                (namedBackreferencesSeen ??= []).push(namedBackreference);
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
                    const groupNumber = ++groupCount;
                    const opening = extractSlice(
                      source.indexOf(">", i) - i + 1
                    );
                    (namedGroupOpenings ??= []).push(opening);
                    const declaredName = decodeGroupName(groupNameOf(opening));
                    result.push(opening);
                    result.push(
                      ...process(withinLookaround, declaresNamedGroup),
                      DISJUNCTION_TO_END_OF_INPUT
                    );
                    (closedGroupNumbers ??= new Set()).add(groupNumber);
                    (closedGroupNames ??= new Set()).add(declaredName);
                    break;
                  }
                }
                break;
            }
          } else {
            featureMask |= FEATURE_BIT.capturingGroup;
            if (withinLookaround) featureMask |= FEATURE_BIT.lookaroundCapture;
            const groupNumber = ++groupCount;
            appendRaw(1);
            result.push(
              ...process(withinLookaround, declaresNamedGroup),
              DISJUNCTION_TO_END_OF_INPUT
            );
            (closedGroupNumbers ??= new Set()).add(groupNumber);
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

  const parts = process(false, declaresNamedGroup);

  if (namedGroupOpenings && namedBackreferencesSeen) {
  const seenOnce = new Set<string>();
    let duplicated: Set<string> | undefined;
    for (const opening of namedGroupOpenings) {
      const name = decodeGroupName(groupNameOf(opening));
      if (seenOnce.has(name)) (duplicated ??= new Set()).add(name);
      else seenOnce.add(name);
    }
    if (duplicated) {
      for (const backreference of namedBackreferencesSeen) {
        if (duplicated.has(decodeGroupName(backreference.ref))) {
          backreference.forward = true;
        }
      }
    }
  }

  return {
    parts,
    groupCount,
    featureMask,
    rawLookarounds: rawLookarounds ?? NO_RAW_LOOKAROUNDS,
    namedGroupOpenings: namedGroupOpenings ?? NO_NAMED_GROUP_OPENINGS
  };
}
