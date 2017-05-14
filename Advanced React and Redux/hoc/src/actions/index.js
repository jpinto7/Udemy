import {
  CHANGE_AUTH,
} from '../constants';

export const authenticate = isLoggedIn => ({
  type: CHANGE_AUTH,
  payload: isLoggedIn,
});
