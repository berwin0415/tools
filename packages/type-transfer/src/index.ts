import Transfer from "./core/index";
const create = (jsonStr: string, modelName?: string) => {
  const transfer = new Transfer(jsonStr);
  return transfer.parse(modelName);
};
export default create;
