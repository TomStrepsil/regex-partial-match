import type { Backreference, Part } from "../part.ts";
import type { Hooks } from "../walk.ts";
import type { RegexFeature } from "../regexFeatures.ts";
import type { TruncationProbeCache } from "../hitEnd/truncationProbeCache.ts";
import type { RawLookarounds } from "../hitEnd/rawLookaroundInfo.ts";
import type { CompiledDynamic } from "../../modules/backreferences/compiledDynamic.ts";

export interface BackreferenceRecorder {
  groupClosed(groupNumber: number, opening: string): void;
  backreference(backreference: Backreference, scope: number): void;
}

export interface BackreferencesHook {
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

export abstract class Compiled {
  features?: ReadonlySet<RegexFeature>;
  probeCache?: TruncationProbeCache;
  declare rawLookarounds?: RawLookarounds;

  constructor(
    readonly parts: readonly Part[],
    readonly featureMask: number,
    readonly hooks: Hooks
  ) {}
}

export class CompiledStatic extends Compiled {
  readonly honoursLastIndex: boolean;

  constructor(
    readonly regex: RegExp,
    parts: string[],
    featureMask: number,
    hooks: Hooks
  ) {
    super(parts, featureMask, hooks);
    this.honoursLastIndex = regex.global || regex.sticky;
  }
}

export type CompiledPartial = CompiledStatic | CompiledDynamic;
