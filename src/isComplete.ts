import {
  buildTruncationProbe,
  tookTruncationBranch,
  type TruncationProbe
} from "./truncationProbe.ts";
import type { CompiledPartial } from "./compilePartial.ts";
import type { Part } from "./part.ts";

export interface BackreferenceExpansion {
  parts: Part[];
  probe: TruncationProbe | undefined;
}

export const backreferenceExpansion = Symbol("backreferenceExpansion");

export interface ExpandedMatch extends RegExpExecArray {
  [backreferenceExpansion]?: BackreferenceExpansion;
}

export interface TruncationProbeCache {
  probe: TruncationProbe | undefined;
}

export function isComplete(
  compiled: CompiledPartial,
  match: RegExpExecArray,
  flags: string,
  cache: TruncationProbeCache
): boolean {
  if (compiled.kind === "dynamic") {
    const expansion = (match as ExpandedMatch)[backreferenceExpansion];
    if (expansion === undefined) return true;
    expansion.probe ??= buildTruncationProbe(
      expansion.parts,
      compiled.rawLookarounds,
      compiled.namedGroupOpenings,
      flags
    );
    return !tookTruncationBranch(expansion.probe, match.input, match.index);
  }

  cache.probe ??= buildTruncationProbe(
    compiled.parts,
    compiled.rawLookarounds,
    compiled.namedGroupOpenings,
    flags
  );
  return !tookTruncationBranch(cache.probe, match.input, match.index);
}
