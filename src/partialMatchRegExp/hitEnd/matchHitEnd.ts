import { buildTruncationProbe, tookTruncationBranch } from "./truncationProbe.ts";
import type { CompiledPartial } from "../compilePartial/compiled.ts";
import type { CompiledDynamic } from "../../modules/backreferences/compiledDynamic.ts";
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
) {
  const probe =
    "dynamic" in compiled
      ? dynamicProbe(compiled, match, flags, cache)
      : unexpandedProbe(compiled, flags, cache);
  return tookTruncationBranch(probe, match.input, match.index);
}

function dynamicProbe(
  compiled: CompiledDynamic,
  match: RegExpExecArray,
  flags: string,
  cache: TruncationProbeCache
) {
  const parts =
    (match as ExpandedMatch)[backreferenceExpansion] ??
    expandedPartsAt(compiled, match, flags, cache);
  if (parts === undefined) return unexpandedProbe(compiled, flags, cache);
  const cached = cache.expansion;
  if (cached !== undefined && sameParts(cached.parts, parts)) {
    return cached.probe;
  }
  cache.expansion = { parts, probe: probeOf(parts, flags, cache) };
  return cache.expansion.probe;
}

function unexpandedProbe(
  compiled: CompiledPartial,
  flags: string,
  cache: TruncationProbeCache
) {
  return (cache.probe ??= probeOf(compiled.parts, flags, cache));
}

function probeOf(
  parts: readonly Part[],
  flags: string,
  { source }: TruncationProbeCache
) {
  return buildTruncationProbe(
    parts,
    source.rawLookarounds,
    source.declaredNames,
    flags
  );
}

function expandedPartsAt(
  compiled: CompiledDynamic,
  match: RegExpExecArray,
  flags: string,
  cache: TruncationProbeCache
) {
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

function sameParts(cached: readonly Part[], parts: readonly Part[]) {
  if (cached.length !== parts.length) return false;
  for (let index = 0; index < parts.length; index++) {
    if (cached[index] !== parts[index]) return false;
  }
  return true;
}
