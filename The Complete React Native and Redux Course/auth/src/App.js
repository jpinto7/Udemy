/* @flow */

import React, { Component } from 'react';
import firebase from 'firebase';
import styled from 'styled-components/native';

import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

const Main = styled.View`
  flex: 1;
`;

const SingleButton = styled.View`
  flex-direction: row;
`;

class App extends Component {
  state = {
    loggedIn: null,
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBL5-tpPIwri8oLTCRAbxHUx_XC9OInUG8',
      authDomain: 'auth-11acf.firebaseapp.com',
      databaseURL: 'https://auth-11acf.firebaseio.com',
      storageBucket: 'auth-11acf.appspot.com',
      messagingSenderId: '900454325427'
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true
        });
      } else {
        this.setState({
          loggedIn: false
        });
      }
    });
  }


  logout = () => {
    firebase.auth().signOut();
  }

  renderContent = () => {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={this.logout}>Log out</Button>
        );
      case false:
        return (
          <LoginForm />
        );
      default:
        return (
          <Spinner size="large" />
        );
    }
  }

  render() {
    return (
      <Main>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </Main>
    );
  }
}

export default App;
