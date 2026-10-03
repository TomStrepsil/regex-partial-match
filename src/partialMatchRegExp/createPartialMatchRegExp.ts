import compileWith from "./compilePartial/compileWith.ts";
import type { CompiledPartial } from "./compilePartial/compiled.ts";
import { compiledPartial } from "./partialMatchInternals.ts";
import execFrom from "./execFrom.ts";
import type { Hooks } from "./walk.ts";
import type { PartialMatchRegExpConstructor } from "./index.ts";

export default function createPartialMatchRegExp(
  hooks: Hooks
): PartialMatchRegExpConstructor;
export default function createPartialMatchRegExp(hooks: Hooks): unknown {
  return class PartialMatchRegExp extends RegExp {
    declare [compiledPartial]: CompiledPartial;

    constructor(pattern: RegExp | string, flags?: string) {
      super(pattern, flags);
      this[compiledPartial] = compileWith(this, hooks);
    }

    override exec(input: string) {
      const compiled = this[compiledPartial];
      if ("dynamic" in compiled)
        return compiled.execDynamic.call(this, compiled.dynamic, input);

      const { regex } = compiled;
      const match = execFrom(regex, input, this.lastIndex);
      if (compiled.honoursLastIndex) this.lastIndex = regex.lastIndex;
      return match;
    }
  };
}
