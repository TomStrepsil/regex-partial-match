import escapeAtom from "./escapeAtom.ts";

const OCCURRENCES_REGEX = /\{\d+,?\d*\}/y;
const NOT_NUMBERS_REGEX = /\D/g;
const DISJUNCTION_TO_END_OF_INPUT = "|$(?![\\s\\S]))";
const MAYBE_HAS_BACKREFERENCE = /\\[1-9]|\\k</;

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

export type RegexFeature =
  | "patternCharacter"
  | "startAnchor"
  | "endAnchor"
  | "wordBoundary"
  | "nonWordBoundary"
  | "lookahead"
  | "negativeLookahead"
  | "lookbehind"
  | "negativeLookbehind"
  | "backreference"
  | "namedBackreference"
  | "namedGroup"
  | "capturingGroup"
  | "nonCapturingGroup"
  | "modifierGroup"
  | "modifierGroupWithRemoval"
  | "characterClass"
  | "nestedCharacterClass"
  | "classIntersection"
  | "classSubtraction"
  | "disjunction"
  | "quantifier"
  | "unicodePropertyEscape"
  | "characterClassEscape"
  | "controlEscape"
  | "controlLetterEscape"
  | "hexEscapeSequence"
  | "unicodeEscapeSequence"
  | "otherEscape";

function walk(
  regex: RegExp
): { parts: Part[]; groupCount: number; features: Set<RegexFeature> } {
  const source = regex.source;
  const isUnicode = regex.unicode || regex.unicodeSets;

  let i = 0;
  let groupCount = 0;
  const features = new Set<RegexFeature>();

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
              features.add("controlLetterEscape");
              appendOptional(3);
              break;
            case "k": {
              const referenceEnd =
                source[i + 2] === "<" ? source.indexOf(">", i) : -1;
              if (referenceEnd === -1) {
                appendOptional(2);
              } else {
                features.add("namedBackreference");
                const start = i;
                const ref = source.slice(i + 3, referenceEnd);
                i = referenceEnd + 1;
                result.push({ ref, start, end: i });
              }
              break;
            }
            case "u":
              features.add("unicodeEscapeSequence");
              if (isUnicode && source[i + 2] === "{") {
                appendOptional(source.indexOf("}", i) - i + 1);
              } else {
                appendOptional(6);
              }
              break;
            case "p":
            case "P":
              if (isUnicode) {
                features.add("unicodePropertyEscape");
                appendOptional(source.indexOf("}", i) - i + 1);
              } else {
                appendOptional(2);
              }
              break;
            case "x":
              features.add("hexEscapeSequence");
              appendOptional(4);
              break;
            case "b":
              features.add("wordBoundary");
              appendOptional(2);
              break;
            case "B":
              features.add("nonWordBoundary");
              appendOptional(2);
              break;
            case "f":
            case "n":
            case "r":
            case "t":
            case "v":
              features.add("controlEscape");
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
              features.add("backreference");
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
              features.add("characterClassEscape");
              appendOptional(2);
              break;
            default:
              features.add("otherEscape");
              appendOptional(2);
              break;
          }
          break;
        case "[": {
          features.add("characterClass");
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
                  features.add("nestedCharacterClass");
                  depth++;
                }
                break;
              case "]":
                depth--;
                break;
              case "&":
                if (regex.unicodeSets && previousSetOperatorCharacter === "&") {
                  features.add("classIntersection");
                }
                break;
              case "-":
                if (regex.unicodeSets && previousSetOperatorCharacter === "-") {
                  features.add("classSubtraction");
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
          features.add("startAnchor");
          appendRaw(1);
          break;
        case "$":
          features.add("endAnchor");
          appendRaw(1);
          break;
        case "|":
          features.add("disjunction");
          appendRaw(1);
          break;
        case "*":
        case "+":
        case "?":
          features.add("quantifier");
          appendRaw(1);
          break;
        case "{": {
          OCCURRENCES_REGEX.lastIndex = i;
          const regExpExecArray = OCCURRENCES_REGEX.exec(source);
          if (regExpExecArray) {
            features.add("quantifier");
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
                features.add("nonCapturingGroup");
                result.push("(?:");
                i += 3;
                result.push(...process(), DISJUNCTION_TO_END_OF_INPUT);
                break;
              case "=":
                features.add("lookahead");
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
                features.add(
                  modifiers.includes("-")
                    ? "modifierGroupWithRemoval"
                    : "modifierGroup"
                );
                result.push("(?" + modifiers + ":");
                i = colonIndex + 1;
                result.push(...process(), ")");
                break;
              }
              case "!":
                features.add("negativeLookahead");
                appendRawGroup(3);
                break;
              case "<":
                switch (source[i + 3]) {
                  case "=":
                    features.add("lookbehind");
                    appendRawGroup(4);
                    break;
                  case "!":
                    features.add("negativeLookbehind");
                    appendRawGroup(4);
                    break;
                  default:
                    features.add("namedGroup");
                    features.add("capturingGroup");
                    ++groupCount;
                    appendRaw(source.indexOf(">", i) - i + 1);
                    result.push(...process(), DISJUNCTION_TO_END_OF_INPUT);
                    break;
                }
                break;
            }
          } else {
            features.add("capturingGroup");
            ++groupCount;
            appendRaw(1);
            result.push(...process(), DISJUNCTION_TO_END_OF_INPUT );
          }
          break;
        case ")":
          ++i;
          return result;
        default:
          features.add("patternCharacter");
          appendOptional(
            isUnicode && (source.codePointAt(i) ?? 0) > 0xffff ? 2 : 1
          );
          break;
      }
    }
    return result;
  }

  return { parts: process(), groupCount, features };
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
  backrefs: Backreference[]
): string {
  let result = "";
  let cursor = 0;
  for (const { start, end } of backrefs) {
    result += source.slice(cursor, start) + "(?:[\\s\\S]*?)";
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

export type CompiledPartial = (
  | { kind: "static"; regex: RegExp }
  | { kind: "dynamic"; dynamic: DynamicPath }
) & { features: Set<RegexFeature> };

export const compilePartial = (regex: RegExp): CompiledPartial => {
  const { parts, groupCount, features } = walk(regex);

  if (!MAYBE_HAS_BACKREFERENCE.test(regex.source)) {
    return {
      kind: "static",
      regex: new RegExp(render(parts, backrefToken), regex.flags),
      features
    };
  }

  const isUnicode = regex.unicode || regex.unicodeSets;
  const sanitizedParts = isUnicode
    ? parts
    : reclassifyOctalEscapes(parts, regex.source, groupCount);
  const backreferences = sanitizedParts.filter(isBackreference);
  if (backreferences.length === 0) {
    return {
      kind: "static",
      regex: new RegExp(render(sanitizedParts, backrefToken), regex.flags),
      features
    };
  }

  return {
    kind: "dynamic",
    features,
    dynamic: {
      originalCaptureScan: new RegExp(
        spliceOriginalSource(regex.source, backreferences),
        regex.flags
      ),
      preScan: new RegExp(
        render(parts, () => "(?:[\\s\\S]*?)"),
        regex.flags
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
    }
  };
};
