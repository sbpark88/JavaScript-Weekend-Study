export const escapingClosure = (closure: Function, seconds: number = 0) => setTimeout(closure, seconds * 1_000)
