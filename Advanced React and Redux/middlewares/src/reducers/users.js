import {
  FETCH_USERS_SUCCESS,
} from '../constants';

const initialState = [];

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return [ ...state, ...action.payload ];
    default:
      return state;
  }
};

export default usersReducer;
