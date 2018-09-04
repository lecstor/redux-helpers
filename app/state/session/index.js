const { createReducer } = require("../../../");

const { actions } = require("./actions");
const fns = require("./reducer");
const selectors = require("./selectors");

const initialState = {
  user: null
};

const { reducer, ...actionTypes } = createReducer("session", fns, initialState);

module.exports = { actionTypes, actions, reducer, selectors };
