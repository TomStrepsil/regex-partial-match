declare const moduleBrand: unique symbol;

/**
 * A module for `withModules`, from `regex-partial-match/modules`. Opaque: its
 * contents are not part of the public API.
 */
export interface Module {
  readonly [moduleBrand]: true;
}
