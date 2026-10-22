import type { Backreference, Part } from "./part.ts";
import type { Hooks } from "./walk.ts";
import type { CompiledPartial } from "./compilePartial/compiled.ts";
import type { RawLookarounds } from "./rawLookaroundInfo.ts";

export interface BackreferenceRecorder {
  groupClosed(groupNumber: number, opening: string): void;
  backreference(backreference: Backreference, scope: number): void;
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
    rawLookarounds: RawLookarounds
  ) => CompiledPartial;
  probe: (compiled: CompiledPartial, index: number) => BackreferenceProbe;
}
