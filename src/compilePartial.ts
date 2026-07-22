import escapeAtom from "./escapeAtom.ts";

const OCCURRENCES_REGEX = /\{\d+,?\d*\}/y;
const NOT_NUMBERS_REGEX = /\D/g;
const ALTERNATION_TO_END_OF_INPUT = "|$(?![\\s\\S]))";
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

function walk(regex: RegExp): { parts: Part[]; groupCount: number } {
  const source = regex.source;
  const isUnicode = regex.unicode || regex.unicodeSets;

  let i = 0;
  let groupCount = 0;

  function extractSlice(length: number): string {
    return source.slice(i, (i += length));
  }

  function process(): Part[] {
    const result: Part[] = [];

    function appendOptional(length: number) {
      result.push("(?:" + extractSlice(length) + ALTERNATION_TO_END_OF_INPUT);
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
              appendOptional(3);
              break;
            case "k": {
              const referenceEnd =
                source[i + 2] === "<" ? source.indexOf(">", i) : -1;
              if (referenceEnd === -1) {
                appendOptional(2);
              } else {
                const start = i;
                const ref = source.slice(i + 3, referenceEnd);
                i = referenceEnd + 1;
                result.push({ ref, start, end: i });
              }
              break;
            }
            case "u":
              if (isUnicode && source[i + 2] === "{") {
                appendOptional(source.indexOf("}", i) - i + 1);
              } else {
                appendOptional(6);
              }
              break;
            case "p":
            case "P":
              if (isUnicode) {
                appendOptional(source.indexOf("}", i) - i + 1);
              } else {
                appendOptional(2);
              }
              break;
            case "x":
              appendOptional(4);
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
              NOT_NUMBERS_REGEX.lastIndex = i + 1;
              const nextNonDigit = NOT_NUMBERS_REGEX.exec(source);
              const start = i;
              const end = nextNonDigit ? nextNonDigit.index : source.length;
              const ref = Number(source.slice(start + 1, end));
              i = end;
              result.push({ ref, start, end });
              break;
            }
            default:
              appendOptional(2);
              break;
          }
          break;
        case "[": {
          let depth = 1,
            j = i + 1;
          while (depth) {
            switch (source[j]) {
              case "\\":
                j += 2;
                continue;
              case "[":
                if (regex.unicodeSets) depth++;
                break;
              case "]":
                depth--;
                break;
            }
            j++;
          }
          appendOptional(j - i);
          break;
        }
        case "|":
        case "^":
        case "*":
        case "+":
        case "?":
        case "$":
          appendRaw(1);
          break;
        case "{": {
          OCCURRENCES_REGEX.lastIndex = i;
          const regExpExecArray = OCCURRENCES_REGEX.exec(source);
          if (regExpExecArray) {
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
                result.push("(?:");
                i += 3;
                result.push(...process(), ALTERNATION_TO_END_OF_INPUT);
                break;
              case "=":
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
                result.push("(?" + source.slice(flagsStart, colonIndex) + ":");
                i = colonIndex + 1;
                result.push(...process(), ")");
                break;
              }
              case "!":
                appendRawGroup(3);
                break;
              case "<":
                switch (source[i + 3]) {
                  case "=":
                  case "!":
                    appendRawGroup(4);
                    break;
                  default:
                    ++groupCount;
                    appendRaw(source.indexOf(">", i) - i + 1);
                    result.push(...process(), ALTERNATION_TO_END_OF_INPUT);
                    break;
                }
                break;
            }
          } else {
            ++groupCount;
            appendRaw(1);
            result.push(...process(), ALTERNATION_TO_END_OF_INPUT);
          }
          break;
        case ")":
          ++i;
          return result;
        default:
          appendOptional(
            isUnicode && (source.codePointAt(i) ?? 0) > 0xffff ? 2 : 1
          );
          break;
      }
    }
    return result;
  }

  return { parts: process(), groupCount };
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
      ? "(?:" + source.slice(part.start, part.end) + ALTERNATION_TO_END_OF_INPUT
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
    .map((atom) => "(?:" + escapeAtom(atom) + ALTERNATION_TO_END_OF_INPUT)
    .join("");
}

export interface DynamicPath {
  originalCaptureScan: RegExp;
  preScan: RegExp;
  expand: (capture: RegExpExecArray) => string;
}

export type CompiledPartial =
  | { kind: "static"; regex: RegExp }
  | { kind: "dynamic"; dynamic: DynamicPath };

export const compilePartial = (regex: RegExp): CompiledPartial => {
  const { parts, groupCount } = walk(regex);

  if (!MAYBE_HAS_BACKREFERENCE.test(regex.source)) {
    return {
      kind: "static",
      regex: new RegExp(render(parts, backrefToken), regex.flags)
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
      regex: new RegExp(render(sanitizedParts, backrefToken), regex.flags)
    };
  }

  return {
    kind: "dynamic",
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
            ? "(?:" + backrefToken(backref) + ALTERNATION_TO_END_OF_INPUT
            : expandCaptured(captured, isUnicode);
        })
    }
  };
};
