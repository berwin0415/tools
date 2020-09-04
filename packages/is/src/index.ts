const toString = Object.prototype.toString;

export const isNull = (target: unknown): target is null => target === null;
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

export const isValideJson = (target: unknown): boolean => {
  if (isString(target)) {
    try {
      JSON.stringify(JSON.parse(target));
      return true;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};
