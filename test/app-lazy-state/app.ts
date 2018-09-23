import * as React from "react";
import { connect } from "react-redux";

import { actions, selectors } from "./state/session";
import { AppState } from "./state/types";

type StateProps = {
  firstname?: string;
};

type DispatchProps = {
  logIn: () => {};
};

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: AppState) => {
  return { firstname: selectors.getFirstname(state) };
};
const mapActionsToProps = { logIn: actions.logIn };

class App extends React.Component<Props, {}> {
  UseLazySlice: any;

  componentDidMount() {
    this.props.logIn();
  }

  componentWillUpdate() {
    // import("./use-lazy-slice").then(slice => {
    //   this.UseLazySlice = slice;
    // });
    this.UseLazySlice = require("./use-lazy-slice").default;
  }

  render() {
    const { firstname } = this.props;
    if (this.UseLazySlice) {
      return React.createElement("div", null, [
        React.createElement(
          "div",
          { key: "thing1", id: "child1" },
          `Hello ${firstname}`
        ),
        React.createElement(this.UseLazySlice, { key: "thing2" })
      ]);
    }
    return React.createElement(
      "div",
      { id: "parent" },
      React.createElement("div", { id: "child1" }, `Hello ${firstname || ""}`)
    );
  }
}

const connected = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connected(App);
