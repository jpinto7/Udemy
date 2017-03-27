import {
  call,
  fork,
  put,
  takeLatest
} from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import {
  getAll,
  push,
  update,
  remove,
  sync,
  VALUE
} from 'firebase-saga';

import {
  employeeDeleteSucceeded,
  employeeDeleteFailed,
  employeeSaveSucceeded,
  employeeSaveFailed,
  employeeCreateSucceeded,
  employeeCreateFailed,
  employeesFetchSucceeded,
  employeesFetchFailed,
  employeesFetch
} from '../actions';
import {
  EMPLOYEE_CREATE,
  EMPLOYEE_SAVE,
  EMPLOYEE_DELETE,
  EMPLOYEES_FETCH,
  EMPLOYEES_SYNC
} from '../actions/constants';

export function* fetchEmployees() {
  try {
    const { currentUser } = firebase.auth();
    const employees = yield call(getAll, `users/${currentUser.uid}/employees`);
    yield put(employeesFetchSucceeded(employees));
  } catch (e) {
    yield put(employeesFetchFailed(e));
  }
}

export function* syncEmployees() {
  const { currentUser } = firebase.auth();
  yield fork(sync, `users/${currentUser.uid}/employees`, {
    [VALUE]: employeesFetch
  });
}

export function* deleteEmployee(action) {
  try {
    const { currentUser } = firebase.auth();
    const { uid } = action;
    const employee = yield call(remove, `users/${currentUser.uid}/employees`, `${uid}`);
    yield put(employeeDeleteSucceeded(employee));
    yield call(Actions.employeeList, { type: 'reset' });
  } catch (e) {
    yield put(employeeDeleteFailed(e));
  }
}

export function* createEmployee(action) {
  try {
    const { currentUser } = firebase.auth();
    const { name, phone, shift } = action.employeeData;
    const employee = yield call(push, `users/${currentUser.uid}/employees`, () => ({
      name,
      phone,
      shift,
    }));
    yield put(employeeCreateSucceeded(employee));
    yield call(Actions.employeeList, { type: 'reset' });
  } catch (e) {
    yield put(employeeCreateFailed(e));
  }
}

export function* saveEmployee(action) {
  try {
    const { currentUser } = firebase.auth();
    const { name, phone, shift, uid } = action.employeeData;
    const employee = yield call(update, `users/${currentUser.uid}/employees`, `${uid}`, () => ({
      name,
      phone,
      shift,
    }));
    yield put(employeeSaveSucceeded(employee));
    yield call(Actions.employeeList, { type: 'reset' });
  } catch (e) {
    yield put(employeeSaveFailed(e));
  }
}

function* watchEmployeeCreate() {
  yield takeLatest(EMPLOYEE_CREATE, createEmployee);
}

function* watchEmployeeSave() {
  yield takeLatest(EMPLOYEE_SAVE, saveEmployee);
}

function* watchEmployeesFetch() {
  yield takeLatest(EMPLOYEES_FETCH, fetchEmployees);
}

function* watchEmployeeDelete() {
  yield takeLatest(EMPLOYEE_DELETE, deleteEmployee);
}

function* watchEmployeesSync() {
  yield takeLatest(EMPLOYEES_SYNC, syncEmployees);
}

export default function* () {
  yield [
    fork(watchEmployeeCreate),
    fork(watchEmployeeSave),
    fork(watchEmployeesFetch),
    fork(watchEmployeeDelete),
    fork(watchEmployeesSync)
  ];
}
