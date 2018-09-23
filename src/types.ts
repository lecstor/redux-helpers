import { Action, AnyAction, Dispatch, Reducer } from "redux";

// export type PlainAction = (payload?: any) => Record<string, any>;
// export type PlainAction = (payload?: any) => AnyAction;
// export type ThunkAction = (
//   payload?: any
// ) => (dispatch: Dispatch, getState?: () => any) => void;
// export type ActionCreators = Record<string, PlainAction | ThunkAction>;
export type ActionCreators = Record<string, any>;

// export type ReducerFnOptPayload = (
//   state: any,
//   payload?: any
// ) => Record<string, any>;
// export type ReducerFnReqPayload = (
//   state: any,
//   payload: any
// ) => Record<string, any>;
// export type ReducerFn = ReducerFnOptPayload | ReducerFnReqPayload;
export type ReducerFn = (state: any, payload?: any) => Record<string, any>;

export type ReducerFns = Record<string, ReducerFn>;

export type ActionTypes = { [key: string]: string };

export type InitialState = Record<string, any>;
export type State = Record<string, any>;

// export type Reducers = ReducersMapObject<any, StdAction>;

// export interface StdActionOptPl extends Action {
//   payload?: any;
// }

// export interface StdActionReqPl extends Action {
//   payload: any;
// }

// export type StdAction = StdActionReqPl | StdActionOptPl;

// export type StdAction = AnyAction;

// export interface StdAction extends AnyAction {
//   payload?: any;
// }

// export type StdAction =
//   | { type: string; payload: any }
//   | { type: string; payload?: any };

// export interface Action<T = any> {
//   type: T;
// }

// type ActionProps = "type" | "payload" | "error";

// export type Action = Partial<Record<ActionProps, any>>;
// export type Action = AnyAction;

// export type StdAction = { type: string; payload: any };

export interface StdAction extends Action {
  payload: any;
  error?: boolean;
}

export type ReducersMapObject<S = any, A extends Action = StdAction> = {
  [K in keyof S]: Reducer<S[K], A>
};
