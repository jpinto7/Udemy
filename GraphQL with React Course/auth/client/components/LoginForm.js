import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import mutation from '../mutations/Login';
import AuthForm from './AuthForm';

class LoginForm extends Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
  }

  handleOnSubmit = ({ email, password }) => {
    this.props.mutate({
      variables: {
        email,
        password,
      },
      refetchQueries: [{ query }],
    });
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm
          onSubmit={this.handleOnSubmit}
        />
      </div>
    );
  }
}

export default graphql(mutation)(LoginForm);
