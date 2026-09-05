import { DISJUNCTION_TO_END_OF_INPUT } from "../atomSyntax.ts";

export default function asOptionalAtom(text: string) {
  return "(?:" + text + DISJUNCTION_TO_END_OF_INPUT;
}
