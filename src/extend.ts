import createPartialMatchRegex from "./index.ts";

declare global {
  interface RegExp {
    toPartialMatchRegex(): RegExp;
  }
}

RegExp.prototype.toPartialMatchRegex = function () {
  return createPartialMatchRegex(this);
};
