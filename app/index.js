const { h } = require("preact");
const { Provider } = require("preact-redux");
const { applyMiddleware, compose } = require("redux");
const { createStore } = require("../index");
const thunk = require("redux-thunk");

const App = require("./app");

const { reducer: session } = require("./state/session");
const logger = require("./state/logger");

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  { session, logger },
  composeEnhancers(applyMiddleware(thunk.default))
);

const AppContainer = () => h(Provider, { store }, h(App));

module.exports = AppContainer;
