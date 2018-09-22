function createSliceReducer(reducerFunctions, initialState) {
  return function reducer(state = initialState, action) {
    if (state === null) {
      return initialState;
    }
    if (!(action && reducerFunctions[action.type])) {
      return state;
    }
    return reducerFunctions[action.type](state, action);
  };
}

export default createSliceReducer;
