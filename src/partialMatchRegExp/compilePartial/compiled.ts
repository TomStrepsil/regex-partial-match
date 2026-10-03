import type { Part } from "../part.ts";
import type { Hooks } from "../walk.ts";
import type { RegexFeature } from "../regexFeatures.ts";
import type { TruncationProbeCache } from "../../hitEnd/truncationProbeCache.ts";
import type { RawLookarounds } from "../rawLookaroundInfo.ts";

export interface DynamicPath {
  preScan: RegExp;
  expand: (capture: RegExpExecArray) => Part[];
  expansionFitsCaptures: (
    expandedFrom: RegExpExecArray,
    match: RegExpExecArray,
    input: string
  ) => boolean;
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

export interface CompiledDynamic extends Compiled {
  readonly dynamic: DynamicPath;
  readonly execDynamic: (
    this: RegExp,
    dynamic: DynamicPath,
    input: string
  ) => RegExpExecArray | null;
}

export type CompiledPartial = CompiledStatic | CompiledDynamic;
