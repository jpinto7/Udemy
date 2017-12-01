import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
  handleOnComplete = () => {
    this.props.navigation.navigate('auth');
  }

  render() {
    return (
      <Slides
        data={SLIDE_DATA}
        onComplete={this.handleOnComplete}
      />
    );
  }
}

export default WelcomeScreen;
