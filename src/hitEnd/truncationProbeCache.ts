import type { Part } from "../partialMatchRegExp/part.ts";
import type { RawLookarounds } from "../partialMatchRegExp/rawLookaroundInfo.ts";
import type { TruncationProbe } from "./truncationProbe.ts";

export interface TruncationProbeCache {
  rawLookarounds: RawLookarounds;
  flags: string;
  probe: TruncationProbe | undefined;
  stickyPreScan: RegExp | undefined;
  expansions: { parts: readonly Part[]; probe: TruncationProbe }[];
  oldestExpansion: number;
}
