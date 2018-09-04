const actionTypeCreator = require("./action-type-creator");

function createActionCreators(stateSliceName, fns) {
  const createActionName = actionTypeCreator(stateSliceName);
  const actions = {};
  for (const fnName in fns) {
    const aName = createActionName(fnName);
    actions[fnName] = payload => {
      if (payload instanceof Error) {
        return { type: aName, payload, error: true };
      }
      return { type: aName, payload };
    };
  }
  return actions;
}

module.exports = createActionCreators;
