import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { SliceState as SessionSlice } from "./session/types";

export type Dispatch = ThunkDispatch<AppState, undefined, AnyAction>;
export type GetState = () => AppState;

export interface AppState {
  session: SessionSlice;
}
