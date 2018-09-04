const { actions } = require("./actions");

describe("actions", () => {
  test("setProduct", () => {
    expect(actions.setProduct({ id: "abc123" })).toEqual({
      type: "app/products/setProduct",
      payload: { id: "abc123" }
    });
  });
});
