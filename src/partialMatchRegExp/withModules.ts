import createPartialMatchRegExp from "./createPartialMatchRegExp.ts";
import type { Module } from "./opaqueModule.ts";
import {
  definedModuleHooks,
  moduleHooks,
  type ModuleHooks
} from "./moduleHooks.ts";
import type { PartialMatchRegExpConstructor } from "./index.ts";
import type { Hooks } from "./walk.ts";

const boundByModuleMask: (PartialMatchRegExpConstructor | undefined)[] = [];

const isDefinedHooks = (value: unknown): value is ModuleHooks =>
  definedModuleHooks.has(value);

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
    const bound: unknown = Reflect.get(Object(module), moduleHooks);
    if (!isDefinedHooks(bound)) throw new TypeError("Not a module");
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
