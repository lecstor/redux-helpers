import createActionCreators from "../src/create-action-creators";

import * as reducerFns from "../test/app/state/session/reducer";

describe("createActionCreators", () => {
  test("create action creator", () => {
    const actionCreators = createActionCreators("session", reducerFns);
    expect(actionCreators).toBeInstanceOf(Object);
    expect(actionCreators.setUser).toBeInstanceOf(Function);
    expect(actionCreators.setUser({ id: "abc123" })).toEqual({
      payload: { id: "abc123" },
      type: "app/session/setUser"
    });
    expect(actionCreators.setUser(new Error("Boom"))).toEqual({
      error: true,
      payload: new Error("Boom"),
      type: "app/session/setUser"
    });
  });
});
