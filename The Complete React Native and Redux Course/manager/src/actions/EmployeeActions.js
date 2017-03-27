import {
  EMPLOYEE_CREATE,
  EMPLOYEE_UPDATE,
  EMPLOYEE_DELETE,
  EMPLOYEE_SAVE,
  EMPLOYEE_LOAD,
  EMPLOYEES_FETCH,
  EMPLOYEES_SYNC,
  EMPLOYEES_FETCH_SUCCEEDED,
  EMPLOYEES_FETCH_FAILED,
  EMPLOYEE_CREATE_SUCCEEDED,
  EMPLOYEE_CREATE_FAILED,
  EMPLOYEE_SAVE_SUCCEEDED,
  EMPLOYEE_SAVE_FAILED,
  EMPLOYEE_DELETE_SUCCEEDED,
  EMPLOYEE_DELETE_FAILED
} from './constants';

export const employeeUpdate = (prop, value) => ({
  type: EMPLOYEE_UPDATE,
  prop,
  value,
});

export const employeeLoad = (employeeData) => ({
  type: EMPLOYEE_LOAD,
  employeeData,
});

export const employeeDelete = (uid) => ({
  type: EMPLOYEE_DELETE,
  uid,
});

export const employeeSave = (employeeData) => ({
  type: EMPLOYEE_SAVE,
  employeeData,
});

export const employeeCreate = (employeeData) => ({
  type: EMPLOYEE_CREATE,
  employeeData,
});

export const employeesSync = () => ({
  type: EMPLOYEES_SYNC,
});

export const employeesFetch = () => ({
  type: EMPLOYEES_FETCH,
});

export const employeesFetchSucceeded = (employees) => ({
  type: EMPLOYEES_FETCH_SUCCEEDED,
  employees,
});

export const employeesFetchFailed = (error) => ({
  type: EMPLOYEES_FETCH_FAILED,
  error,
});

export const employeeCreateSucceeded = () => ({
  type: EMPLOYEE_CREATE_SUCCEEDED,
});

export const employeeCreateFailed = (error) => ({
  type: EMPLOYEE_CREATE_FAILED,
  error,
});

export const employeeSaveSucceeded = () => ({
  type: EMPLOYEE_SAVE_SUCCEEDED,
});

export const employeeSaveFailed = (error) => ({
  type: EMPLOYEE_SAVE_FAILED,
  error,
});

export const employeeDeleteSucceeded = () => ({
  type: EMPLOYEE_DELETE_SUCCEEDED,
});

export const employeeDeleteFailed = (error) => ({
  type: EMPLOYEE_DELETE_FAILED,
  error,
});
