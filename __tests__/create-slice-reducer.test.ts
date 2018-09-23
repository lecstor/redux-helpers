import createSliceReducer from "../src/create-slice-reducer";

import * as reducerFns from "../test/app/state/session/reducer";

describe("createSliceReducer", () => {
  test("create slice reducer", () => {
    const reducer = createSliceReducer(reducerFns, { user: { id: "abc123" } });
    expect(reducer).toBeInstanceOf(Function);
  });
  test("call reducer with empty state", () => {
    const reducer = createSliceReducer(reducerFns, { user: { id: "abc123" } });
    expect(
      reducer({}, { type: "setUser", payload: { id: "testSetUser" } })
    ).toEqual({ user: { id: "testSetUser" } });
  });
  test("call reducer with undefined state", () => {
    const reducer = createSliceReducer(reducerFns, { user: { id: "abc123" } });
    expect(
      reducer(undefined, { type: "setUser", payload: { id: "testSetUser" } })
    ).toEqual({ user: { id: "testSetUser" } });
  });
});
