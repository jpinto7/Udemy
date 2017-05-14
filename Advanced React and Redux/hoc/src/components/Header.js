import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { authenticate } from '../actions';

class Header extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    authenticate: PropTypes.func.isRequired,
  }

  authButton() {
    const { authenticated } = this.props;
    let auth;
    if (authenticated) {
      auth = {
        message: 'Sign out',
        state: false,
      };
    } else {
      auth = {
        message: 'Sign in',
        state: true,
      };
    }
    return (
      <button
        onClick={this.handleAuthButtonClick(auth.state)}
      >
        {auth.message}
      </button>
    );
  }

  handleAuthButtonClick = (state) => () => {
    this.props.authenticate(state);
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/resources">Resources</Link>
          </li>
          <li className="nav-item nav-item-button">
            {this.authButton()}
          </li>
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = ({ authenticated }) => ({
  authenticated,
});

const mapDispatchToProps = {
  authenticate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
