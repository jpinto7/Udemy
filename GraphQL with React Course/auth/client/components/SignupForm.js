import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import query from '../queries/CurrentUser';
import mutation from '../mutations/Signup';
import AuthForm from './AuthForm';

class SignupForm extends Component {
  static propTypes = {
    data: PropTypes.shape({
      user: PropTypes.shape({
        email: PropTypes.string,
      }),
    }).isRequired,
    mutate: PropTypes.func.isRequired,
  }

  state = {
    errors: [],
  }

  componentWillUpdate({ data }) {
    const { user } = this.props.data;
    const { user: nextUser } = data;
    if (!user && nextUser) {
      hashHistory.push('/dashboard');
    }
  }

  handleOnSubmit = ({ email, password }) => {
    this.setState({
      errors: [],
    });
    this.props.mutate({
      variables: {
        email,
        password,
      },
      refetchQueries: [{ query }],
    }).catch(({ graphQLErrors }) => {
      const errors = graphQLErrors.map(error => error.message);
      this.setState({
        errors,
      });
    });
  }

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.handleOnSubmit}
        />
      </div>
    );
  }
}

export default graphql(query)(
  graphql(mutation)(SignupForm),
);
