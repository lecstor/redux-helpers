import { SliceState as ProductsSlice } from "./products/types";
import { SliceState as SessionSlice } from "./session/types";

export type AppState = {
  products: ProductsSlice;
  session: SessionSlice;
};
