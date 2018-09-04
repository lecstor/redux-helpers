const { combineReducers, createStore: reduxCreateStore } = require("redux");

/**
 * returns a store
 *
 * @param {Object} reducers
 * @param {Object} state initial state containing at least the top-level state slices
 * @param {Object} enhancers
 *
 * @example
 * import { applyMiddleware, compose } from "redux";
 * import { Provider } from "preact-redux";
 * import { createStore } from "@lecstor/redux-helpers/create-store"
 * import thunk from "redux-thunk";
 *
 * import { reducer as session } from "./state/session";
 * import { reducer as other } from "./state/other";
 *
 * const reducers = { session, other };
 * const initialState = { session: {}, other: {} };
 *
 * const composeEnhancers =
 *   (typeof window !== "undefined" &&
 *     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
 *   compose;
 *
 * const store = createStore(
 *   reducers,
 *   initialState,
 *   composeEnhancers(applyMiddleware(thunk))
 * );
 *
 * export default () => (
 *   <Provider store={store}>
 *     <App />
 *   </Provider>
 * );
 */
function createStore(reducers, state, enhancers) {
  const reducer = combineReducers(reducers, state);
  const store = reduxCreateStore(reducer, state, enhancers);
  return store;
}

module.exports = { createStore };
