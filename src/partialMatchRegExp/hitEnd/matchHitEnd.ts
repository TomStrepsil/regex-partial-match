import {
  buildTruncationProbe,
  tookTruncationBranch,
  type TruncationProbe
} from "./truncationProbe.ts";
import type {
  CompiledDynamic,
  CompiledPartial
} from "../compilePartial/compiled.ts";
import {
  backreferenceExpansion,
  type BackreferenceExpansion,
  type ExpandedMatch
} from "../backreferenceExpansion.ts";
import type { TruncationProbeCache } from "./truncationProbeCache.ts";
import type { Part } from "../part.ts";

const FLAGS_IRRELEVANT_TO_SCANNING = /[dgy]/g;

export default function matchHitEnd(
  compiled: CompiledPartial,
  match: RegExpExecArray,
  flags: string,
  cache: TruncationProbeCache
): boolean {
  const probe =
    compiled.kind === "dynamic"
      ? dynamicProbe(compiled, match, flags, cache)
      : unexpandedProbe(compiled, flags, cache);
  return tookTruncationBranch(probe, match.input, match.index);
}

function dynamicProbe(
  compiled: CompiledDynamic,
  match: RegExpExecArray,
  flags: string,
  cache: TruncationProbeCache
): TruncationProbe {
  const expansion =
    (match as ExpandedMatch)[backreferenceExpansion] ??
    expansionAtMatch(compiled, match, flags, cache);
  return expansion === undefined
    ? unexpandedProbe(compiled, flags, cache)
    : (expansion.probe ??= probeOf(compiled, expansion.parts, flags));
}

function unexpandedProbe(
  compiled: CompiledPartial,
  flags: string,
  cache: TruncationProbeCache
): TruncationProbe {
  return (cache.probe ??= probeOf(compiled, compiled.parts, flags));
}

function probeOf(
  compiled: CompiledPartial,
  parts: readonly Part[],
  flags: string
): TruncationProbe {
  return buildTruncationProbe(
    parts,
    compiled.rawLookarounds,
    compiled.namedGroupOpenings,
    flags
  );
}

function expansionAtMatch(
  compiled: CompiledDynamic,
  match: RegExpExecArray,
  flags: string,
  cache: TruncationProbeCache
): BackreferenceExpansion | undefined {
  const { preScan, expand } = compiled.dynamic;
  cache.stickyPreScan ??= new RegExp(
    preScan.source,
    flags.replace(FLAGS_IRRELEVANT_TO_SCANNING, "") + "y"
  );
  cache.stickyPreScan.lastIndex = match.index;
  const capture = cache.stickyPreScan.exec(match.input);
  if (capture === null) return undefined;

  const parts = expand(capture);
  if (parts.length === compiled.parts.length) return undefined;

  const { expansion } = cache;
  if (expansion !== undefined && sameParts(expansion.parts, parts))
    return expansion;
  return (cache.expansion = { parts, probe: undefined });
}

function sameParts(cached: readonly Part[], parts: readonly Part[]): boolean {
  if (cached.length !== parts.length) return false;
  for (let index = 0; index < parts.length; index++) {
    if (cached[index] !== parts[index]) return false;
  }
  return true;
}
