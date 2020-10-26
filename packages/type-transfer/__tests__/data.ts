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

export const transferJson_3 = JSON.stringify({
  message: null,
  data: {
    latestPhoneNum: "1",
    goodsList: [{ createdBy: "12", goodsId: "132" }],
    couponList: [],
    energyNum: 0,
    carouselImageUrlList: [
      {
        imageUrl: "xxxxxx",
        imageSort: '1',
      },
      {
        imageUrl: "xxxxxx",
        imageSort: '2',
      },
    ],
  },
});

export const transferType_3 = `/* TsModelDataCarouselImageUrlList */
export interface TsModelDataCarouselImageUrlList{
  imageUrl?: string
  imageSort?: string
}

/* TsModelDataGoodsList */
export interface TsModelDataGoodsList{
  createdBy?: string
  goodsId?: string
}

/* TsModelData */
export interface TsModelData{
  latestPhoneNum?: string
  goodsList?: TsModelDataGoodsList[]
  couponList?: []
  energyNum?: number
  carouselImageUrlList?: TsModelDataCarouselImageUrlList[]
}

/* TsModel */
export interface TsModel{
  message?: null
  data?: TsModelData
}
`;
