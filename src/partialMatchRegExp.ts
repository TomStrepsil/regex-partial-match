import createPartialMatchRegex from "./createPartialMatchRegex.ts";

export class PartialMatchRegExp extends RegExp {
  #partial: RegExp;
  #originalMatchesEmpty: boolean;

  constructor(pattern: RegExp | string, flags?: string) {
    super(pattern, flags);
    this.#partial = createPartialMatchRegex(this);
    this.#originalMatchesEmpty = new RegExp(this.source, this.flags).test("");
  }

  override exec(input: string): RegExpExecArray | null {
    const partial = this.#partial;
    partial.lastIndex = this.lastIndex;
    const match = partial.exec(input);
    if (
      match?.index === input.length &&
      (input.length > 0 || !this.#originalMatchesEmpty)
    ) {
      if (this.global || this.sticky) this.lastIndex = 0;
      return null;
    }
    this.lastIndex = partial.lastIndex;
    return match;
  }
}

export default PartialMatchRegExp;
