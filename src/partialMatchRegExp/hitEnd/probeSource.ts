import type { CompiledPartial } from "../compilePartial/compiled.ts";
import groupShape from "../compilePartial/groupShape.ts";
import type { RawLookarounds } from "./rawLookaroundInfo.ts";

export interface ProbeSource {
  rawLookarounds: RawLookarounds;
  declaredNames: readonly string[];
}

const MAY_DECLARE_NAMED_GROUP = /\(\?<[^=!]/;

export default function probeSourceOf(
  regex: RegExp,
  { rawLookarounds }: CompiledPartial
): ProbeSource {
  return {
    rawLookarounds: rawLookarounds ?? [],
    declaredNames: MAY_DECLARE_NAMED_GROUP.test(regex.source)
      ? Object.keys(groupShape(regex).namedGroups ?? {})
      : []
  };
}
