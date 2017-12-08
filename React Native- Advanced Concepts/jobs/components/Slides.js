import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { View, Text, ScrollView, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = {
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    paddingLeft: 10,
    paddingRight: 10
  },
  slideButton: {
    backgroundColor: '#0288D1',
  },
  slideButtonView: {
    marginTop: 15
  },
  slideText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center'
  }
};

class Slides extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string,
      text: PropTypes.string
    })),
    onComplete: PropTypes.func
  }

  static defaultProps = {
    data: [],
    onComplete: null
  }

  renderButton = (index) => {
    const {
      data,
      onComplete
    } = this.props;
    if (index === data.length - 1) {
      return (
        <Button
          buttonStyle={styles.slideButton}
          containerViewStyle={styles.slideButtonView}
          onPress={onComplete}
          raised
          title="Onwards!"
        />
      )
    }
  }

  render() {
    const { data } = this.props;
    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={{ flex: 1 }}
      >
        {data.map(({ color = '',text = '' } = {}, index) => (
          <View
            key={index}
            style={[styles.slide, { backgroundColor: color }]}
          >
            <Text style={styles.slideText}>{text}</Text>
            {this.renderButton(index)}
          </View>
        ))}
      </ScrollView>
    );
  }
}

export default Slides;
