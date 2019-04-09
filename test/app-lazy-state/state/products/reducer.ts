import { Action } from "../../../../src/types";
import { Product, SliceState } from "./types";

export type SetProduct = Action<Product>;

function setProduct(state: SliceState, { payload: product }: SetProduct) {
  if (!product) {
    return state;
  }
  return {
    ...state,
    collection: {
      ...state.collection,
      [product.id]: product
    }
  };
}

export { setProduct };
