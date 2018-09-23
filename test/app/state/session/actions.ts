import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { createActionCreators, ReducerFns, StdAction } from "../../../../src";

import { SliceState, User } from "./types";

import * as fns from "./reducer";

const actions = createActionCreators("session", fns);

// interface StdAction extends Action {
//   payload?: any;
//   error?: boolean;
// }

// type ThunkResult<R> = ThunkAction<R, SliceState, undefined, StdAction>;

// type MyActionCreator =
//   | ActionCreator<StdAction>
//   | ActionCreator<ThunkAction<any, SliceState, undefined, StdAction>>;

// type ActionCreators = Record<string, any>;

// const actions: ActionCreators = {};

// actions.setUser = (payload: User): StdAction => {
//   if (payload instanceof Error) {
//     return { type: "SET_USER", payload, error: true };
//   }
//   return { type: "SET_USER", payload };
// };

actions.logIn = () => (dispatch: ThunkDispatch<SliceState, any, StdAction>) => {
  return Promise.resolve({ id: "abc123", firstname: "Fred" }).then(
    (user: User) => dispatch(actions.setUser(user))
  );
};

export default actions;
