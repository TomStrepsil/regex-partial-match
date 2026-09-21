#!/usr/bin/env bash
# Prints the integrity hash of the npm package that <revision> would publish,
# counting only the package.json fields that affect consumers.
#
#   .github/scripts/published-package-integrity.sh <revision>
set -euo pipefail

source_directory=$(mktemp -d)
trap 'rm -rf "$source_directory"' EXIT

git archive "$1" | tar -x -C "$source_directory"
cd "$source_directory"

export COREPACK_ENABLE_DOWNLOAD_PROMPT=0
npm_flags=(--force --no-audit --no-fund --ignore-scripts)

npm ci "${npm_flags[@]}" >&2
npm run prepublishOnly --force >&2

jq '{name, type, main, module, types, exports, imports, bin, files, sideEffects,
     dependencies, peerDependencies, peerDependenciesMeta, optionalDependencies,
     bundleDependencies, engines, os, cpu} | with_entries(select(.value != null)) + {version: "0.0.0"}' \
  package.json > consumer-package.json
mv consumer-package.json package.json

npm pack --dry-run --json "${npm_flags[@]}" | jq -r '.[0].integrity'
