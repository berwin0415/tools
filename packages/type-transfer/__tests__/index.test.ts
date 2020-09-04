import transfer from "../src";

describe("test1", () => {
  test("test1 11", () => {
    expect(transfer('{"a":[{"b":1,"c":"1"}],"a2":null}')).toEqual(
      "/* A */\nexport interface A{\n  b: number\n  c: string\n}\n/* TsModel */\nexport interface TsModel{\n  a: A[]\n  a2: null\n}\n"
    );
  });
});

describe("test2", () => {
  test("test2", () => {
    expect(transfer('{"a":{"b":1,"c":"1"},"a2":null}')).toEqual(
      "/* A */\nexport interface A{\n  b: number\n  c: string\n}\n/* TsModel */\nexport interface TsModel{\n  a: A\n  a2: null\n}\n"
    );
  });
});
