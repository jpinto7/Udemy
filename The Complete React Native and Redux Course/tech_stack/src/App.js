import React, { Component } from 'react';
import { Platform, UIManager } from 'react-native';
import styled from 'styled-components/native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import reducers from './reducers';
import { Header } from './components/common';
import LibraryList from './components/LibraryList';

const store = createStore(reducers, devToolsEnhancer({ realtime: true }));

const RootView = styled.View`
  flex: 1;
`;

class App extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <RootView>
          <Header headerText="Tech Stack" />
          <LibraryList />
        </RootView>
      </Provider>
    );
  }
}

export default App;
