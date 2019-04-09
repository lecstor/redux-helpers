import { createActionCreator } from "../../../../src";

import { Product } from "./types";

// uses default actionTypeCreator
const createAction = createActionCreator("products");

export const setProduct = createAction<Product>("setProduct");
