const { createStore } = require("../create-store");

const { actions, reducer: session } = require("../app/state/session");

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
    return actions
      .logIn()(dispatch, getState)
      .then(() => {
        expect(store.getState()).toEqual({
          session: { user: { firstname: "Fred", id: "abc123" } }
        });
      });
  });
});
