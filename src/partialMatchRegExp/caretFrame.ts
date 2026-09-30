import type { Part } from "./part.ts";

export const ON_CARET = 0;
export const ON_ALTERNATIVE = 1;
export const ON_LOOKAHEAD = 2;
export const ON_GROUP = 3;
export const ON_END = 4;

export interface CaretFrame {
  (event: typeof ON_CARET | typeof ON_ALTERNATIVE | typeof ON_END): void;
  (
    event: typeof ON_LOOKAHEAD,
    body: Part[],
    scope: number,
    source: string,
    i: number
  ): void;
  (
    event: typeof ON_GROUP,
    body: Part[],
    groupScope: number,
    source: string,
    i: number,
    closing: string,
    containsRawLookaround: boolean
  ): { closing: string; forced: boolean; stays: boolean };
}

export type CaretRecorder = (result: Part[], scope: number) => CaretFrame;

export type CaretHook = (source?: string) => CaretRecorder | undefined;
