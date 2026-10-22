import type { Part } from "../part.ts";
import type { Hooks } from "../walk.ts";
import type { RegexFeature } from "../regexFeatures.ts";
import type { TruncationProbe } from "../../hitEnd/truncationProbe.ts";
import type { RawLookarounds } from "../rawLookaroundInfo.ts";

export interface BackreferencePath {
  regex: RegExp;
  hiddenGroups: readonly number[];
  partialLengths: readonly number[];
  nativeMayStartEarlier: boolean;
}

export abstract class Compiled {
  features?: ReadonlySet<RegexFeature>;
  probe?: TruncationProbe;
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
    parts: readonly Part[],
    featureMask: number,
    hooks: Hooks
  ) {
    super(parts, featureMask, hooks);
    this.honoursLastIndex = regex.global || regex.sticky;
  }
}

export interface CompiledWithBackreferences extends Compiled {
  readonly backreferencePath: BackreferencePath;
  readonly execBackreferencePath: (
    this: RegExp,
    backreferencePath: BackreferencePath,
    input: string
  ) => RegExpExecArray | null;
}

export type CompiledPartial = CompiledStatic | CompiledWithBackreferences;
