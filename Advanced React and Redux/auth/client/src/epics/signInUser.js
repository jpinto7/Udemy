import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';
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
      .map(response => signInUserSuccess(response))
      .catch(({ message }) => Observable.of(signInUserFailure(message)))
    );

export default signInUser;
