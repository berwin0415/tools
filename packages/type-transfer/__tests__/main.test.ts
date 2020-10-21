import transfer from "../src";
import * as data from "./data";

describe("main test", () => {
  test("test1: level2", () => {
    expect(transfer(data.transferJson_1)).toEqual(data.transferType_1);
  });
  test("test2: level3 ", () => {
    expect(transfer(data.transferJson_2)).toEqual(data.transferType_2);
  });
});
