import { fromJS } from 'immutable';

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCEEDED,
  LOGIN_USER_FAILED,
} from '../actions/constants';

const initialState = fromJS({
  email: '',
  password: '',
  user: null,
  loading: null,
  error: '',
});

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return state.set('email', action.email);
    case PASSWORD_CHANGED:
      return state.set('password', action.password);
    case LOGIN_USER:
      return state.merge({
        loading: true,
        error: '',
      });
    case LOGIN_USER_SUCCEEDED:
      return state.set('user', action.user).merge(initialState);
    case LOGIN_USER_FAILED:
      return state.merge({
        error: 'Authentication failed.',
        loading: false,
        password: '',
      });
    default:
      return state;
  }
};

export default AuthReducer;
