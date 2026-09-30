import type { Backreference, Part } from "../part.ts";
import type { Hooks } from "../walk.ts";
import type { RegexFeature } from "../regexFeatures.ts";
import type { TruncationProbeCache } from "../hitEnd/truncationProbeCache.ts";
import type { CompiledDynamic } from "../../modules/backreferences/compiledDynamic.ts";

export type FeaturesHook = (featureMask: number) => ReadonlySet<RegexFeature>;

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
  private _features?: ReadonlySet<RegexFeature>;
  probeCache?: TruncationProbeCache;

  constructor(
    readonly parts: readonly Part[],
    readonly featureMask: number,
    readonly hooks: Hooks
  ) {}

  get features(): ReadonlySet<RegexFeature> {
    const featureSet = this.hooks.features;
    if (featureSet === undefined)
      throw new TypeError("Needs the features module");
    return (this._features ??= featureSet(this.featureMask));
  }
}

export class CompiledStatic extends Compiled {
  readonly kind = "static";

  constructor(
    readonly regex: RegExp,
    parts: string[],
    featureMask: number,
    hooks: Hooks
  ) {
    super(parts, featureMask, hooks);
  }
}

export type CompiledPartial = CompiledStatic | CompiledDynamic;
