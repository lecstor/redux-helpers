import createLazyReducer from "../src/create-lazy-reducer";

import * as reducerFns from "../test/app/state/session/reducer";

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
