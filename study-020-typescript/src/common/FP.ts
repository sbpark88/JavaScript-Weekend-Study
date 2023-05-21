type Allowable = string | number | boolean | object

export const pipe = (...funcs: Function[]) => (initValue: Allowable) => funcs.reduce((acc, fn) => fn(acc), initValue)

export const curry = (fn: Function) => {
  return function curryFn(...args1: Allowable[]) {
    if (args1.length >= fn.length) {
      return fn(...args1)
    } else {
      return (...args2: Allowable[]) => {
        return curryFn(...args1, ...args2)
      };
    }
  };
};
