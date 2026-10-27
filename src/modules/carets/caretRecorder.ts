import {
  DISJUNCTION_TO_END_OF_INPUT,
  END_ANCHOR,
  GROUP_CLOSING,
  LOOKAHEAD_OPENING,
  START_ANCHOR,
  asOptionalAtom,
  isOptionalAtom,
  isRawLookaround,
  isWordBoundaryAtom
} from "../../partialMatchRegExp/atomSyntax.ts";
import {
  ONLY_AT_END_OF_INPUT,
  UNSATISFIABLE,
  optionalAtomTextOf
} from "../atomSyntax.ts";
import type { Part } from "../../partialMatchRegExp/part.ts";
import {
  LAZY_MARK,
  KLEENE_STAR,
  isQuantifier
} from "../../partialMatchRegExp/quantifier.ts";
import { minimumOf } from "../quantifierBounds.ts";
import { MULTILINE } from "../../partialMatchRegExp/scope.ts";
import {
  ON_ALTERNATIVE,
  ON_CARET,
  ON_GROUP,
  ON_LOOKAHEAD,
  type CaretFrame,
  type CaretRecorder
} from "../../partialMatchRegExp/caretHook.ts";
import appendMultilineCaret, {
  NO_ALTERNATIVES,
  canEndLine,
  shiftSpans,
  type LookaheadSpan
} from "./appendMultilineCaret.ts";
import { isQuantifierAhead, quantifierAhead } from "./quantifierAhead.ts";

