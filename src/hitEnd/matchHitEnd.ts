import { buildTruncationProbe, tookTruncationBranch } from "./truncationProbe.ts";
import type {
  CompiledDynamic,
  CompiledPartial
} from "../partialMatchRegExp/compilePartial/compiled.ts";
import {
  backreferenceExpansion,
  type ExpandedMatch
} from "../partialMatchRegExp/backreferenceExpansion.ts";
import type { TruncationProbeCache } from "./truncationProbeCache.ts";
import type { Part } from "../partialMatchRegExp/part.ts";
import { FLAGS_IRRELEVANT_TO_REBUILD } from "../partialMatchRegExp/constants.ts";

export const EXPANDED_PROBES_KEPT = 12;

export default function matchHitEnd(
  compiled: CompiledPartial,
  match: RegExpExecArray,
  cache: TruncationProbeCache
) {
  const probe =
    "dynamic" in compiled
      ? dynamicProbe(compiled, match, cache)
      : unexpandedProbe(compiled, cache);
  return tookTruncationBranch(probe, match.input, match.index);
}

function dynamicProbe(
  compiled: CompiledDynamic,
  match: ExpandedMatch,
  cache: TruncationProbeCache
) {
  const parts =
    match[backreferenceExpansion] ??
    expandedPartsAt(compiled, match, cache);
  if (parts === undefined) return unexpandedProbe(compiled, cache);
  for (const expansion of cache.expansions) {
    if (sameParts(expansion.parts, parts)) return expansion.probe;
  }
  const probe = probeOf(parts, cache);
  cache.expansions[cache.oldestExpansion] = { parts, probe };
  cache.oldestExpansion = (cache.oldestExpansion + 1) % EXPANDED_PROBES_KEPT;
  return probe;
}

function unexpandedProbe(
  compiled: CompiledPartial,
  cache: TruncationProbeCache
) {
  return (cache.probe ??= probeOf(compiled.parts, cache));
}

function probeOf(
  parts: readonly Part[],
  { rawLookarounds, flags }: TruncationProbeCache
) {
  return buildTruncationProbe(parts, rawLookarounds, flags);
}

function expandedPartsAt(
  compiled: CompiledDynamic,
  match: RegExpExecArray,
  cache: TruncationProbeCache
) {
  const { preScan, expand } = compiled.dynamic;
  cache.stickyPreScan ??= new RegExp(
    preScan.source,
    cache.flags.replace(FLAGS_IRRELEVANT_TO_REBUILD, "") + "y"
  );
  cache.stickyPreScan.lastIndex = match.index;
  const capture = cache.stickyPreScan.exec(match.input);
  if (capture === null) return undefined;

  const parts = expand(capture);
  return parts.length === compiled.parts.length ? undefined : parts;
}

function sameParts(cached: readonly Part[], parts: readonly Part[]) {
  if (cached.length !== parts.length) return false;
  for (let index = 0; index < parts.length; index++) {
    if (cached[index] !== parts[index]) return false;
  }
  return true;
}
