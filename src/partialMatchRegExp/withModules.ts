import createPartialMatchRegExp from "./createPartialMatchRegExp.ts";
import type { Module } from "./opaqueModule.ts";
import {
  definedModuleHooks,
  moduleHooks,
  type ModuleHooks
} from "./moduleHooks.ts";
import type { PartialMatchRegExpConstructor } from "./index.ts";
import type { Hooks } from "./walk.ts";

const boundByModules = new Map<string, PartialMatchRegExpConstructor>();

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
 * @throws `TypeError` if any argument is not a module, or two of them supply
 * the same rules
 */
export default function withModules(
  ...modules: Module[]
): PartialMatchRegExpConstructor {
  const hooks: Hooks = {};
  const ids: number[] = [];
  let moduleMask = 0;
  for (const module of modules) {
    const bound: unknown = Reflect.get(Object(module), moduleHooks);
    if (!isDefinedHooks(bound)) throw new TypeError("Not a module");
    const id = definedModuleHooks.get(bound) as number;
    if (ids.indexOf(id) !== -1) continue;
    if (moduleMask & bound.bit)
      throw new TypeError("Two modules supply the same rules");
    moduleMask |= bound.bit;
    ids.push(id);
    Object.assign(hooks, bound);
  }
  const key = ids.sort((first, second) => first - second).join();
  let bound = boundByModules.get(key);
  if (bound === undefined) {
    bound = createPartialMatchRegExp(Object.freeze(hooks));
    boundByModules.set(key, bound);
  }
  return bound;
}
