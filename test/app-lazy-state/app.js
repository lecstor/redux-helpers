const { h, Component } = require("preact");
const { connect } = require("preact-redux");

let UseLazySlice;

const { logIn, getFirstname } = require("./state/session");

const mapStateToProps = state => {
  return { firstname: getFirstname(state) };
};
const mapActionsToProps = { logIn };

class App extends Component {
  componentDidMount() {
    this.props.logIn();
  }

  componentWillUpdate() {
    UseLazySlice = require("./use-lazy-slice");
  }

  render({ firstname }) {
    if (UseLazySlice) {
      return h("div", null, [
        h("div", { id: "child1" }, `Hello ${firstname}`),
        h(UseLazySlice, null)
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

module.exports = connected(App);
