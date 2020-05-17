import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import store from './src/store';
import Authenticated from './src/components/Authenticated';
import NonAuthenticated from './src/components/NonAuthenticated';

const RootStack = createStackNavigator(
  {
    NonAuthenticated,
    Authenticated,
  },
  {
    initialRouteName: 'NonAuthenticated',
    headerMode: 'none',
  },
);

const Navigation = createAppContainer(RootStack);

const App = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);

export default App;
