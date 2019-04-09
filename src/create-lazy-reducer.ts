import { Reducers } from "./types";

import createReducer from "./create-reducer";
import reducerRegistry from "./reducer-registry";

function createLazyReducer<State>(
  name: string,
  fns: Reducers,
  initialState: State
) {
  const reducer = createReducer<State>(name, fns, initialState);
  reducerRegistry.register(name, reducer);
  return reducer;
}

export default createLazyReducer;
