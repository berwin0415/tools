'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = exports.isObject = exports.isNumber = exports.isString = exports.isArray = void 0;
var toString = Object.prototype.toString;
exports.isArray = function (target) {
    return Array.isArray
        ? Array.isArray(target)
        : toString.call(target) === "[object Array]";
};
exports.isString = function (target) {
    return typeof target === "string";
};
exports.isNumber = function (target) {
    return typeof target === "number" && !isNaN(target);
};
exports.isObject = function (target) {
    return toString.call(target) === "[object Object]";
};
exports.isFunction = function (target) {
    return typeof target === "function";
};
