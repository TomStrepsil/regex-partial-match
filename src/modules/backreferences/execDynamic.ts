import renderParts from "./renderParts.ts";
import type { DynamicPath } from "../../partialMatchRegExp/compilePartial/compiled.ts";
import {
  backreferenceExpansion,
  type ExpandedMatch
} from "../../partialMatchRegExp/backreferenceExpansion.ts";
import execFrom from "../../partialMatchRegExp/execFrom.ts";

function isAtOrBefore(match: RegExpExecArray | null, index: number) {
  return match !== null && match.index <= index;
}

export default function execDynamic(
  this: RegExp,
  dynamic: DynamicPath,
  input: string
) {
  const { preScan, expand, expansionFitsCaptures } = dynamic;

  const honoursLastIndex = this.global || this.sticky;
  const start = honoursLastIndex ? this.lastIndex : 0;

  const originalMatch = RegExp.prototype.exec.call(this, input);
  if (isAtOrBefore(originalMatch, start)) return originalMatch;

  let preScanMatch: RegExpExecArray | null = null;
  if (originalMatch) {
    preScanMatch = execFrom(preScan, input, start);
    const noEarlierPartialPossible =
      preScanMatch === null || preScanMatch.index >= originalMatch.index;
    if (noEarlierPartialPossible) return originalMatch;
  }

  const capture = preScanMatch ?? execFrom(preScan, input, start);
  if (capture === null) return originalMatch;

  const scanningFlags = honoursLastIndex ? this.flags : this.flags + "g";
  let expandedFrom = capture;
  let expandedParts = expand(expandedFrom);
  let expanded = new RegExp(renderParts(expandedParts), scanningFlags);
  let match: ExpandedMatch | null = execFrom(expanded, input, start);

  if (match !== null && !expansionFitsCaptures(expandedFrom, match, input)) {
    expandedFrom = match;
    expandedParts = expand(expandedFrom);
    expanded = new RegExp(renderParts(expandedParts), scanningFlags);
    match = execFrom(expanded, input, expandedFrom.index);
    if (match !== null && !expansionFitsCaptures(expandedFrom, match, input))
      match = null;
  }

  if (match === null || isAtOrBefore(originalMatch, match.index))
    return originalMatch;

  if (honoursLastIndex) this.lastIndex = expanded.lastIndex;
  match[backreferenceExpansion] = expandedParts;
  return match;
}
