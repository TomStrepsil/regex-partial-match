const LEGACY_OCTAL_ESCAPE_REGEX = /^(?:[0-3][0-7]{0,2}|[4-7][0-7]?)/;

const hexEscape = (codeUnit: number) =>
  "\\x" + (codeUnit < 0x10 ? "0" : "") + codeUnit.toString(16);

export function legacyEscapeAsLiteral(digits: string): string {
  return legacyEscapeAtoms(digits).join("");
}

export function legacyEscapeAtoms(digits: string): string[] {
  const octal = LEGACY_OCTAL_ESCAPE_REGEX.exec(digits)?.[0];
  const atoms: string[] = [];
  let index = 0;

  if (octal !== undefined) {
    atoms.push(hexEscape(parseInt(octal, 8)));
    index = octal.length;
  }
  for (; index < digits.length; index++) atoms.push(digits[index]);

  return atoms;
}
