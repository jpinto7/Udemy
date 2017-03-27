import React from 'react';
import { AppRegistry } from 'react-native';
import styled from 'styled-components/native';

import Header from './src/components/Header';
import AlbumList from './src/components/AlbumList';

const RootView = styled.View`
  flex: 1;
`;

const App = () => (
  <RootView>
    <Header headerText="Albums" />
    <AlbumList />
  </RootView>
);

AppRegistry.registerComponent('albums', () => App);
