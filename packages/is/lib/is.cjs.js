'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var toString = Object.prototype.toString;
var isArray = function (target) {
    return Array.isArray
        ? Array.isArray(target)
        : toString.call(target) === "[object Array]";
};
var isString = function (target) {
    return typeof target === "string";
};
var isNumber = function (target) {
    return typeof target === "number" && !Number.isNaN(target);
};
var isObject = function (target) {
    return toString.call(target) === "[object Object]";
};
var isFunction = function (target) {
    return typeof target === "function";
};

exports.isArray = isArray;
exports.isFunction = isFunction;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isString = isString;
