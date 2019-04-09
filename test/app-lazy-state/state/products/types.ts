export interface Product {
  id: string;
  name: string;
}

export interface SliceState {
  collection: Record<string, Product>;
}
