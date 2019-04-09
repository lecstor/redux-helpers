type ActionType = string;
type ReducerFnName = string;
type Slice = string;

const createActionType = (slice: Slice) => (
  action: ReducerFnName
): ActionType => `app/${slice}/${action}`;

export default createActionType;
