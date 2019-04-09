import { AppState } from "../types";

function getFirstname(state: AppState) {
  if (!state.session.user) {
    return;
  }
  return state.session.user.firstname;
}

export { getFirstname };
