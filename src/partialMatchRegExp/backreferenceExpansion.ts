import type { Part } from "./part.ts";
import type { TruncationProbe } from "./isComplete/truncationProbe.ts";

export interface BackreferenceExpansion {
  parts: Part[];
  probe: TruncationProbe | undefined;
}

export const backreferenceExpansion = Symbol("backreferenceExpansion");

export interface ExpandedMatch extends RegExpExecArray {
  [backreferenceExpansion]?: BackreferenceExpansion;
}
