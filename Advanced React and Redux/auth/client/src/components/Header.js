import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderLinks() {
    const { authenticated } = this.props;
    if (authenticated) {
      return (
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/signout"
          >
            Sign out
          </Link>
        </li>
      );
    }
    return [
      <li
        key={1}
        className="nav-item"
      >
        <Link
          className="nav-link"
          to="/signin"
        >
          Sign in
        </Link>
      </li>,
      <li
        key={2}
        className="nav-item"
      >
        <Link
          className="nav-link"
          to="/signup"
        >
          Sign up
        </Link>
      </li>,
    ];
  }
  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <Link
          className="navbar-brand"
          to="/"
        >
          Auth
        </Link>
        <ul className="navbar-nav mr-auto">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth: { authenticated }}) => ({
  authenticated,
});

export default connect(mapStateToProps, null)(Header);
