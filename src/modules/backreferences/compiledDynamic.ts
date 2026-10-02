import { Compiled } from "../../partialMatchRegExp/compilePartial/compiled.ts";
import type { Part } from "../../partialMatchRegExp/part.ts";
import type { Hooks } from "../../partialMatchRegExp/walk.ts";
import execDynamic from "./execDynamic.ts";

export interface DynamicPath {
  preScan: RegExp;
  expand: (capture: RegExpExecArray) => Part[];
  expansionFitsCaptures: (
    expandedFrom: RegExpExecArray,
    match: RegExpExecArray,
    input: string
  ) => boolean;
}

export class CompiledDynamic extends Compiled {
  readonly execDynamic = execDynamic;

  constructor(
    readonly dynamic: DynamicPath,
    parts: readonly Part[],
    featureMask: number,
    hooks: Hooks
  ) {
    super(parts, featureMask, hooks);
  }
}
