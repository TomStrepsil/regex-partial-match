import { legacyEscapeAtoms } from "../legacyEscape.ts";
import { isNumericBackreference, type Part } from "../part.ts";
import asOptionalAtom from "./asOptionalAtom.ts";

export default function reclassifyLegacyEscapes(
  parts: Part[],
  source: string,
  groupCount: number
) {
  const reclassified: Part[] = [];
  for (const part of parts) {
    if (isNumericBackreference(part) && (part.ref < 1 || part.ref > groupCount)) {
      for (const atom of legacyEscapeAtoms(
        source.slice(part.start + 1, part.end)
      )) {
        reclassified.push(asOptionalAtom(atom));
      }
    } else {
      reclassified.push(part);
    }
  }
  return reclassified;
}
