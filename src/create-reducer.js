import actionTypeCreator from "./action-type-creator";
import createSliceReducer from "./create-slice-reducer";

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

export default createReducer;
