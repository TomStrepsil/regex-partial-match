function pickLonger(scanned?: string, matched?: string): string | undefined {
  return scanned !== undefined &&
    matched !== undefined &&
    scanned.length > matched.length
    ? scanned
    : undefined;
}

export function preferLongerCaptures(
  match: RegExpExecArray,
  scanned: RegExpExecArray
): void {
  for (let index = 1; index < match.length; index++) {
    const longer = pickLonger(scanned[index], match[index]);
    if (longer === undefined) continue;
    match[index] = longer;
    if (match.indices && scanned.indices?.[index]) {
      match.indices[index] = scanned.indices[index];
    }
  }

  if (match.groups && scanned.groups) {
    for (const name of Object.keys(match.groups)) {
      const longer = pickLonger(scanned.groups[name], match.groups[name]);
      if (longer === undefined) continue;
      match.groups[name] = longer;
      if (match.indices?.groups) {
        match.indices.groups[name] = scanned.indices?.groups?.[name];
      }
    }
  }
}
