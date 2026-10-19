import { LOOP } from "../quantifier.ts";
import type { Part } from "../part.ts";

export default function unwrapLoopedAtoms(
  parts: Part[],
  loopedAtoms: ReadonlyMap<Part, string>
) {
  if (loopedAtoms.size === 0) return parts;
  for (let index = 1; index < parts.length; index++) {
    if (parts[index] !== LOOP) continue;
    const atom = loopedAtoms.get(parts[index - 1]);
    if (atom !== undefined) parts[index - 1] = atom;
  }
  return parts;
}
