import React, { Component } from 'react';
import { Field } from 'redux-form';
import FormField from './FormField';

class AuthForm extends Component {
  renderAlert() {
    const { errorMessage, pristine } = this.props;
    if (errorMessage && pristine) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {errorMessage}
        </div>
      );
    }
  }

  renderPasswordConfirmation() {
    const { type } = this.props;
    if (type === 'signUp') {
      return (
        <Field
          component={FormField}
          name="passwordConfirm"
          label="Confirm password"
          type="password"
          placeholder="Confirm your password"
          id="password-confirm"
        />
      );
    }
  }

  render() {
    const {
      onSubmit,
      submitButtonText,
    } = this.props;
    return (
      <form
        className="pt-3"
        onSubmit={onSubmit}
      >
        <Field
          component={FormField}
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          id="email"
        />
        <Field
          component={FormField}
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          id="password"
        />
        {this.renderPasswordConfirmation()}
        {this.renderAlert()}
        <button
          type="submit"
          className="btn btn-primary"
        >
          {submitButtonText}
        </button>
      </form>
    );
  }
}

export default AuthForm;
