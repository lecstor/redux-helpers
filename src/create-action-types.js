const actionTypeCreator = require("./action-type-creator");
const fnNameToActionName = require("./fn-name-to-action-name");

function createActionTypes(name, fns) {
  const createActionType = actionTypeCreator(name);
  const actionTypes = {};
  for (const fnName in fns) {
    const actionType = createActionType(fnName); // "app/session/setUser"
    const actionName = fnNameToActionName(fnName); // "SET_USER"
    actionTypes[actionName] = actionType;
  }
  return actionTypes;
}

module.exports = createActionTypes;
