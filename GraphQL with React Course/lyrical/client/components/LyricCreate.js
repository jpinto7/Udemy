import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricCreate extends Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    songId: PropTypes.string.isRequired,
  }

  state = {
    content: '',
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.mutate({
      variables: {
        content: this.state.content,
        songId: this.props.songId,
      },
    }).then(() => {
      this.setState({
        content: '',
      });
    });
  }

  handleOnChangeInput = (e) => {
    this.setState({
      content: e.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="lyric">Add a Lyric</label>
        <input
          id="lyric"
          onChange={this.handleOnChangeInput}
          value={this.state.content}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
