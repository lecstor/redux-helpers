import { State } from "../types";

function getFirstname(state: State) {
  if (!state.session.user) {
    return;
  }
  return state.session.user.firstname;
}

export { getFirstname };
