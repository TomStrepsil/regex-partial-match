import compileWith from "./compilePartial/compileWith.ts";
import type { Compiled } from "./compilePartial/compiled.ts";
import {
  compiledPartial,
  constructedPartials
} from "./partialMatchInternals.ts";
import type { Hooks } from "./walk.ts";
import type { PartialMatchRegExpConstructor } from "./index.ts";

export default function createPartialMatchRegExp(
  hooks: Hooks
): PartialMatchRegExpConstructor;
export default function createPartialMatchRegExp(hooks: Hooks): unknown {
  return class PartialMatchRegExp extends RegExp {
    declare [compiledPartial]: Compiled;

    constructor(pattern: RegExp | string, flags?: string) {
      super(pattern, flags);
      this[compiledPartial] = compileWith(this, hooks);
      constructedPartials.add(this);
    }

    override exec(input: string) {
      return this[compiledPartial].exec(this, input);
    }
  };
}
