import { h, Component } from "preact";
import { connect } from "preact-redux";

import { actions, selectors } from "./state/session";

const mapStateToProps = state => {
  return { firstname: selectors.getFirstname(state) };
};
const mapActionsToProps = { logIn: actions.logIn };

class App extends Component {
  componentDidMount() {
    this.props.logIn();
  }

  componentWillUpdate() {
    // import("./use-lazy-slice").then(slice => {
    //   this.UseLazySlice = slice;
    // });
    this.UseLazySlice = require("./use-lazy-slice").default;
  }

  render({ firstname }) {
    if (this.UseLazySlice) {
      return h("div", null, [
        h("div", { id: "child1" }, `Hello ${firstname}`),
        h(this.UseLazySlice, null)
      ]);
    }
    return h(
      "div",
      { id: "parent" },
      h("div", { id: "child1" }, `Hello ${firstname || ""}`)
    );
  }
}

const connected = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connected(App);
