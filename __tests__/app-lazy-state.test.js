const { AppContainer, store } = require("../app-lazy-state");
const { render } = require("preact-render-spy");

describe("Lazy App", () => {
  test("Lazy AppContainer renders", () => {
    let context = render(AppContainer());

    expect(context.find("div").text()).toBe("Hello ");

    expect(store.getState()).toEqual({
      products: { collection: {} },
      session: { user: null }
    });

    process.nextTick(() => {
      context.rerender();
      expect(context.find("div").text()).toBe("Hello Fred");

      expect(store.getState()).toEqual({
        products: { collection: {} },
        session: { user: { firstname: "Fred", id: "abc123" } }
      });
    });
  });
});
