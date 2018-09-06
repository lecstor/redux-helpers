import { createLazyReducer } from "../../../../src";

import actions from "./actions";
import initialState from "./initial-state";
import * as fns from "./reducer";
import * as selectors from "./selectors";

const reducer = createLazyReducer("products", fns, initialState);

export { actions, reducer, selectors };
