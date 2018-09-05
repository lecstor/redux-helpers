function getFirstname(state) {
  return (state.session.user || {}).firstname;
}

module.exports = { getFirstname };
