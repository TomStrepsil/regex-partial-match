import { expect } from "vitest";

interface ToMatchAtParams {
  match: string;
  index: number;
}

interface ToMatchPartiallyParams {
  characters: string[];
  index?: number;
}

interface ToNotMatchPartiallyParams {
  characters: string[];
}

expect.extend({
  toMatchAt(
    received: RegExpExecArray | null,
    { match, index }: ToMatchAtParams
  ) {
    const { isNot } = this;

    const matchedString = received?.[0];
    const matchedIndex = received?.index;

    const passMatch = matchedString === match;
    const passIndex = matchedIndex === index;
    const pass = passMatch && passIndex;
    const stringIndex = String(index);
    const stringMatchIndex = String(matchedIndex);
    const stringMatchedString = String(matchedString);

    return {
      pass,
      message: () => {
        if (isNot) {
          return `Expected not to match "${match}" at index ${stringIndex}, but it did`;
        }

        if (!passMatch && !passIndex) {
          return `Expected to match "${match}" at index ${stringIndex}, but got "${stringMatchedString}" at index ${stringMatchIndex}`;
        }

        if (!passMatch) {
          return `Expected to match "${match}" at index ${stringIndex}, but got "${stringMatchedString}" at index ${stringMatchIndex}`;
        }

        return `Expected to match "${match}" at index ${stringIndex}, but it was at index ${stringMatchIndex}`;
      }
    };
  },
  toNotMatch(received: RegExpExecArray | null) {
    const { isNot } = this;

    const matchedString = received?.[0];
    const matchedIndex = received?.index;
    const stringMatchedString = String(matchedString);
    const stringMatchedIndex = String(matchedIndex);

    const pass =
      received === null ||
      (matchedString === "" && matchedIndex === received.input.length);

    return {
      pass,
      message: () => {
        if (isNot) {
          return `Expected to match, but got no match`;
        }

        return `Expected not to match, but got "${stringMatchedString}" at index ${stringMatchedIndex}`;
      }
    };
  },
  toMatchPartially(
    received: RegExp,
    { characters, index = 0 }: ToMatchPartiallyParams
  ) {
    const { isNot } = this;

    if (isNot) {
      throw new Error("toMatchPartially does not support .not");
    }

    const failures: string[] = [];
    const stringIndex = String(index);

    for (let i = 1; i < characters.length; i++) {
      const partialString = characters.slice(0, i).join("");
      const result = received.exec(partialString);

      const matchedString = result?.[0];
      const matchedIndex = result?.index;
      const stringMatchedString = String(matchedString);
      const stringMatchedIndex = String(matchedIndex);
      const stringI = String(i - 1);

      if (matchedString !== partialString || matchedIndex !== index) {
        failures.push(
          `  Partial '${partialString}' (chars[0..${stringI}]): expected match at index ${stringIndex}, got ${
            matchedString
              ? `"${stringMatchedString}" at index ${stringMatchedIndex}`
              : "no match"
          }`
        );
      }
    }

    const pass = failures.length === 0;

    return {
      pass,
      message: () => {
        if (failures.length > 0) {
          return `Expected all partial character sequences to match at index ${stringIndex}:\n${failures.join(
            "\n"
          )}`;
        }
        return `Expected some partial character sequences not to match`;
      }
    };
  },
  toNotMatchPartially(
    received: RegExp,
    { characters }: ToNotMatchPartiallyParams
  ) {
    const { isNot } = this;

    if (isNot) {
      throw new Error("toNotMatchPartially does not support .not");
    }

    const failures: string[] = [];

    for (let i = 1; i < characters.length; i++) {
      const partialString = characters.slice(0, i).join("");
      const result = received.exec(partialString);

      const matchedString = result?.[0];
      const matchedIndex = result?.index;
      const stringMatchedString = String(matchedString);
      const stringMatchedIndex = String(matchedIndex);
      const stringI = String(i - 1);

      // Should not match, or should match empty string at end of input
      const isValidNonMatch =
        result === null ||
        (matchedString === "" && matchedIndex === partialString.length);

      if (!isValidNonMatch) {
        failures.push(
          `  Partial '${partialString}' (chars[0..${stringI}]): expected no match, got "${stringMatchedString}" at index ${stringMatchedIndex}`
        );
      }
    }

    const pass = failures.length === 0;

    return {
      pass,
      message: () => {
        if (failures.length > 0) {
          return `Expected all partial character sequences NOT to match:\n${failures.join(
            "\n"
          )}`;
        }
        return `Expected some partial character sequences to match`;
      }
    };
  }
});