const NO_LOOKAHEAD_SPANS: readonly LookaheadSpan[] = [];
const GROUP_OPENING = /^\((?:\?(?:<[^=!][^>]*>|[a-z-]*:))?$/;

function lookaheadClosing(
  lookaheadSpans: readonly LookaheadSpan[],
  opening: number
) {
  let closing = opening;
  for (const span of lookaheadSpans) {
    if (span[0] === opening) closing = span[1];
  }
  return closing;
}

function leadingCaret(
  body: Part[],
  index: number,
  lookaheadSpans: readonly LookaheadSpan[]
) {
  for (;;) {
    const part = body[index];
    if (part === START_ANCHOR) return index;
    if (typeof part !== "string") return -1;
    if (
      part === END_ANCHOR ||
      isWordBoundaryAtom(part) ||
      isRawLookaround(part)
    )
      index++;
    else if (part === LOOKAHEAD_OPENING)
      index = lookaheadClosing(lookaheadSpans, index) + 1;
    else if (part === ONLY_AT_END_OF_INPUT && isQuantifier(body[index + 1]))
      index++;
    else if (
      (body[index + 1] === GROUP_CLOSING ||
        body[index + 1] === DISJUNCTION_TO_END_OF_INPUT) &&
      GROUP_OPENING.test(part)
    )
      index += 2;
    else return -1;
    if (isQuantifier(body[index]))
      index += body[index + 1] === LAZY_MARK ? 2 : 1;
  }
}

function leadingCarets(
  body: Part[],
  starts: readonly number[],
  lookaheadSpans: readonly LookaheadSpan[]
) {
  const carets = [];
  for (const start of starts) {
    const caret = leadingCaret(body, start, lookaheadSpans);
    if (caret === -1) return undefined;
    carets.push(caret);
  }
  return carets;
}

function unwrapStarredAtoms(parts: Part[]) {
  for (let index = 1; index < parts.length; index++) {
    if (parts[index] === KLEENE_STAR) {
      const atom = parts[index - 1];
      if (isOptionalAtom(atom) && !isRawLookaround(atom))
        parts[index - 1] = optionalAtomTextOf(atom);
    }
  }
}

export default function caretRecorder(): CaretRecorder {
  let outermost: Part[] | undefined;
  let lastBodyAlternativeStarts: number[] | undefined;
  let lastBodyLookaheadSpans: LookaheadSpan[] | undefined;
  let lastBodyCaretsBefore = 0;
  let lastBodyVerbatimMultilineCaretsBefore = 0;
  let caretsSeen = 0;
  let verbatimMultilineCarets = 0;

  return (result, scope): CaretFrame => {
    outermost ??= result;
    const caretsBefore = caretsSeen;
    const verbatimMultilineCaretsBefore = verbatimMultilineCarets;
    let lastGroupOpen = -1;
    let lastGroupClose = -1;
    let lastGroupScope = scope;
    let lastGroupAlternativeStarts: number[] | undefined;
    let lastGroupLookaheadSpans: LookaheadSpan[] | undefined;
    let lookaheadSpans: LookaheadSpan[] | undefined;
    let alternativeStarts: number[] | undefined;

    return ((
      event: number,
      body,
      groupScope,
      source,
      i,
      closing
    ) => {
      if (event === ON_CARET) {
        caretsSeen++;
        if (scope & MULTILINE) {
          lastGroupClose = appendMultilineCaret(
            result,
            lastGroupOpen,
            lastGroupClose,
            lastGroupScope,
            lastGroupAlternativeStarts,
            lastGroupLookaheadSpans,
            lookaheadSpans,
            scope
          );
          if (result[result.length - 1] === START_ANCHOR)
            verbatimMultilineCarets++;
        } else {
          result.push(START_ANCHOR);
        }
      } else if (event === ON_ALTERNATIVE) {
        (alternativeStarts ??= [0]).push(result.length + 1);
      } else if (event === ON_LOOKAHEAD) {
        const spans = lastBodyLookaheadSpans ?? NO_LOOKAHEAD_SPANS;
        let caret =
          scope & MULTILINE && !lastBodyAlternativeStarts
            ? leadingCaret(body, 0, spans)
            : -1;
        if (caret !== -1 && !isQuantifierAhead(source, i)) {
          do {
            body.splice(caret, 1);
            shiftSpans(lastBodyLookaheadSpans, caret, -1);
          } while ((caret = leadingCaret(body, caret, spans)) !== -1);
          lastGroupClose = appendMultilineCaret(
            result,
            lastGroupOpen,
            lastGroupClose,
            lastGroupScope,
            lastGroupAlternativeStarts,
            lastGroupLookaheadSpans,
            lookaheadSpans,
            scope
          );
        }
        const lookaheadOpen = result.length;
        const lookaheadClose = lookaheadOpen + body.length + 1;
        (lookaheadSpans ??= []).push([lookaheadOpen, lookaheadClose]);
      } else if (event === ON_GROUP) {
        const starts = lastBodyAlternativeStarts ?? NO_ALTERNATIVES;
        const containsCaret = caretsSeen !== lastBodyCaretsBefore;
        const carets = containsCaret
          ? leadingCarets(
              body,
              starts,
              lastBodyLookaheadSpans ?? NO_LOOKAHEAD_SPANS
            )
          : undefined;
        const containsMultilineCaret =
          verbatimMultilineCarets !== lastBodyVerbatimMultilineCaretsBefore;
        let hoistedCaretStays = false;
        if (carets && (groupScope & MULTILINE || !(scope & MULTILINE))) {
          const quantifier = quantifierAhead(source, i);
          const minimum =
            quantifier === undefined ? 1 : minimumOf(quantifier);
          if (minimum > 0) {
            if (groupScope & MULTILINE) {
              hoistedCaretStays = !(scope & MULTILINE);
              lastGroupClose = appendMultilineCaret(
                result,
                lastGroupOpen,
                lastGroupClose,
                lastGroupScope,
                lastGroupAlternativeStarts,
                lastGroupLookaheadSpans,
                lookaheadSpans,
                scope
              );
            } else result.push(START_ANCHOR);
          }
          if (quantifier === undefined) {
            for (let k = carets.length; k--; ) {
              body.splice(carets[k], 1);
              shiftSpans(lastBodyLookaheadSpans, carets[k], -1);
            }
            if (lastBodyAlternativeStarts)
              for (let k = starts.length; k--; )
                lastBodyAlternativeStarts[k] -= k;
          } else if (groupScope & MULTILINE) {
            const repeatedCaret =
              minimum > 1 &&
              !canEndLine(body, starts, groupScope, lastBodyLookaheadSpans)
                ? UNSATISFIABLE
                : asOptionalAtom(START_ANCHOR);
            for (const caret of carets) body[caret] = repeatedCaret;
          } else closing = GROUP_CLOSING;
        }
        let forced = false;
        if (
          groupScope & MULTILINE &&
          containsMultilineCaret &&
          body.indexOf(START_ANCHOR) !== -1
        ) {
          closing = DISJUNCTION_TO_END_OF_INPUT;
          forced = true;
        }
        lastGroupOpen = result.length;
        lastGroupClose = lastGroupOpen + body.length + 1;
        lastGroupScope = groupScope;
        lastGroupAlternativeStarts = lastBodyAlternativeStarts;
        lastGroupLookaheadSpans = lastBodyLookaheadSpans;
        return { closing, forced, stays: hoistedCaretStays };
      } else {
        lastBodyAlternativeStarts = alternativeStarts;
        lastBodyLookaheadSpans = lookaheadSpans;
        lastBodyCaretsBefore = caretsBefore;
        lastBodyVerbatimMultilineCaretsBefore = verbatimMultilineCaretsBefore;
        if (result === outermost) unwrapStarredAtoms(result);
      }
    }) as CaretFrame;
  };
}
