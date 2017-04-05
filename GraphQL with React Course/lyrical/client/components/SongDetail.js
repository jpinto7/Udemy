import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import query from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricsList from './LyricsList';

// eslint-disable-next-line react/prefer-stateless-function
class SongDetail extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      song: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }).isRequired,
  }

  render() {
    const { loading, song } = this.props.data;
    if (loading || !song) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricsList
          lyrics={song.lyrics}
        />
        <LyricCreate
          songId={song.id}
        />
      </div>
    );
  }
}

export default graphql(query, {
  options: ({ params }) => ({
    variables: {
      id: params.id,
    },
  }),
})(SongDetail);
