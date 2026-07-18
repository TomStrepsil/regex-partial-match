const occurrencesRegex = /\{\d+,?\d*\}/y;
const notNumbersRegex = /\D/g;

const alternationToEndOfInput = "|$(?![\\s\\S]))";

type SourcePart =
  | string
  | { plain: string; injected: string | (() => string) };

export function buildPartialSource(regex: RegExp): {
  partial: RegExp;
  detector: {
    regex: RegExp;
    groupIndices: number[];
  } | null;
} {
  const source = regex.source;
  const isUnicode = regex.unicode || regex.unicodeSets;
  const markerGroupIndices: number[] = [];
  const injectedGroupNumbers: number[] = [];
  const backrefs: { start: number; end: number; number: number }[] = [];
  let i = 0;
  let groupCount = 0;
  let originalGroupCount = 0;

  function extractSlice(length: number): string {
    return source.slice(i, (i += length));
  }

  function process(verbatim = false): SourcePart[] {
    const parts: SourcePart[] = [];

    function appendOptional(length: number): void {
      parts.push("(?:" + extractSlice(length) + alternationToEndOfInput);
    }

    function appendRaw(length: number): void {
      parts.push(extractSlice(length));
    }

    function appendNegativeLookaround(prefixLength: number): void {
      const start = i;
      i += prefixLength;
      process(true);
      const end = i;
      parts.push({
        plain: source.slice(start, end),
        injected: () => renumberBackrefs(start, end)
      });
    }

    while (i < source.length) {
      switch (source[i]) {
        case "\\":
          switch (source[i + 1]) {
            case "c":
              appendOptional(3);
              break;
            case "k":
              const referenceEnd =
                source[i + 2] === "<" ? source.indexOf(">", i) : -1;
              appendOptional(referenceEnd === -1 ? 2 : referenceEnd - i + 1);
              break;
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
            case "b":
              if (verbatim) {
                appendOptional(2);
              } else {
                markerGroupIndices.push(++groupCount);
                parts.push({
                  plain: "(?:" + extractSlice(2) + alternationToEndOfInput,
                  injected: "(?:\\b(?:(?<=(\\w))|)" + alternationToEndOfInput
                });
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
            case "9": {
              notNumbersRegex.lastIndex = i + 1;
              const nextNonDigit = notNumbersRegex.exec(source);
              const end = nextNonDigit ? nextNonDigit.index : source.length;
              const start = i;
              backrefs.push({
                start,
                end,
                number: Number(source.slice(start + 1, end))
              });
              i = end;
              parts.push({
                plain:
                  "(?:" + source.slice(start, end) + alternationToEndOfInput,
                injected: () =>
                  "(?:" + renumberBackrefs(start, end) + alternationToEndOfInput
              });
              break;
            }
            default:
              appendOptional(2);
              break;
          }
          break;
        case "[": {
          let depth = 1,
            escaped = false,
            j = i + 1;
          while (depth) {
            switch (source[j++]) {
              case "\\":
                escaped = !escaped;
                continue;
              case "[":
                if (!escaped && regex.unicodeSets) depth++;
                break;
              case "]":
                if (!escaped) depth--;
                break;
            }
            escaped = false;
          }
          appendOptional(j - i);
          break;
        }
        case "^":
          if (regex.multiline && !verbatim) {
            markerGroupIndices.push(++groupCount);
            parts.push({
              plain: extractSlice(1),
              injected: "^(?:(?<=([\\n\\r\\u2028\\u2029]))|)"
            });
          } else {
            appendRaw(1);
          }
          break;
        case "|":
        case "*":
        case "+":
        case "?":
        case "$":
          appendRaw(1);
          break;
        case "{": {
          occurrencesRegex.lastIndex = i;
          const regExpExecArray = occurrencesRegex.exec(source);
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
              case ":": {
                parts.push("(?:");
                i += 3;
                parts.push(...process(verbatim), alternationToEndOfInput);
                break;
              }
              case "=": {
                i += 3;
                if (verbatim) {
                  parts.push("(?=", ...process(true), ")");
                } else {
                  markerGroupIndices.push(++groupCount);
                  parts.push(
                    { plain: "(?=", injected: "(?=(" },
                    ...process(verbatim),
                    { plain: ")", injected: "))" }
                  );
                }
                break;
              }
              case "-":
              case "i":
              case "s":
              case "m": {
                const temp = i + 2,
                  temp2 = source.indexOf(":", temp);
                parts.push("(?" + source.slice(temp, temp2) + ":");
                i = temp2 + 1;
                parts.push(...process(verbatim), ")");
                break;
              }
              case "!":
                appendNegativeLookaround(3);
                break;
              case "<":
                switch (source[i + 3]) {
                  case "=": {
                    const temp = i;
                    i += 4;
                    if (verbatim) {
                      process(true);
                      parts.push(source.slice(temp, i));
                    } else {
                      markerGroupIndices.push(++groupCount);
                      process(true);
                      const bodyStart = temp + 4;
                      const bodyEnd = i - 1;
                      parts.push({
                        plain: source.slice(temp, i),
                        injected: () =>
                          "(?<=(" + renumberBackrefs(bodyStart, bodyEnd) + "))"
                      });
                    }
                    break;
                  }
                  case "!":
                    appendNegativeLookaround(4);
                    break;
                  default: {
                    appendRaw(source.indexOf(">", i) - i + 1);
                    injectedGroupNumbers[++originalGroupCount] = ++groupCount;
                    parts.push(...process(verbatim), alternationToEndOfInput);
                    break;
                  }
                }
                break;
            }
          } else {
            appendRaw(1);
            injectedGroupNumbers[++originalGroupCount] = ++groupCount;
            parts.push(...process(verbatim), alternationToEndOfInput);
          }
          break;
        case ")":
          ++i;
          return parts;
        default:
          appendOptional(
            isUnicode && (source.codePointAt(i) ?? 0) > 0xffff ? 2 : 1
          );
          break;
      }
    }
    return parts;
  }

  function renumberBackrefs(start: number, end: number): string {
    let rewritten = "",
      cursor = start;
    for (const backref of backrefs) {
      const injectedNumber = injectedGroupNumbers.at(backref.number);
      if (
        injectedNumber !== undefined &&
        backref.start >= start &&
        backref.end <= end
      ) {
        rewritten +=
          source.slice(cursor, backref.start) + "\\" + String(injectedNumber);
        cursor = backref.end;
      }
    }
    return rewritten + source.slice(cursor, end);
  }

  const parts = process();
  let plain = "";
  for (const part of parts) {
    plain += typeof part === "string" ? part : part.plain;
  }

  const partial = new RegExp(plain, regex.flags);
  if (markerGroupIndices.length === 0) {
    return { partial, detector: null };
  }
  let injected = "";
  for (const part of parts) {
    if (typeof part === "string") {
      injected += part;
      continue;
    }
    injected +=
      typeof part.injected === "string" ? part.injected : part.injected();
  }
  return {
    partial,
    detector: {
      regex: new RegExp(injected, regex.flags.replace(/[gy]/g, "") + "y"),
      groupIndices: markerGroupIndices
    }
  };
}

