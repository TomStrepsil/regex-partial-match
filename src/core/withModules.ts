import type PartialMatchRegExp from "./partialMatchRegExp.ts";
import createPartialMatchRegExp from "../partialMatchRegExp/createPartialMatchRegExp.ts";
import type { Hooks } from "../partialMatchRegExp/walk.ts";

const bound: Array<{
  modules: readonly Hooks[];
  Bound: typeof PartialMatchRegExp;
}> = [];

/**
 * A `PartialMatchRegExp` class, like the one `regex-partial-match/core`
 * exports, that applies the rules the given modules supply.
 *
 * The same set of modules, in any order, returns the same class, so
 * `instanceof` holds across calls. `split()` and `matchAll()` build their
 * copies through `Symbol.species`, which keeps the modules bound.
 *
 * @param modules - The modules to bind
 * @returns The `PartialMatchRegExp` class that binds `modules`
 */
export default function withModules(
  ...modules: Hooks[]
): typeof PartialMatchRegExp {
  const set = modules.filter(
    (module, index) => modules.indexOf(module) === index
  );
  for (const entry of bound) {
    if (
      entry.modules.length === set.length &&
      set.every((module) => entry.modules.indexOf(module) !== -1)
    )
      return entry.Bound;
  }
  const hooks: Hooks = {};
  for (const module of set) Object.assign(hooks, module);
  const Bound = createPartialMatchRegExp(hooks);
  bound.push({ modules: set, Bound });
  return Bound;
}
