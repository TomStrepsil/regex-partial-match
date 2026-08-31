import escapeAtom from "./escapeAtom.ts";

const OCCURRENCES_REGEX = /\{\d+,?\d*\}/y;
const NOT_NUMBERS_REGEX = /\D/g;
const MAYBE_HAS_BACKREFERENCE_REGEX = /\\[1-9]|\\k</;
const DISJUNCTION_TO_END_OF_INPUT = "|$(?![\\s\\S]))";
const ANY_CAPTURED_TEXT = "(?:[\\s\\S]*?)";

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

type Backreference = NumericBackreference | NamedBackreference;
type Part = string | Backreference;

const isBackreference = (part: Part): part is Backreference =>
  typeof part !== "string";

const isNumericBackreference = (part: Part): part is NumericBackreference =>
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

const FEATURE_BIT = Object.fromEntries(
  REGEX_FEATURES.map((feature, index) => [feature, 1 << index])
) as Record<RegexFeature, number>;

function walk(regex: RegExp): {
  parts: Part[];
  groupCount: number;
  featureMask: number;
} {
  const source = regex.source;
  const isUnicode = regex.unicode || regex.unicodeSets;

  let i = 0;
  let groupCount = 0;
  let featureMask = 0;
  function extractSlice(length: number): string {
    return source.slice(i, (i += length));
  }

  function process(): Part[] {
    const result: Part[] = [];

    function appendOptional(length: number) {
      result.push("(?:" + extractSlice(length) + DISJUNCTION_TO_END_OF_INPUT);
    }

    function appendRaw(length: number) {
      result.push(extractSlice(length));
    }

    function appendRawGroup(prefixLength: number) {
      const start = i;
      i += prefixLength;
      process();
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
              if (referenceEnd === -1) {
                appendOptional(2);
              } else {
                featureMask |= FEATURE_BIT.namedBackreference;
                const start = i;
                const ref = source.slice(i + 3, referenceEnd);
                i = referenceEnd + 1;
                result.push({ ref, start, end: i });
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
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9": {
              featureMask |= FEATURE_BIT.backreference;
              NOT_NUMBERS_REGEX.lastIndex = i + 1;
              const nextNonDigit = NOT_NUMBERS_REGEX.exec(source);
              const start = i;
              const end = nextNonDigit ? nextNonDigit.index : source.length;
              const ref = Number(source.slice(start + 1, end));
              i = end;
              result.push({ ref, start, end });
              break;
            }
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
                result.push(...process(), DISJUNCTION_TO_END_OF_INPUT);
                break;
              case "=":
                featureMask |= FEATURE_BIT.lookahead;
                result.push("(?=");
                i += 3;
                result.push(...process(), ")");
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
                result.push(...process(), ")");
                break;
              }
              case "!":
                featureMask |= FEATURE_BIT.negativeLookahead;
                appendRawGroup(3);
                break;
              case "<":
                switch (source[i + 3]) {
                  case "=":
                    featureMask |= FEATURE_BIT.lookbehind;
                    appendRawGroup(4);
                    break;
                  case "!":
                    featureMask |= FEATURE_BIT.negativeLookbehind;
                    appendRawGroup(4);
                    break;
                  default:
                    featureMask |= FEATURE_BIT.namedGroup;
                    featureMask |= FEATURE_BIT.capturingGroup;
                    ++groupCount;
                    appendRaw(source.indexOf(">", i) - i + 1);
                    result.push(...process(), DISJUNCTION_TO_END_OF_INPUT);
                    break;
                }
                break;
            }
          } else {
            featureMask |= FEATURE_BIT.capturingGroup;
            ++groupCount;
            appendRaw(1);
            result.push(...process(), DISJUNCTION_TO_END_OF_INPUT);
          }
          break;
        case ")":
          ++i;
          return result;
        default:
          featureMask |= FEATURE_BIT.patternCharacter;
          appendOptional(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- the loop only runs while i indexes into source, so this narrows the type rather than guarding a reachable case
            isUnicode && source.codePointAt(i)! > 0xffff ? 2 : 1
          );
          break;
      }
    }

    return result;
  }

  return { parts: process(), groupCount, featureMask };
}

