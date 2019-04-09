/*
 * http://nicolasgallagher.com/redux-modules-and-code-splitting/
 * https://stackoverflow.com/questions/32968016/how-to-dynamically-load-reducers-for-code-splitting-in-a-redux-application
 */
import { Reducer } from "redux";
import { Reducers } from "./types";

type Listener = (reducers: Reducers) => void;
class ReducerRegistry {
  private emitChange: Listener | null;
  private reducers: Reducers;

  public constructor() {
    this.emitChange = null;
    this.reducers = {};
  }

  public getReducers() {
    return { ...this.reducers };
  }

  public register(name: string, reducer: Reducer) {
    this.reducers = { ...this.reducers, [name]: reducer };
    if (this.emitChange) {
      this.emitChange(this.getReducers());
    }
  }

  public setChangeListener(listener: Listener) {
    this.emitChange = listener;
  }
}

const reducerRegistry = new ReducerRegistry();

export default reducerRegistry;
