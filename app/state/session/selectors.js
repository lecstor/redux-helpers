function getSession(state) {
  return state.session || {};
}

function getUser(state) {
  return getSession(state).user || {};
}

function getFirstname(state) {
  return getUser(state).firstname;
}

module.exports = { getFirstname };
