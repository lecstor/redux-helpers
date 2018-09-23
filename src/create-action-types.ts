import actionTypeCreator from "./action-type-creator";
import fnNameToActionName from "./fn-name-to-action-name";

import { ActionTypes, ReducerFns } from "./types";

function createActionTypes(name: string, fns: ReducerFns) {
  const createActionType = actionTypeCreator(name);
  const actionTypes: ActionTypes = {};
  for (const fnName in fns) {
    if (fns[fnName] instanceof Function) {
      const actionType = createActionType(fnName); // "app/session/setUser"
      const actionName = fnNameToActionName(fnName); // "SET_USER"
      actionTypes[actionName] = actionType;
    }
  }
  return actionTypes;
}

export default createActionTypes;
