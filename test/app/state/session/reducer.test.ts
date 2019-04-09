import { setUser } from "./reducer";

describe("reducer", () => {
  test("setUser", () => {
    expect(
      setUser(
        { user: undefined },
        { type: "setUser", payload: { id: "abc123", firstname: "Bob" } }
      )
    ).toEqual({
      user: { id: "abc123", firstname: "Bob" }
    });
  });
});
