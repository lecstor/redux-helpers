import actionTypeCreator from "./action-type-creator";

import { ActionCreators, ReducerFns } from "./types";

function createActionCreators(stateSliceName: string, fns: ReducerFns) {
  const createActionName = actionTypeCreator(stateSliceName);
  const actions: ActionCreators = {};
  for (const fnName in fns) {
    if (fns[fnName] instanceof Function) {
      const aName = createActionName(fnName);
      actions[fnName] = (payload: any) => {
        if (payload instanceof Error) {
          return { type: aName, payload, error: true };
        }
        return { type: aName, payload };
      };
    }
  }
  return actions;
}

export default createActionCreators;
