import escapeAtom from "./escapeAtom.ts";
import { legacyEscapeAtoms } from "./legacyEscape.ts";
import {
  walk,
  isBackreference,
  isNumericBackreference,
  featureSet,
  hasFeature,
  DISJUNCTION_TO_END_OF_INPUT,
  type Backreference,
  type Part,
  type RawLookaroundInfo,
  type RegexFeature
} from "./walk.ts";

export type { RegexFeature };

const MAYBE_HAS_BACKREFERENCE_REGEX = /\\[0-9]|\\k</;
const ANY_CAPTURED_TEXT = "(?:[\\s\\S]*?)";
const QUANTIFIABLE_EMPTY_ATOM = "(?:)";

function backrefToken(backref: Backreference) {
  return isNumericBackreference(backref)
    ? "\\" + String(backref.ref)
    : "\\k<" + backref.ref + ">";
}

function asOptionalAtom(text: string) {
  return "(?:" + text + DISJUNCTION_TO_END_OF_INPUT;
}

function reclassifyLegacyEscapes(
  parts: Part[],
  source: string,
  groupCount: number
) {
  const reclassified: Part[] = [];
  for (const part of parts) {
    if (isNumericBackreference(part) && (part.ref < 1 || part.ref > groupCount)) {
      for (const atom of legacyEscapeAtoms(
        source.slice(part.start + 1, part.end)
      )) {
        reclassified.push(asOptionalAtom(atom));
      }
    } else {
      reclassified.push(part);
    }
  }
  return reclassified;
}

function spliceOriginalSource(
  source: string,
  backrefs: Backreference[]
) {
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
  expand: (capture: RegExpExecArray) => Part[];
}

export function renderParts(parts: readonly Part[]): string {
  let rendered = "";
  for (const part of parts) {
    rendered += isBackreference(part) ? asOptionalAtom(backrefToken(part)) : part;
  }
  return rendered;
}

abstract class Compiled {
  private _features?: ReadonlySet<RegexFeature>;

  constructor(
    readonly rawLookarounds: readonly RawLookaroundInfo[],
    readonly namedGroupOpenings: readonly string[],
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
    namedGroupOpenings: readonly string[],
    featureMask: number
  ) {
    super(rawLookarounds, namedGroupOpenings, featureMask);
  }
}

class CompiledDynamic extends Compiled {
  readonly kind = "dynamic";

  constructor(
    readonly dynamic: DynamicPath,
    rawLookarounds: readonly RawLookaroundInfo[],
    namedGroupOpenings: readonly string[],
    featureMask: number
  ) {
    super(rawLookarounds, namedGroupOpenings, featureMask);
  }
}

export type CompiledPartial = CompiledStatic | CompiledDynamic;

function toStatic(
  parts: string[],
  flags: string,
  rawLookarounds: readonly RawLookaroundInfo[],
  namedGroupOpenings: readonly string[],
  featureMask: number
) {
  return new CompiledStatic(
    new RegExp(parts.join(""), flags),
    parts,
    rawLookarounds,
    namedGroupOpenings,
    featureMask
  );
}

export const compilePartial = (regex: RegExp): CompiledPartial => {
  const flags = regex.flags;
  let walked = walk(regex, true);
  if (
    hasFeature(walked.featureMask, "namedBackreference") &&
    !hasFeature(walked.featureMask, "namedGroup")
  ) {
    walked = walk(regex, false);
  }
  const { parts, groupCount, featureMask, rawLookarounds, namedGroupOpenings } =
    walked;

  if (!MAYBE_HAS_BACKREFERENCE_REGEX.test(regex.source)) {
    return toStatic(
      parts as string[],
      flags,
      rawLookarounds,
      namedGroupOpenings,
      featureMask
    );
  }

  const isUnicode = regex.unicode || regex.unicodeSets;
  const sanitisedParts = isUnicode
    ? parts
    : reclassifyLegacyEscapes(parts, regex.source, groupCount);
  const backreferences = sanitisedParts.filter(isBackreference);
  if (backreferences.length === 0) {
    return toStatic(
      sanitisedParts as string[],
      flags,
      rawLookarounds,
      namedGroupOpenings,
      featureMask
    );
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
        const expanded: Part[] = [];
        for (const part of sanitisedParts) {
          if (!isBackreference(part)) {
            expanded.push(part);
            continue;
          }
          const captured = isNumericBackreference(part)
            ? capture[part.ref]
            : capture.groups?.[part.ref];
          if (captured === undefined) {
            expanded.push(part);
            continue;
          }
          const atoms = isUnicode ? Array.from(captured) : captured.split("");
          if (atoms.length === 0) {
            expanded.push(QUANTIFIABLE_EMPTY_ATOM);
            continue;
          }
          for (const atom of atoms) {
            expanded.push(asOptionalAtom(escapeAtom(atom)));
          }
        }
        return expanded;
      }
    },
    rawLookarounds,
    namedGroupOpenings,
    featureMask
  );
};
