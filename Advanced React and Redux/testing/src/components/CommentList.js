import React, { Component } from 'react';
import { connect } from 'react-redux';

class CommentList extends Component {
  renderComments() {
    const { comments } = this.props;
    return comments.map((comment, index) => (
      <li key={index}>{comment}</li>
    ));
  }

  render() {
    return (
      <ul className="comment-list">
        {this.renderComments()}
      </ul>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    comments: state.comments,
  };
};

export default connect(mapStateToProps)(CommentList);
