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

  render({ firstname }) {
    return h("div", null, `Hello ${firstname || ""}`);
  }
}

const connected = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connected(App);
