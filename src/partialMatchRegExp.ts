import { buildPartialSource } from "./createPartialMatchRegex.ts";

class PartialMatchRegExp extends RegExp {
  private _partial: RegExp;
  private _detector: {
    regex: RegExp;
    groupIndices: number[];
  } | null;
  private _originalSticky: RegExp;

  constructor(pattern: RegExp | string, flags?: string) {
    super(pattern, flags);
    const { partial, detector } = buildPartialSource(this);
    this._partial = partial;
    this._detector = detector;
    this._originalSticky = new RegExp(
      this.source,
      this.flags.replace(/[gy]/g, "") + "y"
    );
  }

  override exec(input: string): RegExpExecArray | null {
    this._partial.lastIndex = this.lastIndex;
    const match = this._partial.exec(input);

    if (match?.[0].length === 0) {
      this._originalSticky.lastIndex = match.index;
      if (
        this._originalSticky.exec(input)?.[0].length !== 0 &&
        !this.markerFired(input, match.index)
      ) {
        if (this.global || this.sticky) this.lastIndex = 0;
        return null;
      }
    }

    this.lastIndex = this._partial.lastIndex;
    return match;
  }

  private markerFired(input: string, index: number): boolean {
    if (this._detector === null) return false;
    const { regex, groupIndices } = this._detector;
    regex.lastIndex = index;
    const detectorMatch = regex.exec(input);
    return (
      detectorMatch !== null &&
      groupIndices.some(idx => (detectorMatch.at(idx)?.length ?? 0) > 0)
    );
  }
}

export default PartialMatchRegExp;
