import { ANY_CAPTURED_TEXT } from "../atomSyntax.ts";
import { isBackreference, type Part } from "../part.ts";
import asNativeAtom from "./asNativeAtom.ts";

export default function asPreScanPart(part: Part) {
  if (!isBackreference(part)) return part;
  return part.forward ? asNativeAtom(part) : ANY_CAPTURED_TEXT;
}
