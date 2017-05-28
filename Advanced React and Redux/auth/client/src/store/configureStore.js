import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import rootReducer from '../reducers';
import rootEpic from '../epics';

const configureStore = (initialState = {}, history) => {
  const prodMiddlewares = [
    routerMiddleware(history),
    createEpicMiddleware(rootEpic),
  ];

  const devMiddlewares = [
    reduxImmutableStateInvariant(),
    ...prodMiddlewares,
  ];

  const middlewares = process.env.NODE_ENV === 'production' ? prodMiddlewares : devMiddlewares;

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers),
  );

  return store;
};

export default configureStore;
