// const { h } = require("preact");
const AppContainer = require("../test/app");
const { render } = require("preact-render-spy");

describe("App", () => {
  test("AppContainer renders", () => {
    let context = render(AppContainer());
    expect(context.find("div").text()).toBe("Hello ");

    process.nextTick(() => {
      context.rerender();
      expect(context.find("div").text()).toBe("Hello Fred");
    });
  });
});
