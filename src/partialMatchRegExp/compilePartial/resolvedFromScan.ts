import { decodeGroupName } from "../groupName.ts";
import { isNumericBackreference, type Backreference } from "../part.ts";

export default function resolvedFromScan(
  backref: Backreference,
  capture: RegExpExecArray
) {
  if (backref.forward) return undefined;
  return isNumericBackreference(backref)
    ? capture[backref.ref]
    : capture.groups?.[decodeGroupName(backref.ref)];
}
