const { createLazyReducer } = require("../../../");

const { actions } = require("./actions");
const initialState = require("./initial-state");
const fns = require("./reducer");
const selectors = require("./selectors");

const { reducer, ...actionTypes } = createLazyReducer(
  "session",
  fns,
  initialState
);

module.exports = { reducer, actionTypes, actions, selectors };
