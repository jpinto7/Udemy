import {
  CHANGE_AUTH,
} from '../constants';

const initialState = false;

const authenticate = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return action.payload;
    default:
      return state;
  }
};

export default authenticate;
