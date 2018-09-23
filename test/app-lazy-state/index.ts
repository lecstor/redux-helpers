import * as React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { createLazyStore } from "../../src/index";

import App from "./app";

import initialState from "./state/initial-state";
import "./state/session";

const composeEnhancers =
  (typeof window !== "undefined" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createLazyStore(
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

const AppContainer = () =>
  React.createElement(Provider, { store }, React.createElement(App, {}));

export { AppContainer, store };
