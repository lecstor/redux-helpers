import { createReducer } from "../../../../src";

import actions from "./actions";
import * as fns from "./reducer";
import * as selectors from "./selectors";

const initialState = {
  user: null
};

const reducer = createReducer("session", fns, initialState);

export { actions, reducer, selectors };
