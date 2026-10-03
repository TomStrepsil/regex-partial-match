import type { Module } from "./opaqueModule.ts";
import type { Hooks } from "./walk.ts";

export const CARETS_MODULE = 1;
export const BACKREFERENCES_MODULE = 2;
export const MODULES_NAMED_BY_MASK: Record<number, string> = {
  [CARETS_MODULE]: "carets module",
  [BACKREFERENCES_MODULE]: "backreferences module",
  [CARETS_MODULE | BACKREFERENCES_MODULE]: "carets and backreferences modules"
};

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
