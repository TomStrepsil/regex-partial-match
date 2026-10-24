import {
  endsAtTruncationBranch,
  isRawLookaround
} from "../partialMatchRegExp/atomSyntax.ts";
import { isBackreference, type Part } from "../partialMatchRegExp/part.ts";

export type PartRole =
  | "backreference"
  | "rawLookaround"
  | "truncationEnd"
  | "plain";

export function roleOf(part: Part): PartRole {
  if (isBackreference(part)) return "backreference";
  if (isRawLookaround(part)) return "rawLookaround";
  if (endsAtTruncationBranch(part)) return "truncationEnd";
  return "plain";
}
