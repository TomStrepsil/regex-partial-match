import carets from "../../modules/carets/index.ts";
import backreferences from "../../modules/backreferences/index.ts";
import type { Hooks } from "../walk.ts";
import compileWith from "./compileWith.ts";
import type { CompiledPartial } from "./compiled.ts";

const fullHooks: Hooks = Object.assign(
  {},
  carets,
  backreferences
);

export default function compilePartial(regex: RegExp): CompiledPartial {
  return compileWith(regex, fullHooks);
}
