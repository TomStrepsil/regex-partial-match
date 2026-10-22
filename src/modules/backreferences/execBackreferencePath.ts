import type { BackreferencePath } from "../../partialMatchRegExp/compilePartial/compiled.ts";
import { RUN_OUT_BRANCH_GROUPS } from "../../partialMatchRegExp/runOutBranch.ts";

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

export default function execBackreferencePath(
  this: RegExp,
  backreferencePath: BackreferencePath,
  input: string
) {
  const { regex, hiddenGroups, nativeMayStartEarlier } = backreferencePath;
  const honoursLastIndex = this.global || this.sticky;
  const start = honoursLastIndex ? this.lastIndex : 0;
  regex.lastIndex = start;
  const match = regex.exec(input);
  if (nativeMayStartEarlier && (match === null || match.index > start)) {
    const nativeMatch = RegExp.prototype.exec.call(this, input);
    if (
      nativeMatch !== null &&
      (match === null || nativeMatch.index < match.index)
    )
      return nativeMatch;
  }
  if (honoursLastIndex) this.lastIndex = regex.lastIndex;
  return match && withoutHiddenGroups(match, hiddenGroups);
}
