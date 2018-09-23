import actions from "./actions";

const { logIn, setUser } = actions;

describe("actions", () => {
  test("setUser", () => {
    expect(setUser({ id: "abc123" })).toEqual({
      payload: { id: "abc123" },
      type: "app/session/setUser"
    });
  });

  test("logIn", () => {
    const dispatch = jest.fn(() => Promise.resolve());
    return logIn()(dispatch).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({
        payload: { id: "abc123", firstname: "Fred" },
        type: "app/session/setUser"
      });
    });
  });
});
