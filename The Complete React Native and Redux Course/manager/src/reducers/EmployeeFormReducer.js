import { fromJS } from 'immutable';
import { ActionConst } from 'react-native-router-flux';
import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_LOAD,
  EMPLOYEE_CREATE_SUCCEEDED,
  EMPLOYEE_DELETE_SUCCEEDED,
  EMPLOYEE_SAVE_SUCCEEDED,
} from '../actions/constants';

const initialState = fromJS({
  name: '',
  phone: '',
  shift: '',
});

const EmployeeFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE: {
      const { prop, value } = action;
      return state.set(prop, value);
    }
    case EMPLOYEE_LOAD: {
      const { employeeData } = action;
      return state.merge(employeeData);
    }
    case EMPLOYEE_CREATE_SUCCEEDED:
      return initialState;
    case EMPLOYEE_DELETE_SUCCEEDED:
      return initialState;
    case EMPLOYEE_SAVE_SUCCEEDED:
      return initialState;
    case ActionConst.BACK_ACTION:
      return initialState;
    default:
      return state;
  }
};

export default EmployeeFormReducer;
