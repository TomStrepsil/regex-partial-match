import { isNumericBackreference, type Backreference } from "../../partialMatchRegExp/part.ts";
import { asOptionalAtom } from "../../partialMatchRegExp/atomSyntax.ts";

function backrefToken(backref: Backreference) {
  return isNumericBackreference(backref)
    ? "\\" + String(backref.ref)
    : "\\k<" + backref.ref + ">";
}

export default function asNativeAtom(backref: Backreference) {
  return asOptionalAtom(backrefToken(backref));
}
