export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      const baseCtorName = Object.getOwnPropertyDescriptor(
        baseCtor.prototype,
        name
      );
      if (!baseCtorName) {
        return;
      }
      Object.defineProperty(derivedCtor.prototype, name, baseCtorName);
    });
  });
}

export function buildPath(...args: string[]) {
  return args
    .map((part, i) => {
      if (i === 0) {
        return part.trim().replace(/[\/]*$/g, "");
      } else {
        return part.trim().replace(/(^[\/]*|[\/]*$)/g, "");
      }
    })
    .filter((x) => x.length)
    .join("/");
}
