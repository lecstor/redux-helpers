function setProduct(state, { payload: product }) {
  return {
    ...state,
    [product.id]: product
  };
}

module.exports = { setProduct };
