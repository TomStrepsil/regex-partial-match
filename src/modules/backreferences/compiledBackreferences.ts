import { Compiled } from "../../partialMatchRegExp/compilePartial/compiled.ts";
import type { Part } from "../../partialMatchRegExp/part.ts";
import type { Hooks } from "../../partialMatchRegExp/walk.ts";
import { RUN_OUT_BRANCH_GROUPS } from "./renderBackreference.ts";

function withoutHiddenGroups(
  match: RegExpExecArray,
  hiddenGroups: readonly number[]
) {
  for (let index = hiddenGroups.length - 1; index >= 0; index--) {
    match.splice(hiddenGroups[index], RUN_OUT_BRANCH_GROUPS);
    match.indices?.splice(hiddenGroups[index], RUN_OUT_BRANCH_GROUPS);
  }
  return match;
}

export class CompiledBackreferences extends Compiled {
  constructor(
    regex: RegExp,
    readonly hiddenGroups: readonly number[],
    readonly partialLengths: readonly number[],
    readonly nativeMayStartEarlier: boolean,
    readonly nativeWinsAtSameStart: boolean,
    parts: readonly Part[],
    featureMask: number,
    hooks: Hooks
  ) {
    super(regex, parts, featureMask, hooks);
  }

  override exec(partial: RegExp, input: string) {
    const { regex, honoursLastIndex } = this;
    const start = honoursLastIndex ? partial.lastIndex : 0;
    regex.lastIndex = start;
    const match = regex.exec(input);
    const { nativeWinsAtSameStart, nativeMayStartEarlier } = this;
    if (
      nativeMayStartEarlier &&
      (match === null || match.index > start || nativeWinsAtSameStart)
    ) {
      const nativeMatch = RegExp.prototype.exec.call(partial, input);
      if (
        nativeMatch !== null &&
        (match === null ||
          nativeMatch.index < match.index ||
          (nativeWinsAtSameStart && nativeMatch.index === match.index))
      )
        return nativeMatch;
    }
    if (honoursLastIndex) partial.lastIndex = regex.lastIndex;
    return match && withoutHiddenGroups(match, this.hiddenGroups);
  }
}
