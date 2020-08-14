export type IsArray = <T = any>(target: unknown) => target is T[];
export type IsString = (target: unknown) => target is string;
export type IsObject = (target: unknown) => target is object;
export declare type IsNumber = (target: unknown) => target is number;
