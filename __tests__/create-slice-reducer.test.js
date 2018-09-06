const createSliceReducer = require("../src/create-slice-reducer");

const reducerFns = {
  setUser(state, { payload: user }) {
    return {
      ...state,
      user
    };
  }
};

describe("createSliceReducer", () => {
  test("create slice reducer", () => {
    const reducer = createSliceReducer(reducerFns, { user: { id: "abc123" } });
    expect(reducer).toBeInstanceOf(Function);
    expect(
      reducer({}, { type: "setUser", payload: { id: "testSetUser" } })
    ).toEqual({ user: { id: "testSetUser" } });
    expect(
      reducer(null, { type: "setUser", payload: { id: "testSetUser" } })
    ).toEqual({ user: { id: "abc123" } });
  });
});
