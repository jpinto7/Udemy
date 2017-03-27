import { combineReducers } from 'redux-immutable';
import { ActionConst } from 'react-native-router-flux';
import { fromJS } from 'immutable';

import AuthReducer from './AuthReducer';
import EmployeeFormReducer from './EmployeeFormReducer';
import EmployeeReducer from './EmployeeReducer';

const routesInitialState = fromJS({
  scene: {},
});

const RoutesReducer = (state = routesInitialState, action) => {
  switch (action.type) {
    case ActionConst.FOCUS:
      return state.set('scene', action.scene);
    default:
      return state;
  }
};

export default function createReducer() {
  return combineReducers({
    routes: RoutesReducer,
    auth: AuthReducer,
    employeeForm: EmployeeFormReducer,
    employees: EmployeeReducer,
  });
}
