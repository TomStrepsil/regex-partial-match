export const CASE_INSENSITIVE = 1;
export const MULTILINE = 2;
export const DOT_ALL = 4;
export const UNICODE = 8;
export const UNICODE_SETS = 16;
export const WITHIN_LOOKAROUND = 32;

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

export function scopeOf(regex: RegExp): number {
  return (
    (regex.ignoreCase ? CASE_INSENSITIVE : 0) |
    (regex.multiline ? MULTILINE : 0) |
    (regex.dotAll ? DOT_ALL : 0) |
    (regex.unicode ? UNICODE : 0) |
    (regex.unicodeSets ? UNICODE | UNICODE_SETS : 0)
  );
}

export function scopeWithModifiers(scope: number, modifiers: string): number {
  let removing = false;
  for (let index = 0; index < modifiers.length; index++) {
    const modifier = modifiers[index];
    if (modifier === MODIFIER_REMOVAL) removing = true;
    else if (removing) scope &= ~modifierBit(modifier);
    else scope |= modifierBit(modifier);
  }
  return scope;
}

export function flagsOf(scope: number): string {
  return (
    (scope & CASE_INSENSITIVE ? "i" : "") +
    (scope & MULTILINE ? "m" : "") +
    (scope & DOT_ALL ? "s" : "") +
    (scope & UNICODE_SETS ? "v" : scope & UNICODE ? "u" : "")
  );
}
