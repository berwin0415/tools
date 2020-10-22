export const transferJson_1 = JSON.stringify({
  a: [{ b: 1, c: "1" }],
  a2: null,
});

export const transferType_1 = `/* TsModelA */
export interface TsModelA{
  b?: number
  c?: string
}

/* TsModel */
export interface TsModel{
  a?: TsModelA[]
  a2?: null
}
`;

export const transferJson_2 = JSON.stringify({
  message: null,
  data: {
    latestPhoneNum: "1",
    goodsList: [{ id: "12" }],
    userInfo: { id: "123" },
  },
});

export const transferType_2 = `/* TsModelDataUserInfo */
export interface TsModelDataUserInfo{
  id?: string
}

/* TsModelDataGoodsList */
export interface TsModelDataGoodsList{
  id?: string
}

/* TsModelData */
export interface TsModelData{
  latestPhoneNum?: string
  goodsList?: TsModelDataGoodsList[]
  userInfo?: TsModelDataUserInfo
}

/* TsModel */
export interface TsModel{
  message?: null
  data?: TsModelData
}
`;
