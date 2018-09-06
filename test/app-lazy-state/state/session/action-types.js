import { createActionTypes } from "../../../src";

import * as fns from "./reducer";

module.exports = createActionTypes("session", fns);
