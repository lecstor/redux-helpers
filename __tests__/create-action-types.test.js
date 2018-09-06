const createActionTypes = require("../src/create-action-types");

const reducerFns = {
  setUser(state, { payload: user }) {
    return {
      ...state,
      user
    };
  }
};

describe("createActionTypes", () => {
  test("create action types", () => {
    const actionTypes = createActionTypes("session", reducerFns);
    expect(actionTypes.SET_USER).toEqual("app/session/setUser");
  });
});
