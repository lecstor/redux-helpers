import createActionType from "./create-action-type";
import createSliceReducer from "./create-slice-reducer";

import { Reducers } from "./types";

export function packFns(
  name: string,
  fns: Reducers,
  actionTypeCreator?: typeof createActionType
) {
  const actionType = actionTypeCreator
    ? actionTypeCreator(name)
    : createActionType(name);
  const reducers: Reducers = {};
  for (const fnName in fns) {
    if (fns[fnName] instanceof Function) {
      // skip non-function keys such as Babel's `default` and `__esModule`
      const action = actionType(fnName); // "app/session/setUser"
      reducers[action] = fns[fnName];
    }
  }
  return reducers;
}

function createReducer<State>(
  name: string,
  fns: Reducers,
  initialState: State,
  actionTypeCreator?: typeof createActionType
) {
  return createSliceReducer(
    packFns(name, fns, actionTypeCreator),
    initialState
  );
}

export default createReducer;
