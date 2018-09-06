function getFirstname(state) {
  return (state.session.user || {}).firstname;
}

export { getFirstname };
