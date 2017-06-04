import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import AuthForm from './AuthForm';
import { signUpUser } from '../../actions';
import { signUpFormValidation as validate } from './validate';

const SignUp = (props) => {
  const {
    errorMessage,
    signUpUser: handleSignUpUser,
    handleSubmit,
    pristine,
    dirty,
   } = props;
  return (
    <AuthForm
      type="signUp"
      dirty={dirty}
      pristine={pristine}
      errorMessage={errorMessage}
      onSubmit={handleSubmit(handleSignUpUser)}
      submitButtonText="Sign up"
    />
  );
}

const mapDispatchToProps = {
  signUpUser,
};

const mapStateToProps = ({ auth: { error }}) => ({
  errorMessage: error,
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'signup',
  validate,
})(SignUp));
