# Just another redux boilerplate reducing helper module

Redux is good.

Reducers in all their variations often feel more complicated than they could be.

Writing actions creators that just pass through arguments to those reducers is
boring.

We still need to be able write the tricky bits without having to dig through
layers of abstraction.

Apps using dynamic imports should be able to load just the store slices they
need.

**Goals:**

- write reducers as a set of plain old functions
- automatically generate action creators for those reducer functions
- easily to add more complex (async) action creators
- easily create secondary reducers that handle actions belonging to other reducers
- have the option of lazy-loading reducers for apps that use dynamic imports

## Regular Redux Store

### app/state/index.ts

```ts
import { createActionCreator } from "../../../src";

type ActionType = string;
type ReducerFnName = string;
type Slice = string;

// customise action types
const actionTypeCreator = (slice: Slice) => (
  action: ReducerFnName
): ActionType => `${slice}/${action}`;

const createAction = (slice: Slice) =>
  createActionCreator(actionTypeCreator(slice));

export { actionTypeCreator, createAction };
```

### app/state/session/reducer.ts

Write reducer functions as plain functions and export them.

Actions are FSA compatible in that they have a `type` and `payload`. (and
`error: true` if `payload` is an error)

An action creator will be generated for each reducer function.

```
import { SliceState, User } from "./types";
import { Action } from "@lecstor/redux-helpers";

export type SetUser = Action<User>;

function setUser(state: SliceState, { payload: user }: SetUser): SliceState {
  return {
    ...state,
    user
  };
}

export { setUser };
```

### app/state/session/actions.ts

Create default action creators automatically then add more complex ones manually.

```
import { Dispatch } from "redux";

import { createAction } from "../index";

const action = createAction("session");

export const setUser = action<User>("setUser");

export const logIn = () => (dispatch: Dispatch) =>
  Promise.resolve({ id: "abc123", firstname: "Fred" }).then(user =>
    dispatch(setUser(user))
  );
```

### app/state/session/selectors.ts

Write selectors however you please.

```
function getFirstname(state) {
  return state.session.user.firstname;
}

export { getFirstname };
```

### app/state/session/index.js

Import reducer functions and wrap them into a reducer for the state slice.
Export all the things.

```
import { createReducer } from "@lecstor/redux-helpers";
import { actionTypeCreator } from "../index";

import * as actions from "./actions";
import * as fns from "./reducer";
import * as selectors from "./selectors";

import { SliceState } from "./types";

const initialState = {};

const reducer = createReducer<SliceState>(
  "session",
  fns,
  initialState,
  actionTypeCreator
);

export { actions, reducer, selectors };
```

### app/index.js

```
import * as React from "react";
import { Provider } from "react-redux";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { createStore } from "@lecstor/redux-helpers";
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

```

### app/app.js

```
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { actions, selectors } from "./state/session";
import { AppState, Dispatch } from "./state/types";

interface OwnProps {
  firstname?: string;
}

interface StateProps {
  firstname?: string;
}

// relies on currently unpublished version of redux-thunk
// https://github.com/reduxjs/redux-thunk/pull/224
// https://github.com/reduxjs/redux-thunk/commit/4bfa41ceb4281131ccbe9eeda87c07aeaf63b014
// https://github.com/reduxjs/redux-thunk/issues/213
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ logIn: actions.logIn }, dispatch);

// with a previous redux-thunk..
// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   logIn: () => actions.logIn()(dispatch),
//   setUser: user => dispatch(actions.setUser(user))
// });

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: AppState, ownProps: OwnProps) {
  return { firstname: selectors.getFirstname(state) || ownProps.firstname };
}

function App({ firstname, logIn }: Props) {
  return (
    <div>
      <div>Hello {firstname || ""}</div>
      <button onClick={() => logIn()}>Log In</button>
    </div>
  );
}

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(App);
```

## Lazy-load Store Slices

`reducer.js`, `actions.js`, `selectors.js`, and `app.js` remain the same, we
just do things a bit differently when it comes to putting it all together.

### app-lazy/state/session/initial-state.js

Break out initial state so we can use it when creating the store without
importing the rest of the slice code.

```
export default {
  user: null
};
```

### app-lazy/state/session/index.js

The only change is to import the initial state rather than declaring it here.

```
import { createLazyReducer } from "@lecstor/redux-helpers";

import actions from "./actions";
import initialState from "./initial-state";
import * as fns from "./reducer";
import * as selectors from "./selectors";

const reducer = createLazyReducer("session", fns, initialState);

export { actions, reducer, selectors };
```

### app-lazy/state/initial-state.js

Export initial state for **all** store slices for initialising the lazy store.

```
import session from "./session/initial-state";
import products from "./products/initial-state";

export default { session, products };
```

### app-lazy/index.js

Initialise the store state with initial state of all slices to keep Redux happy.

Import any slices we want loaded by default, they'll self-register with the
reducer-registry.

```
import * as React from "react";
import { Provider } from "react-redux";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { createLazyStore } from "@lecstor/redux-helpers";
import App from "./app";

import initialState from "./state/initial-state";

import "./state/session";

const store = createLazyStore(
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppContainer;
```

## API

### createActionCreator(slice: string | Function)

**slice**
- string: the key for the store property for this store slice
- function: takes a reducer name and returns an action type

**returns:**
```ts
function createAction<Payload>(reducerFnName: string)
```

eg

```
const createAction = createActionCreator("session");

const setUser = createAction<User>("setUser")
```

equivalent to:

```
const setUser = payload => {
  const type = "app/session/setUser";
  if (payload instanceof Error) {
    return { type, payload, error: true };
  }
  return { type, payload };
}
```

```
const createAction = createActionCreator(reducer => `my/session/${reducer}`);

const setUser = createAction<User>("setUser")
```

equivalent to:

```
const setUser = payload => {
  const type = "my/session/setUser";
  if (payload instanceof Error) {
    return { type, payload, error: true };
  }
  return { type, payload };
}
```

### createReducer(sliceName: string, reducerFunctions: Object, initialState: Object, actionTypeCreator?: Function)

**sliceName:** the key for the store property for this slice

**reducerFunctions**: the functions that make up the reducer for this slice

**initialState**: the initial state for this store slice

**actionTypeCreator?**: custom function to use to generate action types

**returns:** a reducer function

eg

```
const fns = {
  setUser(state, { payload }) {
    return { ...state, user: payload };
  }
};

const initialState = {
  user: null
}

createReducer(
  "session",
  fns,
  initialState,
  (slice: string) => (action: string): ActionType =>
    `my/${slice}/${action}`
);
```

returns:

```
const reducerObj = {
  "my/session/setUser": function(state, { payload }) {
    return { ...state, user: payload };
  }
}

return function reducer(state = initialState, action) {
  if (state === null) {
    return initialState;
  }
  if (!(action && reducerObj[action.type])) {
    return state;
  }
  return reducerObj[action.type](state, action);
};
```
