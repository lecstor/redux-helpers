const { reducerRegistry } = require("./reducer-registry");
const { getReducerAndActionTypes } = require("./create-reducer");

function createLazyReducer(name, fns, initialState) {
  const { actionTypes, reducer } = getReducerAndActionTypes(
    name,
    fns,
    initialState
  );

  reducerRegistry.register(name, reducer);

  return { reducer, ...actionTypes };
}

module.exports = { createLazyReducer };
