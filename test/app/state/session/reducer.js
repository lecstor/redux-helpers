function setUser(state, { payload: user }) {
  return {
    ...state,
    user
  };
}

export { setUser };
