import React, { Component } from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

class App extends Component {
  componentDidMount() {
    const config = {
      apiKey: "AIzaSyCMkN1HqtKtSsqB34qHIH2P2e9jmiQKU6s",
      authDomain: "one-time-password-f4485.firebaseapp.com",
      databaseURL: "https://one-time-password-f4485.firebaseio.com",
      projectId: "one-time-password-f4485",
      storageBucket: "one-time-password-f4485.appspot.com",
      messagingSenderId: "192690918057"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUpForm />
        <SignInForm />
      </View>
    );
  }
}

export default App;
