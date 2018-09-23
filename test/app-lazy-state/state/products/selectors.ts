import { SliceState } from "./types";

function getProduct(state: SliceState, id: string) {
  return state.collection[id];
}

export { getProduct };
