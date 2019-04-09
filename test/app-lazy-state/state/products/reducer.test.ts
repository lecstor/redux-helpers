import { setProduct } from "./reducer";

describe("reducer", () => {
  test("setProduct", () => {
    expect(
      setProduct(
        { collection: {} },
        { type: "setProduct", payload: { id: "abc123", name: "Widget" } }
      )
    ).toEqual({
      collection: { abc123: { id: "abc123", name: "Widget" } }
    });
  });

  test("setProduct - no payload", () => {
    expect(setProduct({ collection: {} }, { type: "setProduct" })).toEqual({
      collection: {}
    });
  });
});
