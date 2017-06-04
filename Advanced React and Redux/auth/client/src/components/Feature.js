import React, { Component } from 'react';
import { connect } from 'react-redux';
import requireAuth from './auth/requireAuth';
import { fetchMessage } from '../actions';

class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div>This is the feature</div>
    );
  }
}

const mapDispatchToProps = {
  fetchMessage,
};

export default connect(null, mapDispatchToProps)(Feature);
