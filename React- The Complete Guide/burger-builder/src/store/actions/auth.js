import axios from 'axios';
import * as actionTypes from './actionTypes';

const API_KEY = 'AIzaSyD2EMYkjzbULGhTWK2Frncjn_3HjkeFaXU';

const authStart = () => ({
  type: actionTypes.AUTH_START,
});

const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: {
    token,
    userId,
  },
});

const authFailed = error => ({
  type: actionTypes.AUTH_FAILED,
  payload: error,
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const checkAuthTimeout = expirationTime => dispatch => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const auth = (email, password, isSignUp) => dispatch => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
  if (!isSignUp) {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
  }
  axios
    .post(url, authData)
    .then(response => {
      const { idToken: token, localId: userId, expiresIn } = response.data;
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', userId);
      dispatch(authSuccess(token, userId));
      dispatch(checkAuthTimeout(expiresIn));
    })
    .catch(err => {
      const { error } = err.response.data;
      dispatch(authFailed(error));
    });
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  payload: path,
});

export const authCheckState = () => dispatch => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem('userId');
      dispatch(authSuccess(token, userId));
      dispatch(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000,
        ),
      );
    }
  }
};
