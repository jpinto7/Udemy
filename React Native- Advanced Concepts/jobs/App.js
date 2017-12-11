import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Notifications } from 'expo';
import { PersistGate } from 'redux-persist/lib/integration/react'

import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

import registerForPushNotifications from './services/push-notifications';

import { persistor, store } from './store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
});

const MainNavigator = TabNavigator({
  welcome: { screen: WelcomeScreen },
  auth: { screen: AuthScreen },
  main: {
    screen: TabNavigator({
      map: { screen: MapScreen },
      deck: { screen: DeckScreen },
      review: {
        screen: StackNavigator({
          review: { screen: ReviewScreen },
          settings: { screen: SettingsScreen }
        })
      }
    }, {
      tabBarPosition: 'bottom',
      tabBarOptions: {
        labelStyle: {
          fontSize: 12
        }
      }
    })
  }
}, {
  lazy: true,
  navigationOptions: {
    tabBarVisible: false
  },
});

class App extends Component {
  componentDidMount() {
    registerForPushNotifications();
    Notifications.addListener(({ data: { text }, origin }) => {
      console.log('text', text);
      console.log('origin', origin);
      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'Ok.' }]
        );
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={styles.container}>
            <MainNavigator />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
