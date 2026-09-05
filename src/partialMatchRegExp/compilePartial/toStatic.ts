import type { RawLookaroundInfo } from "../part.ts";
import { CompiledStatic } from "./compiled.ts";

export default function toStatic(
  parts: string[],
  flags: string,
  rawLookarounds: readonly RawLookaroundInfo[],
  namedGroupOpenings: readonly string[],
  featureMask: number
) {
  return new CompiledStatic(
    new RegExp(parts.join(""), flags),
    parts,
    rawLookarounds,
    namedGroupOpenings,
    featureMask
  );
}
