const characterClassGlobalRegex = /\[(?:\\.|.)*?\]/g;
const occurrencesRegex = /\{\d+,?\d*\}/g;

const createPartialMatchRegex = (regex: RegExp): RegExp => {
  const source = regex.source;

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
              if (regex.unicode && source[i + 2] === "{") {
                appendOptional(source.indexOf("}", i) - i + 1);
              } else {
                appendOptional(6);
              }
              break;
            case "p":
            case "P":
              if (regex.unicode) {
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
          characterClassGlobalRegex.lastIndex = i;
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- must match, since otherwise an invalid regex
          const [match] = characterClassGlobalRegex.exec(source)!;
          appendOptional(match.length);
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

export default createPartialMatchRegex;
