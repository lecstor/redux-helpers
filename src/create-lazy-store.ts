import {
  combineReducers,
  createStore as reduxCreateStore,
  StoreEnhancer
} from "redux";

import reducerRegistry from "./reducer-registry";
import { InitialState, ReducersMapObject, StdAction } from "./types";

// Preserve initial state for not-yet-loaded reducers
const combine = (reducers: ReducersMapObject, initialState: InitialState) => {
  const reducerNames = Object.keys(reducers);
  Object.keys(initialState).forEach(item => {
    if (reducerNames.indexOf(item) === -1) {
      reducers[item] = (state = initialState[item]) => state || null;
    }
  });
  return combineReducers<any, StdAction>(reducers);
};

/**
 * returns a store which uses reducerRegistry as it's reducer source
 *
 * @param {Object} state initial state containing at least the top-level state slices
 * @param {Object} enhancers
 *
 * @example
 * import { applyMiddleware, compose } from "redux";
 * import { Provider } from "preact-redux";
 * import { createStore } from "@lecstor/redux-helpers"
 * import thunk from "redux-thunk";
 *
 * import "./state/session";
 *
 * const composeEnhancers =
 *   (typeof window !== "undefined" &&
 *     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
 *   compose;
 *
 * const store = createStore(
 *   { session: {} },
 *   composeEnhancers(applyMiddleware(thunk))
 * );
 *
 * export default () => (
 *   <Provider store={store}>
 *     <App />
 *   </Provider>
 * );
 */
function createLazyStore(
  initialState: InitialState,
  enhancers?: StoreEnhancer
) {
  const reducer = combine(reducerRegistry.getReducers(), initialState);
  const store = reduxCreateStore(reducer, initialState, enhancers);

  // Replace the store's reducer whenever a new reducer is registered.
  reducerRegistry.setChangeListener((reducers: ReducersMapObject) => {
    store.replaceReducer(combine(reducers, initialState) as any);
  });

  return store;
}

export default createLazyStore;
