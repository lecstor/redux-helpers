import {
  combineReducers,
  createStore as reduxCreateStore,
  ReducersMapObject,
  Store,
  StoreEnhancer
} from "redux";

/**
 * returns a store

```ts
import * as React from "react";
import { Provider } from "react-redux";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createStore } from "@lecstor/redux-helpers"

import { reducer as session } from "./state/session";
import { reducer as other } from "./state/other";

const reducers = { session, other };
const initialState = { session: {}, other: {} };

const store = createStore(
  reducers,
  initialState, // optional
  composeWithDevTools(applyMiddleware(thunk)) // optional
);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
```
 */
function createStore<AppState>(
  reducers: ReducersMapObject,
  state: AppState,
  enhancers?: StoreEnhancer
): Store;
function createStore<AppState>(
  reducers: ReducersMapObject,
  enhancers?: StoreEnhancer
): Store;

function createStore<AppState>(
  reducers: ReducersMapObject,
  state: AppState,
  enhancers?: StoreEnhancer
) {
  return reduxCreateStore(combineReducers(reducers), state, enhancers);
}

export default createStore;
