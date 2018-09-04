const { createActionCreators } = require("../../../");

const fns = require("./reducer");

const actions = createActionCreators("products", fns);

module.exports = { actions };
