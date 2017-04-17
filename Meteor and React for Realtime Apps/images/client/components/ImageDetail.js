import React from 'react';
import PropTypes from 'prop-types';
import ImageScore from './ImageScore';

const ImageDetail = ({ image }) => {
  const {
    description,
    downs,
    link,
    title,
    ups,
  } = image;
  return (
    <li className="media list-group-item">
      <div className="media-left">
        <img src={link} alt={title} />
      </div>
      <div className="media-body">
        <h4 className="media-heading">{title}</h4>
        <p>{description}</p>
        <ImageScore
          ups={ups}
          downs={downs}
        />
      </div>
    </li>
  );
};

ImageDetail.propTypes = {
  image: PropTypes.shape({
    description: PropTypes.string,
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageDetail;
