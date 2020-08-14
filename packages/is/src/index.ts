import { IsArray, IsString, IsNumber, IsObject, IsFunction } from "../types";

const toString = Object.prototype.toString;

export const isArray: IsArray = <T = any>(target: unknown): target is T[] =>
  Array.isArray
    ? Array.isArray(target)
    : toString.call(target) === "[object Array]";

export const isString: IsString = (target): target is string =>
  typeof target === "string";

export const isNumber: IsNumber = (target): target is number =>
  typeof target === "number" && !isNaN(target);

export const isObject: IsObject = (target): target is object =>
  toString.call(target) === "[object Object]";

export const isFunction: IsFunction = (target): target is object =>
  typeof target === "function";
