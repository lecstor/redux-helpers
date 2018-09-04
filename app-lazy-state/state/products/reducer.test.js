const { setProduct } = require("./reducer");

describe("reducer", () => {
  test("setProduct", () => {
    expect(setProduct({}, { payload: { id: "abc123" } })).toEqual({
      abc123: { id: "abc123" }
    });
  });
});
