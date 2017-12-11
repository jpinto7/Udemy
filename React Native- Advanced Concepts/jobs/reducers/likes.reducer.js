import uniqBy from 'lodash/uniqBy';
import { REHYDRATE } from 'redux-persist';
import * as types from '../actions/types';

const initialState = [];

const likesReducer = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE: {
      if (action.payload && action.payload.likes) {
        return action.payload.likes;
      }
      return initialState;
    }
    case types.LIKE_JOB:
      return uniqBy([
        action.payload,
        ...state
      ], 'jobkey');
    case types.CLEAR_LIKED_JOBS:
      return initialState;
    default:
      return state;
  }
}

export default likesReducer;
