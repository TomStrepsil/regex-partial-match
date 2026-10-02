import compileWith from "./compilePartial/compileWith.ts";
import type { CompiledPartial } from "./compilePartial/compiled.ts";
import { compiledPartial, execFrom } from "./partialMatchInternals.ts";
import type { Hooks } from "./walk.ts";
import type { PartialMatchRegExpConstructor } from "./partialMatchRegExp.ts";

export default function createPartialMatchRegExp(
  hooks: Hooks
): PartialMatchRegExpConstructor {
  return class PartialMatchRegExp extends RegExp {
    declare [compiledPartial]: CompiledPartial;

    constructor(pattern: RegExp | string, flags?: string) {
      super(pattern, flags);
      this[compiledPartial] = compileWith(this, hooks);
    }

    override exec(input: string): RegExpExecArray | null {
      const compiled = this[compiledPartial];
      if (compiled.kind === "dynamic")
        return compiled.execDynamic.call(this, compiled.dynamic, input);

      const { regex } = compiled;
      const match = execFrom(regex, input, this.lastIndex);
      if (compiled.honoursLastIndex) this.lastIndex = regex.lastIndex;
      return match;
    }
  } as unknown as PartialMatchRegExpConstructor;
}
