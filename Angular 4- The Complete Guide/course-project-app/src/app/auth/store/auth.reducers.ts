import { SIGNIN, SIGNUP, LOGOUT, SET_TOKEN } from './auth.constants';
import { AuthActions } from './auth.actions';

export interface State {
  token: string;
  isAuthenticated: boolean;
}

const initialState: State = {
  token: null,
  isAuthenticated: false
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SIGNIN:
    case SIGNUP:
      return {
        ...state,
        isAuthenticated: true
      };
    case LOGOUT:
      return {
        ...state,
        ...initialState
      };
    case SET_TOKEN: {
      return {
        ...state,
        token: action.payload
      };
    }
    default:
      return state;
  }
}
