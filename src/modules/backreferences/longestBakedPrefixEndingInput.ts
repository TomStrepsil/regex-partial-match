import escapeAtom from "../../partialMatchRegExp/escapeAtom.ts";
import caseFoldFlags from "./caseFoldFlags.ts";

type FoldMatchers = Partial<Record<string, RegExp | null>>;

const NO_CASE_FOLDING: FoldMatchers = { __proto__: null };

function foldMatchersFor(atoms: readonly string[], flags: string) {
  if (!flags.includes("i")) return NO_CASE_FOLDING;
  const matchers: FoldMatchers = { __proto__: null };
  const foldFlags = caseFoldFlags(flags);
  for (const atom of atoms) {
    if (!(atom in matchers)) {
      matchers[atom] = new RegExp("^" + escapeAtom(atom), foldFlags);
    }
  }
  return matchers;
}

export default function longestBakedPrefixEndingInput(
  baked: string,
  input: string,
  flags: string
) {
  if (baked === "") return "";

  const isUnicode = flags.includes("u") || flags.includes("v");
  const bakedAtoms = isUnicode ? Array.from(baked) : baked.split("");
  const reach = bakedAtoms.length;
  const withinReach = input.slice(isUnicode ? -2 * reach : -reach);
  const inputAtoms = (
    isUnicode ? Array.from(withinReach) : withinReach.split("")
  ).slice(-reach);

  const foldMatchers = foldMatchersFor(bakedAtoms, flags);
  const agrees = (bakedIndex: number, atom: string) => {
    const bakedAtom = bakedAtoms[bakedIndex];
    return bakedAtom === atom || (foldMatchers[bakedAtom]?.test(atom) ?? false);
  };

  const longestBorder = [0];
  for (let index = 1; index < reach; index++) {
    const atom = bakedAtoms[index];
    let matched = longestBorder[index - 1];
    while (matched > 0 && !agrees(matched, atom))
      matched = longestBorder[matched - 1];
    longestBorder.push(agrees(matched, atom) ? matched + 1 : 0);
  }

  let matched = 0;
  for (const atom of inputAtoms) {
    while (matched > 0 && !agrees(matched, atom))
      matched = longestBorder[matched - 1];
    if (agrees(matched, atom)) matched++;
  }

  return bakedAtoms.slice(0, matched).join("");
}
