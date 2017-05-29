import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOutUser } from '../../actions';

class SignOut extends Component {
  componentWillMount() {
    this.props.signOutUser();
  }

  render() {
    return (
      <div>
        Signing out...
      </div>
    );
  }
}

const mapDispatchToProps = {
  signOutUser,
};

export default connect(null, mapDispatchToProps)(SignOut);
