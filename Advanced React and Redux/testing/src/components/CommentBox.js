import React, { Component } from 'react';

class CommentBox extends Component {
  state = {
    comment: '',
  }

  handleChange = e => {
    this.setState({
      comment: e.target.value,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      comment: '',
    });
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="comment-box"
      >
        <textarea onChange={this.handleChange} value={this.state.comment} />
        <button type="submit">Submit Comment</button>
      </form>
    );
  }
}

export default CommentBox; 
