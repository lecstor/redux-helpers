import * as React from "react";
import { Provider } from "react-redux";
import { AnyAction, applyMiddleware, compose } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";

import { createStore } from "../../src/index";

import { State } from "./state/types";

import App from "./app";

import { reducer as session } from "./state/session";

const composeEnhancers =
  (typeof window !== "undefined" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  { session },
  composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<State, AnyAction>))
);

const AppContainer = () =>
  React.createElement(Provider, { store }, React.createElement(App, {}));

export default AppContainer;
