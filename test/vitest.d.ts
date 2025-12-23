import "vitest";

interface ToMatchAtParams {
  match: string;
  index: number;
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
