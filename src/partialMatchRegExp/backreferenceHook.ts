import type { Backreference, Part } from "./part.ts";
import type { Hooks } from "./walk.ts";
import type { CompiledDynamic } from "./compilePartial/compiled.ts";

export interface BackreferenceRecorder {
  groupClosed(groupNumber: number, opening: string): void;
  backreference(backreference: Backreference, scope: number): void;
}

export interface BackreferenceHook {
  record: () => BackreferenceRecorder;
  compile: (
    parts: readonly Part[],
    backreferences: readonly Backreference[],
    flags: string,
    isUnicode: boolean,
    featureMask: number,
    hooks: Hooks
  ) => CompiledDynamic;
}
