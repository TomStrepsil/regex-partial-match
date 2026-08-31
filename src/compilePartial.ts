import escapeAtom from "./escapeAtom.ts";

const OCCURRENCES_REGEX = /\{\d+,?\d*\}/y;
const NOT_NUMBERS_REGEX = /\D/g;
const MAYBE_HAS_BACKREFERENCE_REGEX = /\\[1-9]|\\k</;
const DISJUNCTION_TO_END_OF_INPUT = "|$(?![\\s\\S]))";
const OPTIONAL_ATOM_OPENING = "(?:";
const TRUNCATION_MARKER_NAME = "truncation";
const FLAGS_INCOMPATIBLE_WITH_PROBING = /[dgy]/g;
const ANY_CAPTURED_TEXT = "(?:[\\s\\S]*?)";
const NAMED_GROUP_REGEX = /\(\?<(?![=!])([^>]*)>/g;
const UNICODE_ESCAPE_IN_NAME_REGEX = /\\u\{([0-9a-fA-F]+)\}|\\u([0-9a-fA-F]{4})/g;

interface NumericBackreference {
  ref: number;
  start: number;
  end: number;
}

interface NamedBackreference {
  ref: string;
  start: number;
  end: number;
}

type Backreference = NumericBackreference | NamedBackreference;
type Part = string | Backreference;

const isBackreference = (part: Part): part is Backreference =>
  typeof part !== "string";

const isNumericBackreference = (part: Part): part is NumericBackreference =>
  isBackreference(part) && typeof part.ref === "number";

type LengthUpToOneBitMask<Counted extends unknown[] = []> =
  Counted["length"] extends 33
    ? never
    : Counted["length"] | LengthUpToOneBitMask<[...Counted, unknown]>;

const REGEX_FEATURES = [
  "patternCharacter",
  "startAnchor",
  "endAnchor",
  "wordBoundary",
  "nonWordBoundary",
  "lookahead",
  "negativeLookahead",
  "lookbehind",
  "negativeLookbehind",
  "backreference",
  "namedBackreference",
  "namedGroup",
  "capturingGroup",
  "lookaroundCapture",
  "nonCapturingGroup",
  "modifierGroup",
  "modifierGroupWithRemoval",
  "characterClass",
  "nestedCharacterClass",
  "classIntersection",
  "classSubtraction",
  "disjunction",
  "quantifier",
  "unicodePropertyEscape",
  "characterClassEscape",
  "controlEscape",
  "controlLetterEscape",
  "hexEscapeSequence",
  "unicodeEscapeSequence",
  "otherEscape"
] as const satisfies { length: LengthUpToOneBitMask };

export type RegexFeature = (typeof REGEX_FEATURES)[number];

const FEATURE_BIT = {} as Record<RegexFeature, number>;
for (let index = 0; index < REGEX_FEATURES.length; index++) {
  FEATURE_BIT[REGEX_FEATURES[index]] = 1 << index;
}

function featureSet(mask: number): Set<RegexFeature> {
  const features = new Set<RegexFeature>();
  for (let index = 0; index < REGEX_FEATURES.length; index++) {
    if (mask & (1 << index)) features.add(REGEX_FEATURES[index]);
  }
  return features;
}

function walk(
  regex: RegExp
): { parts: Part[]; groupCount: number; featureMask: number } {
  const source = regex.source;
  const isUnicode = regex.unicode || regex.unicodeSets;

  let i = 0;
  let groupCount = 0;
  let featureMask = 0;

  function extractSlice(length: number): string {
    return source.slice(i, (i += length));
  }

  function process(withinLookaround: boolean): Part[] {
    const result: Part[] = [];

    function appendOptional(length: number) {
      result.push("(?:" + extractSlice(length) + DISJUNCTION_TO_END_OF_INPUT);
    }

    function appendRaw(length: number) {
      result.push(extractSlice(length));
    }

    function appendRawLookaround(prefixLength: number) {
      const start = i;
      i += prefixLength;
      process(true);
      result.push(source.slice(start, i));
    }

    while (i < source.length) {
      switch (source[i]) {
        case "\\":
          switch (source[i + 1]) {
            case "c":
              featureMask |= FEATURE_BIT.controlLetterEscape;
              appendOptional(3);
              break;
            case "k": {
              const referenceEnd =
                source[i + 2] === "<" ? source.indexOf(">", i) : -1;
              if (referenceEnd === -1) {
                appendOptional(2);
              } else {
                featureMask |= FEATURE_BIT.namedBackreference;
                const start = i;
                const ref = source.slice(i + 3, referenceEnd);
                i = referenceEnd + 1;
                result.push({ ref, start, end: i });
              }
              break;
            }
            case "u":
              featureMask |= FEATURE_BIT.unicodeEscapeSequence;
              if (isUnicode && source[i + 2] === "{") {
                appendOptional(source.indexOf("}", i) - i + 1);
              } else {
                appendOptional(6);
              }
              break;
            case "p":
            case "P":
              if (isUnicode) {
                featureMask |= FEATURE_BIT.unicodePropertyEscape;
                appendOptional(source.indexOf("}", i) - i + 1);
              } else {
                appendOptional(2);
              }
              break;
            case "x":
              featureMask |= FEATURE_BIT.hexEscapeSequence;
              appendOptional(4);
              break;
            case "b":
              featureMask |= FEATURE_BIT.wordBoundary;
              appendOptional(2);
              break;
            case "B":
              featureMask |= FEATURE_BIT.nonWordBoundary;
              appendOptional(2);
              break;
            case "f":
            case "n":
            case "r":
            case "t":
            case "v":
              featureMask |= FEATURE_BIT.controlEscape;
              appendOptional(2);
              break;
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9": {
              featureMask |= FEATURE_BIT.backreference;
              NOT_NUMBERS_REGEX.lastIndex = i + 1;
              const nextNonDigit = NOT_NUMBERS_REGEX.exec(source);
              const start = i;
              const end = nextNonDigit ? nextNonDigit.index : source.length;
              const ref = Number(source.slice(start + 1, end));
              i = end;
              result.push({ ref, start, end });
              break;
            }
            case "d":
            case "D":
            case "w":
            case "W":
            case "s":
            case "S":
              featureMask |= FEATURE_BIT.characterClassEscape;
              appendOptional(2);
              break;
            default:
              featureMask |= FEATURE_BIT.otherEscape;
              appendOptional(2);
              break;
          }
          break;
        case "[": {
          featureMask |= FEATURE_BIT.characterClass;
          let depth = 1,
            j = i + 1,
            previousSetOperatorCharacter: string | undefined;
          while (depth) {
            const character = source[j];
            switch (character) {
              case "\\":
                j += 2;
                previousSetOperatorCharacter = undefined;
                continue;
              case "[":
                if (regex.unicodeSets) {
                  featureMask |= FEATURE_BIT.nestedCharacterClass;
                  depth++;
                }
                break;
              case "]":
                depth--;
                break;
              case "&":
                if (regex.unicodeSets && previousSetOperatorCharacter === "&") {
                  featureMask |= FEATURE_BIT.classIntersection;
                }
                break;
              case "-":
                if (regex.unicodeSets && previousSetOperatorCharacter === "-") {
                  featureMask |= FEATURE_BIT.classSubtraction;
                }
                break;
            }
            previousSetOperatorCharacter = character;
            j++;
          }
          appendOptional(j - i);
          break;
        }
        case "^":
          featureMask |= FEATURE_BIT.startAnchor;
          appendRaw(1);
          break;
        case "$":
          featureMask |= FEATURE_BIT.endAnchor;
          appendRaw(1);
          break;
        case "|":
          featureMask |= FEATURE_BIT.disjunction;
          appendRaw(1);
          break;
        case "*":
        case "+":
        case "?":
          featureMask |= FEATURE_BIT.quantifier;
          appendRaw(1);
          break;
        case "{": {
          OCCURRENCES_REGEX.lastIndex = i;
          const regExpExecArray = OCCURRENCES_REGEX.exec(source);
          if (regExpExecArray) {
            featureMask |= FEATURE_BIT.quantifier;
            appendRaw(regExpExecArray[0].length);
          } else {
            appendOptional(1);
          }
          break;
        }
        case "(":
          if (source[i + 1] == "?") {
            switch (source[i + 2]) {
              case ":":
                featureMask |= FEATURE_BIT.nonCapturingGroup;
                result.push("(?:");
                i += 3;
                result.push(
                  ...process(withinLookaround),
                  DISJUNCTION_TO_END_OF_INPUT
                );
                break;
              case "=":
                featureMask |= FEATURE_BIT.lookahead;
                result.push("(?=");
                i += 3;
                result.push(...process(true), ")");
                break;
              case "-":
              case "i":
              case "s":
              case "m": {
                const flagsStart = i + 2,
                  colonIndex = source.indexOf(":", flagsStart);
                const modifiers = source.slice(flagsStart, colonIndex);
                featureMask |= modifiers.includes("-")
                  ? FEATURE_BIT.modifierGroupWithRemoval
                  : FEATURE_BIT.modifierGroup;
                result.push("(?" + modifiers + ":");
                i = colonIndex + 1;
                result.push(...process(withinLookaround), ")");
                break;
              }
              case "!":
                featureMask |= FEATURE_BIT.negativeLookahead;
                appendRawLookaround(3);
                break;
              case "<":
                switch (source[i + 3]) {
                  case "=":
                    featureMask |= FEATURE_BIT.lookbehind;
                    appendRawLookaround(4);
                    break;
                  case "!":
                    featureMask |= FEATURE_BIT.negativeLookbehind;
                    appendRawLookaround(4);
                    break;
                  default:
                    featureMask |= FEATURE_BIT.namedGroup;
                    featureMask |= FEATURE_BIT.capturingGroup;
                    if (withinLookaround) featureMask |= FEATURE_BIT.lookaroundCapture;
                    ++groupCount;
                    appendRaw(source.indexOf(">", i) - i + 1);
                    result.push(
                      ...process(withinLookaround),
                      DISJUNCTION_TO_END_OF_INPUT
                    );
                    break;
                }
                break;
            }
          } else {
            featureMask |= FEATURE_BIT.capturingGroup;
            if (withinLookaround) featureMask |= FEATURE_BIT.lookaroundCapture;
            ++groupCount;
            appendRaw(1);
            result.push(
              ...process(withinLookaround),
              DISJUNCTION_TO_END_OF_INPUT
            );
          }
          break;
        case ")":
          ++i;
          return result;
        default:
          featureMask |= FEATURE_BIT.patternCharacter;
          appendOptional(
            isUnicode && (source.codePointAt(i) ?? 0) > 0xffff ? 2 : 1
          );
          break;
      }
    }
    return result;
  }

  return { parts: process(false), groupCount, featureMask };
}

