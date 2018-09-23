import createReducer, { packFns } from "../src/create-reducer";
import * as fns from "../test/app/state/session/reducer";

describe("createReducer", () => {
  test("pack functions", () => {
    const packedFns = packFns("session", fns);
    expect(packedFns).toBeInstanceOf(Object);
    expect(packedFns["app/session/setUser"]).toBeInstanceOf(Function);
    expect(Object.keys(packedFns).length).toBe(1);
  });
  test("create reducer", () => {
    const reducer = createReducer("session", fns, {
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
