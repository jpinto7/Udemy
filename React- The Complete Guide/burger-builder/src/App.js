import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Logout from './containers/Logout';
import asyncComponent from './hoc/asyncComponent';
import { auth as authActions } from './store/actions';

const asyncCheckout = asyncComponent(() => import('./containers/Checkout'));
const asyncOrders = asyncComponent(() => import('./containers/Orders'));
const asyncAuth = asyncComponent(() => import('./containers/Auth'));

const App = ({ authCheckState, isAuthenticated }) => {
  useEffect(() => {
    authCheckState();
  }, []);

  let routes = (
    <Switch>
      <Route exact path="/" component={BurgerBuilder} />
      <Route path="/auth" component={asyncAuth} />
      <Redirect to="/" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route exact path="/" component={BurgerBuilder} />
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/orders" component={asyncOrders} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={asyncAuth} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
};

const mapStateToProps = ({ auth: { token } }) => ({
  isAuthenticated: token !== null,
});

export default connect(mapStateToProps, authActions)(App);
