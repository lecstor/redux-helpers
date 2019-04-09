import * as React from "react";
import { fireEvent, render, waitForElement } from "react-testing-library";

import AppContainer, { store } from "../test/app-lazy-state";

describe("Lazy App", () => {
  test("Lazy AppContainer renders", async () => {
    const { getByText } = render(<AppContainer />);

    expect(getByText("Hello")).toBeTruthy();

    expect(store.getState()).toEqual({
      products: { collection: {} },
      session: { user: null }
    });

    fireEvent.click(getByText("Log In"));

    await waitForElement(() => getByText("Hello Fred"));
    await waitForElement(() => getByText("Product: Product One"));

    expect(store.getState()).toEqual({
      products: {
        collection: {
          "1": {
            id: "1",
            name: "Product One"
          }
        }
      },
      session: {
        user: {
          firstname: "Fred",
          id: "abc123"
        }
      }
    });
  });
});
