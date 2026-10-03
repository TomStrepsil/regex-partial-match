import createPartialMatchRegExp from "./createPartialMatchRegExp.ts";
import type { Module } from "./module.ts";
import {
  definedModuleHooks,
  moduleHooks,
  type HooksOfModule
} from "./moduleHooks.ts";
import type { PartialMatchRegExpConstructor } from "./partialMatchRegExp.ts";
import type { Hooks } from "./walk.ts";

const boundByModuleMask: (PartialMatchRegExpConstructor | undefined)[] = [];

const isModule = (
  value: Module | null | undefined
): value is HooksOfModule =>
  !!value && moduleHooks in value && definedModuleHooks.has(value[moduleHooks]);

/**
 * The `PartialMatchRegExp` class that applies the rules the given modules
 * supply.
 *
 * The same set of modules, in any order, returns the same class.
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
  for (const module of modules) {
    if (!isModule(module)) throw new TypeError("Not a module");
    const bound = module[moduleHooks];
    moduleMask |= bound.bit;
    Object.assign(hooks, bound);
  }
  return (
    boundByModuleMask[moduleMask] ||
    (boundByModuleMask[moduleMask] = createPartialMatchRegExp(
      Object.freeze(hooks)
    ))
  );
}
