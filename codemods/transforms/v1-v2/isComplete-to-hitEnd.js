/**
 * Codemod: isComplete() -> hitEnd() (v1 -> v2)
 *
 * Transforms:
 *   1. Renames the `isComplete` import specifier of "regex-partial-match" to
 *      `hitEnd`, or drops it when `hitEnd` is already imported from there.
 *   2. Rewrites each call through that binding, or through a namespace import
 *      (`rpm.isComplete(...)`), to the negated `hitEnd`:
 *        isComplete(partial, match)   -> !hitEnd(partial, match)
 *        !isComplete(partial, match)  -> hitEnd(partial, match)
 *
 * The rename is mechanical but the answer can change: a match whose greedy
 * quantifier, `$`, `\b` or `\B` read the end of the input now has
 * `hitEnd() === true`, so `!hitEnd()` is `false` where `isComplete()` was `true`.
 * See the "hitEnd()" section of the README for the contract.
 *
 * Reported rather than rewritten:
 *   - an aliased import (`isComplete as done`) keeps its alias, which now names
 *     the opposite meaning
 *   - `isComplete` used as a value (callback, assignment, re-export, destructured
 *     from a namespace); for the imported binding, the import and all its
 *     calls are then left as they are
 *   - a call where `hitEnd` is bound to something else in scope
 *   - `require()` and dynamic `import()` of the package
 *
 * Only the "regex-partial-match" entry point ever exported `isComplete`.
 */

const PACKAGE = "regex-partial-match";
const OLD_NAME = "isComplete";
const NEW_NAME = "hitEnd";
const NOT_A_REFERENCE_KEYS = ["property", "key", "imported", "exported"];

function importedName(specifier) {
  return specifier.imported?.name ?? specifier.imported?.value;
}

function namesProperty(member, name) {
  return member.computed
    ? member.property.value === name
    : member.property.name === name;
}

function isCalled(path) {
  const parent = path.parent.node;
  return (
    (parent.type === "CallExpression" ||
      parent.type === "OptionalCallExpression") &&
    parent.callee === path.node
  );
}

