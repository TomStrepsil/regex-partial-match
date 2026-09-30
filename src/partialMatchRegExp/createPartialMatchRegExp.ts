import compileWith from "./compilePartial/compileWith.ts";
import type { CompiledPartial } from "./compilePartial/compiled.ts";
import { compiledPartial, execFrom } from "./partialMatchInternals.ts";
import type { RegexFeature } from "./regexFeatures.ts";
import type { Hooks } from "./walk.ts";

declare class PartialMatchRegExp extends RegExp {
  [compiledPartial]: CompiledPartial;
  constructor(pattern: RegExp | string, flags?: string);
  /**
   * The syntactic constructs the original pattern uses, recorded as a side
   * effect of the single walk that builds the partial-match regex.
   *
   * The set is built on first read and cached, so patterns that are only ever
   * matched against never pay for it. It iterates in `RegexFeature` declaration
   * order, not the order the constructs appear in the pattern.
   *
   * @returns The features the original pattern contains
   * @throws {TypeError} On the class from `regex-partial-match/core`, unless
   * `withModules` has bound the features module
   *
   * @example
   * ```typescript
   * new PartialMatchRegExp(/^[a-z]+/).features.has("startAnchor"); // true
   * ```
   */
  get features(): ReadonlySet<RegexFeature>;
  override exec(input: string): RegExpExecArray | null;
}

export default function createPartialMatchRegExp(
  hooks: Hooks
): typeof PartialMatchRegExp {
  return class PartialMatchRegExp extends RegExp {
    declare [compiledPartial]: CompiledPartial;

    constructor(pattern: RegExp | string, flags?: string) {
      super(pattern, flags);
      this[compiledPartial] = compileWith(this, hooks);
    }

    get features(): ReadonlySet<RegexFeature> {
      return this[compiledPartial].features;
    }

    override exec(input: string): RegExpExecArray | null {
      const compiled = this[compiledPartial];
      if (compiled.kind === "dynamic")
        return compiled.execDynamic.call(this, compiled.dynamic, input);

      const { regex } = compiled;
      const match = execFrom(regex, input, this.lastIndex);
      this.lastIndex = regex.lastIndex;
      return match;
    }
  };
}

export type { PartialMatchRegExp };
