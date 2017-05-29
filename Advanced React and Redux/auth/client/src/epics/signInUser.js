import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { push } from 'react-router-redux';
import {
  signInUserFailure,
  signInUserSuccess,
} from '../actions';
import { SIGN_IN_USER } from '../constants';

const signInUser = action$ =>
  action$.ofType(SIGN_IN_USER)
    .mergeMap(({ payload: { email, password }}) =>
      ajax.post('http://localhost:3090/signin', {
        email,
        password,
      }, { 'Content-Type': 'application/json' })
      .map(e => e.response)
      .mergeMap(({ token }) => {
        localStorage.setItem('token', token);
        return [
          signInUserSuccess(),
          push('/'),
        ];
      })
      .catch(({ message }) => Observable.of(signInUserFailure(message)))
    );

export default signInUser;
