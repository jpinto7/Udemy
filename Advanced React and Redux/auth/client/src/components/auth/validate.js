import React from 'react'
import { Field, reduxForm } from 'redux-form';

export const signUpFormValidation = ({ email, password, passwordConfirm }) => {
  const errors = {};
  if (!email) {
    errors.email = 'Please enter an email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!password) {
    errors.password = 'Please enter a password';
  } else if (password.length < 8) {
    errors.password = 'Password must be 8 characters or more';
  }

  if (!passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  } else if (passwordConfirm.length < 8) {
    errors.passwordConfirm = 'Password confirmation must be 8 characters or more';
  }
  else if ((password !== passwordConfirm) && passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }

  return errors;
};

export const signInFormValidation = ({ email, password }) => {
  const errors = {};
  if (!email) {
    errors.email = 'Please enter an email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!password) {
    errors.password = 'Please enter a password';
  }

  return errors;
};
