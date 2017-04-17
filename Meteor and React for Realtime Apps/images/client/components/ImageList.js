import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import ImageDetail from './ImageDetail';

class ImageList extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })).isRequired,
  }

  renderImages() {
    const { images } = this.props;
    const validImages = images.filter(image => !image.is_album);
    return validImages.map(image => (
      <ImageDetail
        key={shortid.generate()}
        image={image}
      />
    ));
  }

  render() {
    return (
      <ul className="media-list list-group">
        {this.renderImages()}
      </ul>
    );
  }
}

export default ImageList;
