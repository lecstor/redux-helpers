import * as React from "react";
import { connect } from "react-redux";

import { actions, selectors } from "./state/session";
import { AppState } from "./state/types";

interface StateProps {
  firstname?: string;
  UseLazySlice?: React.ComponentClass;
}

interface DispatchProps {
  logIn: () => {};
}

type Props = StateProps & DispatchProps;

function mapStateToProps(state: AppState) {
  let UseLazySlice;
  const firstname = selectors.getFirstname(state);
  if (firstname) {
    UseLazySlice = require("./use-lazy-slice").default;
  }
  return { firstname, UseLazySlice };
}

const mapActionsToProps = { logIn: actions.logIn };

function App({ firstname, logIn, UseLazySlice }: Props) {
  return (
    <div>
      <div>Hello {firstname || ""}</div>
      <button onClick={() => logIn()}>Log In</button>
      {UseLazySlice && <UseLazySlice key="thing2" />}
    </div>
  );
}

const connected = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connected(App);
