import { Dispatch } from "redux";

import { createActionCreators } from "../../../../src";

import { User } from "./types";

import * as fns from "./reducer";

const actions = createActionCreators("session", fns);

actions.logIn = () => (dispatch: Dispatch) => {
  return Promise.resolve({ id: "abc123", firstname: "Fred" }).then(
    (user: User) => dispatch(actions.setUser(user))
  );
};

export default actions;
