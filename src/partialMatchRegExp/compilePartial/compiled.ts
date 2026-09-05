import type { Part, RawLookaroundInfo } from "../part.ts";
import { featureSet, type RegexFeature } from "../regexFeatures.ts";

export interface DynamicPath {
  originalCaptureScan: RegExp;
  preScan: RegExp;
  expand: (capture: RegExpExecArray) => Part[];
  expansionFitsCaptures: (
    expandedFrom: RegExpExecArray,
    match: RegExpExecArray,
    input: string
  ) => boolean;
}

abstract class Compiled {
  private _features?: ReadonlySet<RegexFeature>;

  constructor(
    readonly rawLookarounds: readonly RawLookaroundInfo[],
    readonly namedGroupOpenings: readonly string[],
    private readonly _featureMask: number
  ) {}

  get features(): ReadonlySet<RegexFeature> {
    return (this._features ??= featureSet(this._featureMask));
  }
}

export class CompiledStatic extends Compiled {
  readonly kind = "static";

  constructor(
    readonly regex: RegExp,
    readonly parts: string[],
    rawLookarounds: readonly RawLookaroundInfo[],
    namedGroupOpenings: readonly string[],
    featureMask: number
  ) {
    super(rawLookarounds, namedGroupOpenings, featureMask);
  }
}

export class CompiledDynamic extends Compiled {
  readonly kind = "dynamic";

  constructor(
    readonly dynamic: DynamicPath,
    rawLookarounds: readonly RawLookaroundInfo[],
    namedGroupOpenings: readonly string[],
    featureMask: number
  ) {
    super(rawLookarounds, namedGroupOpenings, featureMask);
  }
}

export type CompiledPartial = CompiledStatic | CompiledDynamic;
