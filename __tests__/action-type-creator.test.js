const { actionTypeCreator } = require("../action-type-creator");

describe("actionTypeCreator", () => {
  test("create action type creator", () => {
    const creator = actionTypeCreator("session");
    expect(creator).toBeInstanceOf(Function);
  });

  test("create action type", () => {
    const creator = actionTypeCreator("session");
    expect(creator("setUser")).toEqual("app/session/setUser");
  });
});
