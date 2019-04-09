import createActionType from "../src/create-action-type";

describe("actionTypeCreator", () => {
  test("create action type creator", () => {
    const creator = createActionType("session");
    expect(creator).toBeInstanceOf(Function);
  });

  test("create action type", () => {
    const creator = createActionType("session");
    expect(creator("setUser")).toEqual("app/session/setUser");
  });
});
