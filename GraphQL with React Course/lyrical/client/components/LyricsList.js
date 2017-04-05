import React, { Component, PropTypes } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styled from 'styled-components';

const LyricItem = styled.li`
  display: flex;
  justify-content: space-between;
`;

const LikeIcon = styled.i`
  cursor: pointer;
  margin-right: 5px;
`;

const VoteBox = styled.div`
  display: flex;
  align-items: center;
`;

class LyricsList extends Component {
  static propTypes = {
    lyrics: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.string.isRequired,
    })).isRequired,
    mutate: PropTypes.func.isRequired,
  }

  onLyricLike = (id, likes) => () => {
    this.props.mutate({
      variables: {
        id,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          __typename: 'LyricType',
          id,
          likes: likes + 1,
        },
      },
    });
  }

  renderLyrics() {
    const { lyrics } = this.props;
    return lyrics.map(({ id, content, likes }) => (
      <LyricItem
        key={id}
        className="collection-item"
      >
        {content}
        <VoteBox>
          <LikeIcon
            className="material-icons"
            onClick={this.onLyricLike(id, likes)}
          >
            thumb_up
          </LikeIcon>
          {likes}
        </VoteBox>
      </LyricItem>
    ));
  }

  render() {
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    );
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricsList);
