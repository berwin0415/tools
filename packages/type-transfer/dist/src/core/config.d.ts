interface Configuration {
    modelName: string;
}
declare const defaultConfig: {
    modelName: string;
};
export declare const config: (option: Partial<Configuration>) => void;
export default defaultConfig;
