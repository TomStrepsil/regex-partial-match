import type { CompiledPartial } from "./compilePartial/compiled.ts";

export const compiledPartial = Symbol("compiledPartial");

interface PartialMatchInternals {
  [compiledPartial]?: CompiledPartial;
}

export function compiledOf(partial: RegExp): CompiledPartial;
export function compiledOf(partial: RegExp & PartialMatchInternals) {
  return partial[compiledPartial];
}
