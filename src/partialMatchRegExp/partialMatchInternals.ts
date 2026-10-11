import type { CompiledPartial } from "./compilePartial/compiled.ts";

export const compiledPartial = Symbol("compiledPartial");

export const constructedPartials = new WeakSet<object>();

interface PartialMatchInternals {
  [compiledPartial]?: CompiledPartial;
}

export function compiledOf(partial: RegExp): CompiledPartial;
export function compiledOf(partial: RegExp & PartialMatchInternals) {
  return partial[compiledPartial];
}
