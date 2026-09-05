import escapeAtom from "../escapeAtom.ts";
import caseFoldFlags from "./caseFoldFlags.ts";

const SENTINEL = null;

function foldMatchersFor(atoms: readonly string[], flags: string) {
  const matchers = Object.create(null) as Partial<Record<string, RegExp>>;
  if (!flags.includes("i")) return matchers;
  const foldFlags = caseFoldFlags(flags);
  for (const atom of atoms) {
    if (!(atom in matchers)) {
      matchers[atom] = new RegExp("^" + escapeAtom(atom), foldFlags);
    }
  }
  return matchers;
}

function atomsAgree(
  a: string | null,
  b: string | null,
  foldMatchers: Readonly<Partial<Record<string, RegExp>>>
) {
  if (a === SENTINEL || b === SENTINEL) return false;
  if (a === b) return true;
  return foldMatchers[a]?.test(b) ?? false;
}

export default function longestBakedPrefixEndingInput(
  baked: string,
  input: string,
  flags: string
) {
  if (baked === "") return "";

  const isUnicode = flags.includes("u") || flags.includes("v");
  const bakedAtoms = isUnicode ? Array.from(baked) : baked.split("");
  const inputAtoms = isUnicode ? Array.from(input) : input.split("");
  const foldMatchers = foldMatchersFor(bakedAtoms, flags);

  const sentinelIndex = bakedAtoms.length;
  const totalLength = bakedAtoms.length + 1 + inputAtoms.length;
  const atIndex = (index: number) =>
    index < sentinelIndex
      ? bakedAtoms[index]
      : index === sentinelIndex
        ? SENTINEL
        : inputAtoms[index - sentinelIndex - 1];

  const longestBorder = [0];
  for (let index = 1; index < totalLength; index++) {
    let matched = longestBorder[index - 1];
    while (
      matched > 0 &&
      !atomsAgree(atIndex(matched), atIndex(index), foldMatchers)
    ) {
      matched = longestBorder[matched - 1];
    }
    if (atomsAgree(atIndex(matched), atIndex(index), foldMatchers)) matched++;
    longestBorder.push(matched);
  }

  return bakedAtoms.slice(0, longestBorder[totalLength - 1]).join("");
}
