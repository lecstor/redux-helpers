import { setUser } from "./reducer";

describe("reducer", () => {
  test("setUser", () => {
    expect(setUser({}, { payload: { id: "abc123" } })).toEqual({
      user: { id: "abc123" }
    });
  });
});
