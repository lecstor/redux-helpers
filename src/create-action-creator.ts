import { Action } from "./types";
import createActionType from "./create-action-type";

type GetType = (reducerFnName: string) => string;
type Slice = string;
type GetTypeOrSlice = Slice | GetType;

/**

### Create a function to create action creators for a specfic store slice

```ts
  const newCreator = createActionCreator(sliceName);
```

`newCreator` is a function that takes an action/reducer name.

It returns an action with type in the format "app/[slice name]/[reducer name]".

#### Customise the slice format:

```ts
  const actionTypeCreator = (slice: string) => (action: string) => `${slice}/${action}`;

  const newCreator = createActionCreator(actionTypeCreator(sliceName));
```

`newCreator` is a function that takes a action/reducer name.

It returns an action with type in the format "[slice name]/[reducer name]".

#### Usage

```ts
  const setUser = newCreator<User>(reducerName);
```

`setUser` is an action creator function which takes a single arg with typeof
User and outputs an action.
 
```ts
  setUser({ id: "user_1", name: "Fred" });
  
  returns:
    {
      type: `app/${sliceName}/${reducerName}`,
      payload: { id: "user_1", name: "Fred" }
    }
 
  setUser(new Error("Boom"));

  returns:
    {
      type: `app/${sliceName}/${reducerName}`,
      payload: new Error("Boom"),
      error: true
    }
```
 
 */
export default function createActionCreator(getTypeOrSlice: GetTypeOrSlice) {
  const getType =
    typeof getTypeOrSlice === "string"
      ? createActionType(getTypeOrSlice)
      : getTypeOrSlice;
  return function createAction<Payload>(reducerFnName: string) {
    return (payload?: Payload | Error): Action<Payload | Error> => {
      const aName = getType(reducerFnName);
      if (payload instanceof Error) {
        return { type: aName, payload, error: true };
      }
      return { type: aName, payload };
    };
  };
}
