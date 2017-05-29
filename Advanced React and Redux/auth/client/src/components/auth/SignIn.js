import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signInUser } from '../../actions';

class SignIn extends Component {
  handleFormSubmit = ({ email, password}) => {
    this.props.signInUser({ email, password });
  }

  renderAlert() {
    const { errorMessage } = this.props;
    if (errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form
        className="pt-3"
        onSubmit={handleSubmit(this.handleFormSubmit)}
      >
        <fieldset className="form-group">
          <label htmlFor="email">Email</label>
          <Field
            className="form-control"
            name="email"
            component="input"
            type="email"
            placeholder="Enter your email"
            id="email"
          />
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="password">Password</label>
          <Field
            className="form-control"
            name="password"
            component="input"
            type="password"
            placeholder="Enter your password"
            id="password"
          />
        </fieldset>
        {this.renderAlert()}
        <button
          type="submit"
          className="btn btn-primary"
        >
          Sign in
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = {
  signInUser,
};

const mapStateToProps = ({ auth: { error }}) => ({
  errorMessage: error,
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'signin',
})(SignIn));
