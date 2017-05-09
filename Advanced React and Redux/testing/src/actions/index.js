import { SAVE_COMMENT } from './constants';

export const saveComment = comment => ({
  type: SAVE_COMMENT,
  payload: comment,
});
