import { isValideJson, isNull, isArray, isObject } from "@battles/is";
import { formatJson, firstToUpper } from "../utils";

export interface TransferOptions {
  modelName: string;
}

interface TsModel {
  name: string; // 参数名
  prevName?: string;
  type: string;
  subType?: string;
  typeList?: TsModel[]; // 类属性列表
}

const defaultOption: TransferOptions = {
  modelName: "tsModel",
};

const getResultHeader = (name: string) =>
  `/* ${name} */\nexport interface ${name}{\n`;

export default class Transfer {
  private options: TransferOptions;
  private jsonStr: string;
  constructor(jsonStr: string, options?: Partial<TransferOptions>) {
    if (isValideJson(jsonStr)) {
      this.jsonStr = formatJson(jsonStr);
      this.options = Object.assign(defaultOption, options || {});
    } else {
      throw new Error("Invalid jsonStr");
    }
  }

  parse(): string {
    const { modelName } = this.options;
    const jsonObj = JSON.parse(this.jsonStr);
    const typeList = this.getTypeList(jsonObj, modelName);
    return this.getTsModels(typeList, modelName);
  }

  getTypeList(obj: unknown, modelName: string): TsModel[] {
    const modelList: TsModel[] = [];

    if (isArray<any>(obj)) {
      modelList.push({
        name: modelName,
        type: "array",
        typeList: obj.length > 0 ? this.getTypeList(obj[0], modelName) : [],
      });
    } else if (isNull(obj)) {
      modelList.push({
        name: modelName,
        type: "null",
      });
    } else if (isObject(obj)) {
      const target: { [key: string]: any } = obj;

      const typeList: TsModel[] = [];
      Object.keys(target).forEach((key) => {
        this.getTypeList(target[key], key).forEach((model) =>
          typeList.push(model)
        );
      });
      modelList.push({
        name: modelName,
        type: "tsType",
        typeList,
      });
    } else {
      modelList.push({
        name: modelName,
        type: typeof obj,
      });
    }
    return modelList;
  }

  getTsModels(typeList: TsModel[], modelName: string): string {
    const queque: any[] = [];
    const findTsModel = (typeList: TsModel[], prevName?: string): void => {
      typeList.forEach((model) => {
        if (model.typeList) {
          findTsModel(
            model.typeList,
            model.type === "array"
              ? prevName
              : prevName
              ? prevName + firstToUpper(model.name)
              : model.name
          );
        }
        if (model.type === "tsType") {
          prevName && (model.prevName = prevName);
          queque.push(model);
        }
      });
    };
    findTsModel(typeList);
    return queque
      .map((model) => {
        const { name, prevName, type, typeList = [] } = model;
        const camelName = prevName
          ? firstToUpper(prevName) + firstToUpper(name)
          : firstToUpper(name);
        let codeStr = getResultHeader(camelName);
        typeList.forEach((type: TsModel) => {
          if (type.type === "array") {
            codeStr += `  ${type.name}?: ${
              firstToUpper(camelName) + firstToUpper(type.name)
            }[]\n`;
            // console.log(type, name,camelName,codeStr);
          } else if (type.type === "tsType") {
            codeStr += `  ${type.name}?: ${
              firstToUpper(type.prevName || "") + firstToUpper(type.name)
            }\n`;
          } else {
            codeStr += `  ${type.name}?: ${type.type}\n`;
          }
        });
        codeStr += "}\n\n";
        return codeStr;
      })
      .join("");
  }
}
