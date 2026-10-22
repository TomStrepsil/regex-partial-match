import {
  DISJUNCTION_TO_END_OF_INPUT,
  OPTIONAL_ATOM_OPENING,
  asOptionalAtom
} from "../partialMatchRegExp/atomSyntax.ts";

export const UNSATISFIABLE = "[]";
export const ONLY_AT_END_OF_INPUT = asOptionalAtom(UNSATISFIABLE);

export const optionalAtomTextOf = (atom: string) =>
  atom.slice(OPTIONAL_ATOM_OPENING.length, -DISJUNCTION_TO_END_OF_INPUT.length);
