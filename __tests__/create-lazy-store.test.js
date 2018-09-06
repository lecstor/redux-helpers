import createLazyStore from "../src/create-lazy-store";

import { actions } from "../test/app-lazy-state/state/session";

const initialState = {};

function newStore(state = initialState) {
  const store = createLazyStore(state);
  const dispatch = store.dispatch.bind(store);
  const getState = store.getState.bind(store);
  return { store, dispatch, getState };
}

describe("store", () => {
  test("logIn", () => {
    const { getState } = newStore({ products: undefined });
    expect(getState()).toEqual({
      products: null,
      session: { user: null }
    });
  });
  test("logIn", () => {
    const { dispatch, getState } = newStore();
    return actions
      .logIn()(dispatch, getState)
      .then(() => {
        expect(getState()).toEqual({
          session: { user: { firstname: "Fred", id: "abc123" } }
        });
      });
  });
});
