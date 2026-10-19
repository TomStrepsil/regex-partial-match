import type { Hooks } from "../walk.ts";
import { CompiledStatic } from "./compiled.ts";

export default function toStatic(
  parts: string[],
  flags: string,
  featureMask: number,
  hooks: Hooks
) {
  return new CompiledStatic(
    new RegExp(parts.join(""), flags),
    parts,
    featureMask,
    hooks
  );
}
