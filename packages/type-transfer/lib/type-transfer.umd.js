(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.is = {}));
}(this, (function (exports) { 'use strict';

  const firstToUpper = (str) => {
    let result = str;
    if (result) {
      result = result[0].toUpperCase() + result.substring(1);
    }
    return result;
  };

  const formatJson = (str) => {
    try {
      const obj = JSON.parse(str);
      return JSON.stringify(obj, null, 4);
    } catch (error) {
      return "";
    }
  };

  const viewTs = (str) => {
    str = formatJson(str);
    const obj = JSON.parse(str);
    const tsModelList = [];
    let tsCode = "";
    const getTsClass = (obj, pname) => {
      const classStr = "";
      if (typeof obj === "object") {
        if (obj instanceof Array) {
          // 数组类型
          if (obj.length > 0) {
            getTsClass(obj[0], pname);
          }
        } else {
          // 非数组类型 处理属性
          const tsModel = {};
          tsModel.name = pname;
          tsModel.piList = [];
          for (const p in obj) {
            const pval = obj[p]; // 获取属性值
            const pi = {};
            pi.name = p;
            if (typeof pval === "object") {
              // 对象属性
              if (pval instanceof Array) {
                // 数组对象
                if (pval.length > 0) {
                  if (typeof pval[0] === "object") {
                    // 对象数组
                    pi.tsType = firstToUpper(p) + "[]";
                  } else {
                    // 普通数组
                    pi.tsType = typeof pval[0] + "[]";
                  }
                } else {
                  // 空数组
                  pi.tsType = "any";
                }
              } else {
                // 普通对象属性 以首字母大写属性名为类型
                pi.tsType = firstToUpper(p);
              }
              getTsClass(pval, firstToUpper(p));
            } else {
              // 普通属性
              pi.tsType = typeof pval;
            }
            tsModel.piList.push(pi);
          }
          tsModelList.push(tsModel);
        }
      }
      return classStr;
    };
    getTsClass(obj);
    if (tsModelList.length > 0) {
      tsModelList.forEach((tsModel, index) => {
        const className = tsModel.name
          ? tsModel.name
          : "tsModel" + index.toString();
        let codeStr = "/*" + className + "*/\n";
        codeStr += "export class " + className + " {" + "\n";
        tsModel.piList.forEach((pi) => {
          codeStr += "  " + pi.name + ": " + pi.tsType + ";\n";
        });
        codeStr += "}\n";
        tsCode += codeStr + "\n";
      });
    }
    return tsCode;
  };

  exports.default = viewTs;
  exports.viewTs = viewTs;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
