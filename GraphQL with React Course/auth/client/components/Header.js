import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import mutation from '../mutations/Logout';
import query from '../queries/CurrentUser';

// eslint-disable-next-line react/prefer-stateless-function
class Header extends Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      user: PropTypes.shape({
        email: PropTypes.string.isRequired,
      }),
    }).isRequired,
  }

  onLogout = () => {
    this.props.mutate({
      refetchQueries: [{ query }],
    });
  }

  renderButtons = () => {
    const { loading, user } = this.props.data;
    if (loading) {
      return null;
    }
    if (user) {
      return (
        <li>
          <a onClick={this.onLogout}>
            Logout
          </a>
        </li>
      );
    }
    return (
      <div>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </div>
    );
  }

  render() {
    return (
      <nav className="row">
        <div className="nav-wrapper">
          <div className="col s12">
            <Link
              className="brand-logo"
              to="/"
            >
              Home
            </Link>
            <ul className="right">
              {this.renderButtons()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default graphql(mutation)(
  graphql(query)(Header),
);
