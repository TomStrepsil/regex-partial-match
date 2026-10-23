import type { Backreference, Part } from "./part.ts";
import type { Hooks } from "./walk.ts";
import type { CompiledPartial } from "./compilePartial/compiled.ts";
import type { RawLookarounds } from "./rawLookaroundInfo.ts";

export interface BackreferenceRecorder {
  groupClosed(
    groupNumber: number,
    opening: string,
    body: readonly Part[],
    scope: number
  ): void;
  backreference(
    backreference: Backreference,
    scope: number,
    groupsBefore: number
  ): void;
}

export interface ProbeGroups {
  readonly marker: () => string;
  readonly hidden: (count: number) => number;
}

export interface BackreferenceProbe {
  readonly groups: number;
  render(token: string, groups: ProbeGroups): string;
}

export interface BackreferenceHook {
  record: () => BackreferenceRecorder;
  compile: (
    parts: readonly Part[],
    flags: string,
    featureMask: number,
    hooks: Hooks,
    rawLookarounds: RawLookarounds,
    groupCount: number
  ) => CompiledPartial;
  probe: (compiled: CompiledPartial, index: number) => BackreferenceProbe;
}
