import * as React from "react";
import { connect } from "react-redux";

import { actions, Product, selectors, SliceState } from "./state/products";
import { AppState } from "./state/types";

type StateProps = {
  product?: Product;
};

type DispatchProps = {
  setProduct: (opts: Product) => {};
};

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: AppState) => {
  return { product: selectors.getProduct(state.products, "1") };
};
const mapActionsToProps = { setProduct: actions.setProduct };

class UseLazySlice extends React.Component<Props> {
  componentDidMount() {
    this.props.setProduct({ id: "1", name: "Product One" });
  }

  render() {
    const { product } = this.props;
    return React.createElement(
      "div",
      { id: "child2" },
      `Product: ${(product && product.name) || ""}`
    );
  }
}

const connected = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connected(UseLazySlice);
