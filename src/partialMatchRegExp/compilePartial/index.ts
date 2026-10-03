import carets from "../../modules/carets/index.ts";
import backreferences from "../../modules/backreferences/index.ts";
import type { Module } from "../module.ts";
import type { Hooks } from "../walk.ts";
import {
  moduleHooks,
  type ModuleHooks
} from "../moduleHooks.ts";
import compileWith from "./compileWith.ts";

interface HooksOfModule extends Module {
  readonly [moduleHooks]?: ModuleHooks;
}

function hooksOf(module: Module): ModuleHooks | undefined;
function hooksOf(module: HooksOfModule) {
  return module[moduleHooks];
}

const fullHooks: Hooks = Object.assign(
  {},
  hooksOf(carets),
  hooksOf(backreferences)
);

export default function compilePartial(regex: RegExp) {
  return compileWith(regex, fullHooks);
}
