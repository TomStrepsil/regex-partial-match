import "vitest";

interface ToMatchAtParams {
  match: string;
  index: number;
}

interface ToMatchPartiallyParams {
  characters: string[];
  index?: number;
}

interface ToNotMatchPartiallyParams {
  characters: string[];
}

declare module "vitest" {
  interface Assertion {
    toMatchAt(params: ToMatchAtParams): void;
    toNotMatch(): void;
    toMatchPartially(params: ToMatchPartiallyParams): R;
    toNotMatchPartially(
      params: ToNotMatchPartiallyParams
    ): R;
  }
}
