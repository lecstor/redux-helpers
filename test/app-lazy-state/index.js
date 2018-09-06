import { h } from "preact";
import { Provider } from "preact-redux";
import { applyMiddleware, compose } from "redux";
import { createLazyStore } from "../../src/index";
import thunk from "redux-thunk";

import App from "./app";

import initialState from "./state/initial-state";

import "./state/session";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createLazyStore(
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

const AppContainer = () => h(Provider, { store }, h(App));

export { AppContainer, store };
