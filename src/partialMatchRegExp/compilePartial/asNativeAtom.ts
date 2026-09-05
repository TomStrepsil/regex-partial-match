import { isNumericBackreference, type Backreference } from "../part.ts";
import asOptionalAtom from "./asOptionalAtom.ts";

function backrefToken(backref: Backreference) {
  return isNumericBackreference(backref)
    ? "\\" + String(backref.ref)
    : "\\k<" + backref.ref + ">";
}

export default function asNativeAtom(backref: Backreference) {
  return asOptionalAtom(backrefToken(backref));
}
