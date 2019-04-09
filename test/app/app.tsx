import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { actions, selectors } from "./state/session";
import { AppState, Dispatch } from "./state/types";

interface OwnProps {
  firstname?: string;
}

interface StateProps {
  firstname?: string;
}

// relies on currently unpublished version of redux-thunk
// https://github.com/reduxjs/redux-thunk/pull/224
// https://github.com/reduxjs/redux-thunk/commit/4bfa41ceb4281131ccbe9eeda87c07aeaf63b014
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ logIn: actions.logIn }, dispatch);

// with a previous redux-thunk..
// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   logIn: () => actions.logIn()(dispatch),
//   setUser: user => dispatch(actions.setUser(user))
// });

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: AppState, ownProps: OwnProps) {
  return { firstname: selectors.getFirstname(state) || ownProps.firstname };
}

function App({ firstname, logIn }: Props) {
  return (
    <div>
      <div>Hello {firstname || ""}</div>
      <button onClick={() => logIn()}>Log In</button>
    </div>
  );
}

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(App);
