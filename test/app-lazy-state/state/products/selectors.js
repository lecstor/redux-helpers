function getProduct(state, id) {
  return state.products.collection[id];
}

export { getProduct };
