const { h, Component } = require("preact");
const { connect } = require("preact-redux");

const { logIn } = require("./state/session");
const { getFirstname } = require("./state/session/selectors");

const mapStateToProps = state => {
  return { firstname: getFirstname(state) };
};
const mapActionsToProps = { logIn };

class App extends Component {
  componentDidMount() {
    this.props.logIn();
    require("./state/products");
  }

  render({ firstname }) {
    return h("div", null, `Hello ${firstname || ""}`);
  }
}

const connected = connect(
  mapStateToProps,
  mapActionsToProps
);

module.exports = connected(App);
