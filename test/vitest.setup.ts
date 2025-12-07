import { expect } from "vitest";

interface ToMatchAtParams {
  match: string;
  index: number;
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
  }
});
