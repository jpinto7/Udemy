import { call, fork, put, takeLatest } from 'redux-saga/effects';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { loginUserSucceeded, loginUserFailed } from '../actions';
import { LOGIN_USER } from '../actions/constants';

function signInWithFirebase({ email, password }) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

function signUpWithFirebase({ email, password }) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function* loginUser(action) {
  try {
    const user = yield call(signInWithFirebase, action.credentials);
    yield put(loginUserSucceeded(user));
    yield call(Actions.main);
  } catch (e) {
    try {
      const newUser = yield call(signUpWithFirebase, action.credentials);
      yield put(loginUserSucceeded(newUser));
    } catch (f) {
      yield put(loginUserFailed(f));
    }
  }
}

function* watchLoginUser() {
  yield takeLatest(LOGIN_USER, loginUser);
}

export default function* () {
  yield [
    fork(watchLoginUser)
  ];
}
