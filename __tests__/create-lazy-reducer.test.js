const { createLazyReducer } = require("../create-lazy-reducer");

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
    const { reducer, ...actionTypes } = createLazyReducer(
      "session",
      reducerFns,
      {
        id: "abc123"
      }
    );
    expect(actionTypes.SET_USER).toEqual("app/session/setUser");
    expect(reducer).toBeInstanceOf(Function);
    expect(
      reducer(
        {},
        { type: actionTypes.SET_USER, payload: { id: "testSetUser" } }
      )
    ).toEqual({
      user: { id: "testSetUser" }
    });
  });
});
