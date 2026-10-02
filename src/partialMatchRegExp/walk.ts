import {
  NOT_NUMBERS_REGEX,
  LITERAL_BACKSLASH,
  LITERAL_K
} from "./constants.ts";
import { MAYBE_HAS_BACKREFERENCE_REGEX } from "./compilePartial/constants.ts";
import {
  asOptionalAtom,
  isWordBoundaryAtom,
  DISJUNCTION_TO_END_OF_INPUT,
  END_ANCHOR,
  isRawLookaround,
  GROUP_CLOSING,
  LOOKAHEAD_OPENING,
  START_ANCHOR
} from "./atomSyntax.ts";
import { legacyEscapeAtoms } from "./legacyEscape.ts";
import { Feature } from "./featureMask.ts";
import type { Backreference, Part } from "./part.ts";
import {
  ON_ALTERNATIVE,
  ON_CARET,
  ON_END,
  ON_GROUP,
  ON_LOOKAHEAD,
  type CaretHook,
  type CaretRecorder
} from "./caretFrame.ts";
import type {
  BackreferenceRecorder,
  BackreferencesHook
} from "./compilePartial/compiled.ts";
import type {
  RawLookaroundInfo,
  RawReference
} from "./hitEnd/rawLookaroundInfo.ts";
import { BACKREFERENCES_MODULE, CARETS_MODULE } from "./moduleHooks.ts";
import { OCCURRENCES_REGEX } from "./quantifier.ts";
import {
  MULTILINE,
  UNICODE,
  UNICODE_SETS,
  WITHIN_GROUP,
  WITHIN_LOOKAROUND,
  WITHIN_RAW_LOOKAROUND,
  scopeOf
} from "./scope.ts";

const ASCII_LETTER = /[a-z]/iy;
const TWO_HEX_DIGITS = /[0-9a-f]{2}/iy;
const FOUR_HEX_DIGITS = /[0-9a-f]{4}/iy;

export interface Hooks {
  caret?: CaretHook;
  backreferences?: BackreferencesHook;
  modifiers?: (scope: number, modifiers: string) => number;
}

function matchesAt(source: string, start: number, pattern: RegExp) {
  pattern.lastIndex = start;
  return pattern.test(source);
}

const isZeroWidth = (part: Part) =>
  typeof part === "string" &&
  (part === START_ANCHOR ||
    part === END_ANCHOR ||
    isWordBoundaryAtom(part) ||
    isRawLookaround(part));

