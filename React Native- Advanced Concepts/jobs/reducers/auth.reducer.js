import * as types from '../actions/types';

const initialState = {
  token: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FB_LOGIN_FAIL:
      return {
        ...state,
        token: null
      };
    case types.FB_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
}

export default authReducer;
