interface Configuration {
  modelName: string;
}

const configuration = {
  modelName: "tsModel",
};
export const config = (option: Partial<Configuration>) => {
  Object.assign(configuration, option);
};
export default configuration;
