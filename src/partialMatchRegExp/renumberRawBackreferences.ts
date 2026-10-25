import { RAW_LOOKAROUND_OFFSET } from "./atomSyntax.ts";
import { legacyEscapeAsLiteral } from "./legacyEscape.ts";
import { isNumericBackreference, type Backreference } from "./part.ts";
import type {
  RawLookaroundInfo,
  RawReference
} from "./rawLookaroundInfo.ts";

export function renumberedToken(
  backreference: Backreference,
  shiftForGroup: readonly number[]
) {
  return isNumericBackreference(backreference)
    ? "\\" + String(backreference.ref + shiftForGroup[backreference.ref])
    : "\\k<" + backreference.ref + ">";
}

export default function renumberRawBackreferences(
  part: string,
  info: RawLookaroundInfo,
  shiftForGroup: readonly number[]
) {
  let renumbered = "";
  let cursor = 0;
  const partStart = info.sourceStart - RAW_LOOKAROUND_OFFSET;
  for (const reference of info.references) {
    const relativeStart = reference.start - partStart;
    const relativeEnd = reference.end - partStart;
    renumbered +=
      part.slice(cursor, relativeStart) +
      rawReferenceReplacement(
        part.slice(relativeStart, relativeEnd),
        reference,
        shiftForGroup
      );
    cursor = relativeEnd;
  }
  return renumbered + part.slice(cursor);
}

function rawReferenceReplacement(
  spelling: string,
  { ref }: RawReference,
  shiftForGroup: readonly number[]
) {
  return ref >= 1 && ref < shiftForGroup.length
    ? "\\" + String(ref + shiftForGroup[ref])
    : legacyEscapeAsLiteral(spelling.slice(1));
}
