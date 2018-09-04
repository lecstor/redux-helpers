const { createLazyReducer, createActionTypes } = require("../../../");

const actions = require("./actions");
const initialState = require("./initial-state");
const fns = require("./reducer");
const selectors = require("./selectors");

const reducer = createLazyReducer("session", fns, initialState);
const actionTypes = createActionTypes("session", fns);

module.exports = { ...actions, ...actionTypes, reducer, selectors };
