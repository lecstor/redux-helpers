import reducerRegistry from "./reducer-registry";
import createReducer from "./create-reducer";

function createLazyReducer(name, fns, initialState) {
  const reducer = createReducer(name, fns, initialState);
  reducerRegistry.register(name, reducer);
  return reducer;
}

export default createLazyReducer;