function render(
  parts: Part[],
  renderBackref: (backref: Backreference) => string
): string {
  let rendered = "";
  for (const part of parts) {
    rendered += isBackreference(part) ? renderBackref(part) : part;
  }
  return rendered;
}

function backrefToken(backref: Backreference): string {
  return isNumericBackreference(backref)
    ? "\\" + String(backref.ref)
    : "\\k<" + backref.ref + ">";
}

function reclassifyOctalEscapes(
  parts: Part[],
  source: string,
  groupCount: number
): Part[] {
  return parts.map((part) =>
    isNumericBackreference(part) && part.ref > groupCount
      ? "(?:" + source.slice(part.start, part.end) + DISJUNCTION_TO_END_OF_INPUT
      : part
  );
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

  constructor(private readonly _featureMask: number) {}

  get features(): ReadonlySet<RegexFeature> {
    return (this._features ??= featureSet(this._featureMask));
  }
}

class CompiledStatic extends Compiled {
  readonly kind = "static";

  constructor(
    readonly regex: RegExp,
    readonly parts: string[],
    featureMask: number
  ) {
    super(featureMask);
  }
}

class CompiledDynamic extends Compiled {
  readonly kind = "dynamic";

  constructor(
    readonly dynamic: DynamicPath,
    featureMask: number
  ) {
    super(featureMask);
  }
}

