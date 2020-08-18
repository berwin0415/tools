const toString = Object.prototype.toString;

export const isArray = <T = any>(target: unknown): target is T[] =>
  Array.isArray
    ? Array.isArray(target)
    : toString.call(target) === "[object Array]";

export const isString = (target: unknown): target is string =>
  typeof target === "string";

export const isNumber = (target: unknown): target is number =>
  typeof target === "number" && !Number.isNaN(target);

export const isObject = (target: unknown): target is object =>
  toString.call(target) === "[object Object]";

export const isFunction = (target: unknown): target is object =>
  typeof target === "function";
