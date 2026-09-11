import {
  buildTruncationProbe,
  tookTruncationBranch
} from "./truncationProbe.ts";
import type { CompiledPartial } from "../compilePartial/compiled.ts";
import {
  backreferenceExpansion,
  type ExpandedMatch
} from "../backreferenceExpansion.ts";
import type { TruncationProbeCache } from "./truncationProbeCache.ts";

export default function matchHitEnd(
  compiled: CompiledPartial,
  match: RegExpExecArray,
  flags: string,
  cache: TruncationProbeCache
): boolean {
  const expansion =
    compiled.kind === "dynamic"
      ? (match as ExpandedMatch)[backreferenceExpansion]
      : undefined;
  if (expansion !== undefined) {
    expansion.probe ??= buildTruncationProbe(
      expansion.parts,
      compiled.rawLookarounds,
      compiled.namedGroupOpenings,
      flags
    );
    return tookTruncationBranch(expansion.probe, match.input, match.index);
  }

  cache.probe ??= buildTruncationProbe(
    compiled.parts,
    compiled.rawLookarounds,
    compiled.namedGroupOpenings,
    flags
  );
  return tookTruncationBranch(cache.probe, match.input, match.index);
}
