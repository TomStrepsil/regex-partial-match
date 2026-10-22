import type { Module } from "../../partialMatchRegExp/opaqueModule.ts";
import {
  BACKREFERENCES_MODULE,
  defineModule
} from "../../partialMatchRegExp/moduleHooks.ts";
import backreferenceRecorder from "./backreferenceRecorder.ts";
import compilerWith from "./compileDynamic.ts";
import scopeWithModifiers from "../scopeWithModifiers.ts";

export interface BackreferencesOptions {
  /**
   * The most characters of its group's capture a backreference matches
   * before the input ends, for the match to count as partial. A longer run
   * is matched only once the input holds the whole capture. Each
   * backreference that fails to match reads up to this many characters
   * ahead, so a larger value costs more on long input. The `backreferences`
   * module, which the default `PartialMatchRegExp` binds, uses 64.
   */
  readonly longestPartial: number;
}

const configured = new Map<number, Module>();

/**
 * The backreferences module with another `longestPartial` than the 64 the
 * `backreferences` module uses.
 *
 * The same options return the same module, so `withModules` returns the same
 * class for them.
 *
 * @param options - The options to apply
 * @returns The backreferences module for `withModules`
 * @throws `RangeError` if `longestPartial` isn't a whole number from 0 to
 * `Number.MAX_SAFE_INTEGER`
 */
export function backreferencesWith({
  longestPartial
}: BackreferencesOptions): Module {
  if (!Number.isSafeInteger(longestPartial) || longestPartial < 0)
    throw new RangeError(
      "longestPartial must be a whole number from 0 to Number.MAX_SAFE_INTEGER"
    );
  let module = configured.get(longestPartial);
  if (module === undefined) {
    module = defineModule({
      bit: BACKREFERENCES_MODULE,
      backreference: Object.freeze({
        record: backreferenceRecorder,
        compile: compilerWith(longestPartial)
      }),
      modifiers: scopeWithModifiers
    });
    configured.set(longestPartial, module);
  }
  return module;
}

/**
 * The module that matches a backreference against the text its group
 * captured, for `withModules` from `regex-partial-match/core`. A backreference
 * runs out of input part way only within the first 64 characters of its
 * capture; `backreferencesWith` sets another limit.
 *
 * Without it, the `core` class throws a `TypeError` for a pattern whose
 * backreference can only be resolved at match time.
 */
const backreferences = backreferencesWith({ longestPartial: 64 });

export default backreferences;
