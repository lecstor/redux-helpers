import { SliceState as ProductsSlice } from "./products/types";
import { SliceState as SessionSlice } from "./session/types";

export interface AppState {
  products: ProductsSlice;
  session: SessionSlice;
}
