import { expect } from '../test_helper';
import { SAVE_COMMENT } from '../../src/actions/constants';
import { saveComment } from '../../src/actions';

describe('actions', () => {
  describe('saveComment', () => {
    let action;
    const payload = 'New comment';

    beforeEach(() => {
      action = saveComment(payload);
    })

    it('has the correct type', () => {
      expect(action).to.have.property('type', SAVE_COMMENT);
    });

    it('has the correct payload', () => {
      expect(action).to.have.property('payload', payload);
    });
  });
});
