/* @flow */

import React, { Component } from 'react';
import firebase from 'firebase';
import styled from 'styled-components/native';

import { Button, Card, CardSection, Input, Spinner } from './common';

const ErrorMessage = styled.Text`
  font-size: 18;
  align-self: center;
  color: red;
`;

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
  }

  loginSuccess = () => {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
    });
  }

  loginFailed = () => {
    this.setState({
      error: 'Authentication failed.',
      loading: false,
    });
  }

  login = () => {
    const { email, password } = this.state;
    this.setState({
      error: '',
      loading: true,
    });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.loginSuccess)
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.loginSuccess)
          .catch(this.loginFailed);
      });
  }

  render() {
    const renderButton = this.state.loading ? (
      <Spinner size="small" />
    ) : <Button onPress={this.login}>Log in</Button>;

    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="user@gmail.com"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Password"
            secureTextEntry
            placeholder="password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>
        <ErrorMessage>{this.state.error}</ErrorMessage>
        <CardSection>
          {renderButton}
        </CardSection>
      </Card>
    );
  }
}

export default LoginForm;
