import React, { PropTypes, Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import { emailChanged, loginUser, passwordChanged } from '../actions';

import { Card, CardSection, Spinner, Input, Button } from './common';

const ErrorMessage = styled.Text`
  font-size: 20;
  align-self: center;
  color: red;
`;

class LoginForm extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      emailChanged: PropTypes.func.isRequired,
      passwordChanged: PropTypes.func.isRequired,
      loginUser: PropTypes.func.isRequired,
    }),
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }

  onInputChange = (inputType, value) => {
    switch (inputType) {
      case 'email':
        this.props.actions.emailChanged(value);
        break;
      case 'password':
        this.props.actions.passwordChanged(value);
        break;
      default:
        return;
    }
  }

  loginUser = () => {
    const { email, password } = this.props;
    this.props.actions.loginUser({ email, password });
  }

  renderButton = () => {
    const { loading } = this.props;
    if (loading) {
      return <Spinner />;
    }

    return (
      <Button
        onPress={this.loginUser}
      >
        Login
      </Button>
    );
  }

  render() {
    const { email, password } = this.props;
    return (
      <Card>
        <CardSection>
          <Input
            value={email}
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={(text) => this.onInputChange('email', text)}
          />
        </CardSection>
        <CardSection>
          <Input
            value={password}
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={(text) => this.onInputChange('password', text)}
          />
        </CardSection>
        <ErrorMessage>
          {this.props.error}
        </ErrorMessage>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: {
    emailChanged: (email) => dispatch(emailChanged(email)),
    passwordChanged: (password) => dispatch(passwordChanged(password)),
    loginUser: (credentials) => dispatch(loginUser(credentials)),
  },
});

const mapStateToProps = (state) => {
  const ownState = state.get('auth').toJS();
  return {
    email: ownState.email,
    password: ownState.password,
    error: ownState.error,
    loading: ownState.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
