import {
  combineReducers,
  createStore as reduxCreateStore,
  Store,
  StoreEnhancer
} from "redux";
import { ReducersMapObject, State, StdAction } from "./types";

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
 * import { createStore } from "@lecstor/redux-helpers"
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
function createStore(
  reducers: ReducersMapObject,
  state: State,
  enhancers?: StoreEnhancer
) {
  const reducer = combineReducers<any, StdAction>(reducers);
  // const reducer = combineReducers(reducers);
  // const store: Store<any, StdAction> = reduxCreateStore(reducer, state, enhancers);
  const store: Store = reduxCreateStore(reducer, state, enhancers);
  return store;
}

export default createStore;
