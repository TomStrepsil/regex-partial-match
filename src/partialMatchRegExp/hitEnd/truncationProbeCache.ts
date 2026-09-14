import type { Part } from "../part.ts";
import type { TruncationProbe } from "./truncationProbe.ts";

export interface TruncationProbeCache {
  probe: TruncationProbe | undefined;
  stickyPreScan: RegExp | undefined;
  expansion: { parts: readonly Part[]; probe: TruncationProbe } | undefined;
}
