/*
 * http://nicolasgallagher.com/redux-modules-and-code-splitting/
 * https://stackoverflow.com/questions/32968016/how-to-dynamically-load-reducers-for-code-splitting-in-a-redux-application
 */
import { Reducer } from "redux";
import { ReducersMapObject, StdAction } from "./types";

type Listener = (reducers: ReducersMapObject) => void;
class ReducerRegistry {
  emitChange: Listener | null;
  reducers: ReducersMapObject;

  constructor() {
    this.emitChange = null;
    this.reducers = {};
  }

  getReducers() {
    return { ...this.reducers };
  }

  register(name: string, reducer: Reducer<any, StdAction>) {
    this.reducers = { ...this.reducers, [name]: reducer };
    if (this.emitChange) {
      this.emitChange(this.getReducers());
    }
  }

  setChangeListener(listener: Listener) {
    this.emitChange = listener;
  }
}

const reducerRegistry = new ReducerRegistry();

export default reducerRegistry;
