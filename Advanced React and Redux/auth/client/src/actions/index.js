import {
  SIGN_OUT_USER,
  SIGN_OUT_USER_FAILURE,
  SIGN_OUT_USER_SUCCESS,
  SIGN_IN_USER,
  SIGN_IN_USER_FAILURE,
  SIGN_IN_USER_SUCCESS,
} from '../constants';

export const signInUser = ({ email, password }) => ({
  type: SIGN_IN_USER,
  payload: {
    email,
    password,
  },
});

export const signInUserSuccess = response => ({
  type: SIGN_IN_USER_SUCCESS,
  payload: response,
});

export const signInUserFailure = error => ({
  type: SIGN_IN_USER_FAILURE,
  payload: error,
});

export const signOutUser = () => ({
  type: SIGN_OUT_USER,
});

export const signOutUserSuccess = response => ({
  type: SIGN_OUT_USER_SUCCESS,
  payload: response,
});

export const signOutUserFailure = error => ({
  type: SIGN_OUT_USER_FAILURE,
  payload: error,
});
