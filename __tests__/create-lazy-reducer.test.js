const createLazyReducer = require("../src/create-lazy-reducer");

const reducerFns = {
  setUser(state, { payload: user }) {
    return {
      ...state,
      user
    };
  }
};

describe("createLazyReducer", () => {
  test("create reducer", () => {
    const reducer = createLazyReducer("session", reducerFns, {
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
