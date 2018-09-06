const reducerRegistry = require("./reducer-registry");
const createReducer = require("./create-reducer");

function createLazyReducer(name, fns, initialState) {
  const reducer = createReducer(name, fns, initialState);
  reducerRegistry.register(name, reducer);
  return reducer;
}

module.exports = createLazyReducer;
