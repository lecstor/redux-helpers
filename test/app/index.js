import { h } from "preact";
import { Provider } from "preact-redux";
import { applyMiddleware, compose } from "redux";
import { createStore } from "../../src/index";
import thunk from "redux-thunk";

import App from "./app";

import { reducer as session } from "./state/session";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  { session },
  composeEnhancers(applyMiddleware(thunk))
);

const AppContainer = () => h(Provider, { store }, h(App));

export default AppContainer;
