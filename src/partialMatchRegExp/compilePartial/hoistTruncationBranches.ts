import {
  DISJUNCTION_TO_END_OF_INPUT,
  OPTIONAL_ATOM_OPENING,
  isOptionalAtom
} from "../atomSyntax.ts";
import { LAZY_MARK, isQuantifier } from "../quantifier.ts";
import type { Part } from "../part.ts";

const END_OF_INPUT = DISJUNCTION_TO_END_OF_INPUT.slice(1, -1);
const SINGLE_CHARACTER_ESCAPE =
  /^\\(?:c[a-z]|x[\da-f]{2}|u[\da-f]{4}|u\{[\da-f]+\}|[pP]\{[\w=]+\}|[^bBk1-9])$/i;
const MATCHES_STRINGS = /\\q\{|\\p\{(?:Basic_Emoji|Emoji_Keycap_Sequence|RGI_)/;
const MINIMUM = /^\{(\d+)/;

function matchesOneCharacter(atom: string) {
  if (MATCHES_STRINGS.test(atom)) return false;
  if (atom.startsWith("[")) return atom.endsWith("]");
  if (atom.startsWith("\\")) return SINGLE_CHARACTER_ESCAPE.test(atom);
  return [...atom].length === 1 && !"^{}".includes(atom);
}

function minimumOf(quantifier: string) {
  if (quantifier === "*") return 0;
  if (quantifier === "+") return 1;
  return Number(MINIMUM.exec(quantifier)?.[1]);
}

function hoisted(atom: string, quantifier: string, lazyMark: string) {
  const minimum = minimumOf(quantifier);
  const loop = atom + quantifier + lazyMark;
  if (minimum === 0) return loop;
  const shortOfMinimum =
    minimum === 1 ? "" : atom + "{0," + String(minimum - 1) + "}" + lazyMark;
  return (
    OPTIONAL_ATOM_OPENING + loop + "|" + shortOfMinimum + END_OF_INPUT + ")"
  );
}

// (?:X|E)+ backtracks through one alternation per repetition, which overflows
// V8's stack on multi-megabyte runs. When X reads exactly one character, E can
// only follow the run, so (?:X+|E) matches the same text without that cost.
export default function hoistTruncationBranches<T extends Part>(
  parts: readonly T[]
) {
  const hoistedParts: (T | string)[] = [];
  for (let index = 0; index < parts.length; index++) {
    const part = parts[index];
    const quantifier = parts[index + 1];
    if (
      !isOptionalAtom(part) ||
      !isQuantifier(quantifier) ||
      quantifier === "?"
    ) {
      hoistedParts.push(part);
      continue;
    }
    const atom = part.slice(
      OPTIONAL_ATOM_OPENING.length,
      -DISJUNCTION_TO_END_OF_INPUT.length
    );
    if (!matchesOneCharacter(atom)) {
      hoistedParts.push(part);
      continue;
    }
    const lazyMark = parts[index + 2] === LAZY_MARK ? LAZY_MARK : "";
    hoistedParts.push(hoisted(atom, quantifier, lazyMark));
    index += lazyMark ? 2 : 1;
  }
  return hoistedParts;
}
