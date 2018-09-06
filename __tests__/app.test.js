import AppContainer from "../test/app";
import { render } from "preact-render-spy";

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
