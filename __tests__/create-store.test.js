const { createStore } = require("../src/index");

const { logIn, reducer: session } = require("../test/app/state/session");

const initialState = {};

function newStore(state = initialState) {
  const store = createStore({ session }, state);
  const dispatch = store.dispatch.bind(store);
  const getState = store.getState.bind(store);
  return { store, dispatch, getState };
}

describe("store", () => {
  test("logIn", () => {
    const { store, dispatch, getState } = newStore();
    return logIn()(dispatch, getState).then(() => {
      expect(store.getState()).toEqual({
        session: { user: { firstname: "Fred", id: "abc123" } }
      });
    });
  });
});
