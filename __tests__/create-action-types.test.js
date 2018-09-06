import createActionTypes from "../src/create-action-types";
import * as fns from "../test/app/state/session/reducer";

describe("createActionTypes", () => {
  test("create action types", () => {
    const actionTypes = createActionTypes("session", fns);
    expect(actionTypes.SET_USER).toEqual("app/session/setUser");
    expect(Object.keys(actionTypes).length).toBe(1);
  });
});
