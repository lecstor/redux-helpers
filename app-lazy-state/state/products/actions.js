const { createActionCreators } = require("../../../");

const fns = require("./reducer");

module.exports = createActionCreators("products", fns);
