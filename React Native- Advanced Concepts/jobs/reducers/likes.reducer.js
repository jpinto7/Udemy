import uniqBy from 'lodash/uniqBy';
import * as types from '../actions/types';

const initialState = [];

const likesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIKE_JOBS:
      return uniqBy([
        action.payload,
        ...state
      ], 'jobkey', );
    default:
      return state;
  }
}

export default likesReducer;
