(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.is = {}));
}(this, (function (exports) { 'use strict';

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

  Object.defineProperty(exports, '__esModule', { value: true });

})));
