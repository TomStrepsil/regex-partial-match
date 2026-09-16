import {
  DISJUNCTION_TO_END_OF_INPUT,
  END_ANCHOR,
  GROUP_CLOSING,
  ONLY_AT_END_OF_INPUT,
  OPTIONAL_ATOM_OPENING,
  UNSATISFIABLE,
  asOptionalAtom,
  caretFor,
  isCaret,
  isOptionalAtom,
  isRawLookaround,
  isWordBoundaryAtom
} from "./atomSyntax.ts";
import canMatchLineTerminator from "./lineTerminator.ts";
import { isBackreference, type Part } from "./part.ts";
import { isQuantifier, minimumOf, quantifierEndingAt } from "./quantifier.ts";

export type LookaheadSpan = [open: number, close: number];

export const CANNOT_END_LINE = -2;
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
): number {
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

function shiftSpans(
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

function appendCaretToAlternatives(
  result: Part[],
  open: number,
  close: number,
  scope: number,
  starts: readonly number[],
  bodySpans: LookaheadSpan[] | undefined,
  lookaheadSpans: LookaheadSpan[] | undefined
) {
  const anchors: number[] = [];
  const ends: number[] = [];
  let end = close;
  for (let k = starts.length; k--; ) {
    const floor = open + starts[k];
    const anchor = partDecidingCaret(
      result,
      end - 1,
      floor,
      scope,
      bodySpans,
      open + 1
    );
    if (
      anchor === floor ||
      (anchor !== CANNOT_END_LINE &&
        !isOptionalAtom(result[anchor]) &&
        !isPositionUncertain(result[anchor]))
    )
      return wrapGroup(result, open, close, scope, lookaheadSpans);
    anchors.push(anchor);
    ends.push(end);
    end = floor;
  }
  const caret = caretFor(scope);
  let inserted = 0;
  for (let n = 0; n < anchors.length; n++) {
    const anchor = anchors[n];
    if (anchor !== CANNOT_END_LINE && isOptionalAtom(result[anchor])) {
      foldCaret(result, anchor, caret);
      continue;
    }
    const at = anchor === CANNOT_END_LINE ? ends[n] : anchor + 1;
    result.splice(
      at,
      0,
      anchor === CANNOT_END_LINE ? UNSATISFIABLE : asOptionalAtom(caret)
    );
    shiftSpans(lookaheadSpans, at - 1, 1);
    inserted++;
  }
  return close + inserted;
}

function appendMultilineCaret(
  result: Part[],
  lastGroupOpen: number,
  lastGroupClose: number,
  lastGroupScope: number,
  lastGroupAlternativeStarts: readonly number[] | undefined,
  lastGroupLookaheadSpans: LookaheadSpan[] | undefined,
  lookaheadSpans: LookaheadSpan[] | undefined,
  scope: number
): number {
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
        lastGroupLookaheadSpans,
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
    } else if (isPositionUncertain(result[bodyAnchor])) {
      result.splice(
        bodyAnchor + 1,
        0,
        asOptionalAtom(caretFor(lastGroupScope))
      );
      shiftSpans(lookaheadSpans, bodyAnchor, 1);
      return lastGroupClose + 1;
    } else {
      return wrapGroup(
        result,
        lastGroupOpen,
        lastGroupClose,
        lastGroupScope,
        lookaheadSpans
      );
    }
  }
  if (anchor === CANNOT_END_LINE) {
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
  const positionUncertain =
    isBackreference(previous) || isQuantifier(previous);
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
