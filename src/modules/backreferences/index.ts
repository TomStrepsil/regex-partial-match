import type { Module } from "../../partialMatchRegExp/module.ts";
import {
  BACKREFERENCES_MODULE,
  moduleHooks,
  type HooksOfModule
} from "../../partialMatchRegExp/moduleHooks.ts";
import backreferenceRecorder from "./backreferenceRecorder.ts";
import compileDynamic from "./compileDynamic.ts";
import { scopeWithModifiers } from "../../partialMatchRegExp/scope.ts";

/**
 * The module that matches a backreference against the text its group
 * captured, for `withModules` from `regex-partial-match/core`.
 *
 * Without it, the `core` class throws a `TypeError` for a pattern whose
 * backreference can only be resolved at match time.
 */
const backreferences = {
  [moduleHooks]: {
    bit: BACKREFERENCES_MODULE,
    backreferences: {
      record: backreferenceRecorder,
      compile: compileDynamic
    },
    modifiers: scopeWithModifiers
  }
} satisfies HooksOfModule as unknown as Module;

export default backreferences;
