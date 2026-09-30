import { ANY_CAPTURED_TEXT } from "../../partialMatchRegExp/compilePartial/constants.ts";
import { isBackreference, type Part } from "../../partialMatchRegExp/part.ts";
import asNativeAtom from "../../partialMatchRegExp/compilePartial/asNativeAtom.ts";

export default function asPreScanPart(part: Part) {
  if (!isBackreference(part)) return part;
  return part.forward ? asNativeAtom(part) : ANY_CAPTURED_TEXT;
}
