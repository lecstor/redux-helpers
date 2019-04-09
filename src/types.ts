import { Reducer } from "redux";

export interface Action<Payload> {
  type: string;
  payload?: Payload;
  error?: boolean;
}

export type Reducers = Record<string, Reducer>;
