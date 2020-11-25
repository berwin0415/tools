import { isArray, isObject } from "@battles/is";
import { firstToUpper } from "../utils";
import configuration from "./config";

interface ModelNode {
  name: string;
  type: string;
  children: ModelNode[] | null;
}

const createNode = (
  name: string,
  type: string,
  children: ModelNode[] | null = null
): ModelNode => {
  return {
    name,
    type,
    children,
  };
};

const resolveArrayType = (arr: ModelNode[]): ModelNode[] => {
  if (arr.length) {
    if (arr.every((ele) => ele.type === "tsModel")) {
      const temp = new Set();
      const typeList: ModelNode[] = [];
      arr.forEach((ele) => {
        ele.children?.forEach((item) => {
          if (!temp.has(item.name)) {
            temp.add(item.name);
            typeList.push(item);
          }
        });
      });
      return [{ name: "0", type: "tsModel", children: typeList }];
    }
    const arrWithoutName = arr.map((item) => ({ ...item, name: "" }));

    return arr;
  }
  return [];
};

export const createNodeTree = (
  target: unknown,
  name: string = configuration.modelName
): ModelNode => {
  if (isArray<unknown>(target)) {
    return createNode(
      name,
      "array",
      target.map((ele, i) => createNodeTree(ele, name + i))
    );
  } else if (isObject(target)) {
    const children: { [key: string]: unknown } = target as any;
    return createNode(
      name,
      "tsModel",
      Object.keys(children).map((key) => createNodeTree(children[key], key))
    );
  } else if (target === null) {
    return createNode(name, "null", null);
  } else {
    return createNode(name, typeof target, null);
  }
};

interface ModelQueueNode extends ModelNode {
  path: string[];
}

interface ModelListNode {
  name: string;
  type: string;
  path: string[];
  typeList: ModelNode[];
}
type ModelList = ModelListNode[];

export const createModelList = (tree: ModelNode) => {
  const list: ModelList = [];
  const root = { ...tree, path: [] };
  const queue: ModelQueueNode[] = [root];
  // console.log(JSON.stringify(queue))
  while (queue.length) {
    const node = queue.shift();
    // console.log(JSON.stringify(list, null, 4));
    if (node?.type === "tsModel") {
      node.children?.forEach((child) => {
        const path = [...node.path, node.name];
        queue.push({ ...child, path });
      });
      if (node.children) {
        list.unshift({
          name: node.name,
          type: node.type,
          path: node.path,
          typeList: node.children || [],
        });
      }
    } else if (node?.type === "array") {
      const arrayTypeList = resolveArrayType(node.children || []);

      if (arrayTypeList.length > 1) {
        node.children?.forEach((child) => {
          const path = [...node.path, node.name];
          queue.push({ ...child, path });
        });
      }
      if (node.children && node.children.length) {
        list.unshift({
          name: node.name,
          type: node.type,
          path: node.path,
          typeList:
            arrayTypeList.length === 1
              ? arrayTypeList[0].children || []
              : arrayTypeList,
        });
      }
    } else {
      node?.children?.forEach((child) => {
        const path = [...node.path, node.name];
        queue.push({ ...child, path });
      });
    }
  }
  return list;
};

const getResultHeader = (name: string): string =>
  `/* ${name} */\nexport interface ${name}{\n`;
const getResultBody = (node: ModelQueueNode): string => {
  let typeName = node.type;
  if (node.type === "tsModel" || node.type === "array") {
    typeName =
      node.path.map((path) => firstToUpper(path)).join("") +
      firstToUpper(node.name);
    if (node.type === "array") {
      typeName = node.children?.length ? typeName + "[]" : "[]";
    }
  }
  return `  ${node.name}?: ${typeName}\n`;
};
export const generateTypeString = (list: ModelList): string => {
  const types = list.map((item) => {
    const typeName =
      item.path.map((path) => firstToUpper(path)).join("") +
      firstToUpper(item.name);
    return (
      getResultHeader(typeName) +
      item.typeList
        .map((typeNode) =>
          getResultBody({ ...typeNode, path: [...item.path, item.name] })
        )
        .join("") +
      "}\n"
    );
  });
  return types.join("\n");
};
