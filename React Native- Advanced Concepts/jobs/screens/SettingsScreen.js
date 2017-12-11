import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import * as reduxActions from '../actions';

const actions = {
  clearLikedJobs: reduxActions.clearLikedJobs
};

class SettingsScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  }

  render() {
    return (
      <View>
        <Button
          backgroundColor="#F44336"
          icon={{ name: 'delete-forever' }}
          large
          onPress={this.props.actions.clearLikedJobs}
          title="Reset Liked Jobs"
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(SettingsScreen);
