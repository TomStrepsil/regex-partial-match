import createPartialMatchRegExp, {
  type PartialMatchRegExp
} from "./createPartialMatchRegExp.ts";
import type { Hooks } from "./walk.ts";

const bound: Array<{
  modules: readonly Hooks[];
  Bound: typeof PartialMatchRegExp;
}> = [];

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
