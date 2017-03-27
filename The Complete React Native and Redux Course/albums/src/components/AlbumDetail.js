import React, { PropTypes } from 'react';
import { Text, Linking } from 'react-native';
import styled from 'styled-components/native';

import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

const AlbumInfo = styled.View`
  flex-direction: column;
  justify-content: space-around;
`;

const AlbumThumbnailContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-left: 10;
  margin-right: 10;
`;

const AlbumTitle = styled.Text`
  font-size: 18;
`;

const AlbumThumbnail = styled.Image`
  height: 50;
  width: 50;
`;

const AlbumImage = styled.Image`
  height: 300;
  flex: 1;
  width: 0;
`;

const AlbumDetail = ({ album: { title, artist, thumbnail_image, image, url } }) => {
  const openURL = () => {
    Linking.openURL(url);
  };

  return (
    <Card>
      <CardSection>
        <AlbumThumbnailContainer>
          <AlbumThumbnail source={{ uri: thumbnail_image }} />
        </AlbumThumbnailContainer>
        <AlbumInfo>
          <AlbumTitle>{title}</AlbumTitle>
          <Text>{artist}</Text>
        </AlbumInfo>
      </CardSection>
      <CardSection>
        <AlbumImage source={{ uri: image }} />
      </CardSection>
      <CardSection>
        <Button onPress={openURL}>
          Buy album
        </Button>
      </CardSection>
    </Card>
  );
};

AlbumDetail.propTypes = {
  album: PropTypes.shape({
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    thumbnail_image: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
};

export default AlbumDetail;
