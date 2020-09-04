(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@battles/is')) :
  typeof define === 'function' && define.amd ? define(['@battles/is'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.is = factory(global.is));
}(this, (function (is) { 'use strict';

  var firstToUpper = function (str) {
      if (is.isString(str)) {
          return str.length > 1
              ? str[0].toUpperCase() + str.substring(1)
              : str.toUpperCase();
      }
      else {
          return "";
      }
  };
  var formatJson = function (str) {
      return JSON.stringify(JSON.parse(str), null, 4);
  };

  var defaultOption = {
      modelName: "tsModel",
  };
  var Transfer = /** @class */ (function () {
      function Transfer(jsonStr, options) {
          if (is.isValideJson(jsonStr)) {
              this.jsonStr = formatJson(jsonStr);
              this.options = Object.assign(defaultOption, options || {});
          }
          else {
              throw new Error("Invalid jsonStr");
          }
      }
      Transfer.prototype.parse = function () {
          var modelName = this.options.modelName;
          var jsonObj = JSON.parse(this.jsonStr);
          var typeList = this.getTypeList(jsonObj, modelName);
          // console.log(JSON.stringify(typeList));
          return this.getTsModels(typeList);
      };
      Transfer.prototype.getTypeList = function (obj, modelName) {
          var _this = this;
          var modelList = [];
          if (is.isArray(obj)) {
              modelList.push({
                  name: modelName,
                  type: "array",
                  typeList: obj.length > 0 ? this.getTypeList(obj[0], modelName) : [],
              });
          }
          else if (is.isNull(obj)) {
              modelList.push({
                  name: modelName,
                  type: "null",
              });
          }
          else if (is.isObject(obj)) {
              var target_1 = obj;
              var typeList_1 = [];
              Object.keys(target_1).forEach(function (key) {
                  _this.getTypeList(target_1[key], key).forEach(function (model) {
                      return typeList_1.push(model);
                  });
              });
              modelList.push({
                  name: modelName,
                  type: "tsType",
                  typeList: typeList_1,
              });
          }
          else {
              modelList.push({
                  name: modelName,
                  type: typeof obj,
              });
          }
          return modelList;
      };
      Transfer.prototype.getTsModels = function (typeList) {
          var queque = [];
          var findTsModel = function (typeList) {
              typeList.forEach(function (model) {
                  if (model.typeList) {
                      findTsModel(model.typeList);
                  }
                  if (model.type === "tsType") {
                      queque.push(model);
                  }
              });
          };
          findTsModel(typeList);
          return queque.map(function (model) {
              var name = model.name, type = model.type, _a = model.typeList, typeList = _a === void 0 ? [] : _a;
              var camelName = firstToUpper(name);
              var codeStr = "/* " + camelName + " */\n";
              codeStr += "export " + (type === "array"
                  ? "type = " + camelName + "[]\n"
                  : "interface " + camelName + "{\n");
              if (type === "array")
                  return codeStr;
              typeList.forEach(function (type) {
                  if (type.type === "array") {
                      codeStr += "  " + type.name + ": " + firstToUpper(type.name) + "[]\n";
                  }
                  else if (type.type === "tsType") {
                      codeStr += "  " + type.name + ": " + firstToUpper(type.name) + "\n";
                  }
                  else {
                      codeStr += "  " + type.name + ": " + type.type + "\n";
                  }
              });
              codeStr += "}\n";
              return codeStr;
          }).join('');
      };
      return Transfer;
  }());

  var create = function (jsonStr, options) {
      var transfer = new Transfer(jsonStr, options);
      return transfer.parse();
  };

  return create;

})));
