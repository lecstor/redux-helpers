import { Dispatch } from "redux";

import { createActionCreator } from "../../../../src";

import { actionTypeCreator } from "../index";
import { User } from "./types";

const createAction = createActionCreator(actionTypeCreator("session"));

export const setUser = createAction<User>("setUser");

export const logIn = () => (dispatch: Dispatch) => {
  return Promise.resolve({ id: "abc123", firstname: "Fred" }).then(
    (user: User) => dispatch(setUser(user))
  );
};
