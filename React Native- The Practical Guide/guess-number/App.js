import React, { Component } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default class App extends Component {
  state = {
    hideAnimation: false
  }

  componentDidMount() {
    this.animation.play();
  }

  resetAnimation = () => {
    this.setState({
      hideAnimation: false
    }, () => {
      this.animation.reset();
      this.animation.play();
    });
  };

  animationFinishHandler = () => {
    this.setState({
      hideAnimation: true
    });
  }

  render() {
    let renderElement = (
        <LottieView
        ref={animation => {
          this.animation = animation;
        }}
        loop={false}
        source={require('./assets/LottieLogo1.json')}
        onAnimationFinish={this.animationFinishHandler}
      />
    );
    if (this.state.hideAnimation) {
      renderElement = (
        <View style={styles.buttonContainer}>
          <Button title="Restart Animation" onPress={this.resetAnimation} />
        </View>        
      );
    }
    return (
      <View style={styles.container}>
        {renderElement}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingTop: 20,
  },  
});
