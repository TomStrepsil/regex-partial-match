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
 * This **reports** every `.features` (or `["features"]`) read in a file that imports from
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

function namesFeatures(member) {
  return member.computed
    ? member.property.value === FEATURES
    : member.property.name === FEATURES;
}

function isWriteTarget(path) {
  const { node: parent } = path.parent;
  const { node } = path;
  switch (parent.type) {
    case "AssignmentExpression":
    case "AssignmentPattern":
    case "ForInStatement":
    case "ForOfStatement":
      return parent.left === node;
    case "UpdateExpression":
    case "ArrayPattern":
    case "RestElement":
      return true;
    case "UnaryExpression":
      return parent.operator === "delete";
    case "ObjectProperty":
    case "Property":
      return (
        parent.value === node &&
        path.parent.parent.node.type === "ObjectPattern"
      );
    default:
      return false;
  }
}

function* candidateNames() {
  yield FEATURES;
  yield FEATURES_ALIAS;
  for (let suffix = 2; ; suffix++) yield `${FEATURES_ALIAS}${suffix}`;
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
      entry: declaration.source.value,
      isValue:
        declaration.importKind !== "type" && specifier.importKind !== "type"
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
    ({ specifier, entry, isValue }) =>
      isValue &&
      ((specifier.type === "ImportSpecifier" &&
        specifier.imported.name === FEATURES) ||
        (specifier.type === "ImportDefaultSpecifier" &&
          entry === FEATURES_ENTRY))
  )?.specifier;

  const globalScope = root.find(j.Program).get().scope;

  const isInstanceExpression = (node, scope) =>
    (node?.type === "NewExpression" &&
      node.callee.type === "Identifier" &&
      classLocals.has(node.callee.name) &&
      scope.lookup(node.callee.name) === globalScope) ||
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
          isInstanceExpression(declarator.init, binding.scope))
      );
    });
  };

  const isLikely = (path) => {
    const { object } = path.node;
    if (isInstanceExpression(object, path.scope)) return true;
    return (
      object.type === "Identifier" && isBoundToInstance(path, object.name)
    );
  };

  const unboundName = (path) => {
    for (const name of candidateNames()) {
      if (!path.scope.lookup(name)) return name;
    }
  };
  const findings = [];
  root
    .find(j.MemberExpression)
    .filter((path) => namesFeatures(path.node) && !isWriteTarget(path))
    .forEach((path) => {
      const object = j(path.node.object).toSource();
      const importIsVisible =
        featuresImport &&
        path.scope.lookup(featuresImport.local.name) === globalScope;
      const functionName = importIsVisible
        ? featuresImport.local.name
        : unboundName(path);
      const importLine = importIsVisible
        ? ""
        : `\n    add: import { ${
            functionName === FEATURES ? FEATURES : `${FEATURES} as ${functionName}`
          } } from "${PACKAGE}";`;
      const rank = isLikely(path) ? "likely" : "possible";
      const isOptional =
        path.node.type === "OptionalMemberExpression" || path.node.optional;
      const advice = isOptional
        ? `is a getter in v1 and a function in v2; it is an optional read, so ` +
          `\`${functionName}(...)\` would throw where it gave undefined: guard it by hand`
        : `is a getter in v1 and a function in v2; write \`${functionName}(${object})\``;
      findings.push(
        `${fileInfo.path}:${path.node.loc?.start.line ?? "?"}: ${rank}: ` +
          `\`${object}.features\` ${advice}${importLine}`
      );
    });

  for (const finding of findings) {
    api.report(finding);
  }

  return null;
}

export const parser = "tsx";
