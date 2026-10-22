import {
  START_ANCHOR,
  asOptionalAtom
} from "../../partialMatchRegExp/atomSyntax.ts";
import { MULTILINE } from "../../partialMatchRegExp/scope.ts";

export const MULTILINE_CARET = "(?m:^)";

const CARET_SPELLINGS = [
  START_ANCHOR,
  MULTILINE_CARET,
  asOptionalAtom(START_ANCHOR),
  asOptionalAtom(MULTILINE_CARET)
];

export const caretFor = (scope: number) =>
  scope & MULTILINE ? START_ANCHOR : MULTILINE_CARET;

export const isCaret = (part: string) => CARET_SPELLINGS.indexOf(part) !== -1;
