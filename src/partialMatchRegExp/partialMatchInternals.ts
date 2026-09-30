export const compiledPartial = Symbol("compiledPartial");

export function execFrom(regex: RegExp, input: string, start: number) {
  regex.lastIndex = start;
  return regex.exec(input);
}

export function isAtOrBefore(match: RegExpExecArray | null, index: number) {
  return match !== null && match.index <= index;
}
