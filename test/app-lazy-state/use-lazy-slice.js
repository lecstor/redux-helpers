const { h, Component } = require("preact");
const { connect } = require("preact-redux");

const { getProduct, setProduct } = require("./state/products");

const mapStateToProps = state => {
  return { product: getProduct(state, "1") };
};
const mapActionsToProps = { setProduct };

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

module.exports = connected(UseLazySlice);
