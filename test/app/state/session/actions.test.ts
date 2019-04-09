import { Dispatch, AnyAction } from "redux";
import * as actions from "./actions";

const { logIn, setUser } = actions;

describe("actions", () => {
  test("setUser", () => {
    expect(setUser({ id: "abc123", firstname: "Jason" })).toEqual({
      payload: { id: "abc123", firstname: "Jason" },
      type: "session/setUser"
    });
  });

  test("logIn", () => {
    const dispatch: Dispatch<AnyAction> = jest.fn(() =>
      Promise.resolve()
    ) as jest.Mock;
    return logIn()(dispatch).then(() => {
      expect((dispatch as jest.Mock).mock.calls[0][0]).toEqual({
        payload: { id: "abc123", firstname: "Fred" },
        type: "session/setUser"
      });
    });
  });

  test("logIn error", () => {
    const dispatch: Dispatch<AnyAction> = jest.fn(() =>
      Promise.resolve()
    ) as jest.Mock;
    const error = new Error("boom");
    const logInError = () => (dispatch: Dispatch) => {
      return Promise.resolve(error).then((user: Error) =>
        dispatch(setUser(user))
      );
    };
    return logInError()(dispatch).then(() => {
      expect((dispatch as jest.Mock).mock.calls[0][0]).toEqual({
        error: true,
        payload: error,
        type: "session/setUser"
      });
    });
  });
});
