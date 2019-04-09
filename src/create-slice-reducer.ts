import { Action } from "redux";

import { Reducers } from "./types";

function createSliceReducer<State>(
  reducerFunctions: Reducers,
  initialState: State
) {
  return function reducer(state: State = initialState, action: Action) {
    if (!(action && reducerFunctions[action.type])) {
      return state;
    }
    return reducerFunctions[action.type](state, action);
  };
}

export default createSliceReducer;
