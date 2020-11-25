import transfer from "../src";
import * as data from "./data";

describe("main test", () => {
  test("test1: level2", () => {
    expect(transfer(data.transferJson_1)).toEqual(data.transferType_1);
  });
  test("test2: level3 ", () => {
    expect(transfer(data.transferJson_2)).toEqual(data.transferType_2);
  });
  test("test3: level3 ", () => {
    expect(transfer(data.transferJson_3)).toEqual(data.transferType_3);
  });
  test("test4: level2 ", () => {
    expect(transfer(data.transferJson_4)).toEqual(data.transferType_4);
  });
  test("test5: empty object ", () => {
    expect(transfer(data.transferJson_5, "Eobj")).toEqual(data.transferType_5);
  });
});
