import {
  DISJUNCTION_TO_END_OF_INPUT,
  MULTILINE_CARET,
  OPTIONAL_ATOM_OPENING,
  START_ANCHOR,
  asOptionalAtom
} from "../../partialMatchRegExp/atomSyntax.ts";
import { MULTILINE } from "../../partialMatchRegExp/scope.ts";

const CARET_SPELLINGS = [
  START_ANCHOR,
  MULTILINE_CARET,
  asOptionalAtom(START_ANCHOR),
  asOptionalAtom(MULTILINE_CARET)
];

export const caretFor = (scope: number) =>
  scope & MULTILINE ? START_ANCHOR : MULTILINE_CARET;

export const isCaret = (part: string) => CARET_SPELLINGS.indexOf(part) !== -1;

export const optionalAtomTextOf = (atom: string) =>
  atom.slice(OPTIONAL_ATOM_OPENING.length, -DISJUNCTION_TO_END_OF_INPUT.length);
