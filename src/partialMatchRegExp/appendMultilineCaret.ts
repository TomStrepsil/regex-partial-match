import { endsAtTruncationBranch, isRawLookaround } from "./atomSyntax.ts";
import {
  DISJUNCTION_TO_END_OF_INPUT,
  OPTIONAL_ATOM_OPENING,
  QUANTIFIER_PART,
  START_ANCHOR
} from "./constants.ts";
import asOptionalAtom from "./asOptionalAtom.ts";
import { isBackreference, type Part } from "./part.ts";

export type LookaheadSpan = readonly [open: number, close: number];

const END_ANCHOR = "$";
const GROUP_CLOSING = ")";
const CARET_AT_UNCERTAIN_POSITION = asOptionalAtom(START_ANCHOR);

const isTransparentToCaret = (part: Part) =>
  typeof part === "string" && (part === END_ANCHOR || isRawLookaround(part));

function appendMultilineCaret(
  result: Part[],
  lastGroupOpen: number,
  lastGroupClose: number,
  lookaheadSpans: LookaheadSpan[] | undefined
) {
  let anchor = result.length - 1;
  let spanCount = lookaheadSpans?.length ?? 0;
  while (anchor >= 0) {
    if (
      lookaheadSpans &&
      spanCount > 0 &&
      anchor === lookaheadSpans[spanCount - 1][1]
    ) {
      anchor = lookaheadSpans[--spanCount][0] - 1;
      continue;
    }
    if (!isTransparentToCaret(result[anchor])) break;
    anchor--;
  }
  if (anchor < 0) {
    result.push(START_ANCHOR);
    return;
  }

  const previous = result[anchor];
  if (anchor === lastGroupClose) {
    result.splice(lastGroupOpen + 1, 0, OPTIONAL_ATOM_OPENING);
    result.splice(
      anchor + 1,
      1,
      GROUP_CLOSING + START_ANCHOR,
      DISJUNCTION_TO_END_OF_INPUT
    );
  } else if (isBackreference(previous) || QUANTIFIER_PART.test(previous)) {
    result.splice(anchor + 1, 0, CARET_AT_UNCERTAIN_POSITION);
  } else if (
    previous !== DISJUNCTION_TO_END_OF_INPUT &&
    endsAtTruncationBranch(previous)
  ) {
    result[anchor] =
      previous.slice(0, -DISJUNCTION_TO_END_OF_INPUT.length) +
      START_ANCHOR +
      DISJUNCTION_TO_END_OF_INPUT;
  } else {
    result.push(START_ANCHOR);
  }
}

export default appendMultilineCaret;
