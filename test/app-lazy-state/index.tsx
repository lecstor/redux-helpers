import * as React from "react";
import { Provider } from "react-redux";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { createLazyStore } from "../../src/index";

import App from "./app";

import initialState from "./state/initial-state";
import "./state/session";

const store = createLazyStore(
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppContainer;

export { store };
