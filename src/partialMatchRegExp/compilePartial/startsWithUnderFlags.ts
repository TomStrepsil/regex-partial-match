import escapeAtom from "../escapeAtom.ts";
import caseFoldFlags from "./caseFoldFlags.ts";

export default function startsWithUnderFlags(
  text: string,
  prefix: string,
  flags: string
) {
  if (prefix === "" || !flags.includes("i")) return text.startsWith(prefix);
  return new RegExp("^" + escapeAtom(prefix), caseFoldFlags(flags)).test(text);
}
