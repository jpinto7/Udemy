import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { View, Text, AsyncStorage } from 'react-native';
import * as reduxActions from '../actions';
import * as selectors from '../selectors';

const actions = {
  facebookLogin: reduxActions.facebookLogin
};

class AuthScreen extends Component {
  componentDidMount() {
    this.props.actions.facebookLogin();
    this.onAuthComplete(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps)
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('map');
    }
  }

  render() {
    return (
      <View />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  token: selectors.getToken
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
