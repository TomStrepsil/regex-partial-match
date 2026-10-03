/* eslint-disable @typescript-eslint/no-unused-vars -- nothing imports this file: `tsc` type-checks it (tsconfig includes test/**), so each declaration is a compile-time assertion, and the `@ts-expect-error` lines fail the build if they stop being errors. Exporting each one only to silence the unused-variable rule would widen the file's surface for no reader. */
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

function constructs(): PartialMatchRegExp {
  return new PartialMatchRegExp(/a/, "g");
}

class Extended extends PartialMatchRegExp {
  execAll(input: string): RegExpExecArray | null {
    return this.exec(input);
  }
}

function extendsIt(): PartialMatchRegExp {
  return new Extended("a").execAll("a") ? new Extended("a", "y") : constructs();
}

function narrows(value: unknown): PartialMatchRegExp | undefined {
  return value instanceof PartialMatchRegExp ? value : undefined;
}

function merges(partial: PartialMatchRegExp): true | undefined {
  return partial.mergedByDeclaration;
}

function mergesIntoTheCoreInstance(): true | undefined {
  return new CorePartialMatchRegExp(/a/).mergedByDeclaration;
}

const coreConstructor: PartialMatchRegExpConstructor =
  CorePartialMatchRegExp;

function extendsRegExpPrototype(): true | undefined {
  return /a/.toPartialMatchRegex().mergedByDeclaration;
}

function constructsCore(): CorePartialMatchRegExp {
  return new CorePartialMatchRegExp(/a/, "g");
}

class CoreExtended extends CorePartialMatchRegExp {
  execAll(input: string): RegExpExecArray | null {
    return this.exec(input);
  }
}

function extendsCore(): CorePartialMatchRegExp {
  return new CoreExtended("a").execAll("a")
    ? new CoreExtended("a", "y")
    : constructsCore();
}

function narrowsCore(
  value: unknown
): CorePartialMatchRegExp | undefined {
  return value instanceof CorePartialMatchRegExp ? value : undefined;
}

function mergesIntoCoreDeclaration(
  partial: CorePartialMatchRegExp
): true | undefined {
  return partial.mergedByDeclaration;
}

function mergesIntoCoreInstanceType(
  partial: CorePartialMatchRegExpInstance
): true | undefined {
  return partial.mergedByDeclaration;
}

const sameInstanceType: CorePartialMatchRegExpInstance[] = [
  constructs(),
  constructsCore()
];

const sameConstructorType: CorePartialMatchRegExpConstructor[] = [
  PartialMatchRegExp,
  CorePartialMatchRegExp
];

const coreInstance: PartialMatchRegExp = new CorePartialMatchRegExp(/a/);

const moduleBoundInstance: PartialMatchRegExp = new (withModules(
  carets
))(/a/);

const extendedRegExpInstance: PartialMatchRegExp =
  /a/.toPartialMatchRegex();

function acceptsAnyInstance(match: RegExpExecArray): boolean {
  return (
    hitEnd(new Extended(/a/), match) &&
    hitEnd(coreInstance, match) &&
    features(moduleBoundInstance).size > 0
  );
}

const species: PartialMatchRegExpConstructor =
  PartialMatchRegExp[Symbol.species];

const coreSpecies: CorePartialMatchRegExpConstructor =
  CorePartialMatchRegExp[Symbol.species];

const subclassSpecies: PartialMatchRegExpConstructor =
  Extended[Symbol.species];

const boundSpecies: PartialMatchRegExpConstructor = withModules(
  carets
)[Symbol.species];

function narrowsSubclass(value: unknown): Extended | undefined {
  return value instanceof Extended ? value : undefined;
}

function narrowsCoreSubclass(value: unknown): CoreExtended | undefined {
  return value instanceof CoreExtended ? value : undefined;
}

/* eslint-disable @typescript-eslint/no-deprecated -- RegExp's legacy statics are deprecated, but the class still inherits them */
const inheritedStatics: string[] = [
  PartialMatchRegExp.$1,
  PartialMatchRegExp.input,
  PartialMatchRegExp.lastMatch,
  CorePartialMatchRegExp.$1,
  CorePartialMatchRegExp.input,
  CorePartialMatchRegExp.lastMatch
];
/* eslint-enable @typescript-eslint/no-deprecated */

const modules: Module[] = [carets, backreferences];

const sameModuleType: ModuleFromModules[] = modules;

const bindsNamedModules: PartialMatchRegExpConstructor = withModules(
  ...modules
);

const consume = (value: unknown) => value;

const misuse = [
  // @ts-expect-error a class constructor needs `new`
  () => consume(PartialMatchRegExp(/a/)),
  // @ts-expect-error a class constructor needs `new`, though RegExp's statics are kept
  () => consume(PartialMatchRegExp("a")),
  // @ts-expect-error a pattern is a RegExp or a string
  () => consume(new PartialMatchRegExp(1)),
  // @ts-expect-error flags are a string
  () => consume(new PartialMatchRegExp(/a/, 1)),
  // @ts-expect-error only declared members merge
  () => consume(new PartialMatchRegExp(/a/).undeclared),
  // @ts-expect-error the instance is not a constructor
  () => consume(new (new PartialMatchRegExp(/a/))(/a/)),
  // @ts-expect-error a module is opaque, not any object
  () => consume(withModules({})),
  // @ts-expect-error a module's contents are not part of its type
  () => consume(carets.bit),
  // @ts-expect-error a RegExp is not a PartialMatchRegExp
  (match: RegExpExecArray) => consume(hitEnd(/a/, match)),
  // @ts-expect-error a RegExp is not a PartialMatchRegExp
  () => consume(features(/a/)),
  // @ts-expect-error a RegExp is not a PartialMatchRegExp
  () => consume(((partial: PartialMatchRegExp) => partial)(/a/)),
  // @ts-expect-error a RegExp is not a PartialMatchRegExp from core
  () => consume(((partial: CorePartialMatchRegExp) => partial)(/a/)),
  // @ts-expect-error core's class constructor needs `new`
  () => consume(CorePartialMatchRegExp(/a/)),
  // @ts-expect-error only declared members merge into core's instances
  () => consume(new CorePartialMatchRegExp(/a/).undeclared)
];
