import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';
import Resources from './components/Resources';
import reducers from './reducers';
import '../style/style.css';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="resources" component={Resources} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
