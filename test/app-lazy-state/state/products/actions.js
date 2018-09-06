const { createActionCreators } = require("../../../../src");

const fns = require("./reducer");

module.exports = createActionCreators("products", fns);
