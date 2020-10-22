import { isValideJson } from "@battles/is";
import { formatJson } from "../utils";
import {
  createModelList,
  createNodeTree,
  generateTypeString,
} from "./tsModels";
import configuration from "./config";

export interface TransferOptions {
  modelName: string;
}

export default class Transfer {
  private jsonStr: string;
  constructor(jsonStr: string) {
    if (isValideJson(jsonStr)) {
      this.jsonStr = formatJson(jsonStr);
    } else {
      throw new Error("Invalid jsonStr");
    }
  }

  parse(name?: string): string {
    const jsonObj = JSON.parse(this.jsonStr);
    const nodeTree = createNodeTree(jsonObj, name || configuration.modelName);
    const modelList = createModelList(nodeTree);
    const typeString = generateTypeString(modelList);
    return typeString;
  }
}