export type CompiledPartial = CompiledStatic | CompiledDynamic;

export interface TruncationProbe {
  regex: RegExp;
  markerName: string;
  markerCount: number;
}

const MAX_CODE_POINT = 0x10ffff;

function decodeGroupName(rawName: string): string {
  return rawName.replace(
    UNICODE_ESCAPE_IN_NAME_REGEX,
    (whole, braced?: string, plain?: string) => {
      const codePoint = parseInt(braced ?? plain ?? "", 16);
      return codePoint <= MAX_CODE_POINT ? String.fromCodePoint(codePoint) : whole;
    }
  );
}

function namedGroupNames(source: string): string[] {
  const names: string[] = [];
  NAMED_GROUP_REGEX.lastIndex = 0;

  let opener: RegExpExecArray | null;
  while ((opener = NAMED_GROUP_REGEX.exec(source))) {
    names.push(decodeGroupName(opener[1]));
  }

  return names;
}

export const buildTruncationProbe = (
  parts: readonly string[],
  source: string,
  flags: string
): TruncationProbe => {
  const existingNames = namedGroupNames(source);
  let markerName = TRUNCATION_MARKER_NAME;
  while (existingNames.some((name) => name.startsWith(markerName))) {
    markerName += "_";
  }

  let markerCount = 0;
  const probed = parts.map((part) => {
    const endsAtTruncationBranch =
      part === DISJUNCTION_TO_END_OF_INPUT ||
      (part.startsWith(OPTIONAL_ATOM_OPENING) &&
        part.endsWith(DISJUNCTION_TO_END_OF_INPUT));
    if (!endsAtTruncationBranch) return part;

    const marker = "|(?<" + markerName + String(markerCount++) + ">)";
    return (
      part.slice(0, -DISJUNCTION_TO_END_OF_INPUT.length) +
      marker +
      DISJUNCTION_TO_END_OF_INPUT.slice(1)
    );
  });

  return {
    regex: new RegExp(
      probed.join(""),
      flags.replace(FLAGS_INCOMPATIBLE_WITH_PROBING, "") + "y"
    ),
    markerName,
    markerCount
  };
};

