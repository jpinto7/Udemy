import {
  FETCH_MESSAGE,
  FETCH_MESSAGE_SUCCESS,
  FETCH_MESSAGE_FAILURE,
  SIGN_OUT_USER,
  SIGN_OUT_USER_SUCCESS,
  SIGN_IN_USER,
  SIGN_IN_USER_FAILURE,
  SIGN_IN_USER_SUCCESS,
  SIGN_UP_USER,
  SIGN_UP_USER_FAILURE,
  SIGN_UP_USER_SUCCESS,
} from '../constants';

export const signUpUser = ({ email, password }) => ({
  type: SIGN_UP_USER,
  payload: {
    email,
    password,
  },
});

export const signUpUserSuccess = response => ({
  type: SIGN_UP_USER_SUCCESS,
  payload: response,
});

export const signUpUserFailure = error => ({
  type: SIGN_UP_USER_FAILURE,
  payload: error,
});

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

export const fetchMessage = () => ({
  type: FETCH_MESSAGE,
});

export const fetchMessageSuccess = (message) => ({
  type: FETCH_MESSAGE_SUCCESS,
  payload: message,
});

export const fetchMessageFailure = (message) => ({
  type: FETCH_MESSAGE_FAILURE,
  payload: message,
});
