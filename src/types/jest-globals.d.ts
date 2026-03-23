declare global {
  // jest is injected as a global by the Jest runtime.
  // @types/jest v29 only declares the namespace (types), not the var (value),
  // so we declare it here to avoid ts(2708).
  // eslint-disable-next-line no-var
  var jest: typeof import('@jest/globals').jest;
}
export {};
