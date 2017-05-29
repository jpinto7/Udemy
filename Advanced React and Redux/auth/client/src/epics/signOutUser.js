import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { push } from 'react-router-redux';
import {
  signOutUserFailure,
  signOutUserSuccess,
} from '../actions';
import { SIGN_OUT_USER } from '../constants';

const signOutUser = action$ =>
  action$.ofType(SIGN_OUT_USER)
    .mergeMap(action =>
      ajax.post('http://localhost:3090/signout')
      .mergeMap(() => {
        localStorage.removeItem('token');
        return [
          signOutUserSuccess(),
          push('/'),
        ];
      })
      .catch(({ message }) => Observable.of(signOutUserFailure(message)))
    );

export default signOutUser;
