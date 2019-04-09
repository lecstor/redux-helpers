import {
  combineReducers,
  createStore as reduxCreateStore,
  StoreEnhancer
} from "redux";

import reducerRegistry from "./reducer-registry";
import { Reducers } from "./types";

// Preserve initial state for not-yet-loaded reducers
const combine = <State>(reducers: Reducers, initialState: State) => {
  const reducerNames = Object.keys(reducers);
  Object.keys(initialState).forEach(item => {
    if (reducerNames.indexOf(item) === -1) {
      reducers[item] = (state = initialState[item as keyof State]) =>
        state || null;
    }
  });
  return combineReducers(reducers);
};

/**
 * returns a store which uses reducerRegistry as it's reducer source
 *
 * @param {Object} state initial state containing at least the top-level state slices
 * @param {Object} enhancers
 *
 * @example
 * import * as React from "react";
 * import { Provider } from "react-redux";
 * import { applyMiddleware } from "redux";
 * import { composeWithDevTools } from "redux-devtools-extension";
 *
 * import { createLazyStore } from "@lecstor/redux-helpers"
 * import thunk from "redux-thunk";
 *
 * import App from "./app";
 * import initialState from "./state/initial-state";
 * import "./state/session";
 *
 * const store = createLazyStore(
 *   initialState,
 *   composeWithDevTools(applyMiddleware(thunk))
 * );
 *
 * export default () => (
 *   <Provider store={store}>
 *     <App />
 *   </Provider>
 * );
 */
function createLazyStore<State>(
  initialState: State,
  enhancers?: StoreEnhancer
) {
  const reducer = combine<State>(reducerRegistry.getReducers(), initialState);
  const store = reduxCreateStore(reducer, initialState, enhancers);

  // Replace the store's reducer whenever a new reducer is registered.
  reducerRegistry.setChangeListener(reducers => {
    store.replaceReducer(combine(reducers, initialState));
  });

  return store;
}

export default createLazyStore;