export default function isCompleteToHitEnd(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const globalScope = root.find(j.Program).get().scope;
  let changed = false;

  const flag = (node, message) =>
    api.report(`${fileInfo.path}:${node.loc?.start.line ?? "?"}: ${message}`);

  const resolvesToImport = (path, name) =>
    path.scope.lookup(name) === globalScope;

  const importPaths = root.find(j.ImportDeclaration, {
    source: { value: PACKAGE }
  });
  const specifiers = importPaths
    .nodes()
    .flatMap((declaration) => declaration.specifiers);
  const oldSpecifiers = specifiers.filter(
    (specifier) =>
      specifier.type === "ImportSpecifier" &&
      importedName(specifier) === OLD_NAME
  );
  const namespaceLocals = new Set(
    specifiers
      .filter((specifier) => specifier.type === "ImportNamespaceSpecifier")
      .map((specifier) => specifier.local.name)
  );
  const existingHitEnd = importPaths
    .nodes()
    .filter((declaration) => declaration.importKind !== "type")
    .flatMap((declaration) => declaration.specifiers)
    .find(
      (specifier) =>
        specifier.type === "ImportSpecifier" &&
        specifier.importKind !== "type" &&
        importedName(specifier) === NEW_NAME
    );

  const hitEndIsTaken = !existingHitEnd && globalScope.declares(NEW_NAME);
  if (hitEndIsTaken && oldSpecifiers.length > 0) {
    flag(
      oldSpecifiers[0],
      `"${NEW_NAME}" is already bound in this file, so "${OLD_NAME}" was left as it is; migrate it by hand`
    );
  }

  const targetNameOf = (specifier) => {
    if (existingHitEnd) return existingHitEnd.local.name;
    return specifier.local.name === OLD_NAME ? NEW_NAME : specifier.local.name;
  };
  const targetByLocal = new Map(
    (hitEndIsTaken ? [] : oldSpecifiers).map((specifier) => [
      specifier.local.name,
      targetNameOf(specifier)
    ])
  );

  const isShadowed = (path, target) => {
    const scope = path.scope.lookup(target);
    return Boolean(scope) && scope !== globalScope;
  };
  const callsThroughImport = () =>
    root.find(j.CallExpression).filter(
      (path) =>
        path.node.callee.type === "Identifier" &&
        targetByLocal.has(path.node.callee.name) &&
        resolvesToImport(path, path.node.callee.name)
    );

  const shadowedCalls = callsThroughImport().filter((path) =>
    isShadowed(path, targetByLocal.get(path.node.callee.name))
  );
  shadowedCalls.forEach((path) => {
    flag(
      path.node,
      `"${targetByLocal.get(path.node.callee.name)}" is shadowed here, so "${OLD_NAME}" was left as it is throughout this file; migrate it by hand`
    );
  });
  const valueReferences = root.find(j.Identifier).filter((path) => {
    const { name } = path.node;
    const { node: parent } = path.parent;
    return (
      targetByLocal.has(name) &&
      parent.type !== "ImportSpecifier" &&
      !(NOT_A_REFERENCE_KEYS.includes(path.name) && !parent.computed) &&
      !isCalled(path) &&
      resolvesToImport(path, name)
    );
  });
  valueReferences.forEach((path) => {
    flag(
      path.node,
      `"${path.node.name}" is used as a value, not called, so "${OLD_NAME}" was left as it is throughout this file; \`!hitEnd(...)\` is its replacement, so rewrite it by hand`
    );
  });
  if (shadowedCalls.size() > 0 || valueReferences.size() > 0) {
    targetByLocal.clear();
  }
  const handledSpecifiers = oldSpecifiers.filter((specifier) =>
    targetByLocal.has(specifier.local.name)
  );

  const invertCall = (callPath) => {
    const parent = callPath.parent.node;
    if (parent.type === "UnaryExpression" && parent.operator === "!") {
      callPath.parent.replace(callPath.node);
    } else {
      callPath.replace(j.unaryExpression("!", callPath.node));
    }
    changed = true;
  };

  callsThroughImport().forEach((path) => {
    path.node.callee.name = targetByLocal.get(path.node.callee.name);
    invertCall(path);
  });

  root
    .find(j.CallExpression)
    .filter((path) => {
      const callee = path.node.callee;
      return (
        j.MemberExpression.check(callee) &&
        callee.object.type === "Identifier" &&
        namespaceLocals.has(callee.object.name) &&
        namesProperty(callee, OLD_NAME) &&
        resolvesToImport(path, callee.object.name)
      );
    })
    .forEach((path) => {
      const callee = path.node.callee;
      callee.computed = false;
      callee.property = j.identifier(NEW_NAME);
      invertCall(path);
    });

  root
    .find(j.MemberExpression)
    .filter((path) => {
      const { object } = path.node;
      return (
        object.type === "Identifier" &&
        namespaceLocals.has(object.name) &&
        resolvesToImport(path, object.name) &&
        namesProperty(path.node, OLD_NAME) &&
        !isCalled(path)
      );
    })
    .forEach((path) => {
      flag(path.node, `"${OLD_NAME}" is read from the namespace other than by a direct call; \`!hitEnd(...)\` is its replacement, so rewrite it by hand`);
    });

  const destructuresOldName = (path, pattern, source) =>
    pattern.type === "ObjectPattern" &&
    source?.type === "Identifier" &&
    namespaceLocals.has(source.name) &&
    resolvesToImport(path, source.name) &&
    pattern.properties.some(
      (property) =>
        (property.key?.name ?? property.key?.value) === OLD_NAME
    );
  const flagDestructuring = (path) => {
    flag(path.node, `"${OLD_NAME}" is destructured from a namespace import; rewrite its uses by hand`);
  };

  root
    .find(j.VariableDeclarator)
    .filter((path) =>
      destructuresOldName(path, path.node.id, path.node.init)
    )
    .forEach(flagDestructuring);
  root
    .find(j.AssignmentExpression, { operator: "=" })
    .filter((path) =>
      destructuresOldName(path, path.node.left, path.node.right)
    )
    .forEach(flagDestructuring);

  root
    .find(j.ExportNamedDeclaration, { source: { value: PACKAGE } })
    .forEach((path) => {
      for (const specifier of path.node.specifiers) {
        if (specifier.local?.name === OLD_NAME) {
          flag(specifier, `"${OLD_NAME}" is re-exported; re-export \`hitEnd\` and update importers by hand`);
        } else if (specifier.type === "ExportNamespaceSpecifier") {
          flag(specifier, `\`export * as\` no longer exposes "${OLD_NAME}"; update importers by hand`);
        }
      }
    });

  root
    .find(j.ExportAllDeclaration, { source: { value: PACKAGE } })
    .forEach((path) => {
      flag(path.node, `\`export *\` no longer re-exports "${OLD_NAME}"; re-export \`hitEnd\` and update importers by hand`);
    });

  for (const specifier of handledSpecifiers) {
    if (existingHitEnd) {
      const declaration = importPaths
        .filter((path) => path.node.specifiers.includes(specifier))
        .paths()[0];
      declaration.node.specifiers = declaration.node.specifiers.filter(
        (candidate) => candidate !== specifier
      );
      if (declaration.node.specifiers.length === 0) declaration.prune();
    } else if (specifier.local.name === OLD_NAME) {
      specifier.imported = j.identifier(NEW_NAME);
      specifier.local = j.identifier(NEW_NAME);
    } else {
      specifier.imported = j.identifier(NEW_NAME);
      flag(
        specifier,
        `"${specifier.local.name}" is now \`hitEnd\`, the opposite of what it meant; rename the alias to match`
      );
    }
    changed = true;
  }

  const mentionsOldName =
    root.find(j.Identifier, { name: OLD_NAME }).size() > 0 ||
    root
      .find(j.MemberExpression)
      .filter((path) => path.node.computed && namesProperty(path.node, OLD_NAME))
      .size() > 0;
  if (mentionsOldName) {
    root
      .find(j.CallExpression)
      .filter((path) => {
        const { callee, arguments: args } = path.node;
        const loadsPackage = args[0]?.value === PACKAGE;
        return (
          loadsPackage &&
          ((callee.type === "Identifier" && callee.name === "require") ||
            callee.type === "Import")
        );
      })
      .forEach((path) => {
        flag(path.node, `"${OLD_NAME}" is loaded without a static import; migrate it by hand`);
      });
    root.find(j.ImportExpression).forEach((path) => {
      if (path.node.source.value === PACKAGE) {
        flag(path.node, `"${OLD_NAME}" is loaded without a static import; migrate it by hand`);
      }
    });
  }

  return changed ? root.toSource() : null;
}

export const parser = "tsx";
