import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import {
  fetchMessageFailure,
  fetchMessageSuccess,
} from '../actions';

import {
  FETCH_MESSAGE,
} from '../constants';

const fetchMessage = action$ =>
  action$.ofType(FETCH_MESSAGE)
    .switchMap(() =>
      ajax.get('http://localhost:3090/', { Authorization: localStorage.getItem('token') })
      .map(e => e.response)
      .map(({ message }) => fetchMessageSuccess(message))
      .catch(({ message }) => Observable.of(fetchMessageFailure(message)))
    );

export default combineEpics(
  fetchMessage,
);