export function walk(
  regex: RegExp,
  declaresNamedGroup: boolean,
  groupLimit: number,
  caretRecorder: CaretRecorder | undefined,
  backreferenceRecorder: BackreferenceRecorder | undefined,
  withModifiers: Hooks["modifiers"]
): {
  parts: Part[];
  featureMask: number;
  needs: number;
  rawLookarounds: RawLookaroundInfo[] | undefined;
} {
  const source = regex.source;

  let i = 0;
  let groupCount = 0;
  let featureMask = 0;
  let needs = 0;
  let rawLookaroundCount = 0;
  let outermostRawLookaroundCount = 0;
  let rawLookarounds: RawLookaroundInfo[] | undefined;
  let rawReferences: RawReference[] | undefined;
  let lastBodyRunsOut = false;

  function extractSlice(length: number) {
    return source.slice(i, (i += length));
  }

  function process(scope: number) {
    const result: Part[] = [];
    const caretFrame = caretRecorder?.(result, scope);
    let alternativeStart = 0;
    let alternativeRunsOut = false;
    let everyAlternativeRunsOut = true;

    function appendOptional(length: number) {
      if (result.length === alternativeStart) alternativeRunsOut = true;
      result.push(asOptionalAtom(extractSlice(length)));
    }

    function appendRaw(length: number) {
      result.push(extractSlice(length));
    }

    function appendBackreference(backreference: Backreference) {
      if (backreferenceRecorder)
        backreferenceRecorder.backreference(backreference, scope);
      else if (!(scope & WITHIN_RAW_LOOKAROUND)) needs |= BACKREFERENCES_MODULE;
      result.push(backreference);
    }

    function appendDigitRun(forcedRef?: number) {
      if (result.length === alternativeStart) alternativeRunsOut = true;
      featureMask |= Feature.backreference;
      NOT_NUMBERS_REGEX.lastIndex = i + 1;
      const nextNonDigit = NOT_NUMBERS_REGEX.exec(source);
      const start = i;
      const end = nextNonDigit ? nextNonDigit.index : source.length;
      const ref = forcedRef ?? Number(source.slice(start + 1, end));
      i = end;
      if (scope & WITHIN_RAW_LOOKAROUND)
        (rawReferences ??= []).push({ ref, start, end });
      if (ref >= 1 && ref <= groupLimit) {
        appendBackreference({ ref });
        return;
      }
      for (const atom of legacyEscapeAtoms(source.slice(start + 1, end))) {
        result.push(asOptionalAtom(atom));
      }
    }

    function appendRawLookaround(prefixLength: number) {
      const start = i;
      i += prefixLength;
      const groupCountBefore = groupCount;
      rawLookaroundCount++;
      process(scope | WITHIN_LOOKAROUND | WITHIN_RAW_LOOKAROUND);
      if (!(scope & WITHIN_RAW_LOOKAROUND)) {
        const capturingGroupsOpened = groupCount - groupCountBefore;
        if (
          rawReferences ||
          (capturingGroupsOpened &&
            MAYBE_HAS_BACKREFERENCE_REGEX.test(source))
        ) {
          (rawLookarounds ??= [])[outermostRawLookaroundCount] = {
            sourceStart: start,
            capturingGroupsOpened,
            references: rawReferences ?? []
          };
          rawReferences = undefined;
        }
        outermostRawLookaroundCount++;
      }
      result.push(source.slice(start, i));
    }

    while (i < source.length) {
      switch (source[i]) {
        case "\\":
          switch (source[i + 1]) {
            case "c":
              if (scope & UNICODE || matchesAt(source, i + 2, ASCII_LETTER)) {
                featureMask |= Feature.controlLetterEscape;
                appendOptional(3);
              } else {
                featureMask |= Feature.otherEscape;
                i++;
                if (result.length === alternativeStart)
                  alternativeRunsOut = true;
                result.push(asOptionalAtom(LITERAL_BACKSLASH));
              }
              break;
            case "k": {
              const referenceEnd =
                source[i + 2] === "<" ? source.indexOf(">", i) : -1;
              if (referenceEnd !== -1 && declaresNamedGroup) {
                featureMask |= Feature.namedBackreference;
                const start = i;
                const ref = source.slice(i + 3, referenceEnd);
                i = referenceEnd + 1;
                if (result.length === alternativeStart)
                  alternativeRunsOut = true;
                if (scope & WITHIN_RAW_LOOKAROUND)
                  (rawReferences ??= []).push({ ref, start, end: i });
                appendBackreference({ ref });
              } else if (scope & WITHIN_RAW_LOOKAROUND) {
                (rawReferences ??= []).push({ ref: "", start: i, end: i + 2 });
                i += 2;
              } else {
                i += 2;
                if (result.length === alternativeStart)
                  alternativeRunsOut = true;
                result.push(asOptionalAtom(LITERAL_K));
              }
              break;
            }
            case "u":
              if (
                scope & UNICODE ||
                matchesAt(source, i + 2, FOUR_HEX_DIGITS)
              ) {
                featureMask |= Feature.unicodeEscapeSequence;
                appendOptional(
                  source[i + 2] === "{" ? source.indexOf("}", i) - i + 1 : 6
                );
              } else {
                featureMask |= Feature.otherEscape;
                appendOptional(2);
              }
              break;
            case "p":
            case "P":
              if (scope & UNICODE) {
                featureMask |= Feature.unicodePropertyEscape;
                appendOptional(source.indexOf("}", i) - i + 1);
              } else {
                appendOptional(2);
              }
              break;
            case "x":
              if (scope & UNICODE || matchesAt(source, i + 2, TWO_HEX_DIGITS)) {
                featureMask |= Feature.hexEscapeSequence;
                appendOptional(4);
              } else {
                featureMask |= Feature.otherEscape;
                appendOptional(2);
              }
              break;
            case "b":
              featureMask |= Feature.wordBoundary;
              appendOptional(2);
              break;
            case "B":
              featureMask |= Feature.nonWordBoundary;
              appendOptional(2);
              break;
            case "f":
            case "n":
            case "r":
            case "t":
            case "v":
              featureMask |= Feature.controlEscape;
              appendOptional(2);
              break;
            case "0":
              if (scope & UNICODE) {
                featureMask |= Feature.otherEscape;
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
              featureMask |= Feature.characterClassEscape;
              appendOptional(2);
              break;
            default:
              featureMask |= Feature.otherEscape;
              appendOptional(2);
              break;
          }
          break;
        case "[": {
          featureMask |= Feature.characterClass;
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
                if (scope & UNICODE_SETS) {
                  featureMask |= Feature.nestedCharacterClass;
                  depth++;
                }
                break;
              case "]":
                depth--;
                break;
              case "&":
                if (
                  scope & UNICODE_SETS &&
                  previousSetOperatorCharacter === "&"
                ) {
                  featureMask |= Feature.classIntersection;
                }
                break;
              case "-":
                if (
                  scope & UNICODE_SETS &&
                  previousSetOperatorCharacter === "-"
                ) {
                  featureMask |= Feature.classSubtraction;
                }
                break;
            }
            previousSetOperatorCharacter = character;
            j++;
          }
          appendOptional(j - i);
          break;
        }
        case "^": {
          featureMask |= Feature.startAnchor;
          i++;
          const leadsAlternative = result.length === alternativeStart;
          if (caretFrame) caretFrame(ON_CARET);
          else {
            if (
              !(scope & WITHIN_RAW_LOOKAROUND) &&
              (scope & (WITHIN_GROUP | WITHIN_LOOKAROUND) ||
                (scope & MULTILINE &&
                  !result.slice(alternativeStart).every(isZeroWidth)))
            )
              needs |= CARETS_MODULE;
            result.push(START_ANCHOR);
          }
          if (leadsAlternative) alternativeStart = result.length;
          break;
        }
        case "$":
          featureMask |= Feature.endAnchor;
          appendRaw(1);
          break;
        case "|":
          featureMask |= Feature.disjunction;
          caretFrame?.(ON_ALTERNATIVE);
          everyAlternativeRunsOut &&=
            alternativeRunsOut || result.length === alternativeStart;
          alternativeRunsOut = false;
          alternativeStart = result.length + 1;
          appendRaw(1);
          break;
        case "*":
        case "+":
        case "?":
          featureMask |= Feature.quantifier;
          appendRaw(1);
          break;
        case "{": {
          OCCURRENCES_REGEX.lastIndex = i;
          const regExpExecArray = OCCURRENCES_REGEX.exec(source);
          if (regExpExecArray) {
            featureMask |= Feature.quantifier;
            appendRaw(regExpExecArray[0].length);
          } else {
            appendOptional(1);
          }
          break;
        }
        case "(": {
          let opening: string | undefined;
          let groupScope = scope;
          let closing = DISJUNCTION_TO_END_OF_INPUT;
          let groupNumber = 0;
          if (source[i + 1] == "?") {
            switch (source[i + 2]) {
              case ":":
                featureMask |= Feature.nonCapturingGroup;
                opening = extractSlice(3);
                break;
              case "=": {
                featureMask |= Feature.lookahead;
                i += 3;
                const body = process(scope | WITHIN_LOOKAROUND);
                caretFrame?.(ON_LOOKAHEAD, body, scope, source, i);
                result.push(LOOKAHEAD_OPENING, ...body, GROUP_CLOSING);
                break;
              }
              case "-":
              case "i":
              case "s":
              case "m": {
                const flagsStart = i + 2,
                  colonIndex = source.indexOf(":", flagsStart);
                const modifiers = source.slice(flagsStart, colonIndex);
                const removalIndex = modifiers.indexOf("-");
                featureMask |=
                  removalIndex === -1 || removalIndex === modifiers.length - 1
                    ? Feature.modifierGroup
                    : Feature.modifierGroupWithRemoval;
                groupScope = withModifiers?.(scope, modifiers) ?? scope;
                closing = GROUP_CLOSING;
                opening = extractSlice(colonIndex + 1 - i);
                break;
              }
              case "!":
                featureMask |= Feature.negativeLookahead;
                appendRawLookaround(3);
                break;
              case "<":
                switch (source[i + 3]) {
                  case "=":
                    featureMask |= Feature.lookbehind;
                    appendRawLookaround(4);
                    break;
                  case "!":
                    featureMask |= Feature.negativeLookbehind;
                    appendRawLookaround(4);
                    break;
                  default:
                    featureMask |= Feature.namedGroup;
                    featureMask |= Feature.capturingGroup;
                    if (scope & WITHIN_LOOKAROUND)
                      featureMask |= Feature.lookaroundCapture;
                    groupNumber = ++groupCount;
                    opening = extractSlice(source.indexOf(">", i) - i + 1);
                    break;
                }
                break;
            }
          } else {
            featureMask |= Feature.capturingGroup;
            if (scope & WITHIN_LOOKAROUND)
              featureMask |= Feature.lookaroundCapture;
            groupNumber = ++groupCount;
            opening = extractSlice(1);
          }
          if (opening === undefined) break;
          const opensAlternative = result.length === alternativeStart;
          const rawLookaroundsBefore = rawLookaroundCount;
          const body = process(groupScope | WITHIN_GROUP);
          const runsOut = lastBodyRunsOut;
          const containsRawLookaround =
            rawLookaroundCount !== rawLookaroundsBefore;
          const caretGroup = caretFrame?.(
            ON_GROUP,
            body,
            groupScope,
            source,
            i,
            closing,
            containsRawLookaround
          );
          if (caretGroup) closing = caretGroup.closing;
          if (!containsRawLookaround && runsOut && !caretGroup?.forced) {
            closing = GROUP_CLOSING;
            if (opensAlternative && !caretGroup?.stays)
              alternativeRunsOut = true;
          } else if (containsRawLookaround)
            closing = DISJUNCTION_TO_END_OF_INPUT;
          result.push(opening, ...body, closing);
          if (groupNumber)
            backreferenceRecorder?.groupClosed(groupNumber, opening);
          break;
        }
        case ")":
          ++i;
          caretFrame?.(ON_END);
          lastBodyRunsOut =
            everyAlternativeRunsOut &&
            (alternativeRunsOut || result.length === alternativeStart);
          return result;
        default:
          featureMask |= Feature.patternCharacter;
          appendOptional(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- i < source.length is the loop invariant, so codePointAt(i) is always defined
            scope & UNICODE && source.codePointAt(i)! > 0xffff ? 2 : 1
          );
          break;
      }
    }
    caretFrame?.(ON_END);
    lastBodyRunsOut =
      everyAlternativeRunsOut &&
      (alternativeRunsOut || result.length === alternativeStart);
    return result;
  }

  const parts = process(scopeOf(regex));

  return { parts, featureMask, needs, rawLookarounds };
}
