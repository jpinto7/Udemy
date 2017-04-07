import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, hashHistory, Route } from 'react-router';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import App from './components/App';
import Dashboard from './components/Dashboard';
import requireAuth from './components/requireAuth';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin',
  },
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id,
});

const Root = () => (
  <ApolloProvider client={client}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="dashboard" component={requireAuth(Dashboard)} />
        <Route path="login" component={LoginForm} />
        <Route path="signup" component={SignupForm} />
      </Route>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.querySelector('#root'));
