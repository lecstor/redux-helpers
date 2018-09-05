function setProduct(state, { payload: product }) {
  return {
    ...state,
    collection: {
      ...state.collection,
      [product.id]: product
    }
  };
}

module.exports = { setProduct };
