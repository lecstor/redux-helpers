module.exports = (state = [], action) => {
  // console.log(state, action);
  // return null;
  return [...state, action];
};
