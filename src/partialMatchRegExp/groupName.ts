import { NAMED_GROUP_OPENING } from "./atomSyntax.ts";

const UNICODE_ESCAPE_IN_NAME_REGEX = /\\u\{([0-9a-fA-F]+)\}|\\u([0-9a-fA-F]{4})/g;

export const groupNameOf = (namedGroupOpening: string): string =>
  namedGroupOpening.slice(NAMED_GROUP_OPENING.length, -1);

export function decodeGroupName(rawName: string): string {
  return rawName.replace(
    UNICODE_ESCAPE_IN_NAME_REGEX,
    (_whole, braced?: string, plain?: string) =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- one of braced or plain is guaranteed to be defined by the regex
      String.fromCodePoint(parseInt((braced ?? plain)!, 16))
  );
}
