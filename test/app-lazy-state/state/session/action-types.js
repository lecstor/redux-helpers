const { createActionTypes } = require("../../../src");

const fns = require("./reducer");

module.exports = createActionTypes("session", fns);
