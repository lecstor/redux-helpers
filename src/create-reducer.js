import actionTypeCreator from "./action-type-creator";
import createSliceReducer from "./create-slice-reducer";

export function packFns(name, fns) {
  const createActionType = actionTypeCreator(name);
  const reducers = {};
  for (const fnName in fns) {
    if (fns[fnName] instanceof Function) {
      // skip non-function keys such as Babel's `default` and `__esModule`
      const actionType = createActionType(fnName); // "app/session/setUser"
      reducers[actionType] = fns[fnName];
    }
  }
  return reducers;
}

function createReducer(name, fns, initialState) {
  return createSliceReducer(packFns(name, fns), initialState);
}

export default createReducer;
