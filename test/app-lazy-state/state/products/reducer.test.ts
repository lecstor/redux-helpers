import { setProduct } from "./reducer";

describe("reducer", () => {
  test("setProduct", () => {
    expect(
      setProduct(
        { collection: {} },
        { payload: { id: "abc123", name: "Widget" } }
      )
    ).toEqual({
      collection: { abc123: { id: "abc123", name: "Widget" } }
    });
  });
});
