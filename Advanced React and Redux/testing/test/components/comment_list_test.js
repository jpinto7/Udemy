import { renderComponent, expect } from '../test_helper';
import CommentList from '../../src/components/CommentList';

describe('CommentList', () => {
  let component;
  let comments;

  beforeEach(() => {
    comments = [
      'New Comment',
      'Other New Comment',
      'Jajaja',
    ];
    const props = { comments };
    component = renderComponent(CommentList, null, props);
  });

  it('shows an <li></li> for each comment', () => {
    expect(component.find('li').length).to.equal(comments.length);
  });

  it('shows each comment that is provided', () => {
    comments.forEach(comment => {
      expect(component).to.contain(comment);
    });
  });
});
