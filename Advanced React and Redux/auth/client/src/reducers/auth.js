import { LOCATION_CHANGE } from 'react-router-redux';

import {
  SIGN_OUT_USER_SUCCESS,
  SIGN_IN_USER_FAILURE,
  SIGN_IN_USER_SUCCESS,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FAILURE,
  FETCH_MESSAGE_SUCCESS,
  FETCH_MESSAGE_FAILURE,
} from '../constants';

const initialState = {
  authenticated: false,
  error: '',
  message: '',
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_MESSAGE_SUCCESS:
      return { ...state, message: action.payload };
    case FETCH_MESSAGE_FAILURE:
      return { ...state, error: action.payload };
    case SIGN_UP_USER_SUCCESS:
    case SIGN_IN_USER_SUCCESS:
      return { ...state, authenticated: true, error: '' };
    case SIGN_UP_USER_FAILURE:
    case SIGN_IN_USER_FAILURE:
      return { ...state, authenticated: false, error: action.payload };
    case SIGN_OUT_USER_SUCCESS:
      return initialState;
    case LOCATION_CHANGE: {
      if (state.error) {
        return { ...state, error: '' };
      }
      return state;
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
