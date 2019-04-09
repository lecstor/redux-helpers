import * as React from "react";
import { Provider } from "react-redux";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { createStore } from "../../src/index";
import { AppState } from "./state/types";

import App from "./app";

import { reducer as session } from "./state/session";

const store = createStore<AppState>(
  { session },
  composeWithDevTools(applyMiddleware(thunk))
);

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppContainer;
