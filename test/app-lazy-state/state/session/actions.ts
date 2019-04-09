import { Dispatch } from "redux";

import { createActionCreator } from "../../../../src";

import { User } from "./types";

// uses default actionTypeCreator
const createAction = createActionCreator("session");

export const setUser = createAction<User>("setUser");

export const logIn = () => (dispatch: Dispatch) => {
  return Promise.resolve({ id: "abc123", firstname: "Fred" }).then(
    (user: User) => dispatch(setUser(user))
  );
};
