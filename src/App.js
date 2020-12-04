import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'

class App extends Component {
  render() {
    return (
      <>
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout}></Route>
            <Route path='/orders' component={Orders}></Route>
            <Route path='/' exact component={BurgerBuilder}></Route>
          </Switch>
        </Layout>
      </>
    );
  }
}

export default App;
