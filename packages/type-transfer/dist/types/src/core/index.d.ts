export interface TransferOptions {
    modelName: string;
}
export default class Transfer {
    private jsonStr;
    constructor(jsonStr: string);
    parse(name?: string): string;
}
