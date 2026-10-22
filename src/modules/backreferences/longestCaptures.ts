import { ALTERNATION } from "./constants.ts";
import { decodeGroupName, groupNameOf } from "./groupName.ts";
import {
  DISJUNCTION_TO_END_OF_INPUT,
  END_ANCHOR,
  GROUP_CLOSING,
  LOOKAHEAD_OPENING,
  NAMED_GROUP_OPENING,
  START_ANCHOR,
  isOptionalAtom
} from "../../partialMatchRegExp/atomSyntax.ts";
import { isCapturingGroupOpening } from "../../partialMatchRegExp/groupNumbering.ts";
import {
  LAZY_MARK,
  isQuantifier
} from "../../partialMatchRegExp/quantifier.ts";
import { maximumOf, minimumOf } from "../quantifierBounds.ts";
import {
  isBackreference,
  isNumericBackreference,
  type Backreference,
  type Part
} from "../../partialMatchRegExp/part.ts";

interface Group {
  opening: string;
  groupNumber: number;
  longest: number;
  alternative: number;
}

const groupOpenedBy = (opening: string, groupNumber: number): Group => ({
  opening,
  groupNumber,
  longest: 0,
  alternative: 0
});

const opensGroup = (part: string) =>
  part[0] === "(" && part[part.length - 1] !== GROUP_CLOSING;

const closesGroup = (part: string) =>
  part[0] === GROUP_CLOSING || part === DISJUNCTION_TO_END_OF_INPUT;

const MAY_MATCH_A_STRING = /\\[pq]\{/;

const consumesNothing = (part: string) =>
  part === START_ANCHOR ||
  part === END_ANCHOR ||
  (part[0] === "(" && !isOptionalAtom(part));

type LongestCapture = (backreference: Backreference) => number;

export default function longestCaptureOf(
  parts: readonly Part[],
  groupsBefore: readonly number[],
  unicodeSets: boolean
): LongestCapture {
  const byNumber: number[] = [];
  const byName = new Map<string, number>();
  const longestCapture = (backreference: Backreference) =>
    (isNumericBackreference(backreference)
      ? byNumber[backreference.ref]
      : byName.get(decodeGroupName(backreference.ref))) ?? Infinity;
  const enclosing: Group[] = [];
  let group = groupOpenedBy("", 0);
  for (let index = 0; index < parts.length; index++) {
    const part = parts[index];
    let longest = 1;
    if (isBackreference(part)) {
      longest = part.forward ? Infinity : longestCapture(part);
    } else if (opensGroup(part)) {
      enclosing.push(group);
      group = groupOpenedBy(
        part,
        isCapturingGroupOpening(part) ? groupsBefore[index] + 1 : 0
      );
      continue;
    } else if (part === ALTERNATION) {
      group.longest = Math.max(group.longest, group.alternative);
      group.alternative = 0;
      continue;
    } else if (closesGroup(part)) {
      const closed = group;
      group = enclosing.pop() as Group;
      longest =
        closed.opening === LOOKAHEAD_OPENING
          ? 0
          : Math.max(closed.longest, closed.alternative);
      if (closed.groupNumber !== 0) byNumber[closed.groupNumber] = longest;
      if (closed.opening.startsWith(NAMED_GROUP_OPENING)) {
        const name = decodeGroupName(groupNameOf(closed.opening));
        byName.set(name, Math.max(byName.get(name) ?? 0, longest));
      }
    } else if (consumesNothing(part)) {
      longest = 0;
    } else if (unicodeSets && MAY_MATCH_A_STRING.test(part)) {
      longest = Infinity;
    }
    const quantifier = parts[index + 1];
    if (isQuantifier(quantifier)) {
      index += parts[index + 2] === LAZY_MARK ? 2 : 1;
      const maximum = maximumOf(quantifier, minimumOf(quantifier));
      if (longest !== 0) longest = maximum === 0 ? 0 : longest * maximum;
    }
    group.alternative += longest;
  }
  return longestCapture;
}
