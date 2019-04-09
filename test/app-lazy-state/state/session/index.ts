import { createLazyReducer } from "../../../../src";

import * as actions from "./actions";
import initialState from "./initial-state";
import * as fns from "./reducer";
import * as selectors from "./selectors";

const reducer = createLazyReducer("session", fns, initialState);

export { actions, reducer, selectors };
