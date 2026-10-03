import {
  Compiled,
  type CompiledDynamic,
  type DynamicPath
} from "../../partialMatchRegExp/compilePartial/compiled.ts";
import type { Part } from "../../partialMatchRegExp/part.ts";
import type { Hooks } from "../../partialMatchRegExp/walk.ts";
import execDynamic from "./execDynamic.ts";

export class CompiledBackreferences extends Compiled implements CompiledDynamic {
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
