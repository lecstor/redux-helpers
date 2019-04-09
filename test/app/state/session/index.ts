import { createReducer } from "../../../../src";
import { actionTypeCreator } from "../index";

import * as actions from "./actions";
import * as fns from "./reducer";
import * as selectors from "./selectors";

import { SliceState } from "./types";

const initialState = {};

const reducer = createReducer<SliceState>(
  "session",
  fns,
  initialState,
  actionTypeCreator
);

export { actions, reducer, selectors };
