import { optionalAtomTextOf } from "./atomSyntax.ts";
import { DOT_ALL, UNICODE_SETS, flagsOf } from "./scope.ts";

const LINE_TERMINATORS = "\n\r\u2028\u2029";

function compiledMatch(text: string, scope: number) {
  return new RegExp("(?:" + text + ")", flagsOf(scope)).test(LINE_TERMINATORS);
}

const ESCAPES_MATCHING_A_LINE_TERMINATOR = "nrsWD";
const ESCAPES_MATCHING_NO_LINE_TERMINATOR = "Swdtvf";
const ESCAPE = "\\";
const ANY_CHARACTER = ".";
const STRING_SET_ESCAPE = /\\q\{/;

function knownMatch(text: string, scope: number): boolean | undefined {
  if (text === ANY_CHARACTER) return (scope & DOT_ALL) !== 0;
  if (text.length === 1) return LINE_TERMINATORS.indexOf(text) !== -1;
  if ((scope & UNICODE_SETS) !== 0 && STRING_SET_ESCAPE.test(text)) return true;
  if (text.length !== 2 || text[0] !== ESCAPE) return undefined;
  if (ESCAPES_MATCHING_A_LINE_TERMINATOR.indexOf(text[1]) !== -1) return true;
  if (ESCAPES_MATCHING_NO_LINE_TERMINATOR.indexOf(text[1]) !== -1) return false;
  return undefined;
}

export default function canMatchLineTerminator(atom: string, scope: number) {
  const text = optionalAtomTextOf(atom);
  return knownMatch(text, scope) ?? compiledMatch(text, scope);
}
