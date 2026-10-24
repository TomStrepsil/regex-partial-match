import renumberRawBackreferences, {
  renumberedToken
} from "../partialMatchRegExp/renumberRawBackreferences.ts";
import { FLAGS_IRRELEVANT_TO_REBUILD } from "../partialMatchRegExp/constants.ts";
import {
  DISJUNCTION_TO_END_OF_INPUT,
  END_ANCHOR,
  OPTIONAL_ATOM_OPENING,
  isOptionalAtom,
  isWordBoundaryAtom
} from "../partialMatchRegExp/atomSyntax.ts";
import { isQuantifier, quantifierEndingAt } from "../partialMatchRegExp/quantifier.ts";
import { isBackreference, type Part } from "../partialMatchRegExp/part.ts";
import type {
  BackreferenceHook,
  BackreferenceProbe,
  ProbeGroups
} from "../partialMatchRegExp/backreferenceHook.ts";
import {
  groupsOpenedBefore,
  shiftForGroupOf
} from "../partialMatchRegExp/groupNumbering.ts";
import { roleOf } from "./partRole.ts";
import type { Compiled } from "../partialMatchRegExp/compilePartial/compiled.ts";

export interface TruncationProbe {
  regex: RegExp;
  markerGroups: readonly number[];
}

const END_OF_INPUT = DISJUNCTION_TO_END_OF_INPUT.slice(1, -1);
const OPTIONAL_QUANTIFIER = "?";
const EXACT_QUANTIFIER = /^\{0*([1-9]\d*|0)(?:,0*\1)?\}$/;

const MARKING = {
  none: 0,
  rawLookaround: 2,
  truncationBranch: 3,
  wordBoundary: 4,
  endAnchor: 5,
  readAtEnd: 6,
  optionalAtEnd: 7
} as const;

type Marking = (typeof MARKING)[keyof typeof MARKING];

function isGreedyReadAtEnd(parts: readonly Part[], index: number) {
  const part = parts[index];
  return (
    isQuantifier(part) &&
    !EXACT_QUANTIFIER.test(part) &&
    parts[index + 1] !== OPTIONAL_QUANTIFIER &&
    quantifierEndingAt(parts, index) === index
  );
}

function markingOf(parts: readonly Part[], index: number): Marking {
  const part = parts[index];
  switch (roleOf(part)) {
    case "backreference":
      return MARKING.truncationBranch;
    case "rawLookaround":
      return MARKING.rawLookaround;
    case "truncationEnd":
      return isWordBoundaryAtom(part)
        ? MARKING.wordBoundary
        : MARKING.truncationBranch;
    case "plain": {
      if (part === END_ANCHOR) return MARKING.endAnchor;
      if (!isGreedyReadAtEnd(parts, index)) return MARKING.none;
      const previous = parts[index - 1];
      return part === OPTIONAL_QUANTIFIER &&
        (isBackreference(previous) || isOptionalAtom(previous))
        ? MARKING.optionalAtEnd
        : MARKING.readAtEnd;
    }
  }
}

const markingsOf = (parts: readonly Part[]) =>
  parts.map((_, index) => markingOf(parts, index));

function markersAddedBy(marking: Marking) {
  switch (marking) {
    case MARKING.none:
    case MARKING.rawLookaround:
    case MARKING.optionalAtEnd:
      return 0;
    case MARKING.wordBoundary:
      return 2;
    default:
      return 1;
  }
}

export const buildTruncationProbe = (
  compiled: Compiled,
  flags: string
): TruncationProbe => {
  const { parts } = compiled;
  const rawLookarounds = compiled.rawLookarounds ?? [];
  const markings = markingsOf(parts);
  const backreferenceProbes = parts.map((part, index) =>
    isBackreference(part)
      ? (compiled.hooks.backreference as BackreferenceHook).probe(
          compiled,
          index
        )
      : undefined
  );
  const groupsBefore = groupsOpenedBefore(parts, rawLookarounds);
  const shiftForGroup = shiftForGroupOf(
    groupsBefore,
    (index) =>
      backreferenceProbes[index]?.groups ?? markersAddedBy(markings[index])
  );

  const markerGroups: number[] = [];
  let groupsOpened = 0;
  let hiddenGroups = 0;
  let rawLookaroundIndex = 0;
  const marker = () => {
    markerGroups.push(groupsOpened + markerGroups.length + hiddenGroups + 1);
    return "()";
  };
  const groups: ProbeGroups = {
    marker,
    hidden: (count) => {
      const first = groupsOpened + markerGroups.length + hiddenGroups + 1;
      hiddenGroups += count;
      return first;
    }
  };
  const truncationBranch = () => "|" + marker() + END_OF_INPUT + ")";
  const readAtEnd = () => "(?:" + marker() + END_OF_INPUT + "|)";

  const probed: string[] = [];
  for (let index = 0; index < parts.length; index++) {
    const part = parts[index];
    groupsOpened = groupsBefore[index];
    if (isBackreference(part)) {
      probed.push(
        (backreferenceProbes[index] as BackreferenceProbe).render(
          renumberedToken(part, shiftForGroup),
          groups
        )
      );
      continue;
    }
    switch (markings[index]) {
      case MARKING.rawLookaround: {
        const rawLookaround = rawLookarounds[rawLookaroundIndex++];
        probed.push(
          rawLookaround
            ? renumberRawBackreferences(
                part,
                rawLookaround,
                shiftForGroup
              )
            : part
        );
        break;
      }
      case MARKING.truncationBranch:
        probed.push(
          part.slice(0, -DISJUNCTION_TO_END_OF_INPUT.length) + truncationBranch()
        );
        break;
      case MARKING.wordBoundary:
        probed.push(
          part.slice(0, -DISJUNCTION_TO_END_OF_INPUT.length) +
            readAtEnd() +
            truncationBranch()
        );
        break;
      case MARKING.endAnchor:
        probed.push(END_ANCHOR + "(?:" + marker() + "(?![\\s\\S])|)");
        break;
      case MARKING.readAtEnd:
        probed.push(part + readAtEnd());
        break;
      case MARKING.optionalAtEnd:
        probed[probed.length - 1] =
          OPTIONAL_ATOM_OPENING + probed[probed.length - 1] + "|(?=[\\s\\S]))";
        break;
      default:
        probed.push(part);
        break;
    }
  }

  return {
    regex: new RegExp(
      probed.join(""),
      flags.replace(FLAGS_IRRELEVANT_TO_REBUILD, "") + "y"
    ),
    markerGroups
  };
};

export const tookTruncationBranch = (
  probe: TruncationProbe,
  input: string,
  index: number
) => {
  const { regex, markerGroups } = probe;
  regex.lastIndex = index;
  const probed: readonly (string | undefined)[] | null = regex.exec(input);
  if (probed === null) return true;
  for (const group of markerGroups) {
    if (probed[group] !== undefined) return true;
  }
  return false;
};
