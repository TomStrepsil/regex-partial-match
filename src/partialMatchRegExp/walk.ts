import { NOT_NUMBERS_REGEX, LITERAL_K } from "./constants.ts";
import {
  asOptionalAtom,
  DISJUNCTION_TO_END_OF_INPUT,
  GROUP_CLOSING,
  LOOKAHEAD_OPENING,
  START_ANCHOR
} from "./atomSyntax.ts";
import { groupNameOf, decodeGroupName } from "./groupName.ts";
import { legacyEscapeAtoms } from "./legacyEscape.ts";
import { FEATURE_BIT } from "./regexFeatures.ts";
import {
  type Backreference,
  type Part,
  type RawLookaroundInfo
} from "./part.ts";
import appendMultilineCaret, { type LookaheadSpan } from "./appendMultilineCaret.ts";
import { OCCURRENCES_REGEX, isQuantifierAhead } from "./quantifier.ts";
import {
  CASE_INSENSITIVE,
  MULTILINE,
  UNICODE,
  UNICODE_SETS,
  WITHIN_LOOKAROUND,
  scopeOf,
  scopeWithModifiers
} from "./scope.ts";

export function walk(
  regex: RegExp,
  declaresNamedGroup: boolean,
  groupLimit: number
): {
  parts: Part[];
  featureMask: number;
  rawLookarounds: readonly RawLookaroundInfo[];
  namedGroupOpenings: readonly string[];
} {
  const source = regex.source;

  let i = 0;
  let groupCount = 0;
  let featureMask = 0;
  let rawLookarounds: RawLookaroundInfo[] | undefined;
  let namedGroupOpenings: string[] | undefined;
  let closedGroupNumbers: Set<number> | undefined;
  let closedGroupNames: Set<string> | undefined;
  let namedBackreferencesSeen:
    | Array<{ ref: string; forward?: boolean }>
    | undefined;
  let currentRawLookaroundBackreferences: Backreference[] | undefined;
  let lastBodyAlternates = false;

  function extractSlice(length: number) {
    return source.slice(i, (i += length));
  }

  function process(scope: number) {
    const result: Part[] = [];
    let lastGroupOpen = -1;
    let lastGroupClose = -1;
    let lastGroupScope = scope;
    let lastGroupAlternates = false;
    let lookaheadSpans: LookaheadSpan[] | undefined;
    let alternates = false;

    function appendOptional(length: number) {
      result.push(asOptionalAtom(extractSlice(length)));
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
        forward: !closedGroupNumbers?.has(ref),
        caseInsensitive: (scope & CASE_INSENSITIVE) !== 0
      };
      currentRawLookaroundBackreferences?.push(backreference);
      if (ref >= 1 && ref <= groupLimit) {
        result.push(backreference);
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
      const isOutermost = currentRawLookaroundBackreferences === undefined;
      const backreferences: Backreference[] =
        currentRawLookaroundBackreferences ?? [];
      if (isOutermost) currentRawLookaroundBackreferences = backreferences;
      process(scope | WITHIN_LOOKAROUND);
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
                  forward: !closedGroupNames?.has(decodeGroupName(ref)),
                  caseInsensitive: (scope & CASE_INSENSITIVE) !== 0
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
                  end: i,
                  caseInsensitive: (scope & CASE_INSENSITIVE) !== 0
                });
              } else {
                i += 2;
                result.push(asOptionalAtom(LITERAL_K));
              }
              break;
            }
            case "u":
              featureMask |= FEATURE_BIT.unicodeEscapeSequence;
              if (scope & UNICODE && source[i + 2] === "{") {
                appendOptional(source.indexOf("}", i) - i + 1);
              } else {
                appendOptional(6);
              }
              break;
            case "p":
            case "P":
              if (scope & UNICODE) {
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
              if (scope & UNICODE) {
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
                if (scope & UNICODE_SETS) {
                  featureMask |= FEATURE_BIT.nestedCharacterClass;
                  depth++;
                }
                break;
              case "]":
                depth--;
                break;
              case "&":
                if (scope & UNICODE_SETS && previousSetOperatorCharacter === "&") {
                  featureMask |= FEATURE_BIT.classIntersection;
                }
                break;
              case "-":
                if (scope & UNICODE_SETS && previousSetOperatorCharacter === "-") {
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
          i++;
          if (scope & MULTILINE) {
            lastGroupClose = appendMultilineCaret(
              result,
              lastGroupOpen,
              lastGroupClose,
              lastGroupScope,
              lastGroupAlternates,
              lookaheadSpans,
              scope
            );
          } else {
            result.push(START_ANCHOR);
          }
          break;
        case "$":
          featureMask |= FEATURE_BIT.endAnchor;
          appendRaw(1);
          break;
        case "|":
          featureMask |= FEATURE_BIT.disjunction;
          alternates = true;
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
        case "(": {
          let opening: string | undefined;
          let groupScope = scope;
          let closing = DISJUNCTION_TO_END_OF_INPUT;
          let groupNumber = 0;
          let declaredName: string | undefined;
          if (source[i + 1] == "?") {
            switch (source[i + 2]) {
              case ":":
                featureMask |= FEATURE_BIT.nonCapturingGroup;
                opening = extractSlice(3);
                break;
              case "=": {
                featureMask |= FEATURE_BIT.lookahead;
                i += 3;
                const body = process(scope | WITHIN_LOOKAROUND);
                if (
                  scope & MULTILINE &&
                  body[0] === START_ANCHOR &&
                  !lastBodyAlternates &&
                  !isQuantifierAhead(source, i)
                ) {
                  body.shift();
                  lastGroupClose = appendMultilineCaret(
                    result,
                    lastGroupOpen,
                    lastGroupClose,
                    lastGroupScope,
                    lastGroupAlternates,
                    lookaheadSpans,
                    scope
                  );
                }
                const lookaheadOpen = result.length;
                const lookaheadClose = lookaheadOpen + body.length + 1;
                (lookaheadSpans ??= []).push([lookaheadOpen, lookaheadClose]);
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
                    ? FEATURE_BIT.modifierGroup
                    : FEATURE_BIT.modifierGroupWithRemoval;
                groupScope = scopeWithModifiers(scope, modifiers);
                closing = GROUP_CLOSING;
                opening = extractSlice(colonIndex + 1 - i);
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
                  default:
                    featureMask |= FEATURE_BIT.namedGroup;
                    featureMask |= FEATURE_BIT.capturingGroup;
                    if (scope & WITHIN_LOOKAROUND)
                      featureMask |= FEATURE_BIT.lookaroundCapture;
                    groupNumber = ++groupCount;
                    opening = extractSlice(source.indexOf(">", i) - i + 1);
                    (namedGroupOpenings ??= []).push(opening);
                    declaredName = decodeGroupName(groupNameOf(opening));
                    break;
                }
                break;
            }
          } else {
            featureMask |= FEATURE_BIT.capturingGroup;
            if (scope & WITHIN_LOOKAROUND)
              featureMask |= FEATURE_BIT.lookaroundCapture;
            groupNumber = ++groupCount;
            opening = extractSlice(1);
          }
          if (opening === undefined) break;
          const body = process(groupScope);
          if (body[0] === START_ANCHOR && !lastBodyAlternates) {
            if (isQuantifierAhead(source, i)) {
              if (!(groupScope & MULTILINE)) closing = GROUP_CLOSING;
              else if (closing !== GROUP_CLOSING)
                body[0] = asOptionalAtom(START_ANCHOR);
            } else if (groupScope & MULTILINE) {
              body.shift();
              lastGroupClose = appendMultilineCaret(
                result,
                lastGroupOpen,
                lastGroupClose,
                lastGroupScope,
                lastGroupAlternates,
                lookaheadSpans,
                scope
              );
            } else if (!(scope & MULTILINE)) {
              result.push(START_ANCHOR);
              body.shift();
            }
          }
          lastGroupOpen = result.length;
          lastGroupClose = lastGroupOpen + body.length + 1;
          lastGroupScope = groupScope;
          lastGroupAlternates = lastBodyAlternates;
          result.push(opening, ...body, closing);
          if (groupNumber) (closedGroupNumbers ??= new Set()).add(groupNumber);
          if (declaredName !== undefined)
            (closedGroupNames ??= new Set()).add(declaredName);
          break;
        }
        case ")":
          ++i;
          lastBodyAlternates = alternates;
          return result;
        default:
          featureMask |= FEATURE_BIT.patternCharacter;
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- i < source.length is the loop invariant, so codePointAt(i) is always defined
          appendOptional(scope & UNICODE && source.codePointAt(i)! > 0xffff ? 2 : 1);
          break;
      }
    }
    lastBodyAlternates = alternates;
    return result;
  }

  const parts = process(scopeOf(regex));

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
    featureMask,
    rawLookarounds: rawLookarounds ?? [],
    namedGroupOpenings: namedGroupOpenings ?? []
  };
}
