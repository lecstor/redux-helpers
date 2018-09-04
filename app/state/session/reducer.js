function setUser(state, { payload: user }) {
  return {
    ...state,
    user
  };
}

module.exports = { setUser };
