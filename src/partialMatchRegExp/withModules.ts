import createPartialMatchRegExp from "./createPartialMatchRegExp.ts";
import type { Module } from "./module.ts";
import {
  BACKREFERENCES_MODULE,
  CARETS_MODULE,
  definedModuleHooks,
  moduleHooks,
  type HooksOfModule
} from "./moduleHooks.ts";
import type { PartialMatchRegExpConstructor } from "./partialMatchRegExp.ts";
import type { Hooks } from "./walk.ts";

const boundByModuleMask: (PartialMatchRegExpConstructor | undefined)[] = [];

/**
 * The `PartialMatchRegExp` class that applies the rules the given modules
 * supply.
 *
 * The same set of modules, in any order, returns the same class, so
 * `instanceof` holds across calls and across entry points:
 * `withModules()` is the class `regex-partial-match/core` exports, and
 * `withModules(carets, backreferences)` the one `regex-partial-match`
 * exports. `split()` and `matchAll()` build their copies through
 * `Symbol.species`, which keeps the modules bound.
 *
 * @param modules - The modules to bind, from `regex-partial-match/modules`
 * @returns The `PartialMatchRegExp` class that binds `modules`
 * @throws `TypeError` if any argument is not a module
 */
export default function withModules(
  ...modules: Module[]
): PartialMatchRegExpConstructor {
  const hooks: Hooks = {};
  let moduleMask = 0;
  for (const module of modules as unknown as (HooksOfModule | null)[]) {
    const bound = module && module[moduleHooks];
    if (
      !bound ||
      !definedModuleHooks.has(bound) ||
      (bound.bit !== CARETS_MODULE && bound.bit !== BACKREFERENCES_MODULE)
    )
      throw new TypeError("Not a module");
    moduleMask |= bound.bit;
    Object.assign(hooks, bound);
  }
  return (
    boundByModuleMask[moduleMask] ||
    (boundByModuleMask[moduleMask] = createPartialMatchRegExp(hooks))
  );
}
