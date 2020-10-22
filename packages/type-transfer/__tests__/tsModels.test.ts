import { createNodeTree, createModelList ,generateTypeString} from "../src/core/tsModels";
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
        goodsList: [{ id: "12" }],
        userInfo: { id: "123" },
      },
    });
    const typeList = createModelList(nodeTree);
    const str = generateTypeString(typeList)
    console.log(str)
  });
});
