import type { Module } from "./module.ts";
import type { Hooks } from "./walk.ts";

export const CARETS_MODULE = 1;
export const BACKREFERENCES_MODULE = 2;
export const MODULES_NAMED_BY_MASK = [
  "",
  "carets module",
  "backreferences module",
  "carets and backreferences modules"
];

export const moduleHooks = Symbol();

export interface ModuleHooks extends Hooks {
  readonly bit: number;
}

export interface HooksOfModule extends Module {
  readonly [moduleHooks]: ModuleHooks;
}

export const definedModuleHooks = new Set<unknown>();

export function defineModule(hooks: ModuleHooks): Module;
export function defineModule(hooks: ModuleHooks): unknown {
  definedModuleHooks.add(Object.freeze(hooks));
  return Object.freeze({
    [moduleHooks]: hooks
  });
}
