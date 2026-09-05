import escapeAtom from "../escapeAtom.ts";
import caseFoldFlags from "./caseFoldFlags.ts";

export default function longestBakedPrefixEndingInput(
  baked: string,
  input: string,
  flags: string
) {
  if (!flags.includes("i")) {
    for (let length = baked.length; length > 0; length--) {
      const consumed = baked.slice(0, length);
      if (input.endsWith(consumed)) return consumed;
    }
    return "";
  }
  const byDecreasingLength: string[] = [];
  for (let length = baked.length; length > 0; length--) {
    byDecreasingLength.push(escapeAtom(baked.slice(0, length)));
  }
  const match = byDecreasingLength.length
    ? new RegExp(`(?:${byDecreasingLength.join("|")})$`, caseFoldFlags(flags)).exec(input)
    : null;
  return match ? baked.slice(0, match[0].length) : "";
}
