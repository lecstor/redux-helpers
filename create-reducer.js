const { actionTypeCreator } = require("./action-type-creator");
const { createSliceReducer } = require("./create-slice-reducer");
const { fnNameToActionName } = require("./fn-name-to-action-name");

function getReducerAndActionTypes(name, fns, initialState) {
  const createActionType = actionTypeCreator(name);
  const actionTypes = {};
  const reducers = {};
  for (const fnName in fns) {
    const actionType = createActionType(fnName); // "app/session/setUser"
    const actionName = fnNameToActionName(fnName); // "SET_USER"
    actionTypes[actionName] = actionType;
    reducers[actionType] = fns[fnName];
  }
  const reducer = createSliceReducer(reducers, initialState);
  return { actionTypes, reducer };
}

function createReducer(name, fns, initialState) {
  const { actionTypes, reducer } = getReducerAndActionTypes(
    name,
    fns,
    initialState
  );
  return { reducer, ...actionTypes };
}

module.exports = { createReducer, getReducerAndActionTypes };
