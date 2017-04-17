import React from 'react';
import PropTypes from 'prop-types';

const ImageScore = ({ ups, downs }) => {
  const upsPercent = `${100 * (ups / (ups + downs))}%`;
  const downsPercent = `${100 * (downs / (ups + downs))}%`;
  return (
    <div>
      Ups/Downs
      <div className="progress">
        <div
          style={{ width: upsPercent }}
          className="progress-bar progress-bar-success progress-bar-striped"
        />
        <div
          style={{ width: downsPercent }}
          className="progress-bar progress-bar-danger progress-bar-striped"
        />
      </div>
    </div>
  );
};

ImageScore.propTypes = {
  ups: PropTypes.number.isRequired,
  downs: PropTypes.number.isRequired,
};

export default ImageScore;
