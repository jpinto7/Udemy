import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/fetchSong';

class SongDetail extends Component {
  render() {
    return (
      <div>
        <h3>Song Detail</h3>
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
