const { createLazyReducer } = require("../../../");

const actions = require("./actions");
const initialState = require("./initial-state");
const fns = require("./reducer");
const selectors = require("./selectors");

const reducer = createLazyReducer("products", fns, initialState);

module.exports = { ...actions, reducer, selectors };
