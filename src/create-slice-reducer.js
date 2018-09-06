function createSliceReducer(reducerFunctions, initialState) {
  return function reducer(state = initialState, actionMeta) {
    if (state === null) {
      return initialState;
    }
    if (!(actionMeta && reducerFunctions[actionMeta.type])) {
      return state;
    }
    return reducerFunctions[actionMeta.type](state, actionMeta);
  };
}

module.exports = createSliceReducer;
