import type { Hooks } from "../walk.ts";
import { Compiled } from "./compiled.ts";

export default function toStatic(
  parts: string[],
  flags: string,
  featureMask: number,
  hooks: Hooks
) {
  return new Compiled(
    new RegExp(parts.join(""), flags),
    parts,
    featureMask,
    hooks
  );
}
