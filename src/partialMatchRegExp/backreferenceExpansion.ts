import type { Part } from "./part.ts";

export const backreferenceExpansion = Symbol("backreferenceExpansion");

export interface ExpandedMatch extends RegExpExecArray {
  [backreferenceExpansion]?: Part[];
}
