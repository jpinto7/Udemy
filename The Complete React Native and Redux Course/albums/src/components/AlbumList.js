import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import AlbumDetail from './AlbumDetail';

class AlbumList extends Component {
  state = { albums: [] };

  componentWillMount() {
    fetch('https://rallycoding.herokuapp.com/api/music_albums')
      .then(response => response.json())
      .then(json => this.setState({ albums: json }));
  }

  render() {
    const { albums } = this.state;
    const albumsList = albums.map(album => <AlbumDetail key={album.title} album={album} />);

    return (
      <ScrollView>
        {albumsList}
      </ScrollView>
    );
  }
}

export default AlbumList;
