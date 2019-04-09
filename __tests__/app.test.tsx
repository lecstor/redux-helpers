import * as React from "react";
import { fireEvent, render, waitForElement } from "react-testing-library";

import AppContainer from "../test/app";

describe("App", () => {
  test("AppContainer renders", async () => {
    const { getByText } = render(<AppContainer />);
    expect(getByText("Hello")).toBeTruthy();
    fireEvent.click(getByText("Log In"));
    await waitForElement(() => getByText("Hello Fred"));
  });
});
