import { Product, SliceState } from "./types";

function setProduct(
  state: SliceState,
  { payload: product }: { payload: Product }
) {
  return {
    ...state,
    collection: {
      ...state.collection,
      [product.id]: product
    }
  };
}

export { setProduct };
