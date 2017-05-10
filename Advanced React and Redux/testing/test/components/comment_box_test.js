import { renderComponent, expect } from '../test_helper';
import CommentBox from '../../src/components/CommentBox';
import CommentList from '../../src/components/CommentList';

describe('CommentBox', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(CommentBox);
  });

  it('has a the correct class', () => {
    expect(component).to.have.class('comment-box');
  });

  it('has a text area', () => {
    expect(component.find('textarea')).to.exist;
  });

  it('has a button', () => {
    expect(component.find('button')).to.exist;
  });

  describe('entering some text', () => {
    let comment;

    beforeEach(() => {
      comment = 'new comment';
      component.find('textarea').simulate('change', comment);
    });

    it('shows that text in the textarea', () => {
      expect(component.find('textarea')).to.have.value(comment);
    });

    it('when submitted, clears the input', () => {
      component.simulate('submit');
      expect(component.find('textarea')).to.have.value('');
    });
  });
});
