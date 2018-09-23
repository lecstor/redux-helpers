import { InitialState, ReducersMapObject, StdAction } from "./types";

function createSliceReducer(
  reducerFunctions: ReducersMapObject,
  initialState: InitialState
) {
  return function reducer(state = initialState, action: StdAction) {
    if (!(action && reducerFunctions[action.type])) {
      return state;
    }
    return reducerFunctions[action.type](state, action);
  };
}

export default createSliceReducer;
