import { NAMED_GROUP_OPENING, isRawLookaround, LOOKBEHIND_MARKS } from "./atomSyntax.ts";
import { isBackreference, type Part } from "./part.ts";
import type { RawLookarounds } from "./rawLookaroundInfo.ts";

export const isCapturingGroupOpening = (part: string) =>
  part === "(" ||
  (part.startsWith(NAMED_GROUP_OPENING) &&
    !LOOKBEHIND_MARKS.includes(part[NAMED_GROUP_OPENING.length]));

export function groupsOpenedBefore(
  parts: readonly Part[],
  rawLookarounds: RawLookarounds
) {
  const before: number[] = [];
  let opened = 0;
  let rawLookaroundCount = 0;
  for (const part of parts) {
    before.push(opened);
    if (isBackreference(part)) continue;
    if (isCapturingGroupOpening(part)) opened++;
    else if (isRawLookaround(part))
      opened += rawLookarounds[rawLookaroundCount++]?.capturingGroupsOpened ?? 0;
  }
  before.push(opened);
  return before;
}

export function shiftForGroupOf(
  groupsBefore: readonly number[],
  groupsAddedAt: (index: number) => number
) {
  const shiftForGroup = [0];
  let added = 0;
  for (let index = 0; index < groupsBefore.length - 1; index++) {
    for (let group = groupsBefore[index]; group < groupsBefore[index + 1]; group++)
      shiftForGroup.push(added);
    added += groupsAddedAt(index);
  }
  return shiftForGroup;
}
