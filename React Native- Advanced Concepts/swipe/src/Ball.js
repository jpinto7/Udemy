import React, { Component } from 'react';
import {
  Animated,
  Text,
  View
} from 'react-native';

const styles = {
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: 'black',
  },
};

class Ball extends Component {
  componentWillMount() {
    this.position = new Animated.ValueXY(0, 0);
    Animated.spring(this.position, {
      toValue: {
        x: 200,
        y: 500,
      },
    }).start();
  }

  render() {
    return (
      <Animated.View style={this.position.getLayout()}>
        <View style={styles.ball} />
        <Text>Hi!</Text>
      </Animated.View>
    )
  }
}

export default Ball;
