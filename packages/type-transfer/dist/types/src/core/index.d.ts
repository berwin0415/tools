export interface TransferOptions {
    modelName: string;
}
interface TsModel {
    name: string;
    prevName?: string;
    type: string;
    subType?: string;
    typeList?: TsModel[];
}
export default class Transfer {
    private options;
    private jsonStr;
    constructor(jsonStr: string, options?: Partial<TransferOptions>);
    parse(): string;
    getTypeList(obj: unknown, modelName: string): TsModel[];
    getTsModels(typeList: TsModel[], modelName: string): string;
}
export {};
