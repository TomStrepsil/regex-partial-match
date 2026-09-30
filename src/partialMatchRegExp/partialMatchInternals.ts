import type { CompiledPartial } from "./compilePartial/compiled.ts";

export const compiledPartial = Symbol("compiledPartial");

interface PartialMatchInternals {
  [compiledPartial]: CompiledPartial;
}

export function compiledOf(partial: RegExp): CompiledPartial {
  return (partial as RegExp & PartialMatchInternals)[compiledPartial];
}

export function execFrom(regex: RegExp, input: string, start: number) {
  regex.lastIndex = start;
  return regex.exec(input);
}

export function isAtOrBefore(match: RegExpExecArray | null, index: number) {
  return match !== null && match.index <= index;
}
