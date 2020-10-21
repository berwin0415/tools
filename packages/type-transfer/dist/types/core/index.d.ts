export interface TransferOptions {
    modelName: string;
}
interface TsModel {
    name: string;
    type: string;
    typeList?: TsModel[];
}
export default class Transfer {
    private options;
    private jsonStr;
    constructor(jsonStr: string, options?: Partial<TransferOptions>);
    parse(): string;
    getTypeList(obj: unknown, modelName: string, prevName?: string): TsModel[];
    getTsModels(typeList: TsModel[]): string;
}
export {};
