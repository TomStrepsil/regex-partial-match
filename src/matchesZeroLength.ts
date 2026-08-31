const ALWAYS_SATISFIABLE = "(?:)";
const NOT_NUMBERS_REGEX = /\D/g;

/**
 * Rewrites `source` with every zero-width construct — `^`, `$`, `\b`, `\B`, all
 * four lookarounds — and every backreference replaced by an empty group, so the
 * engine itself can be asked whether what remains can match nothing.
 *
 * `(?:)` rather than `""` keeps the result syntactically valid when one of those
 * constructs is quantified — a lookahead followed by a `*`, say, which would
 * otherwise leave the quantifier with nothing to apply to.
 */
function zeroLengthProbe(regex: RegExp): string {
  const source = regex.source;
  const { unicodeSets } = regex;

  let result = "";
  let cursor = 0;
  let i = 0;

  function replaceThrough(start: number, end: number): void {
    result += source.slice(cursor, start) + ALWAYS_SATISFIABLE;
    cursor = i = end;
  }

  function skipCharacterClass(): void {
    let depth = 1;
    i++;
    while (depth) {
      switch (source[i]) {
        case "\\":
          i += 2;
          continue;
        case "[":
          if (unicodeSets) depth++;
          break;
        case "]":
          depth--;
          break;
      }
      i++;
    }
  }

  function skipGroup(): void {
    let depth = 1;
    i++;
    while (depth) {
      switch (source[i]) {
        case "\\":
          i += 2;
          continue;
        case "[":
          skipCharacterClass();
          continue;
        case "(":
          depth++;
          break;
        case ")":
          depth--;
          break;
      }
      i++;
    }
  }

  while (i < source.length) {
    switch (source[i]) {
      case "\\":
        switch (source[i + 1]) {
          case "b":
          case "B":
            replaceThrough(i, i + 2);
            continue;
          case "k": {
            const referenceEnd =
              source[i + 2] === "<" ? source.indexOf(">", i) : -1;
            if (referenceEnd !== -1) {
              replaceThrough(i, referenceEnd + 1);
              continue;
            }
            break;
          }
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
            replaceThrough(
              i,
              nextNonDigit ? nextNonDigit.index : source.length
            );
            continue;
          }
        }
        i += 2;
        continue;
      case "[":
        skipCharacterClass();
        continue;
      case "^":
      case "$":
        replaceThrough(i, i + 1);
        continue;
      case "(": {
        const start = i;
        const afterQuestionMark = source[i + 2];

        if (source[i + 1] === "?") {
          if (
            afterQuestionMark === "=" ||
            afterQuestionMark === "!" ||
            (afterQuestionMark === "<" &&
              (source[i + 3] === "=" || source[i + 3] === "!"))
          ) {
            skipGroup();
            replaceThrough(start, i);
            continue;
          }

          if (afterQuestionMark === "<") {
            i = source.indexOf(">", i) + 1;
            continue;
          }
        }

        i++;
        continue;
      }
      default:
        i++;
    }
  }

  return result + source.slice(cursor);
}

/**
 * Whether `regex` can produce a zero-length match at some position — the
 * question `regex.test("")` cannot answer, since `/(?=a)/` matches zero
 * characters wherever the lookahead holds yet fails against `""`.
 *
 * A scanning loop that advances its cursor by match length spins forever on a
 * pattern that can match nothing, so this is the check to make before scanning
 * with a pattern you did not write.
 *
 * Rather than reimplement the rules for what can match nothing, every zero-width
 * construct is replaced by an empty group and the regular expression engine is
 * asked whether the remainder matches the empty string. Sequences, alternation,
 * quantifier minimums, laziness and nesting therefore behave exactly as the
 * engine defines them.
 *
 * The answer errs towards `true`, which is the safe direction for a loop guard:
 * a backreference is assumed able to match empty, since what one matches depends
 * on what its group captured at match time, and contradictory patterns such as
 * `/(?=a)(?=b)/` are reported as `true` rather than solved for satisfiability.
 *
 * @example
 * ```typescript
 * import matchesZeroLength from "regex-partial-match/matches-zero-length";
 *
 * matchesZeroLength(/(?=a)/); // true
 * /(?=a)/.test("");           // false — a different question
 *
 * matchesZeroLength(/\d{4}/); // false
 * matchesZeroLength(/x|/);    // true
 * ```
 *
 * @param regex - Any regular expression
 * @returns Whether a zero-length match is possible at some position
 */
export default function matchesZeroLength(regex: RegExp): boolean {
  return new RegExp("^(?:" + zeroLengthProbe(regex) + ")$", regex.flags).test(
    ""
  );
}
