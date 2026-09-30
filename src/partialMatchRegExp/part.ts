interface NumericBackreference {
  ref: number;
  forward?: boolean;
  caseInsensitive?: boolean;
}

interface NamedBackreference {
  ref: string;
  forward?: boolean;
  caseInsensitive?: boolean;
}

export type Backreference = NumericBackreference | NamedBackreference;
export type Part = string | Backreference;

export const isBackreference = (part: Part): part is Backreference =>
  typeof part !== "string";

export const isNumericBackreference = (
  part: Part
): part is NumericBackreference =>
  isBackreference(part) && typeof part.ref === "number";
