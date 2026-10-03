import { walk, type Hooks } from "../walk.ts";
import { CARETS_MODULE, MODULES_NAMED_BY_MASK } from "../moduleHooks.ts";
import type { CaretHook } from "../caretHook.ts";
import { MAYBE_HAS_BACKREFERENCE_REGEX } from "../constants.ts";
import { UNCONSTRAINED_GROUP_SHAPE } from "./constants.ts";
import { isBackreference } from "../part.ts";
import groupShape from "./groupShape.ts";
import toStatic from "./toStatic.ts";
import type { BackreferenceHook } from "../backreferenceHook.ts";
import type { CompiledPartial } from "./compiled.ts";

function walkWithCaretRulesWhereNeeded(
  regex: RegExp,
  declaresNamedGroup: boolean,
  groupLimit: number,
  caret: CaretHook | undefined,
  record: BackreferenceHook["record"] | undefined,
  withModifiers: Hooks["modifiers"]
) {
  const walked = walk(
    regex,
    declaresNamedGroup,
    groupLimit,
    caret?.(regex.source),
    record?.(),
    withModifiers
  );
  return walked.needs & CARETS_MODULE && caret !== undefined
    ? walk(
        regex,
        declaresNamedGroup,
        groupLimit,
        caret(),
        record?.(),
        withModifiers
      )
    : walked;
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
  const backreferenceHook = maybeHasBackreference
    ? hooks.backreference
    : undefined;
  const { parts, featureMask, needs, rawLookarounds } =
    walkWithCaretRulesWhereNeeded(
      regex,
      declaresNamedGroup,
      groupLimit,
      hooks.caret,
      backreferenceHook?.record,
      hooks.modifiers
    );
  if (needs) throw new TypeError("Needs the " + MODULES_NAMED_BY_MASK[needs]);

  const backreferences = backreferenceHook
    ? parts.filter(isBackreference)
    : [];
  const compiled =
    backreferenceHook === undefined || backreferences.length === 0
      ? toStatic(parts as string[], flags, featureMask, hooks)
      : backreferenceHook.compile(
          parts,
          backreferences,
          flags,
          isUnicode,
          featureMask,
          hooks
        );
  if (rawLookarounds) compiled.rawLookarounds = rawLookarounds;
  return compiled;
}
