import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authPathRedirect: '/',
};

const authStart = state => updateObject(state, { error: null, loading: true });

const authSuccess = (state, payload) =>
  updateObject(state, {
    token: payload.token,
    userId: payload.userId,
    error: null,
    loading: false,
  });

const authFailed = (state, payload) =>
  updateObject(state, { error: payload, loading: false });

const authLogout = state => updateObject(state, { token: null, userId: null });

const setAuthRedirectPath = (state, payload) =>
  updateObject(state, { authRedirectPath: payload });

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, payload);
    case actionTypes.AUTH_FAILED:
      return authFailed(state, payload);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, payload);
    default:
      return state;
  }
};

export default reducer;
