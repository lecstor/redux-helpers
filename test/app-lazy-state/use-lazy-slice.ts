import { h, Component } from "preact";
import { connect } from "preact-redux";

import { actions, selectors } from "./state/products";

const mapStateToProps = state => {
  return { product: selectors.getProduct(state, "1") };
};
const mapActionsToProps = { setProduct: actions.setProduct };

class UseLazySlice extends Component {
  componentDidMount() {
    this.props.setProduct({ id: "1", name: "Product One" });
  }

  render({ product = {} }) {
    return h("div", { id: "child2" }, `Product: ${product.name || ""}`);
  }
}

const connected = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connected(UseLazySlice);
