'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var toString = Object.prototype.toString;
var isNull = function (target) { return target === null; };
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
var isValideJson = function (target) {
    if (isString(target)) {
        try {
            JSON.stringify(JSON.parse(target));
            return true;
        }
        catch (error) {
            return false;
        }
    }
    else {
        return false;
    }
};

exports.isArray = isArray;
exports.isFunction = isFunction;
exports.isNull = isNull;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isString = isString;
exports.isValideJson = isValideJson;
