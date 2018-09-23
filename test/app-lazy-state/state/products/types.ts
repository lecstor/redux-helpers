export type Product = {
  id: string;
  name: string;
};

export type SliceState = {
  collection: Record<string, Product>;
};