/**
 * Transforms a regular expression to support partial matching.
 *
 * This function wraps each atomic element of the regex pattern in a non-capturing group
 * with an alternation to true-end-of-input (`$(?![\s\S])`), allowing the pattern to
 * match prefixes of the original pattern. This enables validation of incomplete input
 * strings.
 *
 * The sentinel `$(?![\s\S])` differs from a bare `$` in that it fires only at the
 * genuine end of the string. A bare `$` fires before a terminal `\n` even without
 * the `m` flag, and before every `\n` with the `m` flag — both cases would produce
 * spurious mid-string matches. The lookahead `(?![\s\S])` suppresses those, ensuring
 * sentinels appear only at true end-of-input regardless of flags.
 *
 * @param regex - The regular expression to transform for partial matching
 * @returns A new RegExp that matches partial strings of the original pattern
 *
 * @example
 * ```typescript
 * const pattern = /hello world/;
 * const partial = createPartialMatchRegex(pattern);
 *
 * partial.test('h');           // true - could match
 * partial.test('hello');       // true - could match
 * partial.test('hello world'); // true - full match
 * partial.test('goodbye');     // false - cannot match
 * ```
 *
 * @remarks
 * - The transformed regex matches an empty string at the true end of input only
 * - Backreferences cannot be partially matched as they are atomic
 * - Use with a start anchor (`^`) to prevent false positives from empty string matches
 * - The `y` (sticky) flag may not behave as expected in partial matching scenarios
 *
 * @see {@link https://github.com/TomStrepsil/regex-partial-match#readme | Documentation}
 */
export default (regex: RegExp) => buildPartialSource(regex).partial;
