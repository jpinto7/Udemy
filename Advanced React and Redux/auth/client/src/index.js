import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'rxjs';
import { Router, IndexRoute, Route, Link, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import routes from './routes';
import { signInUserSuccess } from './actions';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/style.css';

const initialState = {};
const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const token = localStorage.getItem('token');
if (token) {
  store.dispatch(signInUserSuccess());
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.querySelector('#app'),
);
