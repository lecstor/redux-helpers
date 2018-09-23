import * as React from "react";
import { render } from "react-testing-library";

import AppContainer from "../test/app";

describe("App", () => {
  test("AppContainer renders", () => {
    const context = render(React.createElement(AppContainer, {}, null));
    expect(context.getByText("Hello")).toBeTruthy();

    return Promise.resolve().then(() =>
      expect(context.getByText("Hello Fred")).toBeTruthy()
    );
  });
});
