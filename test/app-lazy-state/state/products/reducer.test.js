import { setProduct } from "./reducer";

describe("reducer", () => {
  test("setProduct", () => {
    expect(setProduct({}, { payload: { id: "abc123" } })).toEqual({
      collection: { abc123: { id: "abc123" } }
    });
  });
});
