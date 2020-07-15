export const noop = () => false;

export const compose = (...fns: Function[]) => (x: any) =>
  fns.reduceRight((v, f) => f(v), x);
