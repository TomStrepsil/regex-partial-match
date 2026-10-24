import type { Compiled } from "./compilePartial/compiled.ts";

export const compiledPartial = Symbol("compiledPartial");

export const constructedPartials = new WeakSet<object>();

interface PartialMatchInternals {
  [compiledPartial]?: Compiled;
}

export function compiledOf(partial: RegExp): Compiled;
export function compiledOf(partial: RegExp & PartialMatchInternals) {
  return partial[compiledPartial];
}
