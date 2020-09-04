import { isValideJson, isNull, isArray, isObject } from "@battles/is";
import { formatJson, firstToUpper } from "../utils";

export interface TransferOptions {
  modelName: string;
}

interface TsModel {
  name: string; // 参数名
  type: string;
  typeList?: TsModel[]; // 类属性列表
}

const defaultOption: TransferOptions = {
  modelName: "tsModel",
};

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
    // console.log(JSON.stringify(typeList));
    return this.getTsModels(typeList);
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

  getTsModels(typeList: TsModel[]): string {
    const queque: any[] = [];
    const findTsModel = (typeList: TsModel[]): void => {
      typeList.forEach((model) => {
        if (model.typeList) {
          findTsModel(model.typeList);
        }
        if (model.type === "tsType") {
          queque.push(model);
        }
      });
    };
    findTsModel(typeList);
      return queque.map((model) => {
        const { name, type, typeList = [] } = model;
        const camelName = firstToUpper(name);
        let codeStr = `/* ${camelName} */\n`;
        codeStr += `export ${
          type === "array"
            ? `type = ${camelName}[]\n`
            : `interface ${camelName}{\n`
        }`;
        if (type === "array") return codeStr;
        typeList.forEach((type: any) => {
          if (type.type === "array") {
            codeStr += `  ${type.name}: ${firstToUpper(type.name)}[]\n`;
          } else if (type.type === "tsType") {
            codeStr += `  ${type.name}: ${firstToUpper(type.name)}\n`;
          } else {
            codeStr += `  ${type.name}: ${type.type}\n`;
          }
        });
        codeStr += "}\n";
        return codeStr;
      }).join('')
    
  }
}
