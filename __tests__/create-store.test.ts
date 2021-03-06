import { createStore } from "../src/index";

import { actions, reducer as session } from "../test/app/state/session";

const initialState = {};

function newStore(state = initialState) {
  const store = createStore({ session }, state);
  const dispatch = store.dispatch.bind(store);
  const getState = store.getState.bind(store);
  return { store, dispatch, getState };
}

describe("store", () => {
  test("logIn", () => {
    const { dispatch, getState } = newStore();
    return actions
      .logIn()(dispatch)
      .then(() => {
        expect(getState()).toEqual({
          session: { user: { firstname: "Fred", id: "abc123" } }
        });
      });
  });
});
