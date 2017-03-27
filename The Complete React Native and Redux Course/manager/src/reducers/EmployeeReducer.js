import { fromJS } from 'immutable';

import {
  EMPLOYEES_FETCH_SUCCEEDED,
} from '../actions/constants';

const initialState = fromJS({});

const EmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEES_FETCH_SUCCEEDED:
      return state.clear().merge(action.employees);
    default:
      return state;
  }
};

export default EmployeeReducer;
