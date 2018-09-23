import actionTypeCreator from "./action-type-creator";
import createSliceReducer from "./create-slice-reducer";

import { InitialState, ReducerFns } from "./types";

export function packFns(name: string, fns: ReducerFns) {
  const createActionType = actionTypeCreator(name);
  const reducers: ReducerFns = {};
  for (const fnName in fns) {
    if (fns[fnName] instanceof Function) {
      // skip non-function keys such as Babel's `default` and `__esModule`
      const actionType = createActionType(fnName); // "app/session/setUser"
      reducers[actionType] = fns[fnName];
    }
  }
  return reducers;
}

function createReducer(
  name: string,
  fns: ReducerFns,
  initialState: InitialState
) {
  return createSliceReducer(packFns(name, fns), initialState);
}

export default createReducer;
