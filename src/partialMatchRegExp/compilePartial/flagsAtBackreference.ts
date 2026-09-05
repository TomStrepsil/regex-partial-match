import type { Backreference } from "../part.ts";

export default function flagsAtBackreference(
  backref: Backreference,
  flags: string
) {
  const unicodeMode = flags.includes("v") ? "v" : flags.includes("u") ? "u" : "";
  return (backref.caseInsensitive ? "i" : "") + unicodeMode;
}
