import { combineEpics } from 'redux-observable';
import { reset } from 'redux-form';
import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { push } from 'react-router-redux';
import {
  signInUserFailure,
  signInUserSuccess,
  signUpUserSuccess,
  signUpUserFailure,
  signOutUserSuccess,
} from '../actions';

import {
  SIGN_IN_USER,
  SIGN_UP_USER,
  SIGN_OUT_USER,
} from '../constants';

const signInUser = action$ =>
  action$.ofType(SIGN_IN_USER)
    .switchMap(({ payload: { email, password }}) =>
      ajax.post('http://localhost:3090/signin', {
        email,
        password,
      }, { 'Content-Type': 'application/json' })
      .map(e => e.response)
      .mergeMap(({ token }) => {
        localStorage.setItem('token', token);
        return [
          signInUserSuccess(),
          push('/feature'),
        ];
      })
      .catch(({ message }) => Observable.of(
        signInUserFailure(message),
        reset('signin'),
      ))
    );

const signUpUser = action$ =>
  action$.ofType(SIGN_UP_USER)
    .switchMap(({ payload: { email, password }}) =>
      ajax.post('http://localhost:3090/signup', {
        email,
        password,
      }, { 'Content-Type': 'application/json' })
      .map(e => e.response)
      .mergeMap(({ token }) => {
        localStorage.setItem('token', token);
        return [
          signUpUserSuccess(),
          push('/feature'),
        ];
      })
      .catch(({ message }) => Observable.of(
        signUpUserFailure(message),
        reset('signup'),
      ))
    );

const signOutUser = action$ =>
  action$.ofType(SIGN_OUT_USER)
    .switchMap(() => {
      localStorage.removeItem('token');
      return [
        signOutUserSuccess(),
        push('/'),
      ];
    })

export default combineEpics(
  signInUser,
  signOutUser,
  signUpUser,
);
