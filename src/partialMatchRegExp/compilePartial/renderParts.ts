import { isBackreference, type Part } from "../part.ts";
import asNativeAtom from "./asNativeAtom.ts";

export default function renderParts(parts: readonly Part[]): string {
  let rendered = "";
  for (const part of parts) {
    rendered += isBackreference(part) ? asNativeAtom(part) : part;
  }
  return rendered;
}
