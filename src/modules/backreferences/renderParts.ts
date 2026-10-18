import { isBackreference, type Part } from "../../partialMatchRegExp/part.ts";
import hoistTruncationBranches from "../../partialMatchRegExp/compilePartial/hoistTruncationBranches.ts";
import asNativeAtom from "./asNativeAtom.ts";

export default function renderParts(parts: readonly Part[]) {
  let rendered = "";
  for (const part of hoistTruncationBranches(parts)) {
    rendered += isBackreference(part) ? asNativeAtom(part) : part;
  }
  return rendered;
}
