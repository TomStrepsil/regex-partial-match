import PartialMatchRegExp, {
  hitEnd,
  features,
  type PartialMatchRegExpConstructor
} from "../../src/partialMatchRegExp/index.ts";
import CorePartialMatchRegExp, {
  withModules,
  type Module,
  type PartialMatchRegExp as CorePartialMatchRegExpInstance,
  type PartialMatchRegExpConstructor as CorePartialMatchRegExpConstructor
} from "../../src/core/index.ts";
import {
  carets,
  backreferences,
  type Module as ModuleFromModules
} from "../../src/modules/index.ts";
import "../../src/extend/index.ts";

declare module "../../src/partialMatchRegExp/index.ts" {
  interface PartialMatchRegExp {
    mergedByDeclaration?: true;
  }
}

export function constructs(): PartialMatchRegExp {
  return new PartialMatchRegExp(/a/, "g");
}

export class Extended extends PartialMatchRegExp {
  execAll(input: string): RegExpExecArray | null {
    return this.exec(input);
  }
}

export function extendsIt(): PartialMatchRegExp {
  return new Extended("a").execAll("a") ? new Extended("a", "y") : constructs();
}

export function narrows(value: unknown): PartialMatchRegExp | undefined {
  return value instanceof PartialMatchRegExp ? value : undefined;
}

export function merges(partial: PartialMatchRegExp): true | undefined {
  return partial.mergedByDeclaration;
}

export function mergesIntoTheCoreInstance(): true | undefined {
  return new CorePartialMatchRegExp(/a/).mergedByDeclaration;
}

export const coreConstructor: PartialMatchRegExpConstructor =
  CorePartialMatchRegExp;

export function extendsRegExpPrototype(): true | undefined {
  return /a/.toPartialMatchRegex().mergedByDeclaration;
}

export function constructsCore(): CorePartialMatchRegExp {
  return new CorePartialMatchRegExp(/a/, "g");
}

export class CoreExtended extends CorePartialMatchRegExp {
  execAll(input: string): RegExpExecArray | null {
    return this.exec(input);
  }
}

export function extendsCore(): CorePartialMatchRegExp {
  return new CoreExtended("a").execAll("a")
    ? new CoreExtended("a", "y")
    : constructsCore();
}

export function narrowsCore(
  value: unknown
): CorePartialMatchRegExp | undefined {
  return value instanceof CorePartialMatchRegExp ? value : undefined;
}

export function mergesIntoCoreDeclaration(
  partial: CorePartialMatchRegExp
): true | undefined {
  return partial.mergedByDeclaration;
}

export function mergesIntoCoreInstanceType(
  partial: CorePartialMatchRegExpInstance
): true | undefined {
  return partial.mergedByDeclaration;
}

export const sameInstanceType: CorePartialMatchRegExpInstance[] = [
  constructs(),
  constructsCore()
];

export const sameConstructorType: CorePartialMatchRegExpConstructor[] = [
  PartialMatchRegExp,
  CorePartialMatchRegExp
];

export const coreInstance: PartialMatchRegExp = new CorePartialMatchRegExp(/a/);

export const moduleBoundInstance: PartialMatchRegExp = new (withModules(
  carets
))(/a/);

export const extendedRegExpInstance: PartialMatchRegExp =
  /a/.toPartialMatchRegex();

export function acceptsAnyInstance(match: RegExpExecArray): boolean {
  return (
    hitEnd(new Extended(/a/), match) &&
    hitEnd(coreInstance, match) &&
    features(moduleBoundInstance).size > 0
  );
}

export const species: PartialMatchRegExpConstructor =
  PartialMatchRegExp[Symbol.species];

export const coreSpecies: CorePartialMatchRegExpConstructor =
  CorePartialMatchRegExp[Symbol.species];

export const subclassSpecies: PartialMatchRegExpConstructor =
  Extended[Symbol.species];

export const boundSpecies: PartialMatchRegExpConstructor = withModules(
  carets
)[Symbol.species];

export function narrowsSubclass(value: unknown): Extended | undefined {
  return value instanceof Extended ? value : undefined;
}

export function narrowsCoreSubclass(value: unknown): CoreExtended | undefined {
  return value instanceof CoreExtended ? value : undefined;
}

export const modules: Module[] = [carets, backreferences];

export const sameModuleType: ModuleFromModules[] = modules;

export const bindsNamedModules: PartialMatchRegExpConstructor = withModules(
  ...modules
);

export const misuse = [
  // @ts-expect-error a class constructor needs `new`
  () => void PartialMatchRegExp(/a/),
  // @ts-expect-error a pattern is a RegExp or a string
  () => void new PartialMatchRegExp(1),
  // @ts-expect-error flags are a string
  () => void new PartialMatchRegExp(/a/, 1),
  // @ts-expect-error only declared members merge
  () => void new PartialMatchRegExp(/a/).undeclared,
  // @ts-expect-error the instance is not a constructor
  () => void new (new PartialMatchRegExp(/a/))(/a/),
  // @ts-expect-error a module is opaque, not any object
  () => void withModules({}),
  // @ts-expect-error a module's contents are not part of its type
  () => void carets.bit,
  // @ts-expect-error a RegExp is not a PartialMatchRegExp
  (match: RegExpExecArray) => void hitEnd(/a/, match),
  // @ts-expect-error a RegExp is not a PartialMatchRegExp
  () => void features(/a/),
  // @ts-expect-error a RegExp is not a PartialMatchRegExp
  () => void ((partial: PartialMatchRegExp) => partial)(/a/),
  // @ts-expect-error a RegExp is not a PartialMatchRegExp from core
  () => void ((partial: CorePartialMatchRegExp) => partial)(/a/),
  // @ts-expect-error core's class constructor needs `new`
  () => void CorePartialMatchRegExp(/a/),
  // @ts-expect-error only declared members merge into core's instances
  () => void new CorePartialMatchRegExp(/a/).undeclared
];
