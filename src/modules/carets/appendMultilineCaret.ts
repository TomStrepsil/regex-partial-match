import {
  ALTERNATION,
  DISJUNCTION_TO_END_OF_INPUT,
  END_ANCHOR,
  GROUP_CLOSING,
  LOOKAHEAD_OPENING,
  OPTIONAL_ATOM_OPENING,
  asOptionalAtom,
  closesGroup,
  isOptionalAtom,
  isRawLookaround,
  isWordBoundaryAtom,
  opensGroup
} from "../../partialMatchRegExp/atomSyntax.ts";
import { ONLY_AT_END_OF_INPUT, UNSATISFIABLE } from "../atomSyntax.ts";
import { caretFor, isCaret } from "./caretSyntax.ts";
import canMatchLineTerminator from "./lineTerminator.ts";
import { isBackreference, type Part } from "../../partialMatchRegExp/part.ts";
import {
  isQuantifier,
  quantifierEndingAt
} from "../../partialMatchRegExp/quantifier.ts";
import { minimumOf } from "../quantifierBounds.ts";

export type LookaheadSpan = [open: number, close: number];

export const CANNOT_END_LINE = -2;
export const NO_ALTERNATIVES: readonly number[] = [0];
const NO_LOOKAHEAD = -1;

const isTransparentToCaret = (part: Part) =>
  typeof part === "string" &&
  (part === END_ANCHOR ||
    isWordBoundaryAtom(part) ||
    isCaret(part) ||
    isRawLookaround(part));

function lookaheadOpeningClosedAt(
  lookaheadSpans: LookaheadSpan[],
  index: number,
  spanOffset: number
) {
  for (const span of lookaheadSpans) {
    if (span[1] + spanOffset === index) return span[0] + spanOffset;
  }
  return NO_LOOKAHEAD;
}

export function partDecidingCaret(
  result: Part[],
  index: number,
  floor: number,
  scope: number,
  lookaheadSpans: LookaheadSpan[] | undefined,
  spanOffset: number
) {
  while (index > floor) {
    const part = result[index];
    if (lookaheadSpans !== undefined) {
      const lookaheadOpening = lookaheadOpeningClosedAt(
        lookaheadSpans,
        index,
        spanOffset
      );
      if (lookaheadOpening !== NO_LOOKAHEAD) {
        index = lookaheadOpening - 1;
        continue;
      }
    }
    if (isTransparentToCaret(part)) {
      index--;
      continue;
    }
    if (isOptionalAtom(part)) {
      return canMatchLineTerminator(part, scope) ? index : CANNOT_END_LINE;
    }
    if (!isQuantifier(part))
      return result[index] === UNSATISFIABLE ? CANNOT_END_LINE : index;
    const quantifierIndex = quantifierEndingAt(result, index);
    const atom = result[quantifierIndex - 1];
    if (isTransparentToCaret(atom)) {
      index = quantifierIndex - 2;
      continue;
    }
    if (!isOptionalAtom(atom) || canMatchLineTerminator(atom, scope)) {
      return index;
    }
    if (minimumOf(result[quantifierIndex] as string) > 0) {
      return CANNOT_END_LINE;
    }
    result[quantifierIndex - 1] = ONLY_AT_END_OF_INPUT;
    index = quantifierIndex - 2;
  }
  return floor;
}

export function canEndLine(
  body: Part[],
  starts: readonly number[],
  scope: number,
  lookaheadSpans: LookaheadSpan[] | undefined,
  spanOffset = 0
) {
  const scanned = body.slice();
  let end = body.length;
  for (let k = starts.length; k--; ) {
    const start = starts[k];
    if (
      partDecidingCaret(
        scanned,
        end - 1,
        start - 1,
        scope,
        lookaheadSpans,
        spanOffset
      ) !== CANNOT_END_LINE
    )
      return true;
    end = start - 1;
  }
  return false;
}

export function shiftSpans(
  lookaheadSpans: LookaheadSpan[] | undefined,
  after: number,
  by: number
) {
  if (!lookaheadSpans) return;
  for (const span of lookaheadSpans) {
    if (span[0] > after) {
      span[0] += by;
      span[1] += by;
    }
  }
}

const isPositionUncertain = (part: Part) =>
  isBackreference(part) || isQuantifier(part);

