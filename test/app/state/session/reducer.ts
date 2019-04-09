import { SliceState, User } from "./types";
import { Action } from "../../../../src/types";

export type SetUser = Action<User>;

function setUser(state: SliceState, { payload: user }: SetUser): SliceState {
  return {
    ...state,
    user
  };
}

export { setUser };
