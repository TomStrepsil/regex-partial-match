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

export interface RawLookaroundRecorder {
  reference(ref: number | string, start: number, end: number): void;
  rawLookaround(sourceStart: number, capturingGroupsOpened: number): void;
}

export default function rawLookaroundRecorder(
  rawLookarounds: RawLookaroundInfo[]
): RawLookaroundRecorder {
  let referencesSinceLastLookaround: RawReference[] = [];
  return {
    reference(ref, start, end) {
      referencesSinceLastLookaround.push({ ref, start, end });
    },
    rawLookaround(sourceStart, capturingGroupsOpened) {
      rawLookarounds.push({
        sourceStart,
        capturingGroupsOpened,
        references: referencesSinceLastLookaround.filter(
          ({ start }) => start > sourceStart
        )
      });
      referencesSinceLastLookaround = [];
    }
  };
}
