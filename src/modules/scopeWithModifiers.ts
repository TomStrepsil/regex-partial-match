import {
  CASE_INSENSITIVE,
  DOT_ALL,
  MULTILINE
} from "../partialMatchRegExp/scope.ts";

const MODIFIER_REMOVAL = "-";

function modifierBit(modifier: string) {
  switch (modifier) {
    case "i":
      return CASE_INSENSITIVE;
    case "m":
      return MULTILINE;
    default:
      return DOT_ALL;
  }
}

export default function scopeWithModifiers(scope: number, modifiers: string) {
  let removing = false;
  for (let index = 0; index < modifiers.length; index++) {
    const modifier = modifiers[index];
    if (modifier === MODIFIER_REMOVAL) removing = true;
    else if (removing) scope &= ~modifierBit(modifier);
    else scope |= modifierBit(modifier);
  }
  return scope;
}
