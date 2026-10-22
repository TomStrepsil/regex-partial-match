import {
  Compiled,
  type CompiledWithBackreferences,
  type BackreferencePath
} from "../../partialMatchRegExp/compilePartial/compiled.ts";
import type { Part } from "../../partialMatchRegExp/part.ts";
import type { Hooks } from "../../partialMatchRegExp/walk.ts";
import execBackreferencePath from "./execBackreferencePath.ts";

export class CompiledBackreferences extends Compiled implements CompiledWithBackreferences {
  readonly execBackreferencePath = execBackreferencePath;

  constructor(
    readonly backreferencePath: BackreferencePath,
    parts: readonly Part[],
    featureMask: number,
    hooks: Hooks
  ) {
    super(parts, featureMask, hooks);
  }
}
