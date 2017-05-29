import {
  LOG_OUT_USER_SUCCESS,
  SIGN_IN_USER_FAILURE,
  SIGN_IN_USER_SUCCESS,
} from '../constants';

const initialState = {
  authenticated: false,
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case SIGN_IN_USER_SUCCESS:
      return { ...state, authenticated: true };
    case SIGN_IN_USER_FAILURE:
      return { ...state, error: action.payload };
    case LOG_OUT_USER_SUCCESS:
      return { ...state, authenticated: false };
    default:
      return state;
  }
};

export default authReducer;
