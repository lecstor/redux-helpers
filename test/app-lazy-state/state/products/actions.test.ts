import * as actions from "./actions";

describe("actions", () => {
  test("setProduct", () => {
    expect(actions.setProduct({ id: "abc123", name: "Product 1" })).toEqual({
      payload: { id: "abc123", name: "Product 1" },
      type: "app/products/setProduct"
    });
  });

  test("setProduct - no payload", () => {
    expect(actions.setProduct()).toEqual({
      type: "app/products/setProduct"
    });
  });
});
