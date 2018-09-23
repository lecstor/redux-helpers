import { Dispatch } from "redux";

import { createActionCreators } from "../../../../src";

import * as fns from "./reducer";

const actions = createActionCreators("session", fns);

actions.logIn = () => (dispatch: Dispatch) => {
  return Promise.resolve({ id: "abc123", firstname: "Fred" }).then(user =>
    dispatch(actions.setUser(user))
  );
};

export default actions;
