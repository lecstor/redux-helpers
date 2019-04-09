import * as React from "react";
import { connect } from "react-redux";

import { actions, Product, selectors } from "./state/products";
import { AppState } from "./state/types";

const { useEffect } = React;

interface StateProps {
  product?: Product;
}

interface DispatchProps {
  setProduct: (opts: Product) => {};
}

type Props = StateProps & DispatchProps;

function mapStateToProps(state: AppState) {
  return { product: selectors.getProduct(state.products, "1") };
}

const mapActionsToProps = { setProduct: actions.setProduct };

function UseLazySlice({ product, setProduct }: Props) {
  useEffect(() => {
    setProduct({ id: "1", name: "Product One" });
  }, []);
  return <div id="child2">Product: {(product && product.name) || ""}</div>;
}

const connected = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connected(UseLazySlice);
