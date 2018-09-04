const createActionCreators = require("../create-action-creators");

const reducer = {
  setUser(state, { payload: user }) {
    return {
      ...state,
      user
    };
  }
};

describe("createActionCreators", () => {
  test("create action creator", () => {
    const actionCreators = createActionCreators("session", reducer);
    expect(actionCreators).toBeInstanceOf(Object);
    expect(actionCreators.setUser).toBeInstanceOf(Function);
    expect(actionCreators.setUser({ id: "abc123" })).toEqual({
      payload: { id: "abc123" },
      type: "app/session/setUser"
    });
  });
});
