const { AppContainer, store } = require("../test/app-lazy-state");
const { render } = require("preact-render-spy");

describe("Lazy App", () => {
  test("Lazy AppContainer renders", () => {
    let context = render(AppContainer());

    expect(context.find("#child1").text()).toBe("Hello ");

    expect(store.getState()).toEqual({
      products: { collection: {} },
      session: { user: null }
    });

    process.nextTick(() => {
      context.rerender();

      expect(context.find("#child1").text()).toBe("Hello Fred");
      expect(context.find("#child2").text()).toBe("Product: Product One");

      expect(store.getState()).toEqual({
        products: { collection: { "1": { id: "1", name: "Product One" } } },
        session: { user: { firstname: "Fred", id: "abc123" } }
      });
    });
  });
});
