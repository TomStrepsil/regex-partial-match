import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import PartialMatchRegExp from "./partialMatchRegExp.ts";
import matchesZeroLength from "./matchesZeroLength.ts";

/**
 * `src/compilePartial.ts` and `src/matchesZeroLength.ts` scan pattern source
 * independently, and must agree about where character classes and groups end.
 * Nothing links them, so the risk is that one is taught a grammar rule the other
 * never learns.
 *
 * Rather than maintain a list of patterns and their expected answers — which
 * would be a third thing to keep in step — the corpus is every regular
 * expression literal already written into the test suites, and the assertions
 * are invariants the regular expression engine settles. Adding a test anywhere
 * grows the corpus; nothing here records an expected value.
 */

const REGEX_LITERAL =
  /\/(?![*/])((?:[^/\\\n[]|\\.|\[(?:[^\]\\\n]|\\.)*\])+)\/([dgimsuvy]*)/g;

/**
 * Patterns awkward to write as a literal get built from a string instead, and
 * those are exactly the awkward ones — `new RegExp("\\k<")` is how the Annex B
 * cases are spelled. Reading only literals would miss them.
 */
const CONSTRUCTED_PATTERN =
  /new (?:RegExp|PartialMatchRegExp)\(\s*("(?:[^"\\]|\\.)*")\s*(?:,\s*("(?:[^"\\]|\\.)*")\s*)?\)/g;

function unquote(literal: string | undefined): string | undefined {
  if (literal === undefined) return undefined;
  try {
    return JSON.parse(literal) as string;
  } catch {
    return undefined;
  }
}

const INPUTS = [
  "",
  "a",
  "ab",
  "abc",
  "aa",
  " a ",
  "a-b",
  "1234",
  "hello world",
  "x\ny"
];

function corpus(): RegExp[] {
  const seen = new Set<string>();
  const patterns: RegExp[] = [];

  function add(body: string | undefined, flags: string | undefined): void {
    if (body === undefined) return;
    const key = `/${body}/${flags ?? ""}`;
    if (seen.has(key)) return;
    seen.add(key);
    try {
      patterns.push(new RegExp(body, flags));
    } catch {
      // not a pattern after all — a division, a path, an unrelated string
    }
  }

  for (const file of readdirSync("src").filter((f) => f.endsWith(".test.ts"))) {
    if (file === "conformance.test.ts") continue;
    const source = readFileSync(`src/${file}`, "utf8");

    for (const [, body, flags] of source.matchAll(REGEX_LITERAL))
      add(body, flags);

    for (const [, body, flags] of source.matchAll(CONSTRUCTED_PATTERN))
      add(unquote(body), unquote(flags));
  }

  return patterns;
}

const PATTERNS = corpus();

/** Flags that make `exec` stateful, dropped so each probe is independent. */
function withoutCursor(regex: RegExp): RegExp {
  return new RegExp(regex.source, regex.flags.replace(/[gy]/g, ""));
}

function producesZeroLengthMatch(regex: RegExp, input: string): boolean {
  const sticky = new RegExp(
    regex.source,
    regex.flags.replace(/[gy]/g, "") + "y"
  );
  for (let at = 0; at <= input.length; at++) {
    sticky.lastIndex = at;
    const match = sticky.exec(input);
    if (match && match[0].length === 0) return true;
  }
  return false;
}

describe("conformance across both scanners", () => {
  it("draws a corpus from the patterns the suites already use", () => {
    expect(PATTERNS.length).toBeGreaterThan(300);
  });

  it("builds a partial matcher that matches wherever the original does", () => {
    const regressions: string[] = [];

    for (const pattern of PATTERNS) {
      const original = withoutCursor(pattern);
      let partial: PartialMatchRegExp;
      try {
        partial = new PartialMatchRegExp(original);
      } catch (error) {
        regressions.push(`${original.toString()} threw ${String(error)}`);
        continue;
      }

      for (const input of INPUTS)
        if (original.test(input) && !partial.test(input))
          regressions.push(
            `${original.toString()} matches ${JSON.stringify(input)}, its partial does not`
          );
    }

    expect(regressions.slice(0, 10)).toEqual([]);
  });

  it("never reports a pattern as consuming when it can match nothing", () => {
    const unsafe: string[] = [];

    for (const pattern of PATTERNS) {
      let reported: boolean;
      try {
        reported = matchesZeroLength(pattern);
      } catch (error) {
        unsafe.push(`${pattern.toString()} threw ${String(error)}`);
        continue;
      }
      if (reported) continue;

      for (const input of INPUTS)
        if (producesZeroLengthMatch(pattern, input))
          unsafe.push(
            `${pattern.toString()} reported false, matches zero length in ${JSON.stringify(input)}`
          );
    }

    expect(unsafe.slice(0, 10)).toEqual([]);
  });

  it("discriminates rather than reporting every pattern as zero length", () => {
    const consuming = PATTERNS.filter(
      (pattern) => !matchesZeroLength(pattern)
    ).length;

    expect(consuming / PATTERNS.length).toBeGreaterThan(0.2);
  });
});
