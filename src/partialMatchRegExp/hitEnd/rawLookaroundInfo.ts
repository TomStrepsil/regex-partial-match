export interface RawReference {
  ref: number | string;
  start: number;
  end: number;
}

export interface RawLookaroundInfo {
  sourceStart: number;
  capturingGroupsOpened: number;
  references: readonly RawReference[];
}

export type RawLookarounds = readonly (RawLookaroundInfo | undefined)[];
