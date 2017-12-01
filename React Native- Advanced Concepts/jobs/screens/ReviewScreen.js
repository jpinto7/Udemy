import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const {
      navigate
    } = navigation;
    return {
      headerRight: (
        <Button
          backgroundColor="rgba(0, 0, 0, 0)"
          color="rgba(0, 122, 255, 1)"
          onPress={() => { navigate('settings'); }}
          title="Settings"
        />
      ),
      headerStyle: {
        marginTop: Platform.OS === 'android' ? 24 : 0
      },
      title: 'Review Jobs'
    };
  }

  render() {
    return (
      <View>
        <Text>Review Screen</Text>
      </View>
    );
  }
}

export default ReviewScreen;
