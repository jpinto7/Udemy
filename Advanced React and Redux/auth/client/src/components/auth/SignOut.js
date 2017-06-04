import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOutUser } from '../../actions';

class SignOut extends Component {
  componentWillMount() {
    setTimeout(this.props.signOutUser, 1000);
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
