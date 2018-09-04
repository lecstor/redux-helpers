const { createLazyStore } = require("../create-lazy-store");

const { actions } = require("../app-lazy-state/state/session");

const initialState = {};

function newStore(state = initialState) {
  const store = createLazyStore(state);
  const dispatch = store.dispatch.bind(store);
  const getState = store.getState.bind(store);
  return { store, dispatch, getState };
}

describe("store", () => {
  test("logIn", () => {
    const { store, dispatch, getState } = newStore();
    return actions
      .logIn()(dispatch, getState)
      .then(() => {
        expect(store.getState()).toEqual({
          session: { user: { firstname: "Fred", id: "abc123" } }
        });
      });
  });
});
