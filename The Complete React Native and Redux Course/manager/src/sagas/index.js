import { fork } from 'redux-saga/effects';
import authSagas from './AuthSagas';
import employeeSagas from './EmployeeSagas';

export default function* rootSaga() {
  yield [
    fork(authSagas),
    fork(employeeSagas)
  ];
}
