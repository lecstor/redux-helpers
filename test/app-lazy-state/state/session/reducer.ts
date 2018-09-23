import { SliceState } from "./types";

function setUser(state: SliceState, { payload: user }: { payload: any }) {
  return {
    ...state,
    user
  };
}

export { setUser };
