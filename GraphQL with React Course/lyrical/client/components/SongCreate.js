import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';

class SongCreate extends Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
  }

  state = {
    title: '',
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.mutate({
      variables: {
        title: this.state.title,
      },
      refetchQueries: [
        {
          query,
        },
      ],
    }).then(() => {
      hashHistory.push('/');
    });
  }

  handleOnChangeInput = (e) => {
    this.setState({
      title: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <Link
          to="/"
        >
          Back
        </Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="song-title">Song Title:</label>
          <input
            id="song-title"
            onChange={this.handleOnChangeInput}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
