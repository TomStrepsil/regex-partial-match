/**
 * Report: `features` getter reads to migrate for v2
 *
 * v1 exposed the set of syntactic features as a getter on every instance:
 *
 *   const used = partial.features;
 *
 * v2 replaces it with a function:
 *
 *   import { features } from "regex-partial-match";
 *   const used = features(partial);
 *
 * This **reports** every `.features` read in a file that imports from
 * "regex-partial-match" (any entry point), with the replacement written out.
 * It never edits a file, because `.features` is an ordinary property name and a
 * codemod cannot tell whether the object it is read from is a PartialMatchRegExp.
 *
 * A read is ranked "likely" when the object is visibly a PartialMatchRegExp: a
 * `new` of the package's class, a `.toPartialMatchRegex()` call, or a binding
 * initialised from either or annotated with the class. Every other read in the
 * file is "possible". A file that imports nothing from the package reports
 * nothing.
 *
 * Not found: a `features` destructured from an instance (`const { features } = re`).
 */

const PACKAGE = "regex-partial-match";
const CLASS_NAME = "PartialMatchRegExp";
const FACTORY_NAME = "toPartialMatchRegex";
const FEATURES = "features";
const FEATURES_ALIAS = "featuresOf";
const CLASS_ENTRIES = [PACKAGE, `${PACKAGE}/core`, `${PACKAGE}/partialMatchRegExp`];
const FEATURES_ENTRY = `${PACKAGE}/features`;

function importsFromPackage(declaration) {
  const source = declaration.source.value;
  return source === PACKAGE || source.startsWith(`${PACKAGE}/`);
}

function isFactoryCall(node) {
  return (
    node?.type === "CallExpression" &&
    node.callee.type === "MemberExpression" &&
    !node.callee.computed &&
    node.callee.property.name === FACTORY_NAME
  );
}

export default function transform(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const packageImports = root
    .find(j.ImportDeclaration)
    .filter((path) => importsFromPackage(path.node));
  if (packageImports.size() === 0) return null;

  const imported = packageImports.nodes().flatMap((declaration) =>
    declaration.specifiers.map((specifier) => ({
      specifier,
      entry: declaration.source.value
    }))
  );
  const classLocals = new Set(
    imported
      .filter(
        ({ specifier, entry }) =>
          (specifier.type === "ImportDefaultSpecifier" &&
            CLASS_ENTRIES.includes(entry)) ||
          (specifier.type === "ImportSpecifier" &&
            specifier.imported.name === CLASS_NAME)
      )
      .map(({ specifier }) => specifier.local.name)
  );
  const featuresImport = imported.find(
    ({ specifier, entry }) =>
      (specifier.type === "ImportSpecifier" &&
        specifier.imported.name === FEATURES) ||
      (specifier.type === "ImportDefaultSpecifier" && entry === FEATURES_ENTRY)
  )?.specifier;

  const isInstanceExpression = (node) =>
    (node?.type === "NewExpression" &&
      node.callee.type === "Identifier" &&
      classLocals.has(node.callee.name)) ||
    isFactoryCall(node);

  const isAnnotatedAsClass = (node) => {
    const annotation = node.typeAnnotation?.typeAnnotation;
    return (
      annotation?.type === "TSTypeReference" &&
      annotation.typeName.type === "Identifier" &&
      classLocals.has(annotation.typeName.name)
    );
  };

  const isBoundToInstance = (path, name) => {
    const bindings = path.scope.lookup(name)?.getBindings()[name] ?? [];
    return bindings.some((binding) => {
      const declarator = binding.parent.node;
      return (
        isAnnotatedAsClass(binding.node) ||
        (declarator.type === "VariableDeclarator" &&
          declarator.id === binding.node &&
          isInstanceExpression(declarator.init))
      );
    });
  };

  const isLikely = (path) => {
    const { object } = path.node;
    if (isInstanceExpression(object)) return true;
    return (
      object.type === "Identifier" && isBoundToInstance(path, object.name)
    );
  };

  const globalScope = root.find(j.Program).get().scope;
  const findings = [];
  root
    .find(j.MemberExpression, { computed: false, property: { name: FEATURES } })
    .forEach((path) => {
      const object = j(path.node.object).toSource();
      const importIsVisible =
        featuresImport &&
        path.scope.lookup(featuresImport.local.name) === globalScope;
      const functionName = importIsVisible
        ? featuresImport.local.name
        : path.scope.lookup(FEATURES)
          ? FEATURES_ALIAS
          : FEATURES;
      const importLine = importIsVisible
        ? ""
        : `\n    add: import { ${
            functionName === FEATURES ? FEATURES : `${FEATURES} as ${functionName}`
          } } from "${PACKAGE}";`;
      const rank = isLikely(path) ? "likely" : "possible";
      findings.push(
        `${fileInfo.path}:${path.node.loc?.start.line ?? "?"}: ${rank}: ` +
          `\`${object}.features\` is a getter in v1 and a function in v2; ` +
          `write \`${functionName}(${object})\`${importLine}`
      );
    });

  for (const finding of findings) {
    api.report(finding);
  }

  return null;
}

export const parser = "tsx";
