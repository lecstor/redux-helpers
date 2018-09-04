const actionTypeCreator = require("./action-type-creator");
const createSliceReducer = require("./create-slice-reducer");

function createReducer(name, fns, initialState) {
  const createActionType = actionTypeCreator(name);
  const reducers = {};
  for (const fnName in fns) {
    const actionType = createActionType(fnName); // "app/session/setUser"
    reducers[actionType] = fns[fnName];
  }
  const reducer = createSliceReducer(reducers, initialState);
  return reducer;
}

module.exports = createReducer;
