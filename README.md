# Just another redux boilerplate reducing helper module

Redux is good.

Reducers in all their variations often feel more complicated than they could be.

Writing actions creators that just pass through arguments to those reducers is boring.

Abstractions are evil. Necessary, but evil. I should be able to write the hard things myself, as I always have.

So we need to:

- simplify how we write reducers
- automatically generate action creators for those reducers
- be able to write more complex action creators
- be able to create secondary reducers that handle actions for logging and other things
- and I also want the option of lazy-loading reducers for my apps that use dynamic imports

I'm using old-school `require` and `module.exports` in the examples because they're
copied from the module source and I didn't want to have to set up Babel but `imports/exports`
will work fine too.

## Regular Redux Store

### app/state/session/reducer.js

Write reducer functions as plain old functions and export them.

Actions are FSA compatible in that they have a `type` and `payload`.

(and `error: true` if `payload` is an error)

```
function setUser(state, { payload: user }) {
  return { ...state, user };
}

export { setUser };
```

### app/state/session/actions.js

Create default action creators automatically then add the special ones manually.

```
const { createActionCreators } from "@lecstor/redux-helpers");

// import reducer functions
const fns from "./reducer");

// create action creators for reducers with the same names
const actions = createActionCreators("session", fns);

// add custom action creators
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

`actionTypes` will be `{ SET_USER: "app/session/setUser" }` and can be used for
"external" reducers, (eg for logging)

```
const { createReducer } from "@lecstor/redux-helpers");

const actions from "./actions");
const fns from "./reducer");
const selectors from "./selectors");

const initialState = {
  user: null
};

const reducer = createReducer("session", fns, initialState);

export { reducer, ...actions, ...selectors };
```

### app/index.js

```
const { h } from "preact");
const { Provider } from "preact-redux");
const { applyMiddleware, compose } from "redux");
const { createStore } from "@lecstor/redux-helpers");
const thunk from "redux-thunk");

const App from "./app");

// import our state slice reducers
const { reducer: session } from "./state/session");

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  { session },
  composeEnhancers(applyMiddleware(thunk.default))
);

const AppContainer = () => h(Provider, { store }, h(App));

module.exports = AppContainer;
```

### app/app.js

```
const { h, Component } from "preact");
const { connect } from "preact-redux");

const { logIn, getFirstname } from "./state/session");

const mapStateToProps = state => {
  return { firstname: getFirstname(state) };
};
const mapActionsToProps = { logIn };

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

module.exports = connected(App);
```

## Lazy-load Store Slices

`reducer.js`, `actions.js`, and `selectors.js` remain the same, we just do things
a bit differently when it comes to putting it all together.

### app-lazy/state/session/initial-state.js

Break out initial state so we can use it when creating the store without importing
the rest of the slice code.

```
const initialState = {
  user: null
};

export { initialState };
```

### app-lazy/state/session/index.js

The only change is to import the initial state rather than declaring it here.

```
const { createLazyReducer } from "@lecstor/redux-helpers");

const actions from "./actions");
const initialState from "./initial-state");
const fns from "./reducer");
const selectors from "./selectors");

const reducer = createLazyReducer("session", fns, initialState);

export { reducer, ...actions, ...selectors };
```

### app-lazy/state/initial-state.js

Import and Export initial state for **all** store slices

```
const session from "./session/initial-state");

export { session };
```

### app-lazy/index.js

```
const { h } from "preact");
const { Provider } from "preact-redux");
const { applyMiddleware, compose } from "redux");
const { createLazyStore } from "@lecstor/redux-helpers");
const thunk from "redux-thunk");

const App from "./app");

// initialise the store state with all slices initial states
const initialState from "./state/initial-state");

// import any slices we want loaded by default
require("./state/session");

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createLazyStore(
  initialState,
  composeEnhancers(applyMiddleware(thunk.default))
);

const AppContainer = () => h(Provider, { store }, h(App));

module.exports = AppContainer;
```
