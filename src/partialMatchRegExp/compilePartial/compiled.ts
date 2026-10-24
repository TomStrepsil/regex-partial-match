import type { Part } from "../part.ts";
import type { Hooks } from "../walk.ts";
import type { RegexFeature } from "../regexFeatures.ts";
import type { TruncationProbe } from "../../hitEnd/truncationProbe.ts";
import type { RawLookarounds } from "../rawLookaroundInfo.ts";
import execFrom from "../execFrom.ts";

export class Compiled {
  features?: ReadonlySet<RegexFeature>;
  probe?: TruncationProbe;
  declare rawLookarounds?: RawLookarounds;
  readonly honoursLastIndex: boolean;

  constructor(
    readonly regex: RegExp,
    readonly parts: readonly Part[],
    readonly featureMask: number,
    readonly hooks: Hooks
  ) {
    this.honoursLastIndex = regex.global || regex.sticky;
  }

  exec(partial: RegExp, input: string): RegExpExecArray | null {
    const { regex } = this;
    const match = execFrom(regex, input, partial.lastIndex);
    if (this.honoursLastIndex) partial.lastIndex = regex.lastIndex;
    return match;
  }
}
