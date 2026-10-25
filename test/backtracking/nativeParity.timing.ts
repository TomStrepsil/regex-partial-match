import { describe, it, expect } from "vitest";
import PartialMatchRegExp, { hitEnd } from "../../src/index.ts";
import { withModules } from "../../src/core/index.ts";
import { backreferencesWith, carets } from "../../src/modules/index.ts";

const RUNS = 5;
const TOLERATED_RATIO = 5;
const TOLERATED_RATIO_RUNNING_OUT_PART_WAY = 20;
const TOLERATED_SLACK_MS = 5;

function elapsedMs(run: () => unknown) {
  const start = performance.now();
  run();
  return performance.now() - start;
}

const median = (times: number[]) =>
  times.sort((a, b) => a - b)[times.length >> 1];

function timesOf(pattern: RegExp, input: string, lastIndex = 0) {
  const partial = new PartialMatchRegExp(pattern);
  const native: number[] = [];
  const partialTimes: number[] = [];
  for (let attempt = 0; attempt < RUNS; attempt++) {
    pattern.lastIndex = lastIndex;
    native.push(elapsedMs(() => pattern.exec(input)));
    partial.lastIndex = lastIndex;
    partialTimes.push(elapsedMs(() => partial.exec(input)));
  }
  return { native: median(native), partial: median(partialTimes) };
}

function expectNearNativeTimeWith(
  Partial: typeof PartialMatchRegExp,
  pattern: RegExp,
  input: string
) {
  const partial = new Partial(pattern);
  const native: number[] = [];
  const partialTimes: number[] = [];
  for (let attempt = 0; attempt < RUNS; attempt++) {
    native.push(elapsedMs(() => pattern.exec(input)));
    partialTimes.push(
      elapsedMs(() => {
        const match = partial.exec(input);
        if (match) hitEnd(partial, match);
      })
    );
  }
  expect(median(partialTimes)).toBeLessThanOrEqual(
    median(native) * TOLERATED_RATIO + TOLERATED_SLACK_MS
  );
}

function expectNearNativeTime(
  pattern: RegExp,
  input: string,
  lastIndex = 0,
  ratio = TOLERATED_RATIO
) {
  const { native, partial } = timesOf(pattern, input, lastIndex);
  expect(partial).toBeLessThanOrEqual(native * ratio + TOLERATED_SLACK_MS);
}

function expectNearNativeTimeRunningOutPartWay(pattern: RegExp, input: string) {
  expectNearNativeTime(pattern, input, 0, TOLERATED_RATIO_RUNNING_OUT_PART_WAY);
}

describe("backtracking against the native pattern", () => {
  it.each([
    [/^(a+)+$/, "a".repeat(23) + "!"],
    [/(a+)+b/, "a".repeat(22) + "c"],
    [/^(\w+\s?)*$/, "a".repeat(22) + "!"],
    [/(a+)+(?<=b)/, "a".repeat(22)],
    [/^(a+)+(?<!a)/, "a".repeat(22)]
  ])(
    "costs %s no more than a small multiple of the native time, on an input it backtracks catastrophically on",
    expectNearNativeTime
  );

  it.each([
    [/(?:\d|[a-f]){24}(?<![a-f])/, "abc"],
    [/(?:[a-z]|-){24}(?<!-)/, "my-"],
    [/(?:a|b|c){24}(?<=x)/, ""],
    [new RegExp("(?:a|b)".repeat(24) + "(?<=x)"), ""],
    [/(?:(?<=x)a|b|c){24}(?<=x)/, ""],
    [/(x)(?:a|(?:b)|c?|\1|\bd|){24}(?<=y)/, "x"],
    [/(?:(a)|(b)c){24}(?!$)/, "bc"],
    [/(?:a|b|c){24}\^(?<=x)/, ""]
  ])(
    "costs %s on %j, where the input ends inside a repeated group of alternatives, no more than a small multiple of the native time, with hitEnd()",
    (pattern, input) => {
      expectNearNativeTimeWith(PartialMatchRegExp, pattern, input);
    }
  );

  it("matches /(a+)+b/ straight away where the native pattern fails only because the input ran out", () => {
    const { native, partial } = timesOf(/(a+)+b/, "a".repeat(22));
    expect(partial).toBeLessThan(native);
  });

  const runs = [
    String.raw`\1+(?<=b)`,
    String.raw`\1{2,}(?!a|$)`,
    String.raw`(?:\1)+(?<=b)`,
    String.raw`(?:\1\1)+(?<=b)`,
    String.raw`(?:(?:\1))+(?<=b)`,
    String.raw`(?:\1?)+(?<=b)`,
    String.raw`\1{1,40}(?<=b)`,
    String.raw`(?:\1+)+(?<=b)`,
    String.raw`(\1)+(?<=b)`
  ];
  const lengthFor = (run: string) => (run.startsWith("(?:\\1+)+") ? 22 : 28);

  it.each(runs.map((run) => [new RegExp("(a)" + run), "a".repeat(lengthFor(run))] as const))(
    "costs %s no more than a small multiple of the native time, over a group that captures one character",
    expectNearNativeTime
  );

  it.each(runs.map((run) => [new RegExp("(a+)" + run), "a".repeat(lengthFor(run))] as const))(
    "costs %s no more than the bounded multiple of the native time that running out part way adds, over a group that captures without limit",
    expectNearNativeTimeRunningOutPartWay
  );

  it.each([
    [/(a+)\1+(?<=b)/, "a".repeat(200)],
    [/(\w+)\1(?<=x)/, "a".repeat(200)],
    [/(\w+)-\1/, "foo-bar ".repeat(4000)]
  ])(
    "costs %s no more than the bounded multiple of the native time that running out part way adds, on input longer than longestPartial",
    expectNearNativeTimeRunningOutPartWay
  );

  const emptyCaptures = [
    [/(a?)\1{22}(?<=b)/, "c"],
    [/(a*)-\1{22}(?<=b)/, "a-"],
    [new RegExp("(a?)" + "\\1".repeat(22) + "(?<=b)"), "c"],
    [/()(?:\1\1){16}(?<=b)/, "c"],
    [/c(a?)\1{22}(?<=b)|c/, "c"],
    [/c(a?)\1{22}^/, "c"],
    [/c()(?:\1\1){16}^/, "c"]
  ] as const;

  it.each(emptyCaptures)(
    "costs %s on %j, where the capture is empty, no more than a small multiple of the native time, with hitEnd()",
    (pattern, input) => {
      expectNearNativeTimeWith(PartialMatchRegExp, pattern, input);
    }
  );

  it.each(emptyCaptures)(
    "costs %s on %j, where the capture is empty, no more than a small multiple of the native time with longestPartial 0, with hitEnd()",
    (pattern, input) => {
      expectNearNativeTimeWith(
        withModules(carets, backreferencesWith({ longestPartial: 0 })),
        pattern,
        input
      );
    }
  );

  it.each([
    [/(?:a?-?){10}(?<=b)|c/, ""],
    [/(a?)(?:\1-?){14}(?<=b)|c/, ""]
  ])(
    "costs hitEnd() on %s on %j, where optional atoms repeat at the end of the input, no more than a small multiple of the native time",
    (pattern, input) => {
      expectNearNativeTimeWith(PartialMatchRegExp, pattern, input);
    }
  );

  it("costs a backreference running out no more than a small multiple of the native time, however far into the input the search starts", () => {
    expectNearNativeTime(/(abc)\1/y, "x".repeat(4_000_000) + "abcab", 4_000_000);
  });
});
