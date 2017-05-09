import { SAVE_COMMENT } from '../actions/constants';

const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case SAVE_COMMENT: {
      const { payload: comment } = action;
      return [ ...state, comment ];
    }
    default:
      return state;
  }
}

export default commentsReducer;
