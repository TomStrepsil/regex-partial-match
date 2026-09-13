import {
  NAMED_GROUP_OPENING,
  endsAtTruncationBranch,
  isRawLookaround
} from "../atomSyntax.ts";
import { isBackreference, type Part } from "../part.ts";

export type PartRole =
  | "backreference"
  | "rawLookaround"
  | "groupOpen"
  | "truncationEnd"
  | "plain";

function isGroupOpen(part: string): boolean {
  return (
    part === "(" ||
    (part.startsWith(NAMED_GROUP_OPENING) &&
      !"=!".includes(part[NAMED_GROUP_OPENING.length]))
  );
}

export function roleOf(part: Part): PartRole {
  if (isBackreference(part)) return "backreference";
  if (isRawLookaround(part)) return "rawLookaround";
  if (isGroupOpen(part)) return "groupOpen";
  if (endsAtTruncationBranch(part)) return "truncationEnd";
  return "plain";
}
