const occurrencesRegex = /\{\d+,?\d*\}/g;

const createPartialMatchRegex = (regex: RegExp): RegExp => {
  const source = regex.source;
  const isUnicode = regex.unicode || regex.unicodeSets;

  let i = 0;

  function extractSubstring(length: number): string {
    return source.substring(i, (i += length));
  }

  function process() {
    let result = "";

    function appendOptional(length: number) {
      result += "(?:" + extractSubstring(length) + "|$)";
    }

    function appendRaw(length: number) {
      result += extractSubstring(length);
    }

    while (i < source.length) {
      switch (source[i]) {
        case "\\":
          switch (source[i + 1]) {
            case "c":
              appendOptional(3);
              break;
            case "k":
              appendOptional(source.indexOf(">", i) - i + 1);
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
                if (!escaped) depth++;
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
        case "|":
        case "^":
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
              case ":":
                result += "(?:";
                i += 3;
                result += process() + "|$)";
                break;
              case "=":
                result += "(?=";
                i += 3;
                result += process() + ")";
                break;
              case "!": {
                const temp = i;
                i += 3;
                process();
                result += source.substring(temp, i);
                break;
              }
              case "<":
                switch (source[i + 3]) {
                  case "=":
                  case "!": {
                    const temp = i;
                    i += 4;
                    process();
                    result += source.substring(temp, i);
                    break;
                  }
                  default:
                    appendRaw(source.indexOf(">", i) - i + 1);
                    result += process() + "|$)";
                    break;
                }
                break;
            }
          } else {
            appendRaw(1);
            result += process() + "|$)";
          }
          break;
        case ")":
          ++i;
          return result;
        default:
          appendOptional(1);
          break;
      }
    }
    return result;
  }

  return new RegExp(process(), regex.flags);
};

/**
 * Transforms a regular expression to support partial matching.
 *
 * This function wraps each atomic element of the regex pattern in a non-capturing group
 * with an alternation to end-of-input (`$`), allowing the pattern to match prefixes
 * of the original pattern. This enables validation of incomplete input strings.
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
 * - The transformed regex will always match an empty string at the end of input
 * - Backreferences cannot be partially matched as they are atomic
 * - Use with a start anchor (`^`) to prevent false positives from empty string matches
 * - The `y` (sticky) flag may not behave as expected in partial matching scenarios
 *
 * @see {@link https://github.com/TomStrepsil/regex-partial-match#readme | Documentation}
 */
export default createPartialMatchRegex;
