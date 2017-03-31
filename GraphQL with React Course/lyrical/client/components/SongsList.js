import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongsList extends Component {
  renderSongs() {
    console.log(this);
    const { songs } = this.props.data;
    return songs.map(song => (
      <li
        key={song.id}
        className="collection-item"
      >
        {song.title}
      </li>
    ));
  }

  render() {
    const { loading } = this.props.data;
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <ul>
        {this.renderSongs()}
      </ul>
    );
  }
}

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongsList);
