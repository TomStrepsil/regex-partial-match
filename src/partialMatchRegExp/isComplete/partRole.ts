import {
  DISJUNCTION_TO_END_OF_INPUT,
  OPTIONAL_ATOM_OPENING,
  NAMED_GROUP_OPENING
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

function isRawLookaroundOpen(part: string): boolean {
  return (
    part.startsWith("(?!") ||
    part.startsWith(NAMED_GROUP_OPENING + "=") ||
    part.startsWith(NAMED_GROUP_OPENING + "!")
  );
}

function endsAtTruncationBranch(part: string): boolean {
  return (
    part === DISJUNCTION_TO_END_OF_INPUT ||
    (part.startsWith(OPTIONAL_ATOM_OPENING) &&
      part.endsWith(DISJUNCTION_TO_END_OF_INPUT))
  );
}

export function roleOf(part: Part): PartRole {
  if (isBackreference(part)) return "backreference";
  if (isRawLookaroundOpen(part)) return "rawLookaround";
  if (isGroupOpen(part)) return "groupOpen";
  if (endsAtTruncationBranch(part)) return "truncationEnd";
  return "plain";
}