export const tookTruncationBranch = (
  probe: TruncationProbe,
  input: string,
  index: number
): boolean => {
  const { regex, markerName, markerCount } = probe;
  regex.lastIndex = index;
  const markers = regex.exec(input)?.groups ?? {};
  for (let marker = 0; marker < markerCount; marker++) {
    if (markers[markerName + String(marker)] !== undefined) return true;
  }
  return false;
};

function toStatic(
  parts: string[],
  flags: string,
  featureMask: number
): CompiledStatic {
  return new CompiledStatic(
    new RegExp(parts.join(""), flags),
    parts,
    featureMask
  );
}

export const compilePartial = (regex: RegExp): CompiledPartial => {
  const { parts, groupCount, featureMask } = walk(regex);
  const flags = regex.flags;

  if (!MAYBE_HAS_BACKREFERENCE_REGEX.test(regex.source)) {
    return toStatic(parts as string[], flags, featureMask);
  }

  const isUnicode = regex.unicode || regex.unicodeSets;
  const sanitisedParts = isUnicode
    ? parts
    : reclassifyOctalEscapes(parts, regex.source, groupCount);
  const backreferences = sanitisedParts.filter(isBackreference);
  if (backreferences.length === 0) {
    return toStatic(sanitisedParts as string[], flags, featureMask);
  }

  return new CompiledDynamic(
    {
      originalCaptureScan: new RegExp(
        spliceOriginalSource(regex.source, backreferences),
        flags
      ),
      preScan: new RegExp(
        render(parts, () => ANY_CAPTURED_TEXT),
        flags
      ),
      expand: (capture) => {
        const expanded: string[] = [];
        for (const part of parts) {
          if (!isBackreference(part)) {
            expanded.push(part);
            continue;
          }
          const captured = isNumericBackreference(part)
            ? capture[part.ref]
            : capture.groups?.[part.ref];
          if (captured === undefined) {
            expanded.push(
              "(?:" + backrefToken(part) + DISJUNCTION_TO_END_OF_INPUT
            );
            continue;
          }
          const atoms = isUnicode ? Array.from(captured) : captured.split("");
          for (const atom of atoms) {
            expanded.push(
              "(?:" + escapeAtom(atom) + DISJUNCTION_TO_END_OF_INPUT
            );
          }
        }
        return expanded;
      }
    },
    featureMask
  );
};
