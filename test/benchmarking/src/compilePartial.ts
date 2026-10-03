import carets from "../../../lib/modules/carets/index.js";
import backreferences from "../../../lib/modules/backreferences/index.js";
import compileWith from "../../../lib/partialMatchRegExp/compilePartial/compileWith.js";
import type { Module } from "../../../lib/partialMatchRegExp/opaqueModule.js";
import {
  moduleHooks,
  type ModuleHooks
} from "../../../lib/partialMatchRegExp/moduleHooks.js";
import type { Hooks } from "../../../lib/partialMatchRegExp/walk.js";

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
