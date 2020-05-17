import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../../store/actions';

export function* logout() {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield call([localStorage, 'removeItem'], 'userId');
  yield put(actions.logoutSuccess());
}

export function* checkAuthTimeout({ payload: expirationTime }) {
  yield delay(expirationTime * 1000);
  yield put(actions.logout());
};

export function* authUser({ payload: user }) {
  yield put(actions.authStart());
  const authData = {
    email: user.email,
    password: user.password,
    returnSecureToken: true
  };
  let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB5cHT6x62tTe-g27vBDIqWcwQWBSj3uiY';
  if (!user.isSignup) {
    url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB5cHT6x62tTe-g27vBDIqWcwQWBSj3uiY';
  }
  try {
    const response = yield axios.post(url, authData);
    const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', response.data.localId);
    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch(err) {
    yield put(actions.authFail(err.response.data.error))
  }
}

export function* authCheckState() {
  const token = yield localStorage.getItem('token');
  if (!token) {
      yield put(actions.logout());
  } else {
      const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        yield put(actions.logout());
      } else {
          const userId = localStorage.getItem('userId');
          yield put(actions.authSuccess(token, userId));
          yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
      }   
  }  
}
