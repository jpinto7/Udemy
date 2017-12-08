import * as types from '../actions/types';

const initialState = {
  results: []
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_JOBS:
      return action.payload;
    default:
      return state;
  }
}

export default jobsReducer;
