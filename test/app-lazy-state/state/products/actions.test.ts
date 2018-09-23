import actions from "./actions";

describe("actions", () => {
  test("setProduct", () => {
    expect(actions.setProduct({ id: "abc123" })).toEqual({
      payload: { id: "abc123" },
      type: "app/products/setProduct"
    });
  });
});
