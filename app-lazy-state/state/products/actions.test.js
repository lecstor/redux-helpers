const { setProduct } = require("./actions");

describe("actions", () => {
  test("setProduct", () => {
    expect(setProduct({ id: "abc123" })).toEqual({
      type: "app/products/setProduct",
      payload: { id: "abc123" }
    });
  });
});
