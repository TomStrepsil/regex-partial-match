import { walkWithCaretRulesWhereNeeded } from "../compilePartial/compileWith.ts";
import type { CompiledPartial } from "../compilePartial/compiled.ts";
import groupShape from "../compilePartial/groupShape.ts";
import {
  MAYBE_HAS_BACKREFERENCE_REGEX,
  UNCONSTRAINED_GROUP_SHAPE
} from "../compilePartial/constants.ts";
import { isRawLookaround } from "../atomSyntax.ts";
import type { Part } from "../part.ts";
import rawLookaroundRecorder, {
  type RawLookaroundInfo
} from "./rawLookaroundRecorder.ts";

export interface ProbeSource {
  rawLookarounds: readonly RawLookaroundInfo[];
  declaredNames: readonly string[];
}

const MAY_DECLARE_NAMED_GROUP = /\(\?<[^=!]/;

const isRawLookaroundPart = (part: Part) =>
  typeof part === "string" && isRawLookaround(part);

export default function probeSourceOf(
  regex: RegExp,
  { parts, hooks }: CompiledPartial
): ProbeSource {
  const { source } = regex;
  const { groupLimit, declaresNamedGroup, namedGroups } =
    MAYBE_HAS_BACKREFERENCE_REGEX.test(source) ||
    MAY_DECLARE_NAMED_GROUP.test(source)
      ? groupShape(regex)
      : UNCONSTRAINED_GROUP_SHAPE;
  let rawLookarounds: RawLookaroundInfo[] = [];
  if (parts.some(isRawLookaroundPart))
    walkWithCaretRulesWhereNeeded(
      regex,
      declaresNamedGroup,
      groupLimit,
      hooks.caret,
      hooks.backreferences?.record,
      hooks.modifiers,
      () => rawLookaroundRecorder((rawLookarounds = []))
    );
  return { rawLookarounds, declaredNames: Object.keys(namedGroups ?? {}) };
}
