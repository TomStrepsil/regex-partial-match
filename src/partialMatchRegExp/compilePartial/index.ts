import carets from "../../modules/carets/index.ts";
import backreferences from "../../modules/backreferences/index.ts";
import type { Hooks } from "../walk.ts";
import { moduleHooks, type HooksOfModule } from "../moduleHooks.ts";
import compileWith from "./compileWith.ts";

const fullHooks: Hooks = Object.assign(
  {},
  (carets as unknown as HooksOfModule)[moduleHooks],
  (backreferences as unknown as HooksOfModule)[moduleHooks]
);

export default function compilePartial(regex: RegExp) {
  return compileWith(regex, fullHooks);
}
