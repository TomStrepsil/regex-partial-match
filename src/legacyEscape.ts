const LEGACY_OCTAL_ESCAPE_REGEX = /^(?:[0-3][0-7]{0,2}|[4-7][0-7]?)/;

export default function legacyEscapeAsLiteral(digits: string): string {
  const octal = LEGACY_OCTAL_ESCAPE_REGEX.exec(digits)?.[0];
  return octal === undefined
    ? digits
    : "\\x" +
        parseInt(octal, 8).toString(16).padStart(2, "0") +
        digits.slice(octal.length);
}
