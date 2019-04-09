import { Action } from "../../../../src/types";
import { SliceState, User } from "./types";

export type SetUser = Action<User>;

function setUser(state: SliceState, { payload: user }: SetUser) {
  return {
    ...state,
    user
  };
}

export { setUser };
