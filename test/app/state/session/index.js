const { createReducer } = require("../../../../src");

const actions = require("./actions");
const fns = require("./reducer");
const selectors = require("./selectors");

const initialState = {
  user: null
};

const reducer = createReducer("session", fns, initialState);

module.exports = { ...actions, reducer, ...selectors };
