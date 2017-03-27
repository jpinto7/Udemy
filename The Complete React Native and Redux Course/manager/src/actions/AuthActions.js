import {
  EMAIL_CHANGED,
  LOGIN_USER,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCEEDED,
  LOGIN_USER_FAILED,
} from './constants';

export const emailChanged = (email) => ({
  type: EMAIL_CHANGED,
  email,
});

export const passwordChanged = (password) => ({
  type: PASSWORD_CHANGED,
  password,
});

export const loginUser = (credentials) => ({
  type: LOGIN_USER,
  credentials,
});

export const loginUserSucceeded = (user) => ({
  type: LOGIN_USER_SUCCEEDED,
  user,
});

export const loginUserFailed = (error) => ({
  type: LOGIN_USER_FAILED,
  error,
});
