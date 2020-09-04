import Transfer, { TransferOptions } from "./core/index";
const create = (jsonStr: string, options?: TransferOptions) => {
  const transfer = new Transfer(jsonStr, options);
  return transfer.parse();
};
export default create;