function foldCaret(result: Part[], index: number, caret: string) {
  const atom = result[index] as string;
  result[index] =
    atom.slice(0, -DISJUNCTION_TO_END_OF_INPUT.length) +
    caret +
    DISJUNCTION_TO_END_OF_INPUT;
}

function wrapGroup(
  result: Part[],
  open: number,
  close: number,
  scope: number,
  lookaheadSpans: LookaheadSpan[] | undefined
) {
  result.splice(open + 1, 0, OPTIONAL_ATOM_OPENING);
  result.splice(
    close + 1,
    1,
    GROUP_CLOSING + caretFor(scope),
    DISJUNCTION_TO_END_OF_INPUT
  );
  shiftSpans(lookaheadSpans, close, 2);
  return close + 2;
}

function openingOf(result: Part[], close: number, alternations: number[]) {
  let depth = 0;
  for (let index = close - 1; index >= 0; index--) {
    const part = result[index];
    if (isBackreference(part)) continue;
    if (opensGroup(part)) {
      if (!depth) return index;
      depth--;
    } else if (closesGroup(part)) depth++;
    else if (part === ALTERNATION && !depth) alternations.push(index);
  }
  return -1;
}

const MODIFIES_LINE_SCOPE = /^\(\?[i-]*[ms]/;

function followsAtomThatCannotEndLine(
  result: Part[],
  index: number,
  scope: number
) {
  for (;; index--) {
    if (result[index] === ALTERNATION) index = openingOf(result, index, []);
    const part = result[index];
    if (typeof part !== "string") return false;
    if (isTransparentToCaret(part)) continue;
    if (isOptionalAtom(part)) return !canMatchLineTerminator(part, scope);
    if (!opensGroup(part) || MODIFIES_LINE_SCOPE.test(part)) return false;
  }
}

function repeatsGroupThatCannotEndLine(
  result: Part[],
  index: number,
  scope: number,
  lookaheadSpans: LookaheadSpan[] | undefined
) {
  const quantifierIndex = quantifierEndingAt(result, index);
  const close = quantifierIndex - 1;
  const closing = result[close];
  if (
    isBackreference(closing) ||
    !closesGroup(closing) ||
    minimumOf(result[quantifierIndex] as string) === 0
  )
    return false;
  const alternations: number[] = [];
  const open = openingOf(result, close, alternations);
  const opening = result[open] as string;
  if (opening === LOOKAHEAD_OPENING || MODIFIES_LINE_SCOPE.test(opening))
    return false;
  const starts = [0];
  for (let k = alternations.length; k--; ) starts.push(alternations[k] - open);
  return !canEndLine(
    result.slice(open + 1, close),
    starts,
    scope,
    lookaheadSpans,
    -(open + 1)
  );
}

function placeCaret(
  result: Part[],
  end: number,
  floor: number,
  scope: number,
  insert: (at: number, part: string) => number,
  lookaheadSpans: LookaheadSpan[] | undefined
) {
  const caret = caretFor(scope);
  for (;;) {
    const anchor = partDecidingCaret(
      result,
      end - 1,
      floor,
      scope,
      undefined,
      0
    );
    const part = result[anchor];
    if (
      anchor === CANNOT_END_LINE ||
      (anchor === floor
        ? followsAtomThatCannotEndLine(result, floor, scope)
        : isQuantifier(part) &&
          repeatsGroupThatCannotEndLine(
            result,
            anchor,
            scope,
            lookaheadSpans
          ))
    )
      return insert(floor + 1, UNSATISFIABLE);
    if (isOptionalAtom(part)) {
      foldCaret(result, anchor, caret);
      return;
    }
    if (anchor === floor || isPositionUncertain(part))
      return insert(anchor + 1, asOptionalAtom(caret));
    end = anchor;
    if (!opensGroup(part)) {
      const alternations: number[] = [];
      const open = openingOf(result, anchor, alternations);
      const opening = result[open] as string;
      if (MODIFIES_LINE_SCOPE.test(opening))
        return insert(anchor + 1, asOptionalAtom(caret));
      if (opening === LOOKAHEAD_OPENING) end = open;
      else if (alternations.length) {
        for (const alternativeFloor of alternations.concat(open)) {
          placeCaret(
            result,
            end,
            alternativeFloor,
            scope,
            insert,
            lookaheadSpans
          );
          end = alternativeFloor;
        }
        return;
      }
    }
  }
}

function appendCaretToAlternatives(
  result: Part[],
  open: number,
  close: number,
  scope: number,
  starts: number[],
  lookaheadSpans: LookaheadSpan[] | undefined
) {
  let inserted = 0;
  const insert = (at: number, part: string) => {
    result.splice(at, 0, part);
    shiftSpans(lookaheadSpans, at - 1, 1);
    for (let k = starts.length; k--; ) if (open + starts[k] >= at) starts[k]++;
    return ++inserted;
  };
  let end = close;
  for (let k = starts.length; k--; ) {
    const floor = open + starts[k];
    placeCaret(result, end, floor, scope, insert, lookaheadSpans);
    end = floor;
  }
  return close + inserted;
}

function appendMultilineCaret(
  result: Part[],
  lastGroupOpen: number,
  lastGroupClose: number,
  lastGroupScope: number,
  lastGroupAlternativeStarts: number[] | undefined,
  lastGroupLookaheadSpans: LookaheadSpan[] | undefined,
  lookaheadSpans: LookaheadSpan[] | undefined,
  scope: number
) {
  const caret = caretFor(scope);
  let lookedThroughGroup = false;
  let anchor = partDecidingCaret(
    result,
    result.length - 1,
    -1,
    scope,
    lookaheadSpans,
    0
  );
  if (anchor >= 0 && anchor === lastGroupClose) {
    if (lastGroupAlternativeStarts)
      return appendCaretToAlternatives(
        result,
        lastGroupOpen,
        lastGroupClose,
        lastGroupScope,
        lastGroupAlternativeStarts,
        lookaheadSpans
      );
    const bodyAnchor = partDecidingCaret(
      result,
      anchor - 1,
      lastGroupOpen,
      lastGroupScope,
      lastGroupLookaheadSpans,
      lastGroupOpen + 1
    );
    if (bodyAnchor === CANNOT_END_LINE) {
      anchor = CANNOT_END_LINE;
    } else if (bodyAnchor === lastGroupOpen) {
      lookedThroughGroup = true;
      anchor = partDecidingCaret(
        result,
        lastGroupOpen - 1,
        -1,
        scope,
        lookaheadSpans,
        0
      );
    } else if (isOptionalAtom(result[bodyAnchor])) {
      foldCaret(result, bodyAnchor, caretFor(lastGroupScope));
      return lastGroupClose;
    } else {
      return appendCaretToAlternatives(
        result,
        lastGroupOpen,
        lastGroupClose,
        lastGroupScope,
        [0],
        lookaheadSpans
      );
    }
  }
  if (
    anchor === CANNOT_END_LINE ||
    (isQuantifier(result[anchor]) &&
      quantifierEndingAt(result, anchor) === lastGroupClose + 1 &&
      minimumOf(result[lastGroupClose + 1] as string) > 0 &&
      !canEndLine(
        result.slice(lastGroupOpen + 1, lastGroupClose),
        lastGroupAlternativeStarts ?? NO_ALTERNATIVES,
        lastGroupScope,
        lastGroupLookaheadSpans
      ))
  ) {
    result.push(UNSATISFIABLE);
    return lastGroupClose;
  }
  if (anchor < 0) {
    result.push(caret);
    return lastGroupClose;
  }
  const previous = result[anchor];
  if (isOptionalAtom(previous)) {
    foldCaret(result, anchor, caret);
    return lastGroupClose;
  }
  const positionUncertain = isPositionUncertain(previous);
  if (
    lookedThroughGroup &&
    (positionUncertain ||
      previous === DISJUNCTION_TO_END_OF_INPUT ||
      previous === GROUP_CLOSING)
  ) {
    return wrapGroup(
      result,
      lastGroupOpen,
      lastGroupClose,
      lastGroupScope,
      lookaheadSpans
    );
  }
  if (positionUncertain) {
    result.splice(anchor + 1, 0, asOptionalAtom(caret));
    shiftSpans(lookaheadSpans, anchor, 1);
  } else {
    result.push(caret);
  }
  return lastGroupClose;
}

export default appendMultilineCaret;
