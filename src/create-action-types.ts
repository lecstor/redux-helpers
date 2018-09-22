import actionTypeCreator from "./action-type-creator";
import fnNameToActionName from "./fn-name-to-action-name";

function createActionTypes(name, fns) {
  const createActionType = actionTypeCreator(name);
  const actionTypes = {};
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
