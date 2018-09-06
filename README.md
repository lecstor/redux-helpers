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

### app/state/session/reducer.js

Write reducer functions as plain functions and export them.

Actions are FSA compatible in that they have a `type` and `payload`. (and
`error: true` if `payload` is an error)

An action creator will be generated for each reducer function.

```
function setUser(state, { payload: user }) {
  return { ...state, user };
}

export { setUser };
```

### app/state/session/actions.js

Create default action creators automatically then add more complex ones manually.

```
import { createActionCreators } from "@lecstor/redux-helpers";

import * as fns from "./reducer";

const actions = createActionCreators("session", fns);

actions.logIn = () => dispatch => {
  return Promise.resolve({ id: "abc123", firstname: "Fred" }).then(user =>
    dispatch(actions.setUser(user))
  );
};

export default actions;
```

### app/state/session/selectors.js

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

import actions from "./actions";
import * as fns from "./reducer";
import * as selectors from "./selectors";

const initialState = {
  user: null
};

const reducer = createReducer("session", fns, initialState);
const actionTypes = createActionTypes("session", fns);

export { actions, actionTypes, reducer, selectors };
```

### app/index.js

```
import { h } from "preact";
import { Provider } from "preact-redux";
import { applyMiddleware, compose } from "redux";
import { createStore } from "@lecstor/redux-helpers";
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
```

### app/app.js

```
import { h, Component } from "preact";
import { connect } from "preact-redux";

import { actions, selectors } from "./state/session";

const mapStateToProps = state => {
  return { firstname: selectors.getFirstname(state) };
};
const mapActionsToProps = { logIn: actions.logIn };

class App extends Component {
  componentDidMount() {
    this.props.logIn();
  }

  render({ firstname }) {
    return h("div", null, `Hello ${firstname || ""}`);
  }
}

const connected = connect(
  mapStateToProps,
  mapActionsToProps
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
import { createLazyReducer, createActionTypes } from "@lecstor/redux-helpers";

import actions from "./actions";
import initialState from "./initial-state";
import * as fns from "./reducer";
import * as selectors from "./selectors";

const reducer = createLazyReducer("session", fns, initialState);
const actionTypes = createActionTypes("session", fns);

export { actions, actionTypes, reducer, selectors };
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
import { h } from "preact";
import { Provider } from "preact-redux";
import { applyMiddleware, compose } from "redux";
import { createLazyStore } from "@lecstor/redux-helpers";
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
```

## API

### createActionCreators(sliceName: string, reducerFunctions: Object)

**sliceName:** the key for the store property for this store slice

**reducerFunctions**: the functions that make up the reducer for this store slice

**returns:** an Object of action creators

eg

```
const fns = {
  setUser(state, { payload }) {
    return { ...state, user: payload };
  }
};

createActionCreators("session", fns);
```

returns:

```
{
  setUser(user) {
    const type = "app/session/setUser";
    if (payload instanceof Error) {
      return { type, payload, error: true };
    }
    return { type, payload };
  }
}
```

### createReducer(sliceName: string, reducerFunctions: Object, initialState: Object)

**sliceName:** the key for the store property for this slice

**reducerFunctions**: the functions that make up the reducer for this slice

**initialState**: the initial state for this store slice

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

createReducer("session", fns, initialState);
```

returns:

```
const reducerObj = {
  "app/session/setUser": function(state, { payload }) {
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

### createActionTypes(sliceName: string, reducerFunctions: Object)

**sliceName:** the key for the store property for this store slice

**reducerFunctions**: the functions that make up the reducer for this store slice

**returns:** an Object of action creator types where the keys are
the function names converted to upper-snake-cased and the values are the full
action type strings.

eg

```
const fns = {
  setUser(state, { payload }) {
    return { ...state, user: payload };
  }
};

createActionTypes("session", fns);
```

returns:

```
{
  SET_USER: "app/session/setUser"
}
```
