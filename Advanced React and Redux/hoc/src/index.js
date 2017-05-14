import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './components/App';
import Resources from './components/Resources';
import configureStore from './store/configureStore';
import '../style/style.css';

const initialState = {};
const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="resources" component={Resources} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('#app'),
);
