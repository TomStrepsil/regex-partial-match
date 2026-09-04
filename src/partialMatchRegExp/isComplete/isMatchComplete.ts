import {
  buildTruncationProbe,
  tookTruncationBranch
} from "./truncationProbe.ts";
import type { CompiledPartial } from "../compilePartial.ts";
import {
  backreferenceExpansion,
  type ExpandedMatch
} from "../backreferenceExpansion.ts";
import type { TruncationProbeCache } from "./truncationProbeCache.ts";

export default function isMatchComplete(
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
