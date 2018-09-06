const createReducer = require("../src/create-reducer");

const reducerFns = {
  setUser(state, { payload: user }) {
    return {
      ...state,
      user
    };
  }
};

describe("createReducer", () => {
  test("create reducer", () => {
    const reducer = createReducer("session", reducerFns, {
      id: "abc123"
    });
    expect(reducer).toBeInstanceOf(Function);
    expect(
      reducer(
        {},
        { type: "app/session/setUser", payload: { id: "testSetUser" } }
      )
    ).toEqual({
      user: { id: "testSetUser" }
    });
  });
});
