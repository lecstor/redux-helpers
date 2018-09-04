const { createActionCreators } = require("../../../");

const fns = require("./reducer");

const actions = createActionCreators("session", fns);

actions.logIn = () => dispatch => {
  return Promise.resolve({ id: "abc123", firstname: "Fred" }).then(user =>
    dispatch(actions.setUser(user))
  );
};

module.exports = { actions };
