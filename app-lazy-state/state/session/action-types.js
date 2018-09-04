const { createActionTypes } = require("../../../");

const fns = require("./reducer");

module.exports = createActionTypes("session", fns);
