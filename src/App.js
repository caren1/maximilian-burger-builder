import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";

class App extends Component {
  componentDidMount() {
    this.props.onAutoSignUp();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/"/>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Redirect to="/"/>
        </Switch>
      );
    }

    return (
      <>
        <Layout>{routes}</Layout>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
