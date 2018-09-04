function getProduct(state, id) {
  return state.products.collection[id];
}

module.exports = { getProduct };
