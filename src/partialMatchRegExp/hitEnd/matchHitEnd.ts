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
  type ExpandedMatch
} from "../backreferenceExpansion.ts";
import type { TruncationProbeCache } from "./truncationProbeCache.ts";
import type { Part } from "../part.ts";
import { FLAGS_IRRELEVANT_TO_REBUILD } from "../constants.ts";

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
  const parts =
    (match as ExpandedMatch)[backreferenceExpansion] ??
    expandedPartsAt(compiled, match, flags, cache);
  if (parts === undefined) return unexpandedProbe(compiled, flags, cache);
  const cached = cache.expansion;
  if (cached !== undefined && sameParts(cached.parts, parts)) {
    return cached.probe;
  }
  cache.expansion = { parts, probe: probeOf(compiled, parts, flags) };
  return cache.expansion.probe;
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

function expandedPartsAt(
  compiled: CompiledDynamic,
  match: RegExpExecArray,
  flags: string,
  cache: TruncationProbeCache
): Part[] | undefined {
  const { preScan, expand } = compiled.dynamic;
  cache.stickyPreScan ??= new RegExp(
    preScan.source,
    flags.replace(FLAGS_IRRELEVANT_TO_REBUILD, "") + "y"
  );
  cache.stickyPreScan.lastIndex = match.index;
  const capture = cache.stickyPreScan.exec(match.input);
  if (capture === null) return undefined;

  const parts = expand(capture);
  return parts.length === compiled.parts.length ? undefined : parts;
}

function sameParts(cached: readonly Part[], parts: readonly Part[]): boolean {
  if (cached.length !== parts.length) return false;
  for (let index = 0; index < parts.length; index++) {
    if (cached[index] !== parts[index]) return false;
  }
  return true;
}
