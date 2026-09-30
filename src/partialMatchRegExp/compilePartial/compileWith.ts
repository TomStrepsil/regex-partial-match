import { CARETS_NEEDED, walk, type Hooks } from "../walk.ts";
import type { CaretHook } from "../caretFrame.ts";
import {
  MAYBE_HAS_BACKREFERENCE_REGEX,
  UNCONSTRAINED_GROUP_SHAPE
} from "./constants.ts";
import { isBackreference } from "../part.ts";
import groupShape from "./groupShape.ts";
import toStatic from "./toStatic.ts";
import type { BackreferencesHook, CompiledPartial } from "./compiled.ts";
import type { RawLookaroundRecorder } from "../hitEnd/rawLookaroundRecorder.ts";

export function walkWithCaretRulesWhereNeeded(
  regex: RegExp,
  declaresNamedGroup: boolean,
  groupLimit: number,
  caret: CaretHook | undefined,
  record: BackreferencesHook["record"] | undefined,
  withModifiers: Hooks["modifiers"],
  recordRawLookarounds?: () => RawLookaroundRecorder
) {
  try {
    return walk(
      regex,
      declaresNamedGroup,
      groupLimit,
      caret?.(regex.source),
      record?.(),
      withModifiers,
      recordRawLookarounds?.()
    );
  } catch (error) {
    if (error !== CARETS_NEEDED) throw error;
    if (caret === undefined) throw new TypeError(CARETS_NEEDED.message);
    return walk(
      regex,
      declaresNamedGroup,
      groupLimit,
      caret(),
      record?.(),
      withModifiers,
      recordRawLookarounds?.()
    );
  }
}

export default function compileWith(
  regex: RegExp,
  hooks: Hooks
): CompiledPartial {
  const flags = regex.flags;
  const isUnicode = regex.unicode || regex.unicodeSets;
  const maybeHasBackreference = MAYBE_HAS_BACKREFERENCE_REGEX.test(
    regex.source
  );
  const { groupLimit, declaresNamedGroup } =
    maybeHasBackreference && !isUnicode
      ? groupShape(regex)
      : UNCONSTRAINED_GROUP_SHAPE;
  const backreferencesHook = maybeHasBackreference
    ? hooks.backreferences
    : undefined;
  const { parts, featureMask } = walkWithCaretRulesWhereNeeded(
    regex,
    declaresNamedGroup,
    groupLimit,
    hooks.caret,
    backreferencesHook?.record,
    hooks.modifiers
  );

  const backreferences = backreferencesHook
    ? parts.filter(isBackreference)
    : [];
  if (backreferencesHook === undefined || backreferences.length === 0) {
    return toStatic(
      parts as string[],
      flags,
      featureMask,
      hooks
    );
  }

  return backreferencesHook.compile(
    parts,
    backreferences,
    flags,
    isUnicode,
    featureMask,
    hooks
  );
}
