import createReducer from "./create-reducer";
import reducerRegistry from "./reducer-registry";

import { InitialState, ReducerFns } from "./types";

function createLazyReducer(
  name: string,
  fns: ReducerFns,
  initialState: InitialState
) {
  const reducer = createReducer(name, fns, initialState);
  reducerRegistry.register(name, reducer);
  return reducer;
}

export default createLazyReducer;
