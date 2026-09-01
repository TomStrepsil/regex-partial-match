import escapeAtom from "./escapeAtom.ts";
import legacyEscapeAsLiteral from "./legacyEscape.ts";
import {
  walk,
  isBackreference,
  isNumericBackreference,
  featureSet,
  DISJUNCTION_TO_END_OF_INPUT,
  FEATURE_BIT,
  type Backreference,
  type Part,
  type RawLookaroundInfo,
  type RegexFeature
} from "./walk.ts";

export type { RegexFeature };

const MAYBE_HAS_BACKREFERENCE_REGEX = /\\[1-9]|\\k</;
const ANY_CAPTURED_TEXT = "(?:[\\s\\S]*?)";

function backrefToken(backref: Backreference): string {
  return isNumericBackreference(backref)
    ? "\\" + String(backref.ref)
    : "\\k<" + backref.ref + ">";
}

function asOptionalAtom(text: string): string {
  return "(?:" + text + DISJUNCTION_TO_END_OF_INPUT;
}

function reclassifyLegacyEscapes(
  parts: Part[],
  source: string,
  groupCount: number,
  hasNamedGroup: boolean
): Part[] {
  return parts.map((part) => {
    if (!isBackreference(part)) return part;
    if (isNumericBackreference(part)) {
      return part.ref > groupCount
        ? asOptionalAtom(
            legacyEscapeAsLiteral(source.slice(part.start + 1, part.end))
          )
        : part;
    }
    return hasNamedGroup
      ? part
      : asOptionalAtom("k" + source.slice(part.start + 2, part.end));
  });
}

function spliceOriginalSource(
  source: string,
  backrefs: Backreference[]
): string {
  let result = "";
  let cursor = 0;
  for (const { start, end } of backrefs) {
    result += source.slice(cursor, start) + ANY_CAPTURED_TEXT;
    cursor = end;
  }
  return result + source.slice(cursor);
}

export interface DynamicPath {
  originalCaptureScan: RegExp;
  preScan: RegExp;
  expand: (capture: RegExpExecArray) => string[];
}

abstract class Compiled {
  private _features?: ReadonlySet<RegexFeature>;

  constructor(
    readonly rawLookarounds: readonly RawLookaroundInfo[],
    private readonly _featureMask: number
  ) {}

  get features(): ReadonlySet<RegexFeature> {
    return (this._features ??= featureSet(this._featureMask));
  }
}

class CompiledStatic extends Compiled {
  readonly kind = "static";

  constructor(
    readonly regex: RegExp,
    readonly parts: string[],
    rawLookarounds: readonly RawLookaroundInfo[],
    featureMask: number
  ) {
    super(rawLookarounds, featureMask);
  }
}

class CompiledDynamic extends Compiled {
  readonly kind = "dynamic";

  constructor(
    readonly dynamic: DynamicPath,
    rawLookarounds: readonly RawLookaroundInfo[],
    featureMask: number
  ) {
    super(rawLookarounds, featureMask);
  }
}

export type CompiledPartial = CompiledStatic | CompiledDynamic;

function toStatic(
  parts: string[],
  flags: string,
  rawLookarounds: readonly RawLookaroundInfo[],
  featureMask: number
): CompiledStatic {
  return new CompiledStatic(
    new RegExp(parts.join(""), flags),
    parts,
    rawLookarounds,
    featureMask
  );
}

export const compilePartial = (regex: RegExp): CompiledPartial => {
  const { parts, groupCount, featureMask, rawLookarounds } = walk(regex);
  const flags = regex.flags;

  if (!MAYBE_HAS_BACKREFERENCE_REGEX.test(regex.source)) {
    return toStatic(parts as string[], flags, rawLookarounds, featureMask);
  }

  const isUnicode = regex.unicode || regex.unicodeSets;
  const sanitisedParts = isUnicode
    ? parts
    : reclassifyLegacyEscapes(
        parts,
        regex.source,
        groupCount,
        (featureMask & FEATURE_BIT.namedGroup) !== 0
      );
  const backreferences = sanitisedParts.filter(isBackreference);
  if (backreferences.length === 0) {
    return toStatic(sanitisedParts as string[], flags, rawLookarounds, featureMask);
  }

  return new CompiledDynamic(
    {
      originalCaptureScan: new RegExp(
        spliceOriginalSource(regex.source, backreferences),
        flags
      ),
      preScan: new RegExp(
        sanitisedParts
          .map((part) => (isBackreference(part) ? ANY_CAPTURED_TEXT : part))
          .join(""),
        flags
      ),
      expand: (capture) => {
        const expanded: string[] = [];
        for (const part of sanitisedParts) {
          if (!isBackreference(part)) {
            expanded.push(part);
            continue;
          }
          const captured = isNumericBackreference(part)
            ? capture[part.ref]
            : capture.groups?.[part.ref];
          if (captured === undefined) {
            expanded.push(asOptionalAtom(backrefToken(part)));
            continue;
          }
          const atoms = isUnicode ? Array.from(captured) : captured.split("");
          for (const atom of atoms) {
            expanded.push(asOptionalAtom(escapeAtom(atom)));
          }
        }
        return expanded;
      }
    },
    rawLookarounds,
    featureMask
  );
};
