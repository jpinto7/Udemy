import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import configureStore from './store';
import { configureFirebase, checkIfUserSignedIn } from './firebaseHelpers';
import Router from './Router';

const initialState = {};

const store = configureStore(initialState);

class App extends Component {
  componentWillMount() {
    configureFirebase();
    checkIfUserSignedIn(
      () => Actions.main(),
      () => Actions.auth()
    );
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
