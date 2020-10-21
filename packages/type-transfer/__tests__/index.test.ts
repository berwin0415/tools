import transfer from "../src";

describe("test1", () => {
  test("level2 ", () => {
    expect(transfer('{"a":[{"b":1,"c":"1"}],"a2":null}')).toEqual(
      `/* TsModelA */
export interface TsModelA{
  b?: number
  c?: string
}

/* TsModel */
export interface TsModel{
  a?: TsModelA[]
  a2?: null
}

`
    );
  });
  test("level3 ", () => {
    expect(transfer('{"a":[{"b":{"d":1},"c":"1"}],"a2":null}')).toEqual(
      `/* TsModelAB */
export interface TsModelAB{
  d?: number
}

/* TsModelA */
export interface TsModelA{
  b?: TsModelAB
  c?: string
}

/* TsModel */
export interface TsModel{
  a?: TsModelA[]
  a2?: null
}

`
    );
  });
});

describe("test2", () => {
  test("test2", () => {
    expect(transfer('{"a":{"b":1,"c":"1"},"a2":null}')).toEqual(
      `/* TsModelA */
export interface TsModelA{
  b?: number
  c?: string
}

/* TsModel */
export interface TsModel{
  a?: TsModelA
  a2?: null
}

`
    );
  });
});
