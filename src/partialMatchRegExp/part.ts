export interface CaptureRead {
  readonly groupsBefore: number;
  readonly groupBodies: readonly (readonly Part[] | undefined)[];
  readonly readsLookaheadCapture: boolean;
}

interface BackreferenceStamps {
  caseInsensitive?: boolean;
  capture?: CaptureRead;
}

interface NumericBackreference extends BackreferenceStamps {
  ref: number;
}

interface NamedBackreference extends BackreferenceStamps {
  ref: string;
}

export type Backreference = NumericBackreference | NamedBackreference;
export type Part = string | Backreference;

export const isBackreference = (part: Part): part is Backreference =>
  typeof part !== "string";

export const isNumericBackreference = (
  part: Part
): part is NumericBackreference =>
  isBackreference(part) && typeof part.ref === "number";
