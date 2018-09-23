import { render } from "react-testing-library";

import { AppContainer, store } from "../test/app-lazy-state";

describe("Lazy App", () => {
  test("Lazy AppContainer renders", () => {
    const context = render(AppContainer() as JSX.Element);

    expect(context.getByText("Hello")).toBeTruthy();

    expect(store.getState()).toEqual({
      products: { collection: {} },
      session: { user: null }
    });

    return Promise.resolve().then(() => {
      expect(context.getByText("Hello Fred")).toBeTruthy();
    });
  });
});
