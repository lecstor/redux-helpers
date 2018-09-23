import { setUser } from "./reducer";

describe("reducer", () => {
  test("setUser", () => {
    expect(setUser({ user: undefined }, { payload: { id: "abc123" } })).toEqual(
      {
        user: { id: "abc123" }
      }
    );
  });
});
