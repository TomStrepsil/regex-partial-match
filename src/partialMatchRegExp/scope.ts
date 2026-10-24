export const CASE_INSENSITIVE = 1;
export const MULTILINE = 2;
export const DOT_ALL = 4;
export const UNICODE = 8;
export const UNICODE_SETS = 16;
export const WITHIN_LOOKAROUND = 32;
export const WITHIN_GROUP = 64;
export const WITHIN_RAW_LOOKAROUND = 128;

export function scopeOf(regex: RegExp) {
  return (
    (regex.ignoreCase ? CASE_INSENSITIVE : 0) |
    (regex.multiline ? MULTILINE : 0) |
    (regex.dotAll ? DOT_ALL : 0) |
    (regex.unicode ? UNICODE : 0) |
    (regex.unicodeSets ? UNICODE | UNICODE_SETS : 0)
  );
}

export type ModifiersHook = (scope: number, modifiers: string) => number;
