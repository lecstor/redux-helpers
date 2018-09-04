const { actions } = require("./actions");

describe("actions", () => {
  test("setUser", () => {
    expect(actions.setUser({ id: "abc123" })).toEqual({
      type: "app/session/setUser",
      payload: { id: "abc123" }
    });
  });

  test("logIn", () => {
    const dispatch = jest.fn();
    const logIn = actions.logIn();
    return logIn(dispatch).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: "app/session/setUser",
        payload: { id: "abc123", firstname: "Fred" }
      });
    });
  });
});
