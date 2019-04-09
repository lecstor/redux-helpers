import { createLazyReducer } from "../../../../src";
import { SliceState } from "./types";

import * as actions from "./actions";
import initialState from "./initial-state";
import * as fns from "./reducer";
import * as selectors from "./selectors";

const reducer = createLazyReducer<SliceState>("products", fns, initialState);

export { actions, reducer, selectors };

export * from "./types";
