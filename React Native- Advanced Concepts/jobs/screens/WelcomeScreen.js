import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import isNull from 'lodash/isNull';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  {
    color: '#03A9F4',
    text: 'Welcome to JobApp'
  },
  {
    color: '#009688',
    text: 'Use this to get a job'
  },
  {
    color: '#03A9F4',
    text: 'Set your location, then swipe away'
  }
];

class WelcomeScreen extends Component {
  state = { token: null }

  async componentWillMount() {
    const token = await AsyncStorage.getItem('fb_token');
    if (token) {
      this.setState({ token }, () => {
        this.props.navigation.navigate('map');
      });
    } else {
      this.setState({ token: false });
    }
  }

  handleOnComplete = () => {
    this.props.navigation.navigate('auth');
  }

  render() {
    if (isNull(this.state.token)) {
      return <AppLoading />;
    }
    return (
      <Slides
        data={SLIDE_DATA}
        onComplete={this.handleOnComplete}
      />
    );
  }
}

export default WelcomeScreen;
