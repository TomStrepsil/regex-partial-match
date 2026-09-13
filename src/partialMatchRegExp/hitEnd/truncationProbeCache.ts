import type { BackreferenceExpansion } from "../backreferenceExpansion.ts";
import type { TruncationProbe } from "./truncationProbe.ts";

export interface TruncationProbeCache {
  probe: TruncationProbe | undefined;
  stickyPreScan: RegExp | undefined;
  expansion: BackreferenceExpansion | undefined;
}
