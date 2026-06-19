import createPartialMatchRegex from "./createPartialMatchRegex.ts";

export class PartialMatchRegExp extends RegExp {
  private _partial: RegExp;
  private _originalSticky: RegExp;

  constructor(pattern: RegExp | string, flags?: string) {
    super(pattern, flags);
    this._partial = createPartialMatchRegex(this);
    this._originalSticky = new RegExp(
      this.source,
      this.flags.replace(/[gy]/, "") + "y"
    );
  }

  override exec(input: string): RegExpExecArray | null {
    const partial = this._partial;
    partial.lastIndex = this.lastIndex;
    const match = partial.exec(input);
    if (match?.index === input.length) {
      const originalSticky = this._originalSticky;
      originalSticky.lastIndex = match.index;
      const originalMatch = originalSticky.exec(input);
      if (originalMatch === null || originalMatch[0].length !== 0) {
        if (this.global || this.sticky) this.lastIndex = 0;
        return null;
      }
    }
    this.lastIndex = partial.lastIndex;
    return match;
  }
}

export default PartialMatchRegExp;
