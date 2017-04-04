import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

const SongItem = styled.li`
  display: flex;
  justify-content: space-between;
`;

const DeleteIcon = styled.i`
  cursor: pointer;
`;

class SongsList extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      refetch: PropTypes.func.isRequired,
      songs: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
      })),
    }).isRequired,
    mutate: PropTypes.func.isRequired,
  }

  onSongDelete = id => () => {
    this.props.mutate({
      variables: {
        id,
      },
    }).then(() => {
      this.props.data.refetch();
    });
  }

  renderSongs() {
    const { songs } = this.props.data;
    return songs.map(({ id, title }) => (
      <SongItem
        key={id}
        className="collection-item"
      >
        {title}
        <DeleteIcon
          className="material-icons"
          onClick={this.onSongDelete(id)}
        >
          delete
        </DeleteIcon>
      </SongItem>
    ));
  }

  render() {
    const { loading } = this.props.data;
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(
  graphql(query)(SongsList),
);
