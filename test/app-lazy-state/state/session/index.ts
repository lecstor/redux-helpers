import { createActionTypes, createLazyReducer } from "../../../../src";

import actions from "./actions";
import initialState from "./initial-state";
import * as fns from "./reducer";
import * as selectors from "./selectors";

const reducer = createLazyReducer("session", fns, initialState);
const actionTypes = createActionTypes("session", fns);

export { actions, actionTypes, reducer, selectors };
