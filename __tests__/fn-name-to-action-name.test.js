const { fnNameToActionName } = require("../fn-name-to-action-name");

describe("fnNameToActionName", () => {
  test("one word", () => {
    expect(fnNameToActionName("hello")).toEqual("HELLO");
  });

  test("two words", () => {
    expect(fnNameToActionName("helloWorld")).toEqual("HELLO_WORLD");
  });

  test("consecutive uppercase", () => {
    expect(fnNameToActionName("helloAWorld")).toEqual("HELLO_A_WORLD");
  });

  test("consecutive uppercase 2", () => {
    expect(fnNameToActionName("helloABWorld")).toEqual("HELLO_A_B_WORLD");
  });
});
