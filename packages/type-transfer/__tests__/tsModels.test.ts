import {
  createNodeTree,
  createModelList,
  generateTypeString,
} from "../src/core/tsModels";
import * as data from "./data";

describe("tsModels test", () => {
  test("createNodeTree", () => {
    expect(
      createNodeTree({
        message: null,
        data: {
          latestPhoneNum: "1",
          goodsList: [{ id: "12" }],
          userInfo: { id: "123" },
        },
      })
    ).toEqual({
      name: "tsModel",
      type: "tsModel",
      children: [
        {
          name: "message",
          type: "null",
          children: null,
        },
        {
          name: "data",
          type: "tsModel",
          children: [
            {
              name: "latestPhoneNum",
              type: "string",
              children: null,
            },
            {
              name: "goodsList",
              type: "array",
              children: [
                {
                  name: "goodsList0",
                  type: "tsModel",
                  children: [{ name: "id", type: "string", children: null }],
                },
              ],
            },
            {
              name: "userInfo",
              type: "tsModel",
              children: [
                {
                  name: "id",
                  type: "string",
                  children: null,
                },
              ],
            },
          ],
        },
      ],
    });
  });

  test("createModelList", () => {
    const nodeTree = createNodeTree({
      message: null,
      data: {
        latestPhoneNum: "1",
        goodsList: [{ createdBy: "12", goodsId: "132" }],
        couponList: [],
        energyNum: 0,
        carouselImageUrlList: [
          {
            imageUrl: "xxxxxx",
            imageSort: "1",
          },
          {
            imageUrl: "xxxxxx",
            imageSort: "2",
          },
        ],
      },
    });
    const typeList = createModelList(nodeTree);
    console.log(JSON.stringify(typeList));
    const str = generateTypeString(typeList);
    console.log(str);
  });
});

let a = [
  {
    name: "carouselImageUrlList1",
    type: "tsModel",
    path: ["tsModel", "data", "carouselImageUrlList"],
    typeList: [
      { name: "imageUrl", type: "string", children: null },
      { name: "imageSort", type: "string", children: null },
    ],
  },
  {
    name: "carouselImageUrlList0",
    type: "tsModel",
    path: ["tsModel", "data", "carouselImageUrlList"],
    typeList: [
      { name: "imageUrl", type: "string", children: null },
      { name: "imageSort", type: "string", children: null },
    ],
  },
  {
    name: "carouselImageUrlList",
    type: "array",
    path: ["tsModel", "data"],
    typeList: [
      { name: "imageUrl", type: "string", children: null },
      { name: "imageSort", type: "string", children: null },
    ],
  },
  {
    name: "couponList",
    type: "array",
    path: ["tsModel", "data"],
    typeList: [],
  },
  {
    name: "goodsList",
    type: "array",
    path: ["tsModel", "data"],
    typeList: [
      { name: "createdBy", type: "string", children: null },
      { name: "goodsId", type: "string", children: null },
    ],
  },
  {
    name: "data",
    type: "tsModel",
    path: ["tsModel"],
    typeList: [
      { name: "latestPhoneNum", type: "string", children: null },
      {
        name: "goodsList",
        type: "array",
        children: [
          {
            name: "goodsList0",
            type: "tsModel",
            children: [
              { name: "createdBy", type: "string", children: null },
              { name: "goodsId", type: "string", children: null },
            ],
          },
        ],
      },
      { name: "couponList", type: "array", children: [] },
      { name: "energyNum", type: "number", children: null },
      {
        name: "carouselImageUrlList",
        type: "array",
        children: [
          {
            name: "carouselImageUrlList0",
            type: "tsModel",
            children: [
              { name: "imageUrl", type: "string", children: null },
              { name: "imageSort", type: "string", children: null },
            ],
          },
          {
            name: "carouselImageUrlList1",
            type: "tsModel",
            children: [
              { name: "imageUrl", type: "string", children: null },
              { name: "imageSort", type: "string", children: null },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "tsModel",
    type: "tsModel",
    path: [],
    typeList: [
      { name: "message", type: "null", children: null },
      {
        name: "data",
        type: "tsModel",
        children: [
          { name: "latestPhoneNum", type: "string", children: null },
          {
            name: "goodsList",
            type: "array",
            children: [
              {
                name: "goodsList0",
                type: "tsModel",
                children: [
                  { name: "createdBy", type: "string", children: null },
                  { name: "goodsId", type: "string", children: null },
                ],
              },
            ],
          },
          { name: "couponList", type: "array", children: [] },
          { name: "energyNum", type: "number", children: null },
          {
            name: "carouselImageUrlList",
            type: "array",
            children: [
              {
                name: "carouselImageUrlList0",
                type: "tsModel",
                children: [
                  { name: "imageUrl", type: "string", children: null },
                  { name: "imageSort", type: "string", children: null },
                ],
              },
              {
                name: "carouselImageUrlList1",
                type: "tsModel",
                children: [
                  { name: "imageUrl", type: "string", children: null },
                  { name: "imageSort", type: "string", children: null },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
