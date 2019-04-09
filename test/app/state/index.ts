import { createActionCreator } from "../../../src";

type ActionType = string;
type ReducerFnName = string;
type Slice = string;

// customise action types
const actionTypeCreator = (slice: Slice) => (
  action: ReducerFnName
): ActionType => `${slice}/${action}`;

const createAction = (slice: Slice) =>
  createActionCreator(actionTypeCreator(slice));

export { actionTypeCreator, createAction };
