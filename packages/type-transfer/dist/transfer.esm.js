import { isString, isArray, isObject, isValideJson } from '@battles/is';

var firstToUpper = function (str) {
    if (isString(str)) {
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

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var configuration = {
    modelName: "tsModel",
};

var createNode = function (name, type, children) {
    if (children === void 0) { children = null; }
    return {
        name: name,
        type: type,
        children: children,
    };
};
var resolveArrayType = function (arr) {
    if (arr.length) {
        if (arr.every(function (ele) { return ele.type === "tsModel"; })) {
            var temp_1 = new Set();
            var typeList_1 = [];
            arr.forEach(function (ele) {
                var _a;
                (_a = ele.children) === null || _a === void 0 ? void 0 : _a.forEach(function (item) {
                    if (!temp_1.has(item.name)) {
                        temp_1.add(item.name);
                        typeList_1.push(item);
                    }
                });
            });
            return [{ name: "0", type: "tsModel", children: typeList_1 }];
        }
        var arrWithoutName = arr.map(function (item) { return (__assign(__assign({}, item), { name: "" })); });
        return arr;
    }
    return [];
};
var createNodeTree = function (target, name) {
    if (name === void 0) { name = configuration.modelName; }
    if (isArray(target)) {
        return createNode(name, "array", target.map(function (ele, i) { return createNodeTree(ele, name + i); }));
    }
    else if (isObject(target)) {
        var children_1 = target;
        return createNode(name, "tsModel", Object.keys(children_1).map(function (key) { return createNodeTree(children_1[key], key); }));
    }
    else if (target === null) {
        return createNode(name, "null", null);
    }
    else {
        return createNode(name, typeof target, null);
    }
};
var createModelList = function (tree) {
    var _a, _b, _c;
    var list = [];
    var root = __assign(__assign({}, tree), { path: [] });
    var queue = [root];
    var _loop_1 = function () {
        var node = queue.shift();
        console.log(list);
        if ((node === null || node === void 0 ? void 0 : node.type) === "tsModel") {
            (_a = node.children) === null || _a === void 0 ? void 0 : _a.forEach(function (child) {
                var path = __spreadArrays(node.path, [node.name]);
                queue.push(__assign(__assign({}, child), { path: path }));
            });
            if (node.children && node.children.length) {
                list.unshift({
                    name: node.name,
                    type: node.type,
                    path: node.path,
                    typeList: node.children || [],
                });
            }
        }
        else if ((node === null || node === void 0 ? void 0 : node.type) === "array") {
            var arrayTypeList = resolveArrayType(node.children || []);
            if (arrayTypeList.length > 1) {
                (_b = node.children) === null || _b === void 0 ? void 0 : _b.forEach(function (child) {
                    var path = __spreadArrays(node.path, [node.name]);
                    queue.push(__assign(__assign({}, child), { path: path }));
                });
            }
            if (node.children && node.children.length) {
                list.unshift({
                    name: node.name,
                    type: node.type,
                    path: node.path,
                    typeList: arrayTypeList.length === 1
                        ? arrayTypeList[0].children || []
                        : arrayTypeList,
                });
            }
        }
        else {
            (_c = node === null || node === void 0 ? void 0 : node.children) === null || _c === void 0 ? void 0 : _c.forEach(function (child) {
                var path = __spreadArrays(node.path, [node.name]);
                queue.push(__assign(__assign({}, child), { path: path }));
            });
        }
    };
    while (queue.length) {
        _loop_1();
    }
    return list;
};
var getResultHeader = function (name) {
    return "/* " + name + " */\nexport interface " + name + "{\n";
};
var getResultBody = function (node) {
    var _a;
    var typeName = node.type;
    if (node.type === "tsModel" || node.type === "array") {
        typeName =
            node.path.map(function (path) { return firstToUpper(path); }).join("") +
                firstToUpper(node.name);
        if (node.type === "array") {
            typeName = ((_a = node.children) === null || _a === void 0 ? void 0 : _a.length) ? typeName + "[]" : "[]";
        }
    }
    return "  " + node.name + "?: " + typeName + "\n";
};
var generateTypeString = function (list) {
    var types = list.map(function (item) {
        var typeName = item.path.map(function (path) { return firstToUpper(path); }).join("") +
            firstToUpper(item.name);
        return (getResultHeader(typeName) +
            item.typeList
                .map(function (typeNode) {
                return getResultBody(__assign(__assign({}, typeNode), { path: __spreadArrays(item.path, [item.name]) }));
            })
                .join("") +
            "}\n");
    });
    return types.join("\n");
};

var Transfer = /** @class */ (function () {
    function Transfer(jsonStr) {
        if (isValideJson(jsonStr)) {
            this.jsonStr = formatJson(jsonStr);
        }
        else {
            throw new Error("Invalid jsonStr");
        }
    }
    Transfer.prototype.parse = function (name) {
        var jsonObj = JSON.parse(this.jsonStr);
        var nodeTree = createNodeTree(jsonObj, name || configuration.modelName);
        var modelList = createModelList(nodeTree);
        var typeString = generateTypeString(modelList);
        return typeString;
    };
    return Transfer;
}());

var create = function (jsonStr, modelName) {
    var transfer = new Transfer(jsonStr);
    return transfer.parse(modelName);
};

export default create;
