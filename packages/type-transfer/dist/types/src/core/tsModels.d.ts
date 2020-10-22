interface ModelNode {
    name: string;
    type: string;
    children: ModelNode[] | null;
}
export declare const createNodeTree: (target: unknown, name?: string) => ModelNode;
interface ModelListNode {
    name: string;
    type: string;
    path: string[];
    typeList: ModelNode[];
}
declare type ModelList = ModelListNode[];
export declare const createModelList: (tree: ModelNode) => ModelList;
export declare const generateTypeString: (list: ModelList) => string;
export {};
