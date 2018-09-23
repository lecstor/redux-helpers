import * as React from "react";
import { connect } from "react-redux";

import { actions, selectors } from "./state/session";
import { State } from "./state/types";

type OwnProps = {
  firstname?: string;
};

type StateProps = {
  firstname?: string;
};

type DispatchProps = {
  logIn: () => {};
};

type Props = OwnProps & StateProps & DispatchProps;

const mapStateToProps = (state: State, ownProps: OwnProps) => {
  return { firstname: selectors.getFirstname(state) || ownProps.firstname };
};
const mapDispatchToProps = { logIn: actions.logIn };

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.logIn();
  }

  render() {
    const { firstname } = this.props;
    return React.createElement("div", null, `Hello ${firstname || ""}`);
  }
}

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(App);
