const { h } = require("preact");
const { Provider } = require("preact-redux");
const { applyMiddleware, compose } = require("redux");
const { createLazyStore } = require("../../src/index");
const thunk = require("redux-thunk");

const App = require("./app");

const initialState = require("./state/initial-state");

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

module.exports = { AppContainer, store };
