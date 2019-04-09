import * as actions from "./actions";

const { logIn, setUser } = actions;

describe("actions", () => {
  test("setUser", () => {
    expect(setUser({ id: "abc123", firstname: "Jason" })).toEqual({
      payload: { id: "abc123", firstname: "Jason" },
      type: "app/session/setUser"
    });
  });

  test("logIn", async () => {
    const dispatch = jest.fn(() => Promise.resolve()) as jest.Mock;
    await logIn()(dispatch);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: { id: "abc123", firstname: "Fred" },
      type: "app/session/setUser"
    });
  });
});
