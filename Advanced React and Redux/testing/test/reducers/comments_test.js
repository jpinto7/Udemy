import { expect } from '../test_helper';
import commentsReducer from '../../src/reducers/comments';
import { saveComment } from '../../src/actions';
import { SAVE_COMMENT } from '../../src/actions/constants';

describe('Comment Reducer', () => {

  it('handles action with unknown type', () => {
    expect(commentsReducer(undefined, {})).to.eql([]);
  });

  it('handles action with type SAVE_COMMENT', () => {
    const comment = 'New comment';
    const action = saveComment(comment);
    expect(commentsReducer(undefined, action)).to.eql([ comment ]);
  });
});