function render(
  parts: Part[],
  renderBackref: (backref: Backreference) => string
): string {
  return parts
    .map((part) => (isBackreference(part) ? renderBackref(part) : part))
    .join("");
}

function backrefToken(backref: Backreference): string {
  return isNumericBackreference(backref)
    ? "\\" + String(backref.ref)
    : "\\k<" + backref.ref + ">";
}

function reclassifyOctalEscapes(
  parts: Part[],
  source: string,
  groupCount: number
): Part[] {
  return parts.map((part) =>
    isNumericBackreference(part) && part.ref > groupCount
      ? "(?:" + source.slice(part.start, part.end) + DISJUNCTION_TO_END_OF_INPUT
      : part
  );
}

function spliceOriginalSource(
  source: string,
  ascendingBackrefs: Backreference[]
): string {
  let result = "";
  let cursor = 0;
  for (const { start, end } of ascendingBackrefs) {
    result += source.slice(cursor, start) + ANY_CAPTURED_TEXT;
    cursor = end;
  }
  return result + source.slice(cursor);
}

function expandCaptured(value: string, isUnicode: boolean): string {
  return (isUnicode ? Array.from(value) : value.split(""))
    .map((atom) => "(?:" + escapeAtom(atom) + DISJUNCTION_TO_END_OF_INPUT)
    .join("");
}

export interface DynamicPath {
  originalCaptureScan: RegExp;
  preScan: RegExp;
  expand: (capture: RegExpExecArray) => string;
}

abstract class Compiled {
  private _features?: ReadonlySet<RegexFeature>;

  constructor(private readonly _featureMask: number) {}

  get features(): ReadonlySet<RegexFeature> {
    return (this._features ??= new Set(
      REGEX_FEATURES.filter(
        (_, index) => (this._featureMask & (1 << index)) !== 0
      )
    ));
  }
}

class CompiledStatic extends Compiled {
  readonly kind = "static";

  constructor(
    readonly regex: RegExp,
    featureMask: number
  ) {
    super(featureMask);
  }
}

class CompiledDynamic extends Compiled {
  readonly kind = "dynamic";

  constructor(
    readonly dynamic: DynamicPath,
    featureMask: number
  ) {
    super(featureMask);
  }
}

export type CompiledPartial = CompiledStatic | CompiledDynamic;

export const compilePartial = (regex: RegExp): CompiledPartial => {
  const { parts, groupCount, featureMask } = walk(regex);
  const flags = regex.flags;

  if (!MAYBE_HAS_BACKREFERENCE_REGEX.test(regex.source)) {
    return new CompiledStatic(
      new RegExp(render(parts, backrefToken), flags),
      featureMask
    );
  }

  const isUnicode = regex.unicode || regex.unicodeSets;
  const sanitisedParts = isUnicode
    ? parts
    : reclassifyOctalEscapes(parts, regex.source, groupCount);
  const backreferences = sanitisedParts.filter(isBackreference);
  if (backreferences.length === 0) {
    return new CompiledStatic(
      new RegExp(render(sanitisedParts, backrefToken), flags),
      featureMask
    );
  }

  return new CompiledDynamic(
    {
      originalCaptureScan: new RegExp(
        spliceOriginalSource(regex.source, backreferences),
        flags
      ),
      preScan: new RegExp(
        render(parts, () => ANY_CAPTURED_TEXT),
        flags
      ),
      expand: (capture) =>
        render(parts, (backref) => {
          const captured = isNumericBackreference(backref)
            ? capture[backref.ref]
            : capture.groups?.[backref.ref];
          return captured === undefined
            ? "(?:" + backrefToken(backref) + DISJUNCTION_TO_END_OF_INPUT
            : expandCaptured(captured, isUnicode);
        })
    },
    featureMask
  );
};
